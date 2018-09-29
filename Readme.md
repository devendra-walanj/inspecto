**Inspection Inc. : Inspecto**
Welcome to the Inspecto API

---
**APIs Available :**
* POST /authPerson : Allows you to register a new Authentication User / Person with EmailID/password
* GET /authPerson : Get the List of Authenication User / People
* POST /authPerson/login : Login User - Verifies the hasded password
* GET /inspect : Get the list of inspection from the provided search criteria
* POST /inspect : Adds the inspection records.

**MySQL Scope is only for inspection table only and not for user authentication **

**Configuration and Access Information :**
* Restore the provided dump from /documents using mongorestore 
* Create and prepare the database in mySQL from the documents/dump/mySQL folder.
* Change the mySQL Connection accordingly in config.json
* Postman Collection[updated] and Environment are in Documents folder
* if you require to switch to back to mongoDB please change the variable ignoreRouteFile at ../codeSrc/routes/load.routes.js.
* User EmailID: authPerson001@inspecto.com
* JWT Token to pass in header while using the /inspect endpoint 
  * x-auth: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmE0YzRlMDBkMmU3ODA0YWQ1NzIwMjQiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTM3NTI0OTYwfQ.7cvE5dV4sYgIGnX9WGSXszbMF9qBxSHpqq-FMBnuZms