create table if not exists role
(
    id_role serial   not null
        constraint roles_pk
            primary key,
    role    varchar(10) not null,
    unique(role)
);

alter table role
    owner to postgres;