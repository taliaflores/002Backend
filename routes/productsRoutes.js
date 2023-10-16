const ProductsController = require('../controllers/productsController');
const passport = require('passport');

module.exports = (app, upload) => {

    app.get('/api/products/findByCategory/:id_category', passport.authenticate('jwt', {session: false}), ProductsController.findByCategory);
    app.get('/api/products/getcat/:id_product', passport.authenticate('jwt', {session: false}), ProductsController.ProductSuCategory);
    app.get('/api/products/getall', passport.authenticate('jwt', {session: false}), ProductsController.productyAll);


    app.post('/api/products/create', passport.authenticate('jwt', {session: false}), upload.array('image', 3), ProductsController.create);

    app.put('/api/products/updateWithoutImage', passport.authenticate('jwt', {session: false}), ProductsController.updateWithouttresImage);
    app.delete('/api/products/delete/:id_product', passport.authenticate('jwt', {session: false}), ProductsController.deleteProduct);

}


