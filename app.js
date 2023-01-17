const express = require('express');


const app = express()

//listen for requests
app.listen(3008)

//listening get requests
app.get('/', (req, res) => {
    // res.send('<p>Home page</p>')
    res.sendFile('./views/index.html', { root: __dirname })
})
app.get('/about', (req, res) => {
    // res.send('<p>Home page</p>')
    res.sendFile('./views/about.html', { root: __dirname })
})
app.use((req, res) => { //midlewere function
    // res.send('<p>Home page</p>')
    res.sendFile('./views/404.html', { root: __dirname })
})
app.get('/about-us', (req, res) => {
    // res.send('<p>Home page</p>')
    res.sendFile('./views/about.html', { root: __dirname })
})