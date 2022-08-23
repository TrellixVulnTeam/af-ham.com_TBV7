if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override'); 
const ejsMate = require('ejs-mate');  


app.engine('ejs', ejsMate); 
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method')); 


//serve static assets from public folder 
app.use(express.static(path.join(__dirname, 'public'))); 

app.get('/', (req,res) => {
    res.render('home'); 
})

app.get('/contact', (req,res) => {
    res.render('contact'); 
})

 
app.use((err,req,res,next)=> {
    const {statusCode = 500} = err; 
    if (!err.message) {err.message = 'Oh No! Something Broke :/' };  
    res.status(statusCode).render('error',{err});
})

const port = process.env.PORT || 3000; 
app.listen(port, () => {
    console.log(`App Listening on ${port}`);
})

