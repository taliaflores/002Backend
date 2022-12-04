const promise = require('bluebird');
const options = {
    promiseLib: promise,
    query: (e) => {}
}

const pgp = require('pg-promise')(options);
const types = pgp.pg.types;
types.setTypeParser(1114, function(stringValue) {
    return stringValue;
});

const databaseConfig = {
    'host': 'ec2-44-209-57-4.compute-1.amazonaws.com',
    'port': 5432,
    'database': 'd4n7ah02ijbv31',
    'user': 'wmaediaarsmurv',
    'password': '0833518f7b9fa839791161383362dbc8516f6505ab0ee8aca148db1d5ad33b75',
    'ssl':{rejectUnauthorized: false}
};
// const databaseConfig = {
//     'host': '127.0.0.1',
//     'port': 5432,
//     'database': 'delivery_db',
//     'user': 'postgres',
//     'password': 'uhye'
// };

const db = pgp(databaseConfig);

module.exports = db;