const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');
const Book = require('./models/book');
const Author = require('./models/author');
const User = require('./models/user');

const JWT_SECRET = process.env.JWT_SECRET;

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
    me: (root, args, context) => context.currentUser,
  },
  Author: {
    bookCount: async (root) => Book.countDocuments({ author: root._id }),
  },
  Mutation: {
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || user.password !== args.password) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = jwt.sign(
        { username: user.username, id: user.id },
        JWT_SECRET
      );
      return { value: token };
    },
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
      const { username, favoriteGenre, password } = args;

      const user = new User({
        username,
        favoriteGenre,
        password,
      });

      try {
        await user.save();
        return user;
      } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user');
      }
    },
  },
};

module.exports = resolvers;
