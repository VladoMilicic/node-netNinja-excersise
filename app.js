const express = require('express');


const app = express()


//register view engine
app.set('view engine', 'ejs') //configure app setings this time ejs view engine (expres default look into views folder)
//app.set('views', 'ime_foldera_gdje_se_cuvaju_views') ukoliko nije views defultni

//listen for requests
app.listen(3008)

//listening get requests
app.get('/', (req, res) => {
    // res.send('<p>Home page</p>')
    //res.sendFile('./views/index.html', { root: __dirname })
    res.render('index', { title: "Home" }); //views rendering sa ejs umijesto starog nacina sa sendFile
})
app.get('/about', (req, res) => {
    // res.send('<p>Home page</p>')
    // res.sendFile('./views/about.html', { root: __dirname })
    res.render('about', { title: "About" });
})
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: "Create new blog" });
})
// 404
app.use((req, res) => { //midlewere function
    // res.send('<p>Home page</p>')
    // res.sendFile('./views/404.html', { root: __dirname })
    res.status(404).render('404', { title: "404" });
})
//stao na 16 min