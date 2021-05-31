const db = require('../services/db');

module.exports = {
    async index(req, res) {
        try {
            const query = await db.selectAll("ps_aors", req.query);
            return res.status(200).json(query);
        } catch (error) {
            return res.status(400).json({error: `${error.message}`});
        }
    },

    async list(req, res) {
        const select = [
            "id",
            "contact",
            "max_contacts"
        ];

        try {
            const query = await db.select("ps_aors", select, req.query);
            return res.status(200).json(query);
        } catch (error) {
            return res.status(400).json({error: `${error.message}`});
        }
    },

    async create(req, res) {
        try {
            // Existe Aors no db?
            var query = await db.select("ps_aors", "id", {id: req.body.id});
            if(!query.length) { //Caso não exista
                query = await db.insert("ps_aors", req.body, "id");
                return res.status(200).json({query});
            } else { // Existe
                return res.status(401).json({error: "Aors já existe"});
            } 
        } catch (error){
            return res.status(400).json({error: `${error.message}`});
        }
    },

    async update (req, res) {
        try {
            // Existe Aors no db?
            var query = await db.select("ps_aors", "id", {id: req.params.id});
            if(!query.length) { //Caso não haja registro
                return res.status(401).json({error: "Não há registro da Aor passada"});
            } else { // Existe
                query = await db.update("ps_aors", req.body, {id: req.params.id}, "id");
                return res.status(200).send();
            }
        } catch (error) {
            return res.status(400).json({error: `${error.message}`});
        }
    },

    async delete(req, res) {
        const { id } = req.params;

        try {
            var query = await db.select("ps_aors", "id", {id});

            if(!query.length) { // Caso não exista registro
                return res.status(401).json("Não existe regristro para ser deletado");
            } else {
                query = await db.delete("ps_endpoints", {id});
                query = await db.delete("ps_aors", {id});
                return res.status(204).send();

            }
        } catch (error) {
            return res.status(400).json({error: `${error.message}`});
        }
    }
}