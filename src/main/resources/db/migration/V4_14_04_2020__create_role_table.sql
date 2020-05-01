create table if not exists role
(
    id_role      serial      not null
        constraint roles_pk
            primary key,
    role_name    varchar(20) not null,
    unique(role_name)
);