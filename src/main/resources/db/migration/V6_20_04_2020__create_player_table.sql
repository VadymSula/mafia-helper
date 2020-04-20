create table if not exists player
(
    id_player serial      not null
        constraint player_pk
            primary key,
    nickname  varchar(30) not null,
    unique(nickname)
);

alter table player
    owner to postgres;