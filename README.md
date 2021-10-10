# elmenus_task

## Start Application Guide:

1. "git clone" repository on your device
2. run "docker-compose up -d" inside cloned repository
3. Postman APIs collection && ERD Diagram can be found "/nodejs-server/docs"
4. nodejs-server-dev is the main-app, it waits for mysql to be up and haelthy, then the main-app will appear in docker hub

## Docker-compose file:

There are 4 services that should be up and running:

1. nodejs-server-dev --> The main application
2. mysql-database-dev --> Database used with main app
3. mysql-adminer --> Admin portal for database @localhost:8080
4. nodejs-server-test --> Service that runs unit/integration tests

## Open database admin portal:

1. Go to "localhost:8080" on browser
2. Enter the following:
   System: MySQL
   Server: mysql-database
   Username: root
   Password: mostafa1996
   Database: test_db

## Project Structure:

- nodejs-server is the node application
- config directory --> catch exported environment variables to be used for project setup
- database directory --> setup "Sequelize" orm
- docs directory --> contains project documentation (ERD diagram & Postman APIs collection)
- errors directory --> defining errors needed in the project
- models directory --> database models
- server directory --> the source code for the project

###### Server Directory:

- adapters: any calls to the external should be executed here (database calls)
- validators: validate business logic (Fraud + Validation Rules set by business)
- controllers: contains business logic
- routers: routes entrypoint (route request to be processed)
- schemas: Validation on input payload received from and call made to this application
- startup: initialising express application and adding all express middlewares
- index.js: server creation

###### Process Flow:

- External request received --> routers --> schemas (input parameters validation) -->
- controllers --> validators (execute business logic validations)
- controllers --> adapters --> database
