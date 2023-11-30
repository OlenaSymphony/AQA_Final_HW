/// <reference types="cypress" />

import LoginPage from "../pages/loginPage"
import InventoryPage from "../pages/inventoryPage"

const loginPage = new LoginPage()
const inventoryPage = new InventoryPage()
const cypresConfig = Cypress.config()

describe('User', () => {
  beforeEach(() => {
    cy.visit('/')
    loginPage.loginUser(cypresConfig.standard_username, cypresConfig.user_password)
    cy.url().should('eq', cypresConfig.baseUrl + '/inventory.html')
  })

  it('is able to add a product to cart', () => {
    let itemsInCart = 0

    itemsInCart = inventoryPage.addItemToShoppingCart(cypresConfig.inventory_item_name, itemsInCart)
    inventoryPage.checkShoppingCartCounter(itemsInCart)
    inventoryPage.checkAddedItemInCart()

  })
  it('is able to buy a product from cart', () => {
    let itemsInCart = 0

    itemsInCart = inventoryPage.addItemToShoppingCart(cypresConfig.inventory_item_name, itemsInCart)
    inventoryPage.checkAddedItemInCart()
    inventoryPage.orderItemFromCart()
  })
})

