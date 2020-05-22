create table if not exists club
(
    id_club   serial      not null
        constraint club_pk
            primary key,
    club_name varchar(50) not null,
    unique(club_name)
);
