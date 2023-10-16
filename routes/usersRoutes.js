const UsersController = require('../controllers/usersController');
const passport = require('passport');

module.exports = (app, upload) => {

    // TRAER DATOS
    app.get('/api/users/getAll', UsersController.getAll);
    app.get('/api/users/findDeliveryMen', passport.authenticate('jwt', {session: false}), UsersController.findDeliveryMen);
    app.get('/api/users/findClient', passport.authenticate('jwt', {session: false}), UsersController.findClientes);
    app.get('/api/users/findAdmin', passport.authenticate('jwt', {session: false}), UsersController.findAdministrador);

    // GUARDAR DATOS
    app.post('/api/users/create', UsersController.register);
    app.post('/api/users/login', UsersController.login);

    // ACTUALIZAR DATOS
    // 401 UNAUTHORIZED

    app.put('/api/users/update', passport.authenticate('jwt', {session: false}), upload.array('image', 1), UsersController.update);
    app.put('/api/users/updateWithoutImage', passport.authenticate('jwt', {session: false}), UsersController.updateWithoutImage);
    app.put('/api/users/asignardelivery', passport.authenticate('jwt', {session: false}), UsersController.asignarDlivery);
    app.put('/api/users/updateNotificationToken', passport.authenticate('jwt', {session: false}), UsersController.updateNotificationToken);
}