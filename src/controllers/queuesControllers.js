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
        // Eu não sei ainda qual a primary key da tabela, suspeito que seja o nome
        // enquanto n verifico deixarei essa verificação abaixo
        const { name } = req.body
        try {
            const query = await db.select('queues', "name", {name});
            // Essa interface já está em algum registro do banco?
            if(query.length == 0) { // Caso não tenha registro
                const lastId = await db.getLastId('queues');
                const query = await db.insert('queues', {id: lastId, ...req.body}, select);
                return res.status(200).json(query);
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
            if(query.length == 0){ // Caso não tenha registros
                return res.status(401).json({error: "Não existe registro com esse nome"});
            }
            else { // Caso tenha
                query = await db.delete('queues', {name});
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
            if(query.length == 0){ // Caso não tenha registro
                return res.status(401).json({ error: "Não existe registro com esse nome para ser atualizado."});
            }
            else { // Caso tenha
                if(req.params.name == req.body.name){
                    query = await db.update('queues',req.body, {name: req.params.name});
                    return res.status(204).send();
                } else {
                    query = await db.select("queues", "name", req.body.name);
                    if(query.length == 0){
                        query = await db.update('queues',req.body, {name: req.params.name});
                        return res.status(204).send();
                    } else {
                        return res.status(401).json({error: "O nome fornecido no body já pertence a outra fila."});
                    }
                        
                }
                
            }
        } catch (error) {
            return res.status(400).json({error: `${error.message}`})
        }
    }
}