import express from "express";
// import { errorHandler } from "./utils/apiError.js";
import portsRouter from "./routes/ports.routes.js";

const app=express();
const PORT= 3000;
app.use(express.json());


app.get("/",(req,res)=>{
    res.json({message: "Port API running"});
});

app.use((req, _res,next)=>{
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
 
///       ------------------------             ROUTES                ---------------------

//     mount port routes under /port
app.use("/port",portsRouter);

// export const getAllPorts=(req,res)=>{
//     ok(res, { ports });
// };


//    404 catch all
app.use((_req,res)=>{
    res.status(404).json({ success: false, error: "Route not found" });
})

// app.get("/test-error", (req, res, next) => {
//     next(new Error("Something broke!"));
// });

// // GLOBAL ERROR HANDLER (ALWAYS LAST)
// app.use(errorHandler);


//     Start server
app.listen(PORT, ()=>{
    console.log(`Port API running on http://localhost:${PORT}`);
});