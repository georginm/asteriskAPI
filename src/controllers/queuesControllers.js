const db = require('../services/db');

module.exports = {
    async index(req, res){
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
            const query = await db.selectAll('queues', {name});
            // Essa interface já está em algum registro do banco?
            if(query.length == 0) { // Caso não tenha registro
                const lastId = await db.getLastId('queues');
                const query = await db.insert('queues', {id: lastId, ...req.body}, 'name');

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
            var query = await db.selectAll('queues', { name });
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
        const { name } = req.params;
        const nameBody = req.body.name;
        try {
            var query = await db.selectAll('queues', {name});
            // Essa interface já está em algum registro do banco?
            if(query.length == 0){ // Caso não tenha registro
                return res.status(401).json({
                    error: "Não existe registro com esse nome para ser atualizado."
                });
            }
            else { // Caso tenha
                query = await db.select('queues', 'name', {name: nameBody});
            
                // A interface enviada no corpo já está em algum registro do banco?
                if(query.length == 0) { // Caso não tenha registro
                    query = await db.update('queues',req.body, {name});

                    return res.status(204).send();    
                }
                else { // Caso já exista
                    return res.status(401).json({
                        error: "A interface enviada no corpo da requisição já pertence a uma fila."
                    })
                }
            }
        } catch (error) {
            return res.status(400).json({error: `${error.message}`})
        }
    }
}