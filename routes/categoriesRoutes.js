const CategoriesController = require('../controllers/categoriesController');
const passport = require('passport');

module.exports = (app, upload) => {

    // TRAER DATOS
    app.get('/api/categories/getAll', passport.authenticate('jwt', {session: false}), CategoriesController.getAll);
   // TRAER una categoria
    app.get('/api/categories/:id_category', passport.authenticate('jwt', {session: false}), CategoriesController.OneCategory);


    // GUARDAR DATOS
    app.post('/api/categories/create', passport.authenticate('jwt', {session: false}), upload.array('image', 1), CategoriesController.create);


    //actulizar
    app.put('/api/categories/update', passport.authenticate('jwt', {session: false}), upload.array('image', 1), CategoriesController.updatCat);
    app.put('/api/categories/updateWithoutImage', passport.authenticate('jwt', {session: false}), CategoriesController.updateWithoutImageCat);
    
    //delete falta
    // app.put('/api/categories/delete', passport.authenticate('jwt', {session: false}), CategoriesController.deleteCategory);
    app.delete('/api/categories/delete/:id_category', passport.authenticate('jwt', {session: false}), CategoriesController.deleteCategory);


    // ACTUALIZAR DATOS
    // 401 UNAUTHORIZED
}