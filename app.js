const express = require('express');


const app = express()


//register view engine
app.set('view engine', 'ejs') //configure app setings this time ejs view engine (expres default look into views folder)
//app.set('views', 'ime_foldera_gdje_se_cuvaju_views') ukoliko nije views defultni

//listen for requests
app.listen(3008)

//static files
app.use(express.static('public'))

//custom middleware
app.use((req, res, next) => {
    console.log("new request made: ")
    console.log("host: ", req.hostname)
    console.log("path: ", req.path)
    console.log("method: ", req.method)
    next();//next funkcija govori da se ne zaustavi kad izvrsi ovaj mddleware nego da ide dalje krozkod
});

//listening get requests
app.get('/', (req, res) => {
    // res.send('<p>Home page</p>')
    //res.sendFile('./views/index.html', { root: __dirname })
    const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    ];
    res.render('index', { title: "Home", blogs }); //views rendering sa ejs umijesto starog nacina sa sendFile
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