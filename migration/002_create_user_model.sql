USE goqii_test;
CREATE TABLE User(
	id int AUTO_INCREMENT PRIMARY KEY,
	name varchar(255),
	email varbinary(255) UNIQUE,
	password varchar(255),
	dob DATE
);
