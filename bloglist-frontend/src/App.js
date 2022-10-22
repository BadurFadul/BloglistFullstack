import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  
  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  useEffect(() => {
    blogService
    .getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handlelogout=(event)=>{
    event.preventDefault()
    setErrorMessage(`${user.name} has loged out`)
    setTimeout(() => {setErrorMessage(null)}, 3500)
    setUser(null)
    window.localStorage.clear()
  
    }

    const addBlog = (blogObject) => {
      blogFormRef.current.toggleVisibility()
      const newBlog = { ...blogObject, user: user.token }
      console.log(newBlog)
      blogService.create(newBlog).then(returnedBlog => {setBlogs(blogs.concat(returnedBlog))})
      setErrorMessage(`New blog ${newBlog.title} by ${newBlog.author} created`)
      setTimeout(() => {setErrorMessage(null)}, 3500)
    }

    const loginForm = () => (
      <form onSubmit={handleLogin}>
        <h2>log in to application</h2>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>      
    )
    const updatelikes = async (id, likeupdate) => {
      try{
        const updateblog = await blogService.update(id, likeupdate);
        const newblogs = blogs.map((blog)=>
          blog.id === id ? updateblog : blog
        );
        setBlogs(newblogs)
      } catch (exception) {
        setErrorMessage("error" + exception.response.data.error)
      }
    }

const handledelete = async (id) =>{
  try{
    blogService.deleteId(id);
    const updatedBlogs = blogs.filter((blog) => blog.id !== id);
      setBlogs(updatedBlogs);
      setErrorMessage("Blog removed");
  } catch (exception) {
    setErrorMessage("error" + exception.response.data.error);
  }
}


return (
  
  <div>
  {errorMessage}
  {
    user ===null?
    loginForm():
    <div>
    <h2>blogs</h2>
    <p>{user.name} logged in <button onClick={handlelogout}>log out</button> </p>
   <Togglable buttonLabel='new blog'ref={blogFormRef} >
    <BlogForm addblog={addBlog} />
   </Togglable>
    {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
      <Blog key={blog.id} blog={blog}  user={user} updateLikes={updatelikes} deleteblog={handledelete}/> 
    )}
    </div>
  } 
</div>
)

}

export default App
