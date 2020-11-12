-- public.api_users definition

-- Drop table

-- DROP TABLE public.api_users;

CREATE TABLE public.api_users (
	id serial NOT NULL,
	entry_on timestamp NULL DEFAULT CURRENT_TIMESTAMP,
	client_id text NULL,
	client_secret text NULL,
	CONSTRAINT api_users_client_id_key UNIQUE (client_id),
	CONSTRAINT api_users_pkey PRIMARY KEY (id)
);