const connection = require('../database/db');


module.exports = {
    async selectAll(table, query = ""){
        return await connection(table)
                .select('*')
                .where(query);
    },

    async select(table, select = '*', query = ""){
        return await connection(table)
                .select(select)
                .where(query);
    },

    async delete(table, query = "") {
        return await connection(table)
            .where(query)
            .delete()
    },

    async update(table, update, query = "", returning=""){
        return await connection(table)
                    .update(update)
                    .where(query)
                    .returning(returning);
    },

    async insert(table, insert, returning){
        return await connection(table)
            .insert(insert)
            .returning(returning);
    },

    async getLastId(table){
        if(table == 'queue_members'){
            const items = await connection(table)
                .select('*')
                .orderBy('uniqueid');
            
            return items.pop();
        }
        else{
            const items = await connection(table)
                .select('*')
                .orderBy('id');

             return items[items.legth - 1].id
        }
        
    }
}