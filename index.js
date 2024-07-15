const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
require("dotenv").config();


const database = require("./config/database");

const systemConfix = require("./config/system");

//import
const routeAdmin = require("./routers/admin/index.route");
const route = require("./routers/client/index.route");

database.connect();

const app = express();
const port = process.env.PORT;

app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.set('views', './views');
app.set('view engine', 'pug');

//App Locals Variable
app.locals.preFixAdmin = systemConfix.preFixAdmin;


app.use(express.static('public'));

//Router
routeAdmin(app);
route(app);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
