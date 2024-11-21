const { ApolloServer, AuthenticationError } = require('@apollo/server'); // Importar AuthenticationError
const { startStandaloneServer } = require('@apollo/server/standalone');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Importar modelos
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');

// Configuración de MongoDB
mongoose.set('strictQuery', false);
const MONGODB_URI = process.env.MONGODB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

if (!MONGODB_URI || !JWT_SECRET) {
  throw new Error('MONGODB_URI or JWT_SECRET is not defined in .env file');
}

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    allAuthors: [Author!]
    allBooks(author: String, genre: String): [Book!]!
    bookCount: Int!
    me: User
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

    createUser(
      username: String!
      favoriteGenre: String!
      password: String!  # Incluir password en la mutación createUser
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`;

// Resolvers de GraphQL
const resolvers = {
  Query: {
    authorCount: async () => Author.collection.countDocuments(),
    bookCount: async () => Book.collection.countDocuments(),
    allAuthors: async () => Author.find({}),
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
    me: (root, args, context) => {
      return context.currentUser;
    },
  },
  Author: {
    bookCount: async (root) => Book.countDocuments({ author: root._id }),
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('Not authenticated');
      }

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });
        await author.save();
      }

      const newBook = new Book({ ...args, author: author._id });
      await newBook.save();
      return newBook.populate('author');
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('Not authenticated');
      }

      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      );

      if (!author) {
        throw new Error('Author not found');
      }

      return author;
    },
    createUser: async (root, args) => {
      const { username, favoriteGenre, password } = args; // Debes asegurarte de que la contraseña esté incluida
    
      const user = new User({
        username,
        favoriteGenre,
        password,  // Agregar el campo de contraseña en el modelo User
      });
    
      try {
        await user.save();
        return user;
      } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Error creating user");
      }
    },
    
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || user.password !== args.password) {  // Comparar la contraseña en texto plano
        throw new AuthenticationError('Invalid credentials');
      }

      // Generar el token JWT
      const token = jwt.sign({ username: user.username, id: user.id }, process.env.JWT_SECRET);
      return { value: token };
    },
  },
};

// Configuración del servidor
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req.headers.authorization || '';
    if (auth.startsWith('Bearer ')) {
      const token = auth.substring(7);
      try {
        const decodedToken = jwt.verify(token, JWT_SECRET);
        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      } catch {
        return {};
      }
    }
    return {};
  },
});

// Iniciar el servidor
startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
