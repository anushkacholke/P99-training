create table new_staff (ID int primary key, name varchar(40), joining_date date, salary float);

select * from new_staff;

insert into new_staff values(1, 'Siya', '2026-04-01', 15000);

alter table new_staff add column age int;

update new_staff set age=20 where id=1;

alter table new_staff 
add constraint check_age check (age>18);


SELECT 
    column_name, 
    data_type, 
    is_nullable, 
    column_default
FROM 
    information_schema.columns
WHERE 
    table_name = 'new_staff';

insert into new_staff (ID, name, joining_date, salary, age) values
	(2,'Anushka','2026-04-13',30000,21),
	(3,'Diksha','2026-05-13',40000,22)

-------------------------------------------------------------------------
-- Joins psql
create table customer (
	customer_id SERIAL primary key,
	name varchar(30),
	city varchar(30));

create table orders(
	order_id SERIAL primary key, 
	customer_id int, 
	order_date date, 
	amount float,
	foreign key(customer_id) references customer(customer_id));

create table payments (
	payment_id SERIAL primary key,
	order_id int,
	payment_mode varchar(30),
	payment_date date,
	foreign key (order_id) references orders(order_id)
);

--  data
insert into customer values
(1,'Anushka','Pune'),
(2,'Siya','Mumbai'),
(3,'Diksha','Delhi'),
(4,'Riya','Pune');


insert into orders values
(101,1,'2026-04-01',5000),
(102,2,'2026-04-02',3000),
(103,1,'2026-04-05',7000),
(104,3,'2026-04-07',2000);

insert into payments values
(1,101,'UPI','2026-04-01'),
(2,102,'Card','2026-04-02'),
(3,103,'Cash','2026-04-06');


-- 1. inner join(only maching)
select 
    c.customer_id,
    c.name,
    o.order_id,
    o.amount,
    p.payment_mode
from customer c
inner join orders o 
    on c.customer_id = o.customer_id
inner join payments p 
    on o.order_id = p.order_id;

-- left join(show all customer)
select 
    c.customer_id,
    c.name,
    o.order_id,
    o.amount,
    p.payment_mode
from customer c
left join orders o 
    on c.customer_id = o.customer_id
left join payments p 
    on o.order_id = p.order_id;


-- right join(show all payment)
select 
    c.customer_id,
    c.name,
    o.order_id,
    p.payment_mode
from customer c
right join orders o 
    on c.customer_id = o.customer_id
right join payments p 
    on o.order_id = p.order_id;

-- full join
select 
    c.customer_id,
    c.name,
    o.order_id,
    p.payment_mode
from customer c
full join orders o 
    on c.customer_id = o.customer_id
full join payments p 
    on o.order_id = p.order_id;


