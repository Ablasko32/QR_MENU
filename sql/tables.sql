CREATE TABLE items(


  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  quantity VARCHAR(20),
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(20) NOT NULL,
  user_id INTEGER REFERENCES(users.id)
);


CREATE TABLE users(

  id SERIAL PRIMARY KEY,
  username VARCHAR(50),
  password VARCHAR(100)
);


CREATE table categories(
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
 user_id INTEGER REFERENCES users(id)
);

INSERT into USERS
(username,password)
VALUES
('coffe-bar','banana');

INSERT INTO items
(name,quantity,price,category, user_id)
VALUES
('Beer1','0,33',4.50, 'beer',2),
('Beer2','0,33',4.50, 'beer',2),
('Beer3','0,33',4.50, 'beer',2),
('Cocktail1','0,33',4.50, 'cocktails',2),
('Cocktail2','0,33',4.50, 'cocktails',2),
('Cocktail3','0,33',4.50, 'cocktails',2),
('Coffe1','0,33',4.50, 'coffe',2),
('Coffe2','0,33',4.50, 'coffe',2),
('Coffe3','0,33',4.50, 'coffe',2);