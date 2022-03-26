const User = require("../models/user.js");

const postAddUser = (request, response, next) => {
  const name = request.body.name;
  const email = request.body.email;
  const password = request.body.password;

  User.create({ name: name, email: email, password: password })
    .then((result) => {
      console.log("User was created!");
      response.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      next();
    });
};

const getUserById = (request, response, next) => {
  const userId = request.params.userId;

  User.findOne({ where: { id: userId } })
    .then((user) => {
      if (!user) {
        next();
      }

      response.render("user.ejs", {
        path: "user/" + user.id,
        user: user,
      });
    })
    .catch((err) => {
      console.log(err);
      next();
    });
};

const deleteUserById = (request, response, next) => {
  const userId = request.params.userId;
  User.findOne({ where: { id: userId } })
    .then((user) => {
      if (!user) {
        console.log("User does not exist!");
        next();
      }

      return user.destroy();
    })
    .then(() => {
      response.redirect("/");
    })
    .catch((err) => {
      console.log(err);
      next();
    });
};
