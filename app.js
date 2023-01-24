const express = require('express');
const mongoose = require('mongoose')
const Blog = require('./models/blog');
const { json } = require('express');

const app = express();

//connect to mongo db
const dbURI = 'mongodb+srv://vlado:<password>@cluster0.adfdnbe.mongodb.net/node-tutorial?retryWrites=true&w=majority'
mongoose.connect(dbURI).then((result) => {
    app.listen(3008);
    console.log("connected to DB")
}).catch(err => {
    console.log(err);
}
);

//register view engine
app.set('view engine', 'ejs') //configure app setings this time ejs view engine (expres default look into views folder)
//app.set('views', 'ime_foldera_gdje_se_cuvaju_views') ukoliko nije views defultni

// listen for requests
// app.listen(3008)


// mongoose and mogo sadbox routes
/* app.get('/add-blog', (req, res) => {
    const blog = new Blog({
        title: 'new blog',
        snippet: 'abbout my new blog',
        body: 'more about my new blog'
    });
    blog.save()
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            console.log(err);
        });
})

//all blogs
app.get('/all-blogs', (req, res) => {
    Blog.find()
        .then(result => {
            res.send(result);
        })
        .catch(err => {
            console.log(err);
        })
})
//single blog
app.get('/single-blog', (req, res) => {
    Blog.findById('63cc343cb645f9edd3e35c82')//kao string proslijediti parametar id
        .then(result => {
            res.send(result)
        })
        .catch(err => {
            console.log(err)
        })
})
 */
//middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }))
//custom middleware
/* app.use((req, res, next) => {
    console.log("new request made: ")
    console.log("host: ", req.hostname)
    console.log("path: ", req.path)
    console.log("method: ", req.method)
    next();//next funkcija govori da se ne zaustavi kad izvrsi ovaj mddleware nego da ide dalje krozkod
}); */

//listening get requests
app.get('/', (req, res) => {
    res.redirect('/blogs');
});
app.get('/', (req, res) => {
    redirect('/blogs', (req, res) => {
        Blog.find()
            .then(result => {
                res.render('index', {
                    title: 'All Blogs',
                    blogs: result
                })
            })
            .catch(err => {
                console.log(err)
            })
    })
    // res.send('<p>Home page</p>')
    //res.sendFile('./views/index.html', { root: __dirname })
    /* const blogs = [
        { title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur' },
        { title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur' },
    ];
    res.render('index', { title: "Home", blogs }); //views rendering sa ejs umijesto starog nacina sa sendFile */
});
app.get('/about', (req, res) => {
    // res.send('<p>Home page</p>')
    // res.sendFile('./views/about.html', { root: __dirname })
    res.render('about', { title: "About" });
});

//blog routes
app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
});
app.post('/blogs', (req, res) => {
    const blog = new Blog(req.body);
    blog.save()
        .then(result => {
            res.redirect('/blogs');
        })
        .catch(err => {
            console.log(err);
        });
})
app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({ redirect: '/blogs' });
        })
        .catch(err => {
            console.log(err);
        });
});


app.get('/blogs/:id', (req, res) => { //ako stoji :nesto dole mora biti
    const id = req.params.id            // :req.params.nesto
    Blog.findById(id)
        .then(result => {
            res.render('details', { blog: result })
        })
})
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
        .then(result => {
            res.render('index', { blogs: result, title: 'All blogs' });
        })
        .catch(err => {
            console.log(err);
        });
});


// 404
app.use((req, res) => { //midlewere function
    // res.send('<p>Home page</p>')
    // res.sendFile('./views/404.html', { root: __dirname })
    res.status(404).render('404', { title: "404" });
})
