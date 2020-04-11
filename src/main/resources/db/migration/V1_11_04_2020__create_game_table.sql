create table if not exists game
(
    id_game       serial not null
        constraint game_pkey
            primary key,
    win           char(256),
    game_duration char(256),
    id_club       integer
);

alter table game
    owner to postgres;