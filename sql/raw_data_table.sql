create table raw_data(
	id serial,
	entry_on timestamp default current_timestamp,
	sensor_id int,
	value text,
	sensor_timestamp timestamp
);

create table sensors(
	sensor_id serial,
	type text,
	description text,
	uom text
);

insert into sensors (type, uom, description)
values ('temperature', 'C', 'boilertemp');

insert into sensors (type, uom, description)
values ('perssure', 'kpa', 'boilerpressure');

insert into sensors (type, uom, description)
values ('temperature', 'C', 'heatertemp');

insert into sensors (type, uom, description)
values ('testing', 'TEST', 'dummy');

select * from sensors;

insert into raw_data(sensor_id, value, sensor_timestamp)
values(4, 'insert from dbeaver', '2020-10-27 09:31:00');

select * from raw_data;




