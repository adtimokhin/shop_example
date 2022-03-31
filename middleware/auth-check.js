// This routines can be used to determine whether a user was authenticated or not.

const DEAULT_NOT_AUTHENTICATED_REDIRECT_ROUTE = "/login";
const DEAULT_AUTHENTICATED_REDIRECT_ROUTE = "/";

module.exports.isNotAuthenticated = (request, response, next) => {
  if (!request.session.isLoggedIn) {
    response.render(DEAULT_NOT_AUTHENTICATED_REDIRECT_ROUTE);
  } else {
    next();
  }
};

module.exports.isAuthenticated = (request, response, next) => {
    if (request.session.isLoggedIn) {
      response.render(DEAULT_AUTHENTICATED_REDIRECT_ROUTE);
    } else {
      next();
    }
  };
