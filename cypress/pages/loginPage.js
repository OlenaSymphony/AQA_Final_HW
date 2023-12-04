export default class LoginPage {
    constructor() {
        this.logoutBtn = '#logout_sidebar_link'
     }

    userName() {
        return cy.get('#user-name')
    }
    password() {
        return cy.get('[data-test="password"]')
    }
    loginButton() {
        return cy.get('#login-button')
    }

    getErrorMessage() {
        return cy.get('[data-test="error"]')
    }
    loginUser(username, password) {
        this.userName().type(username).should('have.value', username)
        this.password().type(password).should('have.value', password)
        this.loginButton().click()
    }
}