const { ApolloServer } = require('@apollo/server');
const { startStandaloneServer } = require('@apollo/server/standalone');
const mongoose = require('mongoose');
require('dotenv').config();

// Importar modelos
const Book = require('./models/book');
const Author = require('./models/author');

// Configurar conexión con MongoDB
mongoose.set('strictQuery', false);
const MONGODB_URI = process.env.MONGODB_URI;

console.log('connecting to', MONGODB_URI);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message);
  });

// Definición de tipos GraphQL
const typeDefs = `
  type Author {
    name: String!
    bookCount: Int!
    id: ID!
    born: Int
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
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
      published: Int!
      author: String!
      genres: [String!]
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`;

// Resolvers de GraphQL
const resolvers = {
  Query: {
    // Cantidad total de autores
    authorCount: async () => Author.collection.countDocuments(),
    // Cantidad total de libros
    bookCount: async () => Book.collection.countDocuments(),
    // Obtener todos los autores
    allAuthors: async () => Author.find({}),
    // Obtener todos los libros con filtros opcionales (por autor o género)
    allBooks: async (root, args) => {
      let query = {};
      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (author) query.author = author._id;
      }
      if (args.genre) {
        query.genres = { $in: [args.genre] };
      }
      return Book.find(query).populate('author');
    },
  },
  Author: {
    // Contar la cantidad de libros escritos por el autor
    bookCount: async (root) => Book.countDocuments({ author: root._id }),
  },
  Mutation: {
    // Agregar un nuevo libro
    addBook: async (root, args) => {
      // Verificar si el autor ya existe
      let author = await Author.findOne({ name: args.author });

      // Si no existe, crearlo
      if (!author) {
        author = new Author({ name: args.author });
        await author.save();
      }

      // Crear el nuevo libro con referencia al autor
      const newBook = new Book({ ...args, author: author._id });
      await newBook.save();
      return newBook.populate('author'); // Retornar el libro con los datos del autor
    },
    // Editar el año de nacimiento de un autor
    editAuthor: async (root, args) => {
      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true } // Retornar el documento actualizado
      );
      return author;
    },
  },
};

// Crear y configurar el servidor Apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
