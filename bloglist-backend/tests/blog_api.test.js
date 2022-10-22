const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { init } = require('../models/blog')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialblogs)

})

describe('when there is initially som blogs saved', () =>{
 test('blogs are returned as json', async ()=>{
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('content-type', /application\/json/)
})
test('there are two notes', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body).toHaveLength(2)
  })
  test('To be defined', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.id)
  
    expect(contents).toBeDefined()
  })
})

describe('addition of a new blog', ()=>{

    test('a valid post can be added', async ()=>{
        const newPost={
            title:'The love of my life',
            author:'Madlien',
            url:'truestory.com',
            likes:100,
        }
        await api
        .post('/api/blogs')
        .send(newPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
    
        expect(response.body).toHaveLength(helper.initialblogs.length+1)
    })
})

describe('delete a blog', ()=>{
    test('succed with a status code 204', async () =>{
        const blogAtstart = await helper.blogsInDb()
        const blogToDelete = blogAtstart[0]

        await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)
        
        const blogsAtEnd = await helper.blogsInDb()

        expect(blogsAtEnd).toHaveLength(
            helper.initialblogs.length -1
        )
    })
})

describe('update the blogs', ()=>{
    test('succed update existing blog', async ()=>{
        const blogAtstart = await helper.blogsInDb()
        const blogToupdate = blogAtstart[0]

        await api
        .put(`/api/blogs/${blogToupdate.id}`)
        .send({likes:10})
        .expect(204)
        
        const blogsAtEnd = await helper.blogsInDb()
        const updatedBlog = blogsAtEnd[0];
        expect(blogsAtEnd).toHaveLength(helper.initialblogs.length)
        expect(updatedBlog.likes).toBe(10)
    })
})













afterAll(()=>{
    mongoose.connection.close()
})