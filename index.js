const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')

const methodOverride = require('method-override')

app.use(methodOverride('_method'))
app.set('view engine', 'ejs')
app.use(ejsLayouts)
//body-parser middleware
app.use(express.urlencoded({extended: false}))

app.get('/home', (req, res)=>{
    res.render('home')
})

app.use('/dinosaurs', require('./controllers/dinosaurs'))

app.use('/prehistoric_creatures', require('./controllers/prehistoric_creatures'))

app.listen(8000, ()=> {
    console.log('You are listening to port 8000')
})

