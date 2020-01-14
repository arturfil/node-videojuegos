exports.test = (req, res) => {
  res.send("desde runta de autenticacion UPDATED");
}

exports.signup = (req, res) => {
  console.log('req.body', req.body);
  const user = new User(req.body);
}