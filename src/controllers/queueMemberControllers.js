const db = require('../services/db');

/*
Cada ramal só pode pertencer a uma fila
*/
module.exports = {
    /**
     * Mostra todos os itens cadastrados. Também aceita query params
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    async index(req,res) {
        try {
            var query = await db.selectAll('queue_members', req.query);
        
            return res.status(200).json(query);
        } catch (error) {
            return res.status(400).json({error: `${error.message}`});
        }
    },

    async create(req, res) {
        const {interface} = req.body;

        try {
            var query = await db.selectAll('queue_members', {interface});
            // Essa interface já está em algum registro do banco?
            if(query.length == 0){ //caso não tenha registro
                const lastId = await db.getLastId('queue_members');
                query = await db.insert('queue_members', {uniqueid: lastId.uniqueid + 1, ...req.body}, 'interface');
                return res.status(200).json(query);
            }
            else { //caso tenha
                return res.status(401).json({error: "Interface já cadastrada"});
            }
        } catch (error) {
            return res.status(400).json({error: `${error.message}`});
        }
    },

    async update(req, res){

        const {protocol, ramal} = req.params;
        const interface = `${protocol}/${ramal}`;
        const interfaceBody = req.body.interface;

        try {
            var query = await db.selectAll('queue_members', {interface});
            
            // Essa interface já está em algum registro do banco?
            if(query.length == 0){ // Caso não tenha registro
                return res.status(401).json({error: "Não há registro dessa interface no banco de dados"});
            }
            else{ // Caso tenha
                var query = await db.select('queue_members', 'interface', {interface: interfaceBody});
            
                // A interface enviada no corpo já está em algum registro do banco?
                if(query.length == 0) { // Caso não tenha registro
                    query = await db.update('queue_members',req.body, {interface});

                    return res.status(204).send();     
                }
                else { // Caso já exista
                    return res.status(401).json({
                        error: "A interface enviada no corpo da requisição já pertence a uma fila."
                    })
                }
            }
        } catch (error) {
            return res.status(400).json({error: `${error.message}`});
        }
    },

    async delete(req, res){
        const {protocol, ramal} = req.params;
        const interface = `${protocol}/${ramal}`;

        try {
            var query = await db.selectAll('queue_members', {interface});
            // Essa interface já está em algum registro do banco?
            if(query.length == 0){ // Caso não tenha registro
                return res.status(401).json({
                    error: "Não há registro dessa interface no banco de dados"
                });
            }
            else{ // Caso tenha
                query = await db.delete('queue_members', {interface});
                return res.status(204).send();
            }

        } catch (error) {
            return res.status(400).json({error: `${error.message}`})
        }
    }
}