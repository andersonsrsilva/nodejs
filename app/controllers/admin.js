module.exports.formulario_inclusao_noticia = function(application, req, res) {
    res.render("admin/formulario_inclusao_noticia", {validacao: {}, noticia:{}});
}

module.exports.noticias_salvar = function(application, req, res) {
    var noticia = req.body;

    req.assert('titulo', 'Título é obrigatório').notEmpty();
    req.assert('resumo', 'Resumo é obrigatório').notEmpty();
    req.assert('resumo', 'Resumo deve conter entre 10 e 100 caracteres').len(10, 100);
    req.assert('autor', 'Autor é obrigatório').notEmpty();
    req.assert('data_noticia', 'Autor é obrigatório').notEmpty().isDate({format: 'YYYY-MM-DD'});
    req.assert('noticia', 'Notícia é obrigatório').notEmpty();

    var errors = req.validationErrors();
    if(errors) {
      res.render("admin/formulario_inclusao_noticia", {validacao: errors, noticia: noticia});
      return;
    }

    var connection = application.config.dbConnection();
    var dao = new application.app.models.NoticiasDAO(connection);

    dao.salvarNoticia(noticia, function(error, result) {
        res.redirect('/noticias');
    });
}
