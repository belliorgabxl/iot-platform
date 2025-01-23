import mongoose from "mongoose";

export async function connect() {
    try {

        const uri = "mongodb+srv://64011224:gabel1234@cluster0.qpreis9.mongodb.net/auth"
        if (!uri) {
            console.error("MongoDB URI is missing in the environment variables.");
            process.exit(1); 
        }


        await mongoose.connect(uri, {
        });
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("MongoDB connected successfully!");
        });

        connection.on("error", (err) => {
            console.error("MongoDB connection error: " + err);
            process.exit(1); 
        });

    } catch (err) {
        console.error("Error during MongoDB connection:", err);
        process.exit(1); 
    }
}