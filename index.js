require("dotenv").config();
const express = require("express");
const connectDb = require("./db/db");
const generateAdmin = require("./utils/seedAdmin");
const auth = require("./routes/authroutes");
const userRoutes = require("./routes/userroutes");
const purchaseRoutes = require("./routes/purchaseroutes");
const transferRoutes = require("./routes/transferroutes");
const assignRoutes = require("./routes/assignroutes");
const app = express();

app.use(express.json());

app.use("/api/auth", auth);
app.use("/api/admin/users",userRoutes);
app.use("/api/purchase", purchaseRoutes);
app.use("/api/transfer", transferRoutes);
app.use("/api/assign", assignRoutes);


const PORT = process.env.PORT  || 5000;
connectDb().then(async ()=>{
    await generateAdmin();

     app.listen(PORT, ()=>{
     console.log(`Server is running on port ${PORT}`)
    });
});

