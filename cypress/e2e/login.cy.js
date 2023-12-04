/// <reference types="cypress" />

import LoginPage from "../pages/loginPage"
import CommonPage from "../pages/commonPage"

const loginPage = new LoginPage()
const commonPage = new CommonPage()
const cypresConfig = Cypress.config()
const inventoryPageUrl = cypresConfig.baseUrl + '/inventory.html'

describe('User', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should be able to login with valid credentials', () => {
    loginPage.loginUser(cypresConfig.standard_username, cypresConfig.user_password)

    cy.url().should('eq', inventoryPageUrl)

    commonPage.openBurgerMenu()
    cy.get(loginPage.logoutBtn)
      .should('be.visible')
      .should('have.text', 'Logout')

  })

  it('should be able to logout', () => {
    loginPage.loginUser(cypresConfig.standard_username, cypresConfig.user_password)

    cy.url().should('eq', inventoryPageUrl)

    commonPage.openBurgerMenu()
    cy.get(loginPage.logoutBtn).click()
    cy.url().should('eq', cypresConfig.baseUrl + '/index.html')

  })

  it('should NOT be able to login with invalid password', () => {
    loginPage.loginUser(cypresConfig.standard_username, cypresConfig.invalid_user_password)
    loginPage.getErrorMessage().should('have.text', 'Epic sadface: Username and password do not match any user in this service')
  })

  it('should NOT be able to login with lockout credentials', () => {
    loginPage.loginUser(cypresConfig.locked_out_username, cypresConfig.user_password)
    loginPage.getErrorMessage().should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
  })

  it('should be able to login with performance glitch credentials', () => {
    loginPage.loginUser(cypresConfig.performance_glitch_username, cypresConfig.user_password)

    cy.url().should('eq', inventoryPageUrl)

    commonPage.openBurgerMenu()

    cy.get(loginPage.logoutBtn)
      .should('be.visible')
      .should('have.text', 'Logout')
  })

  it('should be able to log in on a small screen', () => {
    cy.viewport(800, 600)
    loginPage.loginUser(cypresConfig.standard_username, cypresConfig.user_password)

    cy.url().should('eq', inventoryPageUrl)

    commonPage.openBurgerMenu()
    cy.get(loginPage.logoutBtn)
      .should('be.visible')
      .should('have.text', 'Logout')
  })

})