const connection = require('../database/db');

module.exports = {
    async index(req, res){
        try {
            const queues = await connection('queues')
                                        .select([
                                            'name',
                                            'musiconhold', 
                                            'timeout', 
                                            'ringinuse', 
                                            'monitor_type',
                                            'strategy',
                                            'joinempty',
                                            'leavewhenempty'
                                        ]);
            return  res.status(200)
                        .json(queues);
        } catch (err) {
            return res.status(400)
                        .json({error: `${err.message}`})
        }
        
    },

    async store(req, res){
        const { 
            name,
            musiconhold,
            timeout,
            ringinuse,
            monitor_type,
            strategy,
            joinempty,
            leavewhenempty 
        } = req.body;
        
        if(req.body){
            try {
            const queue = await connection('queues')
                                    .insert({
                                        name,
                                        musiconhold,
                                        timeout,
                                        ringinuse,
                                        monitor_type,
                                        strategy,
                                        joinempty,
                                        leavewhenempty})
                                    .returning("name")
                                    // .toString();

                return res.status(201).send();
            } catch (err) {
                return res.status(400).json({error: `${err.message}`});
            }
        }
    },

    async delete(req,res){
        const { name } = req.params;

        try {
            const queue = connection('queues')
                            .select('name')
                            .where('name', name);
            
            if(queue.length == 0){
                return res.status(401)
                            .json({error: "Não existe registro com esse nome"});
            }
        } catch (err) {
            return res.status(400)
                        .json({error: err});
        }
        try{
            await connection('queues')
                    .where('name', name)
                    .delete()

            return res.status(204).send()
        } catch(err){
            return res.status(400).json({error: `${err}`});
        }
    },

    async update (req, res) {
        const params = req.body
        const { name } = req.params
        try {
            const queue = await connection('queues')
                            .select('name')
                            .where('name', name)
            
            // console.log(params)
            // console.log(name)
            // console.log(queue);

            // Não sei pq, mas o js não está considerando [] como false
            if(queue.length == 0){
                return res.status(401).json({error: "Não existe registro com esse nome para ser atualizado."});
            }

        } catch (err) {
            return res.status(400).json({error: `${err}`})
        }

        try {
            await connection('queues')
                    .where('name', name)
                    .update(params)
            return res.status(204).send()
        } catch (err) {
            return res.status(400).json({error: `${err}`})
        }
    }
}