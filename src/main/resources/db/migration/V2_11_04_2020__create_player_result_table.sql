create table if not exists player_result
(
    id_player          serial  not null
        constraint player_result_pk
            primary key,
    id_person          integer,
    role               varchar,
    fouls_quantity     integer,
    golden_move        char(256),
    first_kill_sheriff boolean not null,
    id_game            integer
        constraint id_game
            references game,
    is_killed          boolean default false
);

alter table player_result
    owner to postgres;