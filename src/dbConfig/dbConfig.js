import mongoose from "mongoose";

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const connection = mongoose.connection;

        // console.log(connection);
        connection.on("connected", () => {
            console.log("Database connected successfully");
        })

        connection.on("error", (err) => {
            console.log("Error on connecting the database : " + err);
            process.exit();
        })

    } catch (err) {
        console.log(err);
    }
}

export default connectDb;