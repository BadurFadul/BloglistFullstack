import { useState } from "react"

const BlogForm=({addblog})=>{
    const [title, settitle]= useState('')
    const [author, setauther]= useState('')
    const [url, seturl]= useState('')

    const handleblog = async(event) => {
        event.preventDefault()
         addblog({
          title:title,
          author:author,
          url:url,
        })    
        settitle('')
        setauther('')
        seturl('')        
      }
    
      return (
        <form onSubmit={handleblog}>
          <h2>Create new</h2>
          <div>
            title
              <input
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => settitle(target.value)}
            />
          </div>
          <div>
            author
              <input
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setauther(target.value)}
            />
          </div>
          <div>
            url
              <input
              type="text"
              value={url}
              name="url"
              onChange={({ target }) => seturl(target.value)}
            />
          </div>
          <button type="submit">Create</button>
        </form>      
      )
}

export default BlogForm