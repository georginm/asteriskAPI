// Update with your config settings.
require('dotenv/config');

module.exports = {
    development: {
        client: 'postgresql',
        connection: {
            database    : process.env.DB_DATABASE,
            user        : process.env.DB_USER,
            password    : process.env.DB_PASSWORD,
        },
        migrations: {
            directory: './database/migrations',
        }
      },
  
    staging: {
        client: 'postgresql',
        connection: {
            database    : process.env.DB_DATABASE,
            user        : process.env.DB_USER,
            password    : process.env.DB_PASSWORD,
        },
        migrations: {
            directory: './database/migrations',
        }
    },
  
    production: {
        client: 'postgresql',
        connection: {
            database    : process.env.DB_DATABASE,
            user        : process.env.DB_USER,
            password    : process.env.DB_PASSWORD,
        },
        migrations: {
            directory: './database/migrations',
        }
    }
};