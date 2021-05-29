const db = require('../services/db');

const select = [
    "id",
    "auth_type",
    "username",
    "password"
];

module.exports = {
    async index(req, res) {
        try {
            const query = await db.selectAll("ps_auths", req.query);
            return res.status(200).json(query);
        } catch (error) {
            return res.status(400).json({error: `${error.message}`});
        }
    },

    async list(req, res) {
        try {
            const query = await db.select("ps_auths", select, req.query);
            return res.status(200).json(query);
        } catch (error) {
            return res.status(400).json({error: `${error.message}`});
        }
    },

    async create(req, res) {
        try {
            // Existe Auth no db?
            var query = await db.select("ps_auths", "id", {id: req.body.id});
            if(query.length == 0) { //Caso não exista
                query = await db.insert("ps_auths", req.body, select);
                return res.status(200).json(query);
            } else { // Existe
                return res.status(401).json({error: "Auth já existe"});
            } 
        } catch (error){
            return res.status(400).json({error: `${error.message}`});
        }
    },

    async update (req, res) {
        const { id } = req.params;
        try {
            // Existe Auth no db?
            var query = await db.select("ps_auths", "id", {id});
            if(query.legth == 0) { //Caso não haja registro
                return res.status(401).json({error: "Não há registro da auth passada"});
            }
            else { // Existe
                query = await db.select("ps_auths", "id", {id: req.body.id});
                if(query.length == 0) { // Caso o registro passado no bod não exista
                    query = await db.update("ps_auths", req.body, {id: req.params.id}, returning=select);
                    return res.status(200).send();
                } else { // Caso exista
                    return res.status(401).json({error: "O auth informado no corpo da requisição já está cadastrado"});
                }
            }
        } catch (error) {
            return res.status(400).json({error: `${error.message}`});
        }
    },

    async delete(req, res) {
        const { id } = req.params;

        try {
            var query = await db.select("ps_auths", "id", {id});

            if(query.legth == 0) { // Caso não exista registro
                return res.status(401).json("Não existe regristro para ser deletado");
            } else {
                query = await db.delete("ps_auths", {id});
                return res.status(204).send();

            }
        } catch (error) {
            return res.status(400).json({error: `${error.message}`});
        }
    }
}