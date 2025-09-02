/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use("admin");

// Example: Find all roles
db.getCollection("roles").find({});

// Remove BAN_USER from all permissions in the role
// db.getCollection("roles").updateOne(
//   { "name": "User and role manager" },
//   { $pull: { "permissions.$[].actions": "BAN_USER" } }
// );

// Example: Find roles with specific criteria
// db.getCollection("roles").find({ "name": "admin" });

// Example: Insert a new role
// db.getCollection("roles").insertOne({
//   "name": "moderator",
//   "permissions": ["read", "write"],
//   "createdAt": new Date()
// });

// Example: Update a role
// db.getCollection("roles").updateOne(
//   { "name": "admin" },
//   { $set: { "permissions": ["read", "write", "delete", "admin"] } }
// );

// Example: Delete a role
// db.getCollection("roles").deleteOne({ "name": "moderator" });

// Example: Count total roles
// db.getCollection("roles").countDocuments();

// Example: Find roles with pagination
// db.getCollection("roles").find({}).limit(10).skip(0);

// Example: Find roles sorted by name
// db.getCollection("roles").find({}).sort({ "name": 1 });
