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


app.get('/', async (req, res) => {
  let nonDevoured = await orm.getAllDevoured(false);
  let devoured = await orm.getAllDevoured(true);
  let burgerNames = nonDevoured.map(burgerObject => {
    // Replace space with _ in burger name for URL purposes.
    let burgerURL = "/devour/" + burgerObject.burger.replace(' ', '_');
    return {
      burger: burgerObject.burger,
      url: burgerURL
    };
  });
  let devouredNames = devoured.map(burgerObject => {
    return {
      burger: burgerObject.burger
    }
  })

  res.render('index', {
    burgers: burgerNames,
    devouredBurgers: devouredNames
  });
});

// Devour route.
app.get('/devour/:burgerURL', async (req, res) => {
  let burgerName = req.params.burgerURL.replace('_', ' ');
  await orm.devour(burgerName);
  res.redirect('/');
})

// Adding a burger.
app.post('/add', async (req, res) => {
  let newBurger = req.body.add_burger;
  await orm.addBurger(newBurger);
  res.redirect('/')
})


app.listen(PORT, () =>
  console.log(`Server listening on: http://localhost:${PORT}`)
);