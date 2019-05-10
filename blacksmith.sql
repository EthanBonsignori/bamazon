DROP DATABASE IF EXISTS blacksmith;
CREATE DATABASE blacksmith;

USE blacksmith;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NULL,
    product_category VARCHAR(50) NULL,
    price DECIMAL(10,2) default 0,
    stock_quantity INT(9) default 0,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, product_category, price, stock_quantity)
values ('Iron Ore', 'Raw Materials', '3', '250');

INSERT INTO products (product_name, product_category, price, stock_quantity)
values ('Copper Ore', 'Raw Materials', '2', '312');

INSERT INTO products (product_name, product_category, price, stock_quantity)
values ('Wood Log', 'Raw Materials', '2', '402');

INSERT INTO products (product_name, product_category, price, stock_quantity)
values ('Iron Ingot', 'Materials', '5', '32');

INSERT INTO products (product_name, product_category, price, stock_quantity)
values ('Copper Ingot', 'Materials', '4', '45');

INSERT INTO products (product_name, product_category, price, stock_quantity)
values ('Timber', 'Materials', '4', '34');

INSERT INTO products (product_name, product_category, price, stock_quantity)
values ('Iron Blade', 'Weapon Parts', '15', '2');

INSERT INTO products (product_name, product_category, price, stock_quantity)
values ('Copper Blade', 'Weapon Parts', '12', '3');

INSERT INTO products (product_name, product_category, price, stock_quantity)
values ('Sword Hilt', 'Weapon Parts', '10', '8');

INSERT INTO products (product_name, product_category, price, stock_quantity)
values ('Iron Sword', 'Weapons', '55', '4');

INSERT INTO products (product_name, product_category, price, stock_quantity)
values ('Copper Sword', 'Weapons', '40', '8');

INSERT INTO products (product_name, product_category, price, stock_quantity)
values ('Hammer', 'Tools', '15', '1');
