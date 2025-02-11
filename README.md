A simple and efficient Contact Book API built with Node.js, Express.js, and MongoDB. This API allows users to create, retrieve, update, and delete (CRUD) contact details effortlessly.
User-Friendly API – Supports full CRUD operations for managing contacts.
MongoDB Integration – Uses Mongoose for seamless database interaction.
RESTful Endpoints – Well-structured and easy-to-use API routes.
Error Handling – Proper status codes and messages for failed operations.
Environment Variables – Uses .env for database configuration security.
Postman Collection – Ready-to-use Postman collection for easy testing.

Tech Stack
Technology	Description
Node.js	JavaScript runtime for backend
Express.js	Web framework for building APIs
MongoDB	NoSQL database for storing contacts
Mongoose	ODM for MongoDB integration
Postman	API testing tool

Installation & Setup
git clone git clone https://github.com/your-username/contact-book-api.git
cd contact-book-server
npm install

API Endpoints
Method	Endpoint	Description
POST	/contacts	Create a new contact
GET	/contacts	Get all contacts
GET	/contacts/:id	Get a specific contact
PUT	/contacts/:id	Update a contact
DELETE	/contacts/:id	Delete a contact

Testing with Postman
1️.Open Postman and import the Postman Collection.
2️.Set the Base URL to http://localhost:5000.
3️.Send requests and check responses. 
