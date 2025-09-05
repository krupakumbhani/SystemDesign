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

// Load the package
const customersProto = grpc.loadPackageDefinition(packageDefinition);

// Create client using the correct service name
const client = new customersProto.CustomerService(
  "localhost:30043", // match the server bind address
  grpc.credentials.createInsecure()
);

module.exports =client;