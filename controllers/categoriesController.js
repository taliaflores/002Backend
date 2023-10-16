const { getAll, updateCategory } = require('../models/category');
const Category = require('../models/category');
const storage = require('../utils/cloud_storage');

module.exports = {

    async create(req, res, next) {
        
        console.log('REQ BODY', req.body);

        try {
            
            const category = JSON.parse(req.body.category); 
            console.log('Category', category);

            const files = req.files;

            if (files.length > 0) { // CLIENTE NOS ENVIA UN ARCHIVO

                const pathImage = `image_${Date.now()}`; // NOMBRE DEL ARCHIVO
                const url = await storage(files[0], pathImage);

                if (url != undefined && url != null) {
                    category.image = url;
                }

            }

            const data = await Category.create(category);

            return res.status(201).json({
                success: true,
                message: 'La categoria se ha creado correctamente',
                data: {
                    'id': data.id
                }
            });

        } catch (error) {
            
            console.log('Error', error);

            return res.status(501).json({
                success: false,
                message: 'Hubo un error al crear la categoria',
                error: error 
            });
        }

    },

    
    async OneCategory(req, res, next) {

        console.log('REQ BODY', req.params.id_category);
        try {
            const id_category = req.params.id_category; // CLIENTE
            const data = await Category.findByCategory(id_category);
            return res.status(201).json(data);


        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Error al devolver la categoria`,
                success: false,
                error: error
            });
        }
    },

    async updatCat(req, res, next) {

        try {
            
            console.log('Category', req.body.category);

            const category = JSON.parse(req.body.category); // CLIENTE DEBE ENVIARNOS UN OBJETO USER 
            // console.log('Usuario Parseado', user);

            const files = req.files;

            if (files.length > 0) { // CLIENTE NOS ENVIA UN ARCHIVO

                const pathImage = `image_${Date.now()}`; // NOMBRE DEL ARCHIVO
                const url = await storage(files[0], pathImage);

                if (url != undefined && url != null) {
                    category.image = url;
                }

            }

            await Category.updateCategory(category); // GUARDANDO LA URL EN LA BASE DE DATOS

            return res.status(201).json({
                success: true,
                message: 'Los datos del category se han actualizado correctamente',
                data: category
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar los datos del category',
                error: error
            });
        }

    },


    async updateWithoutImageCat(req, res, next) {
        console.log('++++++++++++++++++++updateUser', req.body);

        try {

            const category = req.body; // CLIENTE DEBE ENVIARNOS UN OBJETO USER 
            console.log('Usuario Parseado', category);

        
            await Category.updateCategory(category); // GUARDANDO LA URL EN LA BASE DE DATOS

            return res.status(201).json({
                success: true,
                message: 'Los datos del category se han actualizado correctamente',
                data: category
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar los datos del category',
                error: error
            });
        }

    },
    async update(req, res, next) {

        try {
            
            console.log('Usuario', req.body.user);

            const user = JSON.parse(req.body.user); // CLIENTE DEBE ENVIARNOS UN OBJETO USER 

            const files = req.files;

            if (files.length > 0) { // CLIENTE NOS ENVIA UN ARCHIVO

                const pathImage = `image_${Date.now()}`; // NOMBRE DEL ARCHIVO
                const url = await storage(files[0], pathImage);

                if (url != undefined && url != null) {
                    user.image = url;
                }

            }

            await User.update(user); // GUARDANDO LA URL EN LA BASE DE DATOS

            return res.status(201).json({
                success: true,
                message: 'Los datos del usuario se han actualizado correctamente',
                data: user
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar los datos del usuario',
                error: error
            });
        }

    },



    async deleteCategory(req, res, next) {
        console.log('REQ BODY  deleteCategory' , req.params.id_category);

            try {
                const id_category = req.params.id_category; // CLIENTE
                console.log('REQ BODY', id_category);

                await Category.deleteCategory(id_category);
               
    
                return res.status(201).json({
                    success: true,
                    message: 'La categoria se ha eliminado',
                 
                });
            } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al eliminar la category',
                error: error
            });
        }

    },

    async getAll(req, res, next) {

        try {
            
            const data = await Category.getAll();

            return res.status(201).json(data);
            
        } catch (error) {
            console.log('Error', error);

            return res.status(501).json({
                success: false,
                message: 'Hubo un error al crear la categoria',
                error: error 
            });
        }
    }

}