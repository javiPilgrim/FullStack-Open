describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Javier Gomez',
      username: 'Javier',
      password: 'Javier'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('Please, Login...')
    cy.contains('Javi Macias Proyect')
  })

  describe('Login',function() {
  it('succeeds with correct credentials', function () {
    cy.get('input:first').type('Javier')
    cy.get('input:last').type('Javier')
    cy.contains('login').click()
    cy.contains('logged-in')
  }) 

  it('fails with wrong credentials', function() {
    cy.get('input:first').type('Pedro')
    cy.get('input:last').type('Martos')
    cy.contains('login').click()
    cy.contains('Wrong credentials')
  })
})

describe('When logged in', function() {
  beforeEach(function() {
    cy.get('input:first').type('Javier')
    cy.get('input:last').type('Javier')
    cy.contains('login').click()
    cy.contains('logged-in')
  })

  it('A blog can be created', function() {
    cy.contains('new blog').click()
    cy.get('#title').type('La edad de oro')
    cy.get('#author').type('Juan Gris')
    cy.get('#url').type('www.libros.com')
    cy.get('#createNewBlog').click()
    cy.contains('has been added to the list')
    
  })
})
})
