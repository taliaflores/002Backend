const db = require('../config/config');

const Course = {};




Course.create = (course) => {
    const sql = `
    INSERT INTO
        course(
            title,
            miniature,
            description,
            url,
            price,
            score
        )
    VALUES($1, $2, $3, $4, $5, $6) RETURNING id
    `;
    return db.oneOrNone(sql, [
        course.title,
        course.miniature,
        course.description,
        course.url,
        course.price,
        course.score
    ]);
}



module.exports = Course;