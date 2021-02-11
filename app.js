const express = require('express');
const exphbs = require('express-handlebars');
const orm = require('./config/orm');

const PORT = process.env.PORT || 8080;

let app = express();

// Set Handlebars as the default templating engine.
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index', {
        burgers: burgers
    });
});

orm.addBurger("Double-Double");


app.listen(PORT, () =>
  console.log(`Server listening on: http://localhost:${PORT}`)
);