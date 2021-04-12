var mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI, {
    auth: {
      user: "ayushsudhakar",
      password: `${process.env.DB_PASS}`,
    },
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`MongoDB connected: ${conn.connection.host}`.cyan.bold);
};

module.exports = connectDB;
