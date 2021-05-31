const db = require('../services/db');
const select = [
    'name',
    'musiconhold', 
    'timeout', 
    'ringinuse', 
    'monitor_type',
    'strategy',
    'joinempty',
    'leavewhenempty'
];

module.exports = {
    async index(req, res){
        try {
            const query = await db.select('queues',select, req.query)
            return  res.status(200).json(query);

        } catch (error) {
            return res.status(400).json({error: `${error.message}`})
        }
        
    },

    async list(req, res) {
        try {
            const query = await db.selectAll('queues', req.query);

            return res.status(200).json(query);
        } catch (error) {
            return res.status(400).json({error: `${error.message}`});
        }
    },

    async create(req, res){
        try {
            var query = await db.select('queues', "name", {name: req.body.name});
            // Essa interface já está em algum registro do banco?
            if(!query.length) { // Caso não tenha registro
                query = await db.insert('queues', req.body, select);
                return res.status(201).json(query);
            }
            else { //Caso tenha
                return res.status(401).json({error: "Fila já cadastrada"});
            }
        } catch (error) {
            return res.status(400).json({error: `${error.message}`})
        }
    },

    async delete(req,res){
        const { name } = req.params;

        try {
            var query = await db.select('queues', "name", {name});
            // Essa interface já está em algum registro do banco?
            if(!query.length){ // Caso não tenha registros
                return res.status(401).json({error: "Não existe registro com esse nome"});
            }
            else { // Caso tenha
                query = await db.delete('queues', {name});
                // Deleta todos as informações da fila
                query = await db.delete('queue_members', {queue_name: name})
                return res.status(204).send();
            }
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    },

    async update (req, res) {
        try {
            var query = await db.select('queues', "name", {name: req.params.name});
            // Essa interface já está em algum registro do banco?
            if(!query.length){ // Caso não tenha registro
                 return res.status(401).json({ error: "Não existe registro com esse nome para ser atualizado."});
            }
            else { // Caso tenha
                query = await db.update('queues',req.body, {name: req.params.name}, "name");
                return res.status(200).json({query});
            }
        } catch (error) {
            return res.status(400).json({error: `${error.message}`})
        }
    }
}