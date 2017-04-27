const { serverUri, database } = config.mongo;
const fullDbUri = `${serverUri}/${database}`;
const options = {};

// Todo: add user / pass for production
// Todo: add promise library
// @see http://mongoosejs.com/docs/connections.html
mongoose.connect(fullDbUri, options);
// Event callbacks
const db = mongoose.connection;
db.on('error', (err) => {
  // Fatal error
  logger.error(`DATABASE: ${err}`);
  process.exit(1);
});
db.once('open', () => {
  logger.log('database', `Connection to ${fullDbUri} successful. `);
});
/**
 * Created by austin on 4/11/17.
 */
