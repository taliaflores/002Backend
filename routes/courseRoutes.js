const CourseController = require('../controllers/courseController');
const passport = require('passport');

module.exports = (app, upload) => {

    app.post('/api/course/create', passport.authenticate('jwt', {session: false}), CourseController.create);
}