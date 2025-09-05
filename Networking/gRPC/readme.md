Start server:

node server/index.js


→ 🚀 gRPC Server running at http://127.0.0.1:30043

Start REST API:

node client/index.js


→ 🚀 REST API listening at http://localhost:3000

Test with curl/Postman:


curl http://localhost:3000/
curl -X POST http://localhost:3000/create -H "Content-Type: application/json" -d '{"id":"123","name":"Alice","age":25,"address":"NY"}'
curl -X POST http://localhost:3000/update -H "Content-Type: application/json" -d '{"id":"123","name":"Alice Updated","age":26,"address":"Boston"}'
curl -X POST http://localhost:3000/remove -H "Content-Type: application/json" -d '{"id":"123"}'
