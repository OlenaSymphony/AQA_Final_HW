export default class LoginPage {
    constructor() {
        this.logoutBtn = '#logout_sidebar_link'
     }

    openBurgerMenu() {
        cy.get('.bm-burger-button button').click()
    }
    logout(){
        this.openBurgerMenu()
        cy.get(this.logoutBtn).click()
    }
}