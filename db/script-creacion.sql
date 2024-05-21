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


create table if not exists palabras (
  palabraID integer auto_increment,
  palabra varchar(100) not null,
  primary key (palabraID)
);


create table if not exists palabrasdia (
  palabraID integer ,
  fecha DATE not null,
  maxIntentos integer default 10,
  creador integer not null,
  creado DATETIME not null,
  primary key (fecha),
  constraint FK_paldia_palabra foreign key (palabraID) references palabras(palabraID),
  constraint FK_paldia_usuario foreign key (creador) references usuarios(usuarioID)
);

create table if not exists jugadas (
  jugadaID integer auto_increment,
  fecha DATE not null,
  jugador integer not null,
  inicio DATETIME,
  fin DATETIME,
  intentos integer default 0,
  primary key (jugadaID),
  constraint FK_jugada_dia foreign key (fecha) references palabrasdia(fecha),
  constraint FK_jugada_jugador foreign key (jugador) references usuarios(usuarioID)
);







