
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