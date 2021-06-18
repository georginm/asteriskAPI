const db = require('../services/db');

/*
Cada ramal só pode pertencer a uma fila
*/
module.exports = {
    
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
            // A fila existe?
            const queue = await db.select('queues', "name", {name: req.body.queue_name});
            
            if(!queue.length){
                return res.status(400).json({error: "Fila informada não existe"});
            }

            // O Ramal está cadastrado?
            const endpoint = await db.select('ps_endpoints', "id", {id: interface.replace("PJSIP/", "")});

            if(!endpoint.length){
                return res.status(400).json({error: "Endpoint informado na interface não está cadastrado."});
            }

            // Essa interface já está cadastrada?
            var query = await db.selectAll('queue_members', {interface});
            // Essa interface já está em algum registro do banco?
            if(!query.length){ //caso não tenha registro
                const { uniqueid } = await db.getLast('queue_members');
                query = await db.insert('queue_members', {...req.body, uniqueid: uniqueid + 1}, 'interface');
                return res.status(201).json(query);
            }
            else { //caso tenha
                return res.status(401).json({error: "Interface já cadastrada"});
            }
        } catch (error) {
            return res.status(400).json({error: `${error.message}`});
        }
    },

    async update(req, res){
        const interface = `${req.params.protocol}/${req.params.ramal}`
        try {
            var query = await db.select('queue_members', "interface", {interface});
            // Essa interface já está em algum registro do banco?
            if(!query.length){ // Caso não tenha registro
                return res.status(401).json({error: "Não há registro dessa interface no banco de dados"});
            }
            else{ // Caso tenha
                query = await db.update('queue_members',req.body, {interface});
                return res.status(204).send();
            }
        } catch (error) {
            return res.status(400).json({error: `${error.message}`});
        }
    },

    async delete(req, res){
        const {protocol, ramal} = req.params;
        const interface = `${protocol}/${ramal}`;

        try {
            var query = await db.select('queue_members', "interface", {interface});
            // Essa interface já está em algum registro do banco?
            if(!query.length){ // Caso não tenha registro
                return res.status(401).json({error: "Não há registro dessa interface no banco de dados"});
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