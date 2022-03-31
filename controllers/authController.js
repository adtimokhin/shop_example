const User = require("../models/user.js");

const getSignIn = (request, response, next) => {
  response.render("auth/login.ejs");
};

const postSignIn = (request, response, next) => {
  const email = request.body.email;
  const password = request.body.password;
  const verificationPassword = request.body.verificationPassword;

  User.findByEmail(email)
    .then((user) => {
      if (!user) {
        // flash an error saying that user with such email already exists.
      }
      if (password === verificationPassword) {
        request.session.isLoggedIn = true;
        request.session.user = user;
        return request.session.save((err) => {
          console.log(err);
          request.redirect("/");
        });
      } else {
        // flash that passwords do not match.
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
