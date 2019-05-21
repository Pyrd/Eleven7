const CREATE_DB = `
USE Eleven7DB

ALTER DATABASE [Eleven7DB] SET QUERY_STORE = ON
GO


IF OBJECT_ID('dbo.payements', 'u') IS NOT NULL
DROP TABLE dbo.payements
GO
IF OBJECT_ID('dbo.sales_item', 'u') IS NOT NULL
DROP TABLE dbo.sales_item
GO
IF OBJECT_ID('dbo.sales', 'u') IS NOT NULL
DROP TABLE dbo.sales
GO
IF OBJECT_ID('dbo.inventory', 'u') IS NOT NULL
DROP TABLE dbo.inventory
GO
IF OBJECT_ID('dbo.product_catalog', 'u') IS NOT NULL
DROP TABLE dbo.product_catalog
GO
IF OBJECT_ID('dbo.product_category', 'u') IS NOT NULL
DROP TABLE dbo.product_category
GO
IF OBJECT_ID('dbo.users', 'u') IS NOT NULL
DROP TABLE dbo.users 
GO
IF OBJECT_ID('dbo.employees', 'u') IS NOT NULL
DROP TABLE dbo.employees
GO
IF OBJECT_ID('dbo.stores', 'u') IS NOT NULL
DROP TABLE dbo.stores
GO
IF OBJECT_ID('dbo.addresses', 'u') IS NOT NULL
DROP TABLE dbo.addresses
GO
IF OBJECT_ID('dbo.photos', 'u') IS NOT NULL
DROP TABLE dbo.photos
GO


create table photos
	(photo_id	int identity(1,1) not null,
	 blob_name	varchar(40) not null,
	 blob_data	varBinary(MAX),
	 primary key (photo_id)
	);


create table addresses
	(address_id		int identity(1,1) not null, 
	 street_num		int	check(street_num >= 0) not null,
	 address_1		varchar(30) not null,
	 address_2		varchar(30),
	 zip_code		varchar(10) not null,
	 city_name		varchar(20) not null,
	 country		varchar(20) not null,
	 primary key (address_id),
	);

create table stores
	(store_id		int identity(1,1) not null,
	 address_id		int,
	 opening_date	varchar(20),
	 primary key (store_id),
	 foreign key (address_id) references addresses(address_id)
		on delete set null,
	);

create table employees
	(employee_id	int identity(1000,1) not null,
	 store_id		int,
	 first_name		varchar(20) not null,
	 last_name		varchar(20) not null,
	 birthdate		varchar(10),
	 email_address  varchar(45) not null,
	 phone_number	varchar(20) not null,
	 address_id		int,
	 salary			numeric(8,2) check (salary > 0),
	 photo_id		int,
	 job            varchar(20) not null,
	 job_level		int		not null,
	 dept_id		int,
	 date_start		varchar(20),
	 date_end		varchar(20),
	 primary key (employee_id),
	 foreign key (store_id) references stores(store_id)
		on delete set null,
	 foreign key (address_id) references addresses(address_id)
		on delete set null,
	 foreign key (photo_id) references photos(photo_id)
		on delete set null,
	CONSTRAINT UC_employee UNIQUE(employee_id, email_address)
	);


create table users 
	(
		employee_id 	int 	not null UNIQUE,
		u_password    	varchar(50) not null,
		foreign key (employee_id) references employees(employee_id)
			on delete cascade,

	);

create table product_category
	(category_id		int identity(1000,1) not null, 
	 name			varchar(20) not null,
	 description	varchar(140),
	 primary key (category_id),
	);

create table product_catalog
	(product_id		int identity(1,1) not null, 
	 name			varchar(20) not null, 
	 category_id	int,
	 description	varchar(140),
	 price_tag		numeric(5,2) check (price_tag > 0) not null,
	 photo_id		int
	 primary key (product_id),
	 foreign key (category_id) references product_category(category_id)
		on delete set null,
	 foreign key (photo_id) references photos(photo_id)
		on delete set null
	);

create table inventory
	(store_id		int not null,
	 product_id		int not null,
	 quantity		int check(quantity > 0) not null,
	 foreign key (store_id) references stores(store_id)
		on delete cascade,
	 foreign key (product_id) references product_catalog(product_id)
		on delete cascade,
	);


create table sales
	(sale_id		int identity(1,1) not null, 
	 store_id		int not null, 
	 sale_date		varchar(20),
	 total_price	numeric(8,2) check (total_price >= 0) not null,
	 total_item		int	check(total_item > 0) not null,
	 primary key (sale_id),
	 foreign key (store_id) references stores(store_id)
		on delete cascade,
	);

create table sales_item
	(sale_id		int not null, 
	 item_id		int not null, 
	 quantity		int,
	 foreign key (sale_id) references sales(sale_id)
		on delete cascade,
	 foreign key (item_id) references product_catalog(product_id)
		on delete cascade,
	);

create table payements
	(payement_id	int identity(1,1) not null, 
	 sale_id		int not null, 
	 payement_type	varchar(10),
		check (payement_type in ('Cash', 'Card')), 
	 amount	numeric(8,2) check (amount >= 0) not null,
	 primary key (payement_id),
	 foreign key (sale_id) references sales(sale_id)
		on delete cascade,
	);

`;


