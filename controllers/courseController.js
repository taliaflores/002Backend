const Course = require('../models/course');


module.exports = {

    async create(req, res, next) {
        try {
            
            const course = req.body;
            console.log(course);
            const data = await Course.create(course);

            return res.status(201).json({
                success: true,
                message: 'La Course se creo correctamente',
                data: {
                    'id': data.id
                }
            });

        } 
        catch (error) {
            console.log(`Error ${error}`);    
            return res.status(501).json({
                success: false,
                message: 'Hubo un error creando la direccion',
                error: error
            });
        }
    },
    


}