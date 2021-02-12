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
  let allBurgers = await orm.getAll();
  let burgerNames = allBurgers.map(burgerObject => {
    // Replace space with _ in burger name for URL purposes.
    let burgerURL = "/" + burgerObject.burger.replace(' ', '_');
    return {
      burger: burgerObject.burger,
      url: burgerURL
    };
  });

  res.render('index', {
    burgers: burgerNames
  });
});

// I'm too lazy to set up a proper DELETE request in index.handlebars.
// Besides this is html's fault for not supporting DELETE in forms.
app.get('/:burgerURL', async (req, res) => {
  let burgerName = req.params.burgerURL.replace('_', ' ');
  await orm.devour(burgerName);
  res.redirect('/');
})

// Adding a burger.
app.post('/', async (req, res) => {
  let newBurger = req.body.task;
  await orm.addBurger(newBurger);
  res.redirect('/')
})


app.listen(PORT, () =>
  console.log(`Server listening on: http://localhost:${PORT}`)
);