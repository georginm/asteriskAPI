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

    # For Asterisk 13 and 14...
    $ ./configure --with-pjproject-bundled
    # For Asterisk 15+...
    $ ./configure
    $ make && make install

  Check if asterisk is running
  ----------------------------

    /etc/init.d/asterisk status

    # Caso não esteja:
    /etc/init.d/asterisk start


Installing and Using Alembic and run migrations
============================

  If you use python 2 it may be necessary to install typing and psycopg2. Because in some cases python n makes these libs available by default. I solved it using the following commands:

    For typing:

      try:

      pip install typing

      If it doesn't work

      wget https://bootstrap.pypa.io/pip/2.7/get-pip.py
      and then run python get-pip.py

    For psycopg2

      Step 1
      sudo apt-get install build-dep python-psycopg2

      Step 1
      pip install psycopg2-binary

  https://wiki.asterisk.org/wiki/display/AST/Setting+up+PJSIP+Realtime

  if you use python 2 it may be necessary to install typing and psycopg2
Config API connection
=============================

Create an .env file at the source of the project and add the following information

If you use a database other than Postgres see the official adonis documentation to configure your database:

https://docs.adonisjs.com/guides/database/introduction

Validating environment variables

https://docs.adonisjs.com/guides/environment-variables#sidenav-open

  For the purposes of asterisk in our case it is necessary to add some information to some tables in our database.

  First we must create a sequence for the uniqueid field of the queue_members table. We use the following query:  

    CREATE SEQUENCE queue_members_seq  owned by queue_members.uniqueid;

    SELECT setval('queue_members_seq', coalesce(max(uniqueid), 0) + 1, false) FROM queue_members;

    ALTER TABLE queue_members alter column uniqueid SET DEFAULT nextval('queue_members_seq');
  
  We also need to add a deleted_at field to queues table and a mac_address field to ps_endpoints table:
  
    ALTER TABLE queues ADD COLUMN deleted_at varchar(31) DEFAULT null;

    ALTER TABLE ps_endpoints ADD COLUMN mac_address varchar(18) unique;