const INSERT_VAL = `
delete from photos;
delete from addresses;
delete from stores;
delete from employees;
delete from users;
delete from product_category;
delete from inventory;
delete from sales_item;
delete from payements;

insert into addresses values(2, 'Balzac Street', '', '12234', 'Seoul', 'South Korea');
insert into addresses values(7, 'Mozart Street', '', '12234', 'Seoul', 'South Korea');
insert into addresses values(23, 'Bethoveen Street', '', '12234', 'Seoul', 'South Korea');
insert into addresses values(11, 'Monay Street', '', '12234', 'Seoul', 'South Korea');
insert into addresses values(19, 'Albert Camus Street', '', '12234', 'Seoul', 'South Korea');
insert into addresses values(4, 'Picasso Street', '', '12234', 'Seoul', 'South Korea');
insert into stores (address_id, opening_date) values (1, NULL);
insert into stores (address_id, opening_date) values (2, NULL);

insert into employees (store_id, first_name, last_name, birthdate, email_address, phone_number, address_id, salary) values(1, 'Mathew', 'Kailly', '', 'mathew.kailly@test.com', '012345678', 3, 4000);

insert into users values(1000, 'admin')

insert into employees (store_id, first_name, last_name, birthdate, email_address, phone_number, address_id, salary) values(1, 'John', 'Smith', '', 'John.Smith@test.com', '012345678', 4, 3100);
insert into employees (store_id, first_name, last_name, birthdate, email_address, phone_number, address_id, salary) values(1, 'Jean', 'Smith', '', 'Jean.Smith@test.com', '012345678', 5, 2200);
insert into employees (store_id, first_name, last_name, birthdate, email_address, phone_number, address_id, salary) values(1, 'Paul', 'Smith', '', 'Paul.Smith@test.com', '012345678', 6, 1800);
insert into employees (store_id, first_name, last_name, birthdate, email_address, phone_number, address_id, salary) values(2, 'Adrien', 'Smith', '', 'Adrien.Smith@test.com', '012345678', 3, 5500);
insert into employees (store_id, first_name, last_name, birthdate, email_address, phone_number, address_id, salary) values(2, 'Quentin', 'Smith', '', 'Quentin.Smith@test.com', '012345678', 4, 4000);
insert into employees (store_id, first_name, last_name, birthdate, email_address, phone_number, address_id, salary) values(2, 'Robert', 'Smith', '', 'Robert.Smith@test.com', '012345678', 5, 2000);
insert into employees (store_id, first_name, last_name, birthdate, email_address, phone_number, address_id, salary) values(2, 'Faruk', 'Smith', '', 'Faruk.Smith@test.com', '012345678', 6, 1300);
insert into employees (store_id, first_name, last_name, birthdate, email_address, phone_number, address_id, salary) values(2, 'Amir', 'Smith', '', 'Amir.Smith@test.com', '012345678', 3, 1020);
`
//HIDE KEY IN ENV VAR
module.exports = {
	CREATE_DB : CREATE_DB,
	INSERT_VAL : INSERT_VAL
};
