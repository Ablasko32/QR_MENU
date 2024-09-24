CREATE TABLE items(


  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  quantity VARCHAR(20),
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(20) NOT NULL
);


CREATE TABLE users(

  id SERIAL PRIMARY KEY,
  username VARCHAR(50),
  password VARCHAR(100)
);

INSERT into USERS
(username,password)
VALUES
('coffe-bar','banana');

INSERT INTO items
(name,quantity,price,category)
VALUES
('Beer1','0,33',4.50, 'beer'),
('Beer2','0,33',4.50, 'beer'),
('Beer3','0,33',4.50, 'beer'),
('Cocktail1','0,33',4.50, 'cocktails'),
('Cocktail2','0,33',4.50, 'cocktails'),
('Cocktail3','0,33',4.50, 'cocktails'),
('Coffe1','0,33',4.50, 'coffe'),
('Coffe2','0,33',4.50, 'coffe'),
('Coffe3','0,33',4.50, 'coffe');