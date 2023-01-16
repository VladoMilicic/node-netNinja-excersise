const http = require('http');
const server = http.createServer((req, res) => {
    console.log('request made');
    console.log(req);
});


server.listen(3005, 'localhost', () => {
    console.log('listening for req on 3005 port')
})