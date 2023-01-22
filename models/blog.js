const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, { timestamps: true } //automatski generise timestamp za kreiranje i updejtovanje vremena gdje se automatski popunjava polje
);

const Blog = mongoose.model('Blog', blogSchema) //ime bitno jer će po pluralu tražiti ga u bazi tj blogs
module.exports = Blog;