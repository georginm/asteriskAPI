const db = require('../services/db');

const select = [
    "id",
    "context",
    "exten",
    "priority",
    "app",
    "appdata"
];

module.exports = {
    async index(req, res) {
        try {
            const query = await db.selectAll("extensions", req.query);
            return res.status(200).json(query);
        } catch (error) {
            return res.status(400).json({error: `${error.message}`});
        }
    },

    async create(req, res) {
        try {
            // Existe Extensions no db?
            var query = await db.select("extensions", "id", {...req.body});
            if(!query.length) { //Caso não exista
                const { id } = await db.getLast('extensions');
                query = await db.insert("extensions", {id:parseInt(id)+1, ...req.body}, select);
                return res.status(200).json(query);
            } else { // Existe
                return res.status(401).json({error: "Extensions já existe"});
            } 
        } catch (error){
            return res.status(400).json({error: `${error.message}`});
        }
    },

    async update (req, res) {
        try {
            // Existe Extensions no db?
            var query = await db.select("extensions", "id", {id: req.params.id})
            if(!query.length) { //Caso não haja registro
                return res.status(401).json({error: "Não há registro da Extensions passada"});
            }
            else { // Existe
                query = await db.update("extensions", req.body, {id: req.params.id}, returning=select);
                return res.status(200).send();
            }
        } catch (error) {
            return res.status(400).json({error: `${error.message}`});
        }
    },

    async delete(req, res) {
        try {
            var query = await db.select("extensions", "id", {id: req.params.id})

            if(!query.length) { // Caso não exista registro
                return res.status(401).json("Não existe regristro para ser deletado");
            } else {
                query = await db.delete("extensions", {id: req.params.id});
                return res.status(204).send();

            }
        } catch (error) {
            return res.status(400).json({error: `${error.message}`});
        }
    }
}