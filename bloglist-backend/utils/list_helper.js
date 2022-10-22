const dummy = (blogs) => {
    return 1;
  }
  const totaLikes = blog =>{
    const reducer = (sum, item)=>{
      return sum + item.likes
    }
    return blog.reduce(reducer, 0)
  }

  const favoriteBlog = blog =>{
    const mostlikes = blog.reduce((pre,cur)=>{
      return pre.likes>cur.likes? pre:cur 
    });
    return{
      title: mostlikes.title,
      author: mostlikes.author,
      likes: mostlikes.likes
    }
  }
  
  module.exports = {
    dummy,
    totaLikes,
    favoriteBlog
  }