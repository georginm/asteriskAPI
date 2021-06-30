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

    * Asterisk Log Manager
    make install-logrotate

  Check if asterisk is running
  ----------------------------

    /etc/init.d/asterisk status

    # Caso não esteja:
    /etc/init.d/asterisk start


Installing and Using Alembic
============================

  https://wiki.asterisk.org/wiki/display/AST/Setting+up+PJSIP+Realtime


  - Migration files are available within this project
    cd app/database/asterisk-db-manager
