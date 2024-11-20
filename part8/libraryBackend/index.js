const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const { v1: uuid } = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
];

let books = [
  {
    title: 'Clean Code',
    published: 2008,
    author: 'Robert Martin',
    id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Agile software development',
    published: 2002,
    author: 'Robert Martin',
    id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
    genres: ['agile', 'patterns', 'design']
  },
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  },  
  {
    title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
    published: 2012,
    author: 'Sandi Metz',
    id: "afa5de02-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'design']
  },
  {
    title: 'Crime and punishment',
    published: 1866,
    author: 'Fyodor Dostoevsky',
    id: "afa5de03-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'crime']
  },
  {
    title: 'Demons',
    published: 1872,
    author: 'Fyodor Dostoevsky',
    id: "afa5de04-344d-11e9-a414-719c6709cf3e",
    genres: ['classic', 'revolution']
  },
];

const typeDefs = `
  type Author {
    name: String!
    bookCount: Int!
    id: ID!
    born: Int
  }

  type Book {
    title: String!
    published: Int
    author: String
    id: ID!
    genres: [String]
  }

type Query {
  authorCount: Int!
  allAuthors: [Author!]
  allBooks(author: String, genre: String): [Book!]!
  bookCount: Int!
}


  type Mutation {
  addBook(
    title: String!
    published: Int
    author: String
    genres: [String]
  ): Book

  editAuthor(
    name: String!
    setBornTo: Int!
  ): Author

}
`;

const resolvers = {
  Query: {
    authorCount: () => authors.length,
    allAuthors: () => authors,
    allBooks: (parent, args) => {
      let filteredBooks = books;

      // Filtrar por autor si se proporciona
      if (args.author) {
        filteredBooks = filteredBooks.filter(book => book.author === args.author);
      }

      // Filtrar por género si se proporciona
      if (args.genre) {
        filteredBooks = filteredBooks.filter(book => book.genres.includes(args.genre));
      }

      return filteredBooks;
    },
    bookCount: () => books.length,
  },
  Author: {
    bookCount: (parent) => {
      return books.filter(book => book.author === parent.name).length;
    }
  },
  Mutation: {
    addBook: (root, args) => {
      const newBook = { ...args, id: uuid() };
      books = books.concat(newBook);

      let author = authors.find(a => a.name === args.author);
      if (!author) {
        const newAuthor = {
          name: args.author,
          born: null,
          id: uuid(),
        };
        authors = authors.concat(newAuthor);
      }

      return newBook; // Asegúrate de devolver el nuevo libro aquí.
    },
    editAuthor: (root, args) => {
      const author = authors.find(a => a.name === args.name);

      if (!author) {
        return null;
      }

      author.born = args.setBornTo;
      return author;
    },
  },
};



const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
