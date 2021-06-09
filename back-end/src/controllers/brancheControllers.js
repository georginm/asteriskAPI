const db = require('../services/db');
const dbRamal = require('../services/dbRamal');

module.exports = {
    async index(req, res){
        const select = [
            'ps_endpoints.id', 
            'ps_endpoints.transport', 
            'ps_endpoints.context',
            'ps_endpoints.disallow',
            'ps_endpoints.allow',
            'ps_endpoints.direct_media',
            'ps_endpoints.aors as aors',
            'ps_aors.contact',
            'ps_aors.max_contacts',
            'ps_endpoints.auth as auth',
            'ps_auths.auth_type',
            'ps_auths.password',
            'ps_auths.username'
        ];
        
        const {id, ...rest} = req.query;
        var query;
        try {
            if(id){
            // Se remover essa parte vai dar um erro de ambiguidade na query.
                query = await dbRamal.select2Join(
                    'ps_endpoints',
                    ['ps_auths', 'ps_endpoints.id', 'ps_auths.id'],
                    ['ps_aors', 'ps_endpoints.id', 'ps_aors.id'],
                    { 'ps_endpoints.id': id,...rest},
                    select
                );
            }
            else{
                query = await dbRamal.select2Join(
                    'ps_endpoints',
                    ['ps_auths', 'ps_endpoints.id', 'ps_auths.id'],
                    ['ps_aors', 'ps_endpoints.id', 'ps_aors.id'],
                    req.query,
                    select
                );
            }
            
            
            return res.status(200).json(query);
        } catch (error) {
            return res.status(400).json({error: `${error.message}`});
        }
    },

    async list(req, res){
        const {id, ...rest} = req.query;
        var query;
        try {
            // Se remover essa parte vai dar um erro de ambiguidade na query.
            if(id){
                query = await dbRamal.select2Join(
                    'ps_endpoints',
                    ['ps_auths', 'ps_endpoints.id', 'ps_auths.id'],
                    ['ps_aors', 'ps_endpoints.id', 'ps_aors.id'],
                    { 'ps_endpoints.id': id,...rest},
                );
            }
            else{
                query = await dbRamal.select2Join(
                    'ps_endpoints',
                    ['ps_auths', 'ps_endpoints.id', 'ps_auths.id'],
                    ['ps_aors', 'ps_endpoints.id', 'ps_aors.id'],
                    req.query
                );
            }
            
            
            return res.status(200).json(query);
        } catch (error) {
            return res.status(400).json({error: `${error.message}`});
        }
    },

    async delete(req, res) {
        const { id } = req.params;

        try {
            var query = await db.select("ps_endpoints", "id", {id});

            if(!query.length) { // Caso não exista registro
                return res.status(400).json("Não existe regristro para ser deletado");
            } else {
                query = await db.delete("ps_endpoints", {id});
                query = await db.delete("ps_auths", {id});
                query = await db.delete("ps_aors", {id});
                return res.status(204).send();

            }
        } catch (error) {
            return res.status(400).json({error: `${error.message}`});
        }
    }
}