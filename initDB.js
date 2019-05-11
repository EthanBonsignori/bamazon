// This file is run once to initialize the database from node without the need of a SQL processor.
// There may be a cleaner way to do this but I am unsure of how.
// You can easily initialize or reset the database by running this file once.
// ===========================================================================================

const mysql = require('mysql')

// Full array of SQL commands to create each individual product
const tableDataArr = [
  `INSERT INTO products (product_name, product_category, price, stock_quantity) values ('Iron Ore', 'Raw Materials', '3', '250')`,
  `INSERT INTO products (product_name, product_category, price, stock_quantity) values ('Copper Ore', 'Raw Materials', '2', '312')`,
  `INSERT INTO products (product_name, product_category, price, stock_quantity) values ('Wood Log', 'Raw Materials', '2', '402')`,
  `INSERT INTO products (product_name, product_category, price, stock_quantity) values ('Iron Ingot', 'Materials', '5', '32')`,
  `INSERT INTO products (product_name, product_category, price, stock_quantity) values ('Copper Ingot', 'Materials', '4', '45')`,
  `INSERT INTO products (product_name, product_category, price, stock_quantity) values ('Timber', 'Materials', '4', '34')`,
  `INSERT INTO products (product_name, product_category, price, stock_quantity) values ('Iron Blade', 'Weapon Parts', '15', '2')`,
  `INSERT INTO products (product_name, product_category, price, stock_quantity) values ('Copper Blade', 'Weapon Parts', '12', '3')`,
  `INSERT INTO products (product_name, product_category, price, stock_quantity) values ('Sword Hilt', 'Weapon Parts', '10', '8')`,
  `INSERT INTO products (product_name, product_category, price, stock_quantity) values ('Iron Sword', 'Weapons', '55', '4')`,
  `INSERT INTO products (product_name, product_category, price, stock_quantity) values ('Copper Sword', 'Weapons', '40', '8')`,
  `INSERT INTO products (product_name, product_category, price, stock_quantity) values ('Hammer', 'Tools', '15', '1')`
]

// MySQL connection options ** REPLACE THESE WITH YOUR OPTIONS **
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root'
})

// Entry point, starts the app
connection.connect(err => {
  if (err) throw err
  initDB()
})

function initDB () {
  // Drop blacksmith database if it exists
  connection.query('DROP DATABASE IF EXISTS blacksmith', (err, res) => {
    if (err) throw err
    console.log('Dropping database...')
    // Create database
    connection.query('CREATE DATABASE blacksmith', (err, res) => {
      if (err) throw err
      console.log('Database created succesfully...')
    })
    // Use the blacksmith database
    connection.query(`USE blacksmith`, (err, res) => {
      if (err) throw err
      // Create the products table
      connection.query(`CREATE TABLE products (item_id INT NOT NULL AUTO_INCREMENT, product_name VARCHAR(50) NULL, product_category VARCHAR(50) NULL, price DECIMAL(10,2) default 0, stock_quantity INT(9) default 0, PRIMARY KEY (item_id))`, (err, res) => {
        if (err) throw err
        console.log('Table created...')
        // Add data to table from array above
        console.log('Adding products to table...')
        for (let i = 0; i < tableDataArr.length; i++) {
          const query = tableDataArr[i]
          connection.query(query)
        }
        // Exit app
        console.log(`Added ${tableDataArr.length} items to the product table...`)
        console.log('Database initialized! Exiting...')
        connection.end()
      })
    })
  })
}
