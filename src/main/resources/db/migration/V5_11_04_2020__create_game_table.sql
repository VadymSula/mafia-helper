create table if not exists game
(
    id_game         serial not null
        constraint game_pkey
            primary key,
    win             varchar(20),
    game_duration   varchar(20),
    game_date       date,
    game_is_rating  boolean,
    id_club         integer
        constraint club_game_id_club_fk
            references club (id_club)
);