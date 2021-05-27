const conn = require('../database/db');
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
        try{
            const query = await dbRamal.select2Join(
                'ps_endpoints',
                ['ps_auths', 'ps_endpoints.id', 'ps_auths.id'],
                ['ps_aors', 'ps_endpoints.id', 'ps_aors.id'],
                req.query,
                select
            );
            
            return res.status(200).json(query);
        } catch (error) {
            return res.status(400).json({error: `${error}`});
        }
    },

    async list(req, res){
        try {
            const query = await dbRamal.select2Join(
                'ps_endpoints',
                ['ps_auths', 'ps_endpoints.id', 'ps_auths.id'],
                ['ps_aors', 'ps_endpoints.id', 'ps_aors.id'],
                req.query
            );
            
            return res.status(200).json(query);
        } catch (error) {
            return res.status(400).json({error: `${error}`});
        }
    }
}