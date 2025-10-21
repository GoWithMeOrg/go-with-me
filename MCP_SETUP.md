# MongoDB MCP Setup for Cursor

This guide explains how to set up MongoDB MCP (Model Context Protocol) integration with Cursor, allowing the AI to directly interact with your MongoDB database.

## What is MCP?

MCP (Model Context Protocol) is a standardized way for AI models to interact with external data sources and tools. With MongoDB MCP, Cursor can:

- Query your database directly
- Insert, update, and delete documents
- Run aggregation pipelines
- List collections and databases
- Perform real-time database operations

## Prerequisites

1. **MongoDB Database**: Running locally or on Atlas
2. **Environment Variables**: `MONGODB_URI` configured
3. **Node.js**: Version 20 or higher
4. **Cursor**: Latest version with MCP support

## Installation

### 1. Install Dependencies

```bash
# Install MongoDB MCP server
npm install mongodb-mcp-server --save-dev

# Install MCP SDK
npm install @modelcontextprotocol/sdk --save-dev
```

### 2. Environment Configuration

Create or update your `.env.local` file:

```bash
# For local MongoDB
MONGODB_URI=mongodb://localhost:27017/your_database_name

# For MongoDB Atlas
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/your_database_name?retryWrites=true&w=majority
```

### 3. Cursor MCP Configuration

In Cursor, go to **Settings > Extensions > MCP** and add:

- **Name**: `mongodb`
- **Command**: `mongodb-mcp-server`
- **Args**: `--uri ${env:MONGODB_URI}`

Alternatively, you can use the `mcp-config.json` file in your project root.

## Usage

### Starting the MCP Server

```bash
# Start MongoDB MCP server
npm run mcp:start

# Or run directly
npx mongodb-mcp-server --uri "your_mongodb_uri"
```

### Available MCP Commands

Once configured, you can use these commands in Cursor:

- **Query Documents**: `mcp_mongodb_find`
- **Insert Documents**: `mcp_mongodb_insert`
- **Update Documents**: `mcp_mongodb_update`
- **Delete Documents**: `mcp_mongodb_delete`
- **Aggregation**: `mcp_mongodb_aggregate`
- **List Collections**: `mcp_mongodb_list_collections`
- **List Databases**: `mcp_mongodb_list_databases`

### Example Queries

In Cursor chat, you can now ask:

```
"Show me all users from the users collection"
"Insert a new event into the events collection"
"Update the user with email 'john@example.com'"
"Count total events in the events collection"
"Find events happening this week"
```

## Troubleshooting

### Common Issues

1. **Connection Failed**: Check your `MONGODB_URI` and ensure MongoDB is running
2. **Permission Denied**: Verify your MongoDB user has appropriate permissions
3. **MCP Server Not Found**: Ensure `mongodb-mcp-server` is installed globally or locally

### Debug Mode

Run the MCP server with debug logging:

```bash
npx mongodb-mcp-server --uri "your_uri" --debug
```

### Check MCP Status

In Cursor, check the MCP status in **Settings > Extensions > MCP** to ensure the server is connected.

## Security Considerations

- **Environment Variables**: Never commit `.env.local` to version control
- **Database Permissions**: Use read-only users for production MCP connections
- **Network Security**: Ensure MongoDB is not exposed to the public internet
- **Authentication**: Use strong passwords and enable MongoDB authentication

## Advanced Configuration

### Custom MCP Server Options

You can customize the MCP server behavior by modifying the `mcp-config.json`:

```json
{
  "mcpServers": {
    "mongodb": {
      "command": "mongodb-mcp-server",
      "args": [
        "--uri", "${env:MONGODB_URI}",
        "--timeout", "30000",
        "--maxPoolSize", "10"
      ]
    }
  }
}
```

### Multiple Database Connections

You can configure multiple MongoDB connections:

```json
{
  "mcpServers": {
    "mongodb-main": {
      "command": "mongodb-mcp-server",
      "args": ["--uri", "${env:MONGODB_URI_MAIN}"]
    },
    "mongodb-analytics": {
      "command": "mongodb-mcp-server",
      "args": ["--uri", "${env:MONGODB_URI_ANALYTICS}"]
    }
  }
}
```

## Support

For issues with:
- **MCP Protocol**: Check [MCP Documentation](https://modelcontextprotocol.io/)
- **MongoDB MCP Server**: Check [mongodb-mcp-server](https://www.npmjs.com/package/mongodb-mcp-server)
- **Cursor Integration**: Check Cursor's MCP documentation
