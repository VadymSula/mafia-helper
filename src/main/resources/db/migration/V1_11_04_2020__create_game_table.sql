create table if not exists game
(
    id_game       serial not null
        constraint game_pkey
            primary key,
    win           varchar(20),
    game_duration varchar(20),
    id_club       integer
);

alter table game
    owner to postgres;