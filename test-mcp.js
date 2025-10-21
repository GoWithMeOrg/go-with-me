#!/usr/bin/env node

// Test script for MongoDB MCP server
const { spawn } = require('child_process');

console.log('Testing MongoDB MCP Server...\n');

// Test if mongodb-mcp-server is available
const testMCP = spawn('npx', ['mongodb-mcp-server', '--version'], {
  stdio: ['pipe', 'pipe', 'pipe']
});

testMCP.stdout.on('data', (data) => {
  console.log('✅ MCP Server Version:', data.toString().trim());
});

testMCP.stderr.on('data', (data) => {
  console.log('ℹ️  MCP Server Info:', data.toString().trim());
});

testMCP.on('close', (code) => {
  if (code === 0) {
    console.log('\n✅ MongoDB MCP Server is working correctly!');
    console.log('\nNext steps:');
    console.log('1. Make sure you have MONGODB_URI in your .env.local file');
    console.log('2. In Cursor, go to Settings > Extensions > MCP');
    console.log('3. Add MongoDB MCP server with command: mongodb-mcp-server');
    console.log('4. Set args: --uri ${env:MONGODB_URI}');
    console.log('\nYou can also use the mcp-config.json file in your project root.');
  } else {
    console.log('\n❌ MCP Server test failed with code:', code);
  }
});

testMCP.on('error', (error) => {
  console.error('❌ Error running MCP server:', error.message);
});
