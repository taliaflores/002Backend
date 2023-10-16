const db = require('../config/config');

const Category = {};

Category.getAll = () => {

    const sql = `
        SELECT
            id,
            name,
            image
        FROM
            categories
        ORDER BY
            name
    `;

    return db.manyOrNone(sql);

}
Category.findByCategory = (id_category) => {
    
    const sql = `
        SELECT
            id,
            name,
            image
        FROM
            categories
        WHERE 
            id = $1
    `;
    return db.manyOrNone(sql, id_category);
}

Category.create = (category) => {

    const sql = `
    INSERT INTO
        categories(
            name,
            image,
            created_at,
            updated_at
        )
    VALUES($1, $2, $3, $4) RETURNING id
    `;
    return db.oneOrNone(sql, [
        category.name,
        category.image,
        new Date(),
        new Date()
    ]);

}

Category.updateCategory= (category) => {

    const sql = `
    UPDATE
        categories
    SET
        name = $2,
        image = $3,
        created_at = $4,
        updated_at = $5
    WHERE 
        id = $1
    `;

    return db.none(sql, [
        category.id,
        category.name,
        category.image,
        new Date(),
        new Date()
    ]);

}
Category.deleteCategory= (id_category) => {

    const sql = `
    DELETE FROM 
        categories
    WHERE 
        id = $1
    `;

    return db.none(sql, [
        id_category
    ]);

}

module.exports = Category;