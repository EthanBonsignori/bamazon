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
    message: `What would you like to do?`,
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
  const dialogueArray = [`"Hmmm.. How long have these been here?" You find some planks of wood that have fallen behind a shelf, covered in dust.`, `"Son!" Your father shouts. "Still can't sell that prized iron sword of yours. No one knows quality when they see it!"`, `You count every product in the shop. Surprisingly, you haven't sold much.`, `"Got a shipment of ore in, maybe you should get to forging some new blades?" Your father says before returning to doing nothing.`, `You can't think of anything you'd rather be doing...`, `A customer enters the shop as you check your wares. Your father perks up. "Welcome! Everything is five percent off! Just for you, my friend!"`, `You wipe the dust from several bars of metal that have been on the shelf for months... "Not selling these anytime soon."`]
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
  log(`\n\nYou meticulously count every item in the store, taking note of the products you are running low on.\n`)
  const query = 'SELECT * FROM products WHERE stock_quantity <= 5'
  connection.query(query, (err, res) => {
    if (err) throw err
    console.table(res)
    // Show options
    showOptions()
  })
}

// Exit the application
function exitApp () {
  log('\n"Please come again!"\n\nExiting Blacksmith...')
  connection.end()
}