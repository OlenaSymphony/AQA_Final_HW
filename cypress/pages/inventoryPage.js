const cypressConfig = Cypress.config()

export default class InventoryPage {
    constructor() { }

    addItemToShoppingCart(inventoryItemName, itemsInCart) {
        cy.get('div[class=inventory_list] >div:has(a>div:contains(' + inventoryItemName + ')) button').click()
        cy.get('div[class=inventory_list] >div:has(a>div:contains(' + inventoryItemName + ')) button').should('have.text', 'REMOVE')
        return itemsInCart = itemsInCart + 1
    }
    checkShoppingCartCounter(expectedValue) {
        cy.get('.fa-layers-counter').should('have.text', expectedValue)
    }

    checkAddedItemInCart() {
        cy.get('.fa-shopping-cart').click()

        cy.get('.inventory_item_name')
            .should('be.visible')
            .should('have.text', cypressConfig.inventory_item_name)

        cy.get('.inventory_item_price')
            .should('be.visible')
            .should('have.text', cypressConfig.inventory_item_price)

        cy.get('.checkout_button')
            .should('be.visible')
            .should('not.be.disabled')
    }
    
    typeFirstName(){
        let firstName = 'Olena'
        cy.get('#first-name')
            .type(firstName)
            .should('have.value', firstName)
    }
    
    typeLasttName(){
        let lastname = 'Gofman'
        cy.get('#last-name')
            .type(lastname)
            .should('have.value', lastname)
    }

    typePostalCode(){
        let postalCode = '90210'
        cy.get('#postal-code')
            .type(postalCode)
            .should('have.value', postalCode)
    }

    orderItemFromCart() {
        cy.get('.checkout_button').click()

        this.typeFirstName()
        this.typeLasttName()
        this.typePostalCode()

        cy.get('.btn_primary').click()

        cy.get('.summary_subtotal_label')
            .should('have.text', `Item total: $${cypressConfig.inventory_item_price}`)

        cy.get('.summary_tax_label')
            .should('have.text', `Tax: $${cypressConfig.tax_price}`)

        let total_sum = (parseFloat(cypressConfig.inventory_item_price) + parseFloat(cypressConfig.tax_price)).toFixed(2)
        cy.get('.summary_total_label')
            .should('have.text', `Total: $${total_sum}`)

        cy.get('.btn_action').click()

        cy.get('.complete-header')
            .should('have.text', 'THANK YOU FOR YOUR ORDER')
    }
}