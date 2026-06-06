

create table customer (
    customer_id SERIAL primary key,
    name varchar(30),
    city varchar(30)
);

create table customer_log (
    log_id SERIAL primary key,
    customer_id int,
    action varchar(20),
    log_time timestamp default current_timestamp
);

select * from Customer;

select * from customer_log;

---Log insert
---Function
create or replace function log_customer_insert()
returns trigger
language plpgsql
as $$
begin
    insert into customer_log(customer_id, action)
    values (new.customer_id, 'INSERT');
    return new;
end;
$$;
---Trigger
create trigger trg_log_insert
after insert
on customer
for each row
execute function log_customer_insert();

insert into customer(name, city) values ('Anushka','Shirdi');

---Restrict DELETE
---Function
create or replace function restrict_delete()
returns trigger
language plpgsql
as $$
begin
    raise exception 'Delete not allowed on customer table';
end;
$$;
---Trigger
create trigger trg_restrict_delete
before delete
on customer
for each row
execute function restrict_delete();

delete from customer where customer_id=5;

--- UPDATE
---Function
create or replace function log_customer_update()
returns trigger
language plpgsql
as $$
begin
    insert into customer_log(customer_id, action)
    values (new.customer_id, 'UPDATE');
    return new;
end;
$$;
---Trigger
create trigger trg_log_update
after update
on customer
for each row
execute function log_customer_update();

update customer set city='Delhi' where customer_id=3;
