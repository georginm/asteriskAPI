Asterisk API
=========================

API developed to perform CRUD on Asterisk database tables. Asterisk is a free, open source software that implements in software the features found in a conventional PBX, using VoIP technology.

At the moment the api is under construction.

Install Asterisk 18
=========================

  Create a Folder
  ---------------

    sudo mkdir /usr/src/asterisk
    cd /usr/src/asterisk

  Download Package:
  -----------------

    wget https://downloads.asterisk.org/pub/telephony/asterisk/asterisk-18-current.tar.gz

  Unzip the file
  --------------

    tar -zxvf asterisk-18-current.tar.gz
    cd asterisk-18.4.0/

  Use the following commands (install gcc if necessary)
  --------------------------------------------

    ./contrib/scripts/install_prereq install

    ./contrib/scripts/install_prereq install-unpackaged

    ./configure --with-jansson-bundled

    make && make install

    make samples

  Install o initscript
  --------------------

    make config

  Asterisk Log Manager
  --------------------
  
    make install-logrotate

  Check if asterisk is running
  ----------------------------

    /etc/init.d/asterisk status

    # Caso não esteja:
    /etc/init.d/asterisk start


Installing and Using Alembic and run migrations
============================

  https://wiki.asterisk.org/wiki/display/AST/Setting+up+PJSIP+Realtime

Config API connection
=============================

Create an .env file at the source of the project and add the following information

If you use a database other than Postgres see the official adonis documentation to configure your database:

https://docs.adonisjs.com/guides/database/introduction

Validating environment variables

https://docs.adonisjs.com/guides/environment-variables#sidenav-open


  API Server
  ----------

    PORT=
    HOST=
    NODE_ENV=development
    APP_KEY=ecbPKAuB0-4Bix0RsUOcdTiA2yxKN_Wk

  Database informations
  ---------------------

    DB_CONNECTION=pg
    PG_HOST= your_db_host
    PG_PORT= your_db_port
    PG_USER= your_db_user
    PG_PASSWORD= your_db_password
    PG_DB_NAME= your_db_name


  For the purposes of asterisk in our case it is necessary to add some information to some tables in our database.

  First we must create a sequence for the uniqueid field of the queue_members table. We use the following query:  

    CREATE SEQUENCE queue_members_seq  owned by queue_members.uniqueid;

    SELECT setval('queue_members_seq', coalesce(max(uniqueid), 0) + 1, false) FROM queue_members;

    ALTER TABLE queue_members alter column uniqueid SET DEFAULT nextval('queue_members_seq');
  
  We also need to add a deleted_at field to queues table and a mac_address field to ps_endpoints table:
  
    ALTER TABLE queues ADD COLUMN deleted_at varchar(31) DEFAULT null;

    ALTER TABLE ps_endpoints ADD COLUMN mac_address varchar(18) unique;


