create table if not exists statistics
(
    id_stat                serial            not null
        constraint statistics_pk
            primary key,
    id_rating              integer           not null
        constraint statistics_rating__fk
            references rating,
    wins_quantity          integer default 0 not null,
    wins_civil             integer default 0 not null,
    wins_mafia             integer default 0 not null,
    wins_sheriff           integer default 0 not null,
    wins_don               integer default 0 not null,
    lead_games_quantity    integer default 0,
    id_player              integer default 0 not null
        constraint statistics_player__fk
            references player,
    games_civil_quantity   integer default 0,
    games_mafia_quantity   integer default 0,
    games_sheriff_quantity integer default 0,
    games_don_quantity     integer default 0
);