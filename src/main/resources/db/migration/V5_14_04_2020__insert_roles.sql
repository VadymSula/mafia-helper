insert into role(role_name)
values ('Civil'),
       ('Mafia'),
       ('Don'),
       ('Sheriff'),
       ('Lead')
on conflict (role_name)
    do nothing;