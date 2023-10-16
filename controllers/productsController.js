const Product = require('../models/product');
const storage = require('../utils/cloud_storage');
const asyncForEach = require('../utils/async_foreach');

module.exports = {

    async productyAll(req, res, next) {
        try {
            const data = await Product.productAll();
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Error al listar los productos`,
                success: false,
                error: error
            });
        }
    },

    async findByCategory(req, res, next) {
        try {
            const id_category = req.params.id_category; // CLIENTE
            const data = await Product.findByCategory(id_category);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Error al listar los productos por categoria`,
                success: false,
                error: error
            });
        }
    },

    async ProductSuCategory(req, res, next) {
        try {
            const id_product = req.params.id_product; // CLIENTE
            const data = await Product.ProductSuCategory(id_product);
            return res.status(201).json(data);
        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Error al listar la categoria del producto`,
                success: false,
                error: error
            });
        }
    },

    async deleteProduct(req, res, next) {
        console.log('REQ BODY  deleteProduct' , req.params.id_product);

            try {
                const id_product = req.params.id_product; // CLIENTE
                console.log('REQ BODY', id_product);

                await Product.deleteproduct(id_product);
               
    
                return res.status(201).json({
                    success: true,
                    message: 'La producto se ha eliminado',
                 
                });
            } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al eliminar la producto',
                error: error
            });
        }

    },

    async updateWithouttresImage(req, res, next) {
        console.log('++++ +++ updateProducto', req.body);

        try {
            

            const product = req.body; // CLIENTE DEBE ENVIARNOS UN OBJETO USER 
            console.log('product para actualizar', product);

        
            await Product.update(product); // GUARDANDO LA URL EN LA BASE DE DATOS

            return res.status(201).json({
                success: true,
                message: 'Los datos del product se han actualizado correctamente',
                data: user
            });

        } 
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al actualizar los datos del product',
                error: error
            });
        }

    },


    async create(req, res, next) {

        let product = JSON.parse(req.body.product);

        const files = req.files;

        let inserts = 0;
        
        if (files.length === 0) {
            return res.status(501).json({
                message: 'Error al registrar el producto no tiene imagen',
                success: false
            });
        }
        else {
            try {
                
                const data = await Product.create(product); // ALMACENANDO LA INFORMACION
                product.id = data.id;

                const start = async () => {
                     await asyncForEach(files, async (file) => {
                        const pathImage = `image_${Date.now()}`;
                        const url = await storage(file, pathImage);

                        if (url !== undefined && url !== null) {
                            if (inserts == 0) { // IMAGEN 1
                                product.image1 = url;
                            }
                            else if(inserts == 1) { // IMAGEN 2
                                product.image2 = url;
                            }
                            else if(inserts == 2) { // IMAGEN 3
                                product.image3 = url;
                            }
                        }

                        await Product.update(product);
                        inserts = inserts + 1;

                        if (inserts == files.length) {
                            return res.status(201).json({
                                success: true,
                                message: 'El producto se ha registrado correctamente'
                            });
                        }

                     }); 

                }

                start();

            } 
            catch (error) {
                console.log(`Error: ${error}`);
                return res.status(501).json({
                    message: `Error al registrar el producto ${error}`,
                    success: false,
                    error: error
                });
            }
        }

    }

}