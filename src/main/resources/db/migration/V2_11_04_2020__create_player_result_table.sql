create table if not exists player_result
(
    id_player          integer not null
        constraint player_result__id_player_fk
            references player,
    id_role            smallint not null
        constraint player_result__id_role_fk
            references role,
    fouls_quantity     smallint,
    golden_move        varchar(20),
    first_kill_sheriff boolean not null,
    id_game            integer
        constraint id_game
            references game
            on update cascade on delete cascade,
    is_killed          boolean default false,
    player_number      smallint default 0 not null
);