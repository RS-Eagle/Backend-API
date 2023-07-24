import { app } from "./app.js";
import { connectDB } from "./Data/database.js";

connectDB();

app.listen(process.env.PORT);
