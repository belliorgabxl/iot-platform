import mongoose from "mongoose";

export async function connect() {
    try {
        // Ensure the URI exists in environment variables
        const uri = "mongodb+srv://64011224:gabel1234@cluster0.qpreis9.mongodb.net/auth"
        if (!uri) {
            console.error("MongoDB URI is missing in the environment variables.");
            process.exit(1); // Exit if no URI is found
        }

        // Connect to MongoDB using Mongoose
        await mongoose.connect(uri, {
            // No need to explicitly set useNewUrlParser and useUnifiedTopology in Mongoose 6+
        });

        // Connection events
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected successfully!");
        });

        connection.on("error", (err) => {
            console.error("MongoDB connection error: " + err);
            process.exit(1); // Exit on connection error
        });

    } catch (err) {
        console.error("Error during MongoDB connection:", err);
        process.exit(1); // Exit on any other errors
    }
}