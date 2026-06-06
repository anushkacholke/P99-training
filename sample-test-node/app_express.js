const express=require('express');

const app=express();
const port=3000;
app.get('/',(req,res)=>{
    res.send("Hello this is express module");
});

//send json data
app.get('/api/user',(req,res)=>{
    const userData={
        "ID":1,
        "name":"Anushka",
        "age":21
    };
    res.json(userData);
});
    

app.use((req,res)=>{
    res.status(404).send('<h3>404 error</h3>');
});

app.listen(port,()=>{
    console.log(`app runningh on http://localhost:${port}`);
});

// How to run this file:
//node app_express.js
//open browser and go to http://localhost:3000/ to see the output
//http://localhost:3000/api/user to see json data