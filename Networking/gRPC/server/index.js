// Path to the proto file (our service + message definitions)
const PROTO_PATH = "./customers.proto";

// Import gRPC and proto loader
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Load and parse the .proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,   // Keep field names as defined in proto (don’t camelCase them)
    longs: String,    // Represent long values as strings
    enums: String,    // Represent enums as strings
    arrays: true      // Always use arrays for repeated fields
});

// Load the package definition into gRPC
const customersProto = grpc.loadPackageDefinition(packageDefinition);

// Sample in-memory customer data (acts like a small DB for now)
const customers = [
    {
        id: 'dfbhjfn',
        name: 'Krupa',
        age: 30,
        address: 'ahmedabad'
    },
    {
        id: 'fjheuf',
        name: 'Mandip',
        age: 30,
        address: 'surat'
    }
];

// Create a new gRPC server instance
const server = new grpc.Server();

// Register our service implementation with the server
// The keys (getAll, get, insert, update, remove) must match the .proto RPC names
server.addService(customersProto.CustomerService.service, {
    GetAll: (call, callback) => {
        callback(null, { customers });
    },

    Get: (call, callback) => {
        const customer = customers.find(c => c.id === call.request.id);
        if (customer) {
            callback(null, customer);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Customer not found"
            });
        }
    },

    Insert: (call, callback) => {
        const newCustomer = call.request;
        customers.push(newCustomer);
        callback(null, newCustomer);
    },

    Update: (call, callback) => {
        const index = customers.findIndex(c => c.id === call.request.id);
        if (index !== -1) {
            customers[index] = call.request;
            callback(null, customers[index]);
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Customer not found"
            });
        }
    },

    Remove: (call, callback) => {
        const index = customers.findIndex(c => c.id === call.request.id);
        if (index !== -1) {
            customers.splice(index, 1);
            callback(null, {});
        } else {
            callback({
                code: grpc.status.NOT_FOUND,
                details: "Customer not found"
            });
        }
    }
});


// Bind the server to a specific host:port and start listening
server.bindAsync(
    "127.0.0.1:30043",
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`🚀 gRPC Server running at http://127.0.0.1:${port}`);
        // server.start(); ❌ Deprecated – no need to call this anymore
    }
);
