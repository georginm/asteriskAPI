const db = require("../services/db");


module.exports = {
    async index(req, res){
        try {
            const query = await db.selectAll("ps_endpoints", req.query);
            return res.status(200).json(query);
        } catch (error) {
            return res.status(400).json({error: `${error.message}`});
        }
    },

    async list(req, res) {
        const select = [
            'id', 
            'transport', 
            'context',
            'disallow',
            'allow',
            'direct_media',
            'aors',
            'auth',
        ];

        try {
            const query = await db.select("ps_endpoints", select, req.query);
            return res.status(200).json(query);
        } catch (error) {
            return res.status(400).json({error: `${error.message}`});
        }
    },

    async create(req, res){
        try {
            // Procura item cadastrodo
            var query = await db.select("ps_endpoints","*", {id : req.body.id});
            // Existe registro?
            if(query.length == 0) { // Caso não exista registro
                query = await db.insert("ps_endpoints", req.body);
                return res.status(204).send();
            } else { // Caso exista
                return res.status(401).json({error: "Endpoint já cadastrado"});
            }
        } catch(error) {
            return res.status(400).json({error: `${error.message}`});
        }
    },

    async update(req, res){
        try {
            // Procura item cadastrado
            var query = await db.select("ps_endpoints", "id", {id: req.params.id});
            // Existe registro?
            if(query.length == 0){ // Caso não exista
                return res.status(401).json({error: "Não há registro para ser atualizado"});
            } else { // Existe regristro
                // verifica se há algum registro com o item passado no body
                query = await db.select("ps_endpoints", "id", {id: req.body.id});
                if(query.length == 0) { // não existe registro
                    query = await db.update("ps_endpoints", req.body, {id: req.params.id}, "id");
                    return res.status(204).send();
                } else {
                    return res.status(401).json({error: "Enpoint passado no body já está cadastrado"});
                }
            }
        } catch (error) {
            return res.status(400).json({error: `${error.message}`});
        }
    },

    async delete(req,res){
        const { id } = req.params;

        try {
            var query = await db.selectAll('ps_endpoints', { id });
            // Essa id já está em algum registro do banco?
            if(query.length == 0){ // Caso não tenha registros
                return res.status(401).json({error: "Não existe registro com essa id"});
            }
            else { // Caso tenha
                query = await db.delete('ps_endpoints', {id});
                return res.status(204).send();
            }
        } catch (error) {
            return res.status(400).json({error: error.message});
        }
    }
}