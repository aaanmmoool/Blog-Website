import mongoose from 'mongoose';

declare global {
  var mongoose: {
    conn: any | null;
    promise: Promise<any> | null;
  };
}

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

console.log('MongoDB URI found:', MONGODB_URI ? 'Yes' : 'No');

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    console.log('Using cached database connection');
    return cached.conn;
  }

  if (!cached.promise) {
    console.log('Creating new database connection...');
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
      console.log('Database connected successfully');
      return mongooseInstance;
    }).catch((error) => {
      console.error('Database connection failed:', error);
      throw error;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('Error in dbConnect:', e);
    throw e;
  }

  return cached.conn;
}

export default dbConnect; 