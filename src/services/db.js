const connection = require('../database/db');


module.exports = {
    /**
     * 
     * @param {*} table nome da tabela
     * @param {*} query filtro
     * @returns retultado da query
     */
    async selectAll(table, query = ""){
        return await connection(table)
            .select('*')
            .where(query);
    },

    /**
     * 
     * @param {*} table nome da tabela
     * @param {*} select itens que serão selecionados
     * @param {*} query filtro
     * @returns retultado da query
     */
    async select(table, select = '*', query = ""){
        return await connection(table)
            .select(select)
            .where(query);
    },

    /**
     * 
     * @param {*} table nome da tabela
     * @param {*} query filtro
     * @returns retultado da query
     */
    async delete(table, query = "") {
        return await connection(table)
            .where(query)
            .delete()
    },

    /**
     * 
     * @param {*} table nome da tabela
     * @param {*} update Itens para serem atualizados
     * @param {*} query filtro
     * @param {*} returning retorno de algum elemento da tabela
     * @returns retultado da query
     */
    async update(table, update, query = "", returning=""){
        return await connection(table)
                .update(update)
                .where(query)
                .returning(returning);
    },

    /**
     * 
     * @param {*} table nome da tabela
     * @param {*} insert Itens a serem inseridos
     * @param {*} returning retorno de algum elemento da tabela
     * @returns retultado da query
     */
    async insert(table, insert, returning){
        return await connection(table)
            .insert(insert)
            .returning(returning);
    },

    /**
     * 
     * @param {*} table nome da tabela
     * @returns ultimo elemento do banco de dados
     */
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

             return items.pop();
        }
        
    }
}