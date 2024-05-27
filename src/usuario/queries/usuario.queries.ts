const usuarioQueries = {
  selectByEmail:
    'select u.email, u.password, u.activo, u.rolID, r.codigo, r.nombre from usuarios u join roles r on u.rolID = r.rolID where u.email = ?;',
  selectAll: 'select * from usuarios;',

  registerUser:
    'insert into usuarios (email,password,activo,rolId) VALUES (?,?,?,?)',
};

export default usuarioQueries;
