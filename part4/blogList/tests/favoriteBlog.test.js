describe('favorite Blog', () => {
    const listHelper = require('../utils/list_helper')
    
    const withOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]

    const multipleBlogs = [
        {
        title: "Los chorizos",
        author: "Barcenas",
        url: "http://www.barci.com",
        likes: 1123,
        id: "65d73c4bbb3660ef20098832"
        },
        {
        title: "Los amigos",
        author: "pepe",
        url: "http://www.losamigos.com",
        likes: 123,
        id: "65d74a15aba0a211dbf63da0"
        },
        {
        title: "Las locas",
        author: "234",
        url: "http://www.locatis.com",
        likes: 22,
        id: "65d77738c2714c6f692726dd"
        },
        {
        title: "Vacas locas",
        author: "Grijander",
        url: "http://www.vacaslocas.com",
        likes: 2233,
        id: "65d86354f46ea19939fca53b"
        }
        ]

        const emptyList = []
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.favoriteBlog(withOneBlog)
      expect(result).toEqual({
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      })

    })

    test('when list has multiple blogs, equals to the blog with the most likes', () => {
        const result = listHelper.favoriteBlog(multipleBlogs)
        expect(result).toEqual({
            title: "Vacas locas",
            author: "Grijander",
            url: "http://www.vacaslocas.com",
            likes: 2233,
            id: "65d86354f46ea19939fca53b"
            })
  })

    test('when blogs list is empty, equals 0', () => {
        const result =  listHelper.favoriteBlog(emptyList)
        expect(result).toBe(0)
    })

})