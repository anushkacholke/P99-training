

create table customers (
    customer_id SERIAL primary key,
    name varchar(30) NOT NULL,
    city varchar(30)
);

create table order1 (
    order_id SERIAL primary key,
    customer_id int NOT NULL,
    order_date date,
    amount float,
    foreign key (customer_id) references customers(customer_id)
);


select * from customers;

select * from order1;

---insert customer procedure
create or replace procedure insert_customer(
	in c_name varchar,
	in c_city varchar
)
language plpgsql
as $$
begin
	insert into customers(name, city)
	values(c_name, c_city);

	raise notice 'customer inserted successfully';
end;
$$;

call insert_customer('Anu','Pune');

\df insert_customer
---delete with validation
create or replace procedure delete_customer(
	in 	cid int
)
language plpgsql
as $$
begin
	--check if cust exists
	if not exists(
		select 1 from customers where customer_id=cid
	)then
		raise notice 'Customer does not exists';

	---check if cust has orders
	elsif exists(
		select 1 from order1 where customer_id=cid
	)then
		raise notice 'cannot delete because caustomer has existing orders';
	else
		delete from customers where customer_id=cid;
		raise notice 'customer deleted successfully';
	end if;
end;
$$;

call delete_customer(3);


















