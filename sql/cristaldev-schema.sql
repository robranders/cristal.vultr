drop table sensors;

create table "sensors"
(
	sensor_id	integer not null,
	descr		text,
	data_type	text,
	device_id	int,
	remote_id	int,
	primary key (sensor_id)
);

create table "devices"
(
	device_id	int not null,
	descr		text,
	edge_id		int,
	remote_id	int,
	primary key (device_id)
);

create table "edges"
(
	edge_id		int,
	descr 		text,
	remote_id	uuid
);

create table "raw_data"
(
	sensor_id	int,
	edge_time	timestamp,
	entry_on	timestamp default current_timestamp,
	data		JSONB,
	primary key (sensor_id, edge_time)
);

-- public.api_users definition

-- Drop table

-- DROP TABLE public.api_users;

CREATE TABLE public.api_users (
	id serial NOT NULL,
	entry_on timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	client_id text NULL,
	client_secret text NULL,
	active boolean,
	CONSTRAINT api_users_client_id_key UNIQUE (client_id),
	CONSTRAINT api_users_pkey PRIMARY KEY (id)
);

