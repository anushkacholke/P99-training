const express=require('express')
const app=express();
const port=3000;

app.use(express.json());

app.post('/submit-data',(req,res)=>{
    const userData=req.body;
    console.log('received data: ',userData);
    
    res.status(200).send({
        message: "Data received successfully!",
        receivedData: userData
    });
});

app.listen(port,()=>{
    console.log(`app is running on http://localhost:${port}`);
});