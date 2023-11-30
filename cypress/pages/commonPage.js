export default class LoginPage {
    constructor() { }

    openBurgerMenu() {
        cy.get('.bm-burger-button button').click()
    }
}