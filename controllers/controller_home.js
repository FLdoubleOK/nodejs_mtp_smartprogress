async function redirectToLogin(req, res) {
  res.render('home');
}


module.exports = {
  redirectToLogin,
};
