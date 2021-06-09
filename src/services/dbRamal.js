const connection = require('../database/db');
const db = require('./db');


module.exports = {
    async select2Join(table, join1, join2, where= "", select ='*'){
        return await connection(table)
                .join(join1[0], join1[1], join1[2])
                .join(join2[0], join2[1], join2[2])
                .select(select)
                .where(where);
    },
    ...db
}
