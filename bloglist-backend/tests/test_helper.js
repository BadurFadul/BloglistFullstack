const Blog = require('../models/blog')
const User = require('../models/user')

const initialblogs =[
    {
        title: "The Journey",
        author: "Mum",
        url: "Journey.fi",
        likes: 121,
        id: 1
    },
    {
        title: "The rational male",
        author: "Nansi",
        url: "maleisyou.fi",
        likes: 41,
        id: 2
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
    initialblogs,
    blogsInDb,
    usersInDb
  }