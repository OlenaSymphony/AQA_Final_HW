const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    "baseUrl": "https://www.saucedemo.com/v1",
    "standard_username": "standard_user",
    "user_password": "secret_sauce",
    "invalid_user_password": "password",
    "locked_out_username": "locked_out_user",
    "performance_glitch_username": "performance_glitch_user",
    "inventory_item_name": "Sauce Labs Backpack",
    "inventory_item_price": "29.99",
    "tax_price": "2.40"
  },
});

