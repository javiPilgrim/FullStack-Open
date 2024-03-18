const newLike = ({ newLike }) => {
    const [newBlog, setNewBlog] = useState('')
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')
    const [like, setLike] = useState('')
  
    const addBLike = (event) =>{
      event.preventDefault()
      createNewLike({
        title: title,
        author: author,
        url: url

      })
      setNewBlog('')
      setAuthor('')
      setTitle('')
      setUrl('')
      window.location.reload()
    }
}
  
    export default newLike