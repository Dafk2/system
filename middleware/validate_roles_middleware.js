const isAdminRole = (req, res, next) => {
  if(!req.userAuth) {
    return res.status(500).json({
      msg: 'Se quiere verificar el role del user sin validar el token primero'
    })
  }

  const { role } = req.userAuth;

  if(role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg:'El usario debe ser Administrador para realizar la accion'
    })   
  }

  next()
}

module.exports = {
  isAdminRole,
}
