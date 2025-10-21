# MongoDB MCP Setup for Cursor

This document explains how to set up MongoDB MCP (Model Context Protocol) with Cursor to enable AI-powered database interactions.

## What is MCP?

MCP (Model Context Protocol) allows AI models like Cursor to directly interact with external data sources and tools. For MongoDB, this means you can query your database through natural language commands.

## Setup Instructions

### 1. Install Dependencies

```bash
npm run mcp:install
```

### 2. Environment Configuration

Ensure your `.env.local` file contains:

```bash
MONGODB_URI=mongodb://localhost:27017/your_database_name
# or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/your_database_name
```

### 3. Start MCP Server

```bash
npm run mcp:start
```

### 4. Cursor Integration

Once the MCP server is running, Cursor will be able to:

- Query your MongoDB database
- Execute database operations
- Analyze data structures
- Generate database queries
- Perform data migrations

## Usage Examples

### In Cursor, you can now ask:

- "Show me all users in the database"
- "Find events created in the last week"
- "Count the total number of trips"
- "Show the schema of the roles collection"
- "Create an index on the email field for users"

### MCP Commands

The MCP server provides these capabilities:

- **List Collections**: View all collections in your database
- **Query Documents**: Find, filter, and sort documents
- **Aggregation**: Run complex aggregation pipelines
- **Schema Analysis**: Understand your data structure
- **Index Management**: Create and manage database indexes

## Configuration Files

- `mcp-config.json`: MCP server configuration
- `.vscode/settings.json`: VS Code MCP settings
- `package.json`: MCP scripts and dependencies

## Troubleshooting

### Common Issues:

1. **Connection Failed**: Check your `MONGODB_URI` in `.env.local`
2. **Permission Denied**: Ensure your MongoDB user has appropriate permissions
3. **Server Not Starting**: Check if MongoDB is running and accessible

### Debug Mode:

To run MCP server in debug mode:

```bash
DEBUG=* npm run mcp:start
```

## Security Considerations

- MCP server runs locally and only accepts connections from Cursor
- Database credentials are stored in environment variables
- Consider using read-only database users for MCP operations
- Regularly rotate database passwords

## Advanced Configuration

### Custom MCP Server Options:

Edit `mcp-config.json` to customize:

```json
{
  "mcpServers": {
    "mongodb": {
      "command": "npx",
      "args": ["@modelcontextprotocol/server-mongodb"],
      "env": {
        "MONGODB_URI": "${env:MONGODB_URI}",
        "MONGODB_DATABASE": "your_database_name",
        "MCP_LOG_LEVEL": "debug"
      }
    }
  }
}
```

## Resources

- [MCP Documentation](https://modelcontextprotocol.io/)
- [MongoDB MCP Server](https://github.com/modelcontextprotocol/server-mongodb)
- [Cursor MCP Integration](https://cursor.sh/docs/mcp)
