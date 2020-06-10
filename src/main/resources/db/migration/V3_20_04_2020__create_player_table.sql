create table if not exists player
(
    id_player   serial      not null
        constraint player_pk
            primary key,
    gender      varchar(1)  not null,
    nickname    varchar(30) not null,
    games_count integer,
    unique(nickname)
);
