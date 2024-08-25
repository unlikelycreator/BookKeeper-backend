const { MongoClient } = require('mongodb');

let db;

async function connectDB() {
  try {
    const client = new MongoClient(process.env.MONGO_URI);
    await client.connect();
    console.log('Connected to MongoDB');
    db = client.db('BookKeeper');

    // Close the connection when the server stops
    process.on('SIGINT', async () => {
      await client.close();
      console.log('MongoDB connection closed');
      process.exit(0);
    });
  } catch (err) {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
  }
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB };
