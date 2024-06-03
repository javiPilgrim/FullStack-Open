import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'

describe('<Blog />', () => {
  let container
  const addLike = jest.fn()
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: {
      name: 'Test User',
    },
  }

  beforeEach(() => {
    container = render(
      <Blog blog={blog} addLike={addLike} delBlog={() => {}} user={blog.user} />
    ).container
  })

  test('it shows the title and the author, but not the URL or the likes by default', () => {
    const div = container.querySelector('.blogBasicInfo')
    expect(div).toHaveTextContent('Test Author')
    expect(div).toHaveTextContent('Test Author')

    // Verificar que el campo "url" no se visualiza en el render inicial
    const urlField = container.querySelector('.blogDetailedInfo')
    expect(urlField).toBeNull()
  })

  test('Verify that the Blog’s URL and likes are displayed when the button is clicked', async () => {
    const mockHandler = jest.fn()

    const user = userEvent.setup()
    const button = screen.getByText('Mostrar')
    await user.click(button)

    const div = container.querySelector('.blogDetailedInfo')
    expect(div).toHaveTextContent('http://testurl.com')
    expect(div).toHaveTextContent(5)
  })

  test(' If the like button is clicked twice, the event handler is called twice ', async () => {
    const user = userEvent.setup()

    const buttonMostrar = screen.getByText('Mostrar')
    await user.click(buttonMostrar)
    const buttonLike = screen.getByText('Like')
    await user.click(buttonLike)
    await user.click(buttonLike)

    expect(addLike.mock.calls).toHaveLength(2)
  })
})
