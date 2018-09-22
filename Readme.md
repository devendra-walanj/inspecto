**Inspection Inc. : Inspecto**
Welcome to the Inspecto API

---
**APIs Available :**
* POST /authPerson : Allows you to register a new Authentication User / Person with EmailID/password
* GET /authPerson : Get the List of Authenication User / People
* POST /authPerson/login : Login User - Verifies the hasded password
* GET /inspect : Get the list of inspection from the provided search criteria
* POST /inspect : Adds the inspection records.


**Access Information :**
* Restore the provided dump from /documents using mongorestore 
* Postman Collection and Environment are in Documents folder
* User EmailID: authPerson001@inspecto.com
* JWT Token to pass in header while using the /inspect endpoint 
  * x-auth: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YmE0YzRlMDBkMmU3ODA0YWQ1NzIwMjQiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTM3NTI0OTYwfQ.7cvE5dV4sYgIGnX9WGSXszbMF9qBxSHpqq-FMBnuZms