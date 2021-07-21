/// <reference types="cypress" />

it('VisitSite', () => {

    cy.visit('http://localhost:3000/login')

    cy.get('input[name="userName"]').type('alexofeles')
    cy.get('input[name="password"]').type('kaminari2812')
    cy.get('#loginBtn').click()
    


})
  