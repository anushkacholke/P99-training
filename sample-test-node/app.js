const http = require('http');   //import lib

const server = http.createServer((req, res) => {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.end('Hello, World!\n');

  const url=req.url;
  const method=req.method;
   //routing logic
   if(url==='/' && method==='GET')
    {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h3>Home page</h3>');
    }
    else if(url==='/about' && method==='GET'){
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h3>About page</h3>');
    }
    else{
        res.writeHead(400,{'content-type':'text/html'});
        res.end('<h3>page not found</h3>');
    }

});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});


//require('httpt')--> node built-in HTTP module
//req--> object containing data from server (something comming from client)
//res-->response - object use to send data back to user
//'Content-Type': 'text/plain'---> sending row-text [content type]
//server.listen(PORT)--> start listening on port 3000



// how to run this : npm satrt