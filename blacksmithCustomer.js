const mysql = require('mysql')
const inquirer = require('inquirer')

const log = console.log

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'root',
  database: 'blacksmith'
})

connection.connect(err => {
  if (err) throw err
  enterBlacksmith()
})

function enterBlacksmith () {
  inquirer.prompt({
    name: 'enter',
    type: 'list',
    message: `You enter the local blacksmith shop. The burly man behind the counter raises an arm towards the shelves. "Welcome! Care to view my wares?"`,
    choices: ['"Yes" [Open Shop]', `Run away screaming [Exit App]`]
  }).then(choice => {
    switch (choice.enter) {
      case '"Yes" [Open Shop]':
        return showBlacksmith()
      case 'Run away screaming [Exit App]':
        exitApp()
    }
  })
}

function showBlacksmith () {
  // Display random line of dialogue from the array below
  const dialogueArray = ['"May I suggest a shiny new iron sword? My son just forged that sharp one on the end."', '"Have I seen you before?..."', '"The innkeeper may have a quest for you. I think a new sword would help!"', `"Hey, if these are too expensive for you, I've got some 'used' swords in the back..."`, '"I used to be an adventurer like you, then I took an arrow to the knee."', '"Some people call this junk. Me? I call it treasure."', '"Looking to protect yourself? Or deal some damage?"', `"Looking to buy? I've got quality arms."`, '"Everyone needs protection and I offer protection at little cost!"', '"Do you have a permit to carry a sword?"', '"Even the strong need protection! I suggest one of my fine swords."', `"I've got plenty of materials if you are looking to forge your own blade."`, '"Just got a shipment of ore from the mines in. Quality stuff!"']
  const dialogue = dialogueArray[Math.floor(Math.random() * dialogueArray.length)]
  log(`\n\n${dialogue}\n\n`)
  // Show table of products
  const query = 'SELECT * FROM products'
  connection.query(query, (err, res) => {
    if (err) throw err
    console.table(res)
    // Show options
    inquirer.prompt({
      name: 'buy',
      message: 'What would you like to do?',
      type: 'list',
      choices: ['Buy', 'Leave Blacksmith [Exit App]']
    }).then(choice => {
      switch (choice.buy) {
        case 'Buy':
          return buyItem()
        case 'Leave Blacksmith [Exit App]':
          exitApp()
      }
    })
  })
}

// Allow user to enter item id and quantity of that item they would like to purchase
function buyItem () {
  inquirer.prompt([
    {
      name: 'id',
      message: 'Enter the item_id of the item you would like to buy:'
    },
    {
      name: 'quant',
      message: 'Enter the quanity of the item you would like to buy:'
    }
  ]).then(input => {
    // Find the item in the table based on id
    const id = input.id
    const userQuant = input.quant
    const query = 'SELECT * FROM products WHERE item_id = ?'
    connection.query(query, [id], (err, res) => {
      if (err) throw err
      const stockQuant = res[0].stock_quantity
      const itemName = res[0].product_name
      const itemPrice = res[0].price
      const totalPrice = itemPrice * userQuant
      // Check if shop has enough of item in stock
      if (userQuant > stockQuant) {
        log(`"Sorry, I've only got ${stockQuant} of those in stock."`)
        return goBack(`"When I get more of those you'll be the first to know!"`)
      }
      // Update the stock_quantity of item purchased to reflect user's purchase
      const newQuant = stockQuant - userQuant
      const updateQuery = 'UPDATE products SET stock_quantity = ? WHERE item_id = ?'
      connection.query(updateQuery, [newQuant, id], (err, res) => {
        if (err) throw err
        log(`You bought ${userQuant} ${itemName}(s) for ${totalPrice} gold.`)
        goBack('"Thanks for your purchase!"')
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
    choices: ['Go back', 'Leave Blacksmith [Exit App]']
  }).then(choice => {
    switch (choice.back) {
      case 'Go back':
        return showBlacksmith()
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
