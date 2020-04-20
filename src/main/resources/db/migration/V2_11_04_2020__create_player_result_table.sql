create table if not exists player_result
(
    id_player          integer not null
        constraint player_result__id_player_fk
            references player,
    id_role            integer not null
        constraint player_result__id_role_fk
            references role,
    fouls_quantity     integer,
    golden_move        varchar(20),
    first_kill_sheriff boolean not null,
    id_game            integer
        constraint id_game
            references game,
    is_killed          boolean default false
);

alter table player_result
    owner to postgres;