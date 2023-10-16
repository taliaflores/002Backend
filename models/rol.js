const db = require('../config/config');

const Rol = {};


Rol.create = (id_user, id_rol) => {

    const sql = `
    INSERT INTO
        user_has_roles(
            id_user,
            id_rol,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4)
    `;

    return db.none(sql, [
        id_user,
        id_rol,
        new Date(),
        new Date()
    ]);

}



Rol.asignarDelivery = (id_user) => {

    const sql = `
    UPDATE
        user_has_roles
    SET
        id_rol = 3,
        updated_at = $2
    WHERE 
        id_user = $1
    `;

    return db.none(sql, [
        id_user,
         new Date()
    ]);

}
module.exports = Rol;

