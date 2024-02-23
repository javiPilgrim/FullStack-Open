const listHelper = require('../utils/list_helper')

const blogs = [
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

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})