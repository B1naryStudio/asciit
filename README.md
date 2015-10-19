# Asciit
BSA 2015 Forum Project

### A deployment on a system environment of developer:
1. Clone the repository

    ```
    git clone https://github.com/m1x0n/asciit.git
    ```
    or by ssh:
    ```
    git clone git@github.com:m1x0n/asciit.git
    ```

    The command will create in the recent folder a subfolder where cloned files
     will be placed.

3. Create a local version of the branch `development`

   - Go to the project folder:

        ```
        cd asciit
        ```

   - Create a branch:

        ```
        git checkout development
        ```

2. Install the project dependencies

    ```
    composer install
    ```

4. Create tables in a database

   - Create a database `ascit`
   - Add a file with name `.env` in the main  directory.
   - Add settings from `.env.example` to the file.
   - Change the database settings to correct. For example:

       ```
       DB_HOST=192.168.10.10
       DB_DATABASE=ascit
       DB_USERNAME=homestead
       DB_PASSWORD=secret
       ```

   - run migrations

       ```
       php artisan migrate
       ```

5. Seed the database by a random data

    ```
    php artisan db:seed
    ```

    Test users:

    ```
    email: admin@admin.com
    pass:  admin

    email: cypherpunks01@europe.com
    pass:  cypherpunks01
    ```

    Rest of users have a random email and the password `secret`.

6. Turning on real-time updates

    6.1 Set up a delivery service from an HTTP-server to a WAMP-server

       It is possible to choose a delivery by HTTP-client GOS or the queue server
        ZMQ.

       - Set an appropriate abstract factory
       (```GOSWebSocketFactory``` or ```ZeroMQWebSocketFactory```)
       in ```app/Providers/WebSocketsServiceProvider.php```

    In case you use ZMQ, it is necessary to install ZMQ PHP-extention. There
    is a code for installing on Debian-based systems. Commands and package names
    can be different.

    - Install the ZMQ extension

       ```
       sudo apt-get install gcc make autoconf pkg-config
       sudo apt-get install libzmq-dev
       sudo pecl install zmq-beta
       ```

    -  Add to the setting files ```/etc/php5/cli/php.ini``` and
        ```/etc/php5/fpm/php.ini``` the string ```extension=zmq.so```

    - Create a file with name ```zmq.ini``` in the folder ```/etc/php5/mods-available/```

    - Insert to the file a string ```extension=zmq.so```

    - Restart the PHP daemon:

    ```
    sudo service php5-fpm restart
    ```

    - Check if ZMQ has installed
    ```
    php5 -i | grep zmq
    ```
    You should see the following output:
    ```
    /etc/php5.X-sp/conf.d/zmq.ini
    zmq
    libzmq version => 2.2.0
    ```

    6.2 Run the WAMP-server
       ```
       php artisan sockets:serve
       ```

       **Important:** you have run the command on the same system environment
       as the HTTP-server. Hereby if you're use Homestead, run the command
       on a virtual machine:

       - Connect to the VM by ssh:

       ```
       ssh vagrant@127.0.0.1 -p 2222
       ```

       - Go to the project folder:

       ```
       cd Code/ascit/
       ```

       - Run the WAMP-server

       ```
       php artisan sockets:serve
       ```