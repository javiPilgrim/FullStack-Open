
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
  
    const mostLikedBlog = blogs.reduce((maxLikesBlog, currentBlog) => {
      return currentBlog.likes > maxLikesBlog.likes ? currentBlog : maxLikesBlog;
    }, blogs[0])
  
    return mostLikedBlog
  }

  const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
      return 0;
  }

  const authorCounter = {};
  let mostRepeatedAuthor = blogs[0].author;
  let maxBlogs = 1

  for (const blog of blogs) {
      const author = blog.author;
      authorCounter[author] = (authorCounter[author] || 0) + 1

      if (authorCounter[author] > maxBlogs) {
          mostRepeatedAuthor = author;
          maxBlogs = authorCounter[author];
      }
  }

  return { author: mostRepeatedAuthor, publishedBlogs: maxBlogs };
}

const mostLikes =(blogs) => {
  if (blogs.length === 0) {
    return 0
}

const counterLikes = {}
let authorMostLikes = blogs[0].author
let maxLikes = blogs[0].likes

for (const blog of blogs) {
    const author = blog.author
    const likes = blog.likes

    counterLikes[author] = (counterLikes[author] || 0) + likes;

    if (counterLikes[author] > maxLikes) {
        authorMostLikes = author;
        maxLikes = counterLikes[author];
    }
}

return { author: authorMostLikes, likes: maxLikes };
}


  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
  }