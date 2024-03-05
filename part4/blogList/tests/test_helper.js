const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
    {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
    },
    {
        username: 'Alfredo',
        name: 'Alfredo Martin',
        password: 'Alfredo',
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialUsers, blogsInDb, usersInDb,
}