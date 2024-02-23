
const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.likes
    return blogs.legth === 0
    ? 0
    : blogs.reduce(reducer, 0)
  }

  const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
      return 0
    }
  
    // Usamos reduce para encontrar el blog con más "likes"
    const mostLikedBlog = blogs.reduce((maxLikesBlog, currentBlog) => {
      return currentBlog.likes > maxLikesBlog.likes ? currentBlog : maxLikesBlog;
    }, blogs[0]);
  
    return mostLikedBlog;
  };
  
  module.exports = {
    dummy, totalLikes, favoriteBlog
  }