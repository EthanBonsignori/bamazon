const mysql = require('mysql')
const inquirer = require('inquirer')

const log = console.log

// MySQL connection options
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'blacksmith'
})

// Entry point, starts the app
connection.connect(err => {
  if (err) throw err
  enterBlacksmith()
})

// Enter shop
function enterBlacksmith () {
  inquirer.prompt({
    name: 'enter',
    type: 'list',
    message: `You are the son of the local blacksmith ready for another day of work. You enter the shop to see your father preoccupied, as usual...`,
    choices: ['Get to work! [Open App]', `Go to the tavern for a beer. [Close App]`]
  }).then(res => {
    switch (res.enter) {
      case 'Get to work! [Open App]':
        return showOptions()
      case 'Go to the tavern for a beer. [Close App]':
        exitApp()
    }
  })
}

// Show list of options to chose from
function showOptions () {
  inquirer.prompt({
    name: 'choice',
    type: 'list',
    message: `\n\nWhat would you like to do?`,
    choices: ['View Products for Sale', 'View Low Inventory', 'Craft New Inventory', 'Craft New Product']
  }).then(res => {
    switch (res.choice) {
      case 'View Products for Sale':
        return showBlacksmith()
      case 'View Low Inventory':
        return showLowInventory()
      case 'Craft New Inventory':
        return craftNewInventory()
      case 'Craft New Product':
        return craftNewProduct()
    }
  })
}

// Show stock of items and options for what user can do next
function showBlacksmith () {
  // Display a random line from the array below
  const dialogueArray = [`"Hmmm.. How long have these been here?" You find some dust covered scraps of metal that have fallen behind a shelf.`, `"Son!" Your father shouts. "Still can't sell that prized iron sword of yours. No one knows quality when they see it!"`, `You count every product in the shop. Surprisingly, you haven't sold much.`, `"Got a shipment of ore in, maybe you should get to forging some new blades?" Your father says before returning to doing nothing.`, `You can't think of anything you'd rather be doing...`, `A customer enters the shop as you check your wares. Your father perks up. "Welcome! Everything is five percent off! Just for you, my friend!"`, `You wipe the dust from several bars of metal that have been on the shelf for months... "Not selling these anytime soon."`]
  const dialogue = dialogueArray[Math.floor(Math.random() * dialogueArray.length)]
  log(`\n\n${dialogue}\n`)
  // Show table of products
  const query = 'SELECT * FROM products'
  connection.query(query, (err, res) => {
    if (err) throw err
    console.table(res)
    // Show options
    showOptions()
  })
}

// View items that have less than 5 under stock_quantity
function showLowInventory () {
  log(`\n\nYou meticulously count every item in the store, taking note of any product with low stock.\n`)
  const query = 'SELECT * FROM products WHERE stock_quantity <= 5'
  connection.query(query, (err, res) => {
    if (err) throw err
    console.table(res)
    // Show options
    showOptions()
  })
}

function craftNewInventory () {
  log(`\n\n You put on your gloves and grab your hammer. Time to create.\n`)
  // Show table of products
  const query = 'SELECT * FROM products'
  connection.query(query, (err, res) => {
    if (err) throw err
    console.table(res)
    // Allow user to select which product they would like to add
    inquirer.prompt([
      {
        name: 'id',
        message: 'Enter the item_id of the item you would like to create more of:'
      },
      {
        name: 'quant',
        message: 'How many would you like to create?'
      }
    ]).then(input => {
      // Find the product they want to add in the database and store the users desired quantity to add
      const id = input.id
      const userQuant = input.quant
      const query = 'SELECT * FROM products WHERE item_id = ?'
      connection.query(query, [id], (err, res) => {
        if (err) throw err
        // Find the current quantity and name
        const stockQuant = parseInt(res[0].stock_quantity)
        const itemName = res[0].product_name
        // Stop them from adding more if the quantity is already 9999 (you can't fit that many things in this small shop, that would be immersion breaking!)
        if (stockQuant > 9999) {
          log(`\n\nYou have too many ${itemName}(s) already! Where are you going to put all of these?`)
          return goBack(`Maybe try to make something else.`)
        }
        // Add the newly crafted items to the database
        const newQuant = stockQuant + userQuant
        const updateQuery = 'UPDATE products SET stock_quantity = ? WHERE item_id = ?'
        connection.query(updateQuery, [newQuant, id], (err, res) => {
          if (err) throw err
          log(`You magically crafted ${userQuant} ${itemName}(s) instantly. (Let's not tell anyone about your secret). You now have ${newQuant} ${itemName}(s).`)
          goBack('\n\nTime to take a break?')
        })
      })
    })
  })
}

// Generic 'go back' list prompt, message altered by function argument
function goBack (message) {
  inquirer.prompt({
    type: 'list',
    name: 'back',
    message: message,
    choices: ['Go back [Show Options]', 'Leave Blacksmith [Exit App]']
  }).then(res => {
    switch (res.back) {
      case 'Go back [Show Options]':
        return showOptions()
      case 'Leave Blacksmith [Exit App]':
        exitApp()
    }
  })
}

// Exit the application
function exitApp () {
  log('\n"Please come again!"\n\nExiting Blacksmith...')
  connection.end()
}