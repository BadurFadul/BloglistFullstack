import { useState } from 'react'

const Blog = ({blog, user, updateLikes, deleteblog}) => {
  const [blogVisible, setblogVisible] = useState(false)

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const handlelikes = () =>{
    const likeupdate = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes:blog.likes + 1,
      user: user.id
    }
    updateLikes(blog.id,likeupdate )
  }
 
  const handledelete = () =>{
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      deleteblog(blog.id);
    }
  }

  return (
  <div style={blogStyle}>
    <div style={hideWhenVisible}>
        {blog.title} {blog.author} <button onClick={() => setblogVisible(true)}>view</button>
    </div>
    <div style={showWhenVisible}>
      
        {blog.title} {blog.author} <button onClick={() => setblogVisible(false)}>hide</button> <br/>
        {blog.url} <br/>
        likes: {blog.likes} <button onClick={handlelikes}>likes</button> <br/>
        {blog.username} <br/>
        <button onClick={handledelete}>remove</button>
    </div>  
  </div>  
  )
}
export default Blog