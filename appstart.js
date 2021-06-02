const path = require("path");
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const mongoose = require('mongoose')
const express = require("express");
const jwt = require('jsonwebtoken')
const session = require('express-session')

const bodyparser = require('body-parser');
const bcrypt = require('bcryptjs')
const multer = require("multer")
const upload = multer({ dest: "uploads/" })

const app = express();

const eventDisp = require('./routers/eventTopage')
const User = require('./models/model_admin')
const ticket = require('./routers/ticket_router')
const eventjs = require('./static/js/eventslist')
const ekthemata = require('./routers/ekthemata_router')
const searchrout = require('./routers/searchRout')
const login = require('./routers/logRoute');
const ticketTemp = require('./routers/ticketTempRoote')

const Port = process.env.PORT || 9999;




// const JWT_SECRET = 'sdjkfh8923yhjdksbfma@#*(&@*!^#&@bhjb2qiuhesdbhjdsfg839ujkdhfjk'
// const mongoAtlasUri = "mongodb+srv://StamPap97:Su6GhnY79Jpn3BvE@cluster0.gkcmr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
// mongoose.connect( mongoAtlasUri,{ useNewUrlParser: true, useUnifiedTopology: true },(err) => {
//   if(err){
//     reject(err);
//   }
//   else{
//     console.log(" Mongoose is connected");}
//   })


app.use(session({
  name: 'login_session',
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      sameSite: true,
  }
}));

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'static/index.html'));
});

app.use(express.json())

app.use('/ekthemata',ekthemata);

app.use('/search',searchrout);

app.use('/html/event.html',eventDisp);

app.use('/html/ticket_template.html',ticketTemp);

app.get('/html/login_prot.html',(req,res, next) => {
  console.log('i get it 2')
  if (req.session.loggedUserId) {
      res.redirect('/intermediate')
  }
  next()
})



app.use('/api/give_eventTable',eventjs);

//app.use(express.static(path.join(__dirname, 'static')));

app.listen( Port, err=>{
  if(err){
    return console.log('ERROR',err);
  }else{
  console.log("server has started on ",Port);
  }
});


const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')






app.use((req, res, next) => {
    res.locals.userId = req.session.loggedUserId;
    next();
})

app.use('/', express.static(path.join(__dirname, 'static')))

require('./models/db');

const exhibitsController = require('./controllers/exhibitsController');
const eventsController = require('./controllers/eventsController');
const intermediateController = require('./controllers/intermediateController');

app.use(express.urlencoded({
    extended: true
}));

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/',handlebars: allowInsecurePrototypeAccess(Handlebars)  }));
app.set('view engine', 'hbs');

const admin = require('./models/model_admin');



app.use('/apilog',login);
app.use('/ticket',ticket);

app.use('/exhibits', exhibitsController);
app.use('/events', eventsController);
app.use('/intermediate', intermediateController);




 