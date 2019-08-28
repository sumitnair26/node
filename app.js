const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type','text/html');
        res.write('<html>');
        res.write('<body><h2>Hello !!!! from my Node.js Server ddsdsdsds</h2></body>');
        res.write('<body><form action="/message" method="POST" ><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if(url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) =>{
            console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('message.txt',message);
            res.statusCode = 302;
            res.setHeader('Location', '/');
            return res.end();
        });
    }

   res.setHeader('Content-Type','text/html');
   res.write('<html>');
   res.write('<head><title>My First Node Page</title></head>');
   res.write('<body><h2>Hello !!!! from my Node.js Serve</h2></body>');
   res.write('</html>');
   res.end();
});

server.listen(9600);