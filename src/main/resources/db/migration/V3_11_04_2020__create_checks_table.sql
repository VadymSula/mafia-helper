create table if not exists checks
(
    id_game       integer not null
        constraint checks_game_id_game_fk
            references game,
    don_check     integer,
    sheriff_check integer,
    circle_number integer not null
);

alter table checks
    owner to postgres;