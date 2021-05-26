const connection = require('../database/db');

module.exports = {
    async list(request, response){
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

        return response.json(queues);
    },
}