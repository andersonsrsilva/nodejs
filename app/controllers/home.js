module.exports.index = function(application, req, res) {

  var connection = application.config.dbConnection();
  var dao = new application.app.models.NoticiasDAO(connection);

  dao.get5UltimasNoticias(function(error, result) {
    res.render("home/index", {noticias: result});
  });

}
