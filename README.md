# Blacksmith (node app)
## About
This app was created to help me better understand interacting with MySQL through node. It features three different <i>levels</i> of interactivity with the MySQL database from simply viewing the data to adding, deleting, and editing the data. The theme is a fantasy blacksmith shop! Below are examples of each <i>level</i> and instructions on how to use this app yourself.

---
## Level 1 (Customer View)
![blacksmithCustomer](https://user-images.githubusercontent.com/47482104/57575290-a1d90380-7415-11e9-9158-b812ffb249b9.gif)
* View table of products
* Buy products by id and quantity
* Gossip with the blacksmith!

---

## Level 2 (Manager View)
![blacksmithManager](https://user-images.githubusercontent.com/47482104/57575288-a0a7d680-7415-11e9-96f5-5fe04d1b112b.gif)
* Become the son of the great Blacksmith
* View products for sale
* Magically craft new existing products with your secret powers
* Create entirely new products using an existing category!
---
## Level 3 (Coming Soon)
---

# How to Use
1. Set up a local MySQL server. A guide can be found [here](https://dev.mysql.com/doc/workbench/en/wb-getting-started-tutorial-create-connection.html).
2. Open the `initDB.js` file and set your username and password. (default: `root`)
3. Download and install `node.js` from [nodejs.org](https://nodejs.org/en/)
4. Clone or download this repository onto you machine.
5. Using your terminal navigate to the folder you cloned or downloaded.
6. Enter `node initDB.js` (this will create a database and fill it with some data.)
![initDB](https://user-images.githubusercontent.com/47482104/57575287-9ede1300-7415-11e9-98ec-40f34beda7d5.gif)
7. Use either `node blacksmithCustomer` or `node blacksmithManager` to run the app.