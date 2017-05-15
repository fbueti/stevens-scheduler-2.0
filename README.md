# Stevens Scheduler 2.0

## Running
### Private Keys
`keys.private.env` holds all environmental keys needed to access 3rd party
services (aka Google). They are loaded in at runtime. Please do not abuse them.

### Node scripts
- `dev-build`: builds the frontend with development config
- `build`: builds the frontend with a production config
- `test`: runs the (almost unwritten) test suite
- `clean`: removes log files
- `start`: runs the server in whichever env is in environment
- `start-prod`: runs under production. Frontend must already be built.
- `start-dev`: runs under development

### Dependencies
*devDependencies* are all testing libraries and frontend build / requirement
libraries. In production, the frontend will have already been built into
bundles.

*dependencies* are all that's necessary for a production environment.

## Notes
In later version, the client will be migrated to a single page app.

## Dev notes

### Logging
The `lib/utils/loggers` module exports two loggers:
* httpLogger -> Use for express middleware
* logger -> General purpose `console.log` replacement
    * `logger.log('database', ...message)` for all database related messages
    * `logger.error(...message)` for all errors
    * `logger.info(...message)` for all general messages