var fs=require('fs');

//synchronous read
console.log("Synchronous file reading: ");
var data=fs.readFileSync('simple.txt');
console.log('Data in the file is: '+data.toString());

//Asynchronous file reading
fs.readFile('simple.txt', function(err,async_data){
    if(err){
        return console.error(err);
    }
    console.log('data : '+async_data.toString());
});
