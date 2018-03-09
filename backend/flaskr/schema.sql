drop table if exists states;
create table states (
  id integer primary key autoincrement,
  count integer,
  victims integer,
  name text not null,
  per_population real
);
drop table if exists criminals;
create table criminals (
  id integer primary key autoincrement,
  title text not null,
  'text' text not null
);
drop table if exists crimes;
create table crimes (
  id integer primary key autoincrement,
  title text not null,
  'text' text not null
);
