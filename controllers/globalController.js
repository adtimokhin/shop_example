const getIndex = (request, response, next) => {
  response.render("index.ejs");
};

module.exports.getIndex = getIndex;
