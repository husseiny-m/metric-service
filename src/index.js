// import environmental variables from our variables.env file
require('dotenv').config({ path: 'variables.env' });

//Start app
const app = require('./app');

app.set('port', process.env.PORT || 7777);

const server = app.listen(app.get('port'), () => {
  console.log(`Express Server running → Port ${server.address().port}`);
});
