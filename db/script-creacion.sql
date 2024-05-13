create schema if not exists entrepalabras;

use entrepalabras;

create table if not exists roles (
  rolID integer auto_increment,
  codigo VARCHAR(3),
  nombre VARCHAR(50),
  primary key (rolID)
);

create table if not exists usuarios (
  usuarioID integer auto_increment,
  email varchar(256) not null,
  password varchar(100),
  activo tinyint,
  rolID integer,
  primary key (usuarioID),
  constraint FK_usuarios_roles foreign key (rolID) references roles(rolID)
);









