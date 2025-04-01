import { connect } from "mongoose";

const connectDb = async (url) => {
  try {
    await connect(url, {
      autoCreate: true,
    });
  } catch (error) {
    console.error("Error connecting to database: ", error.message);
  }
};

export default connectDb;
