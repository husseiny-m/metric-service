const { Port } = require('./app.config');

// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

//Start app
const app = require('./app');

app.set('port', Port);

const server = app.listen(app.get('port'), () => {
  console.log(`Express Server running → Port ${server.address().port}`);
});
