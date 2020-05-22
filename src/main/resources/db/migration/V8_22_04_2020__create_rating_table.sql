create table if not exists rating
(
    id_rating    serial  not null
        constraint rating_pk
            primary key,
    id_club      integer not null
        constraint rating__id_club_fk
            references club,
    id_player    integer not null
        constraint rating__id_player_fk
            references player,
    rating_value real    not null
);