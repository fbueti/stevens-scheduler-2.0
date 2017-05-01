/**
 * Created by austin on 5/1/17.
 */
const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const createError = require('http-errors');
const request = require('request-promise-native');
const {xmlDataToJSON} = require('xml-to-json-promise');

/**
 * A layer for interacting with the Stevens API
 * They don't have cors enabled so needs to be done server-side
 */

const STEVENS_BASE_URL = 'https://web.stevens.edu/scheduler/core/core.php?cmd=';
const STEVENS_TERMS_URL = `${STEVENS_BASE_URL}terms`;
const STEVENS_SEMESTER_URL = `${STEVENS_BASE_URL}getxml&term=`;

router.get('/courses/terms', (req, res, next) => {
  request.get(STEVENS_TERMS_URL)
  // Parse XML to JSON
      .then(xmlDataToJSON)
      .then((termsRes) => {
        if (termsRes.Errors) {
          next(createError(HttpStatus.INTERNAL_SERVER_ERROR, "Can't get terms from the Stevens API."));
        } else {
          res.status(200).json({terms: termsRes.Terms.Term});
        }
      })
      .catch((err) => {
        throw createError(HttpStatus.INTERNAL_SERVER_ERROR, `Problem getting terms from the Stevens API: ${err}`)
      });
});

router.get('/courses/semester/:term', (req, res, next) => {
  const term = req.params.term;
  request.get(`${STEVENS_SEMESTER_URL}${term}`)
      .then(xmlDataToJSON)
      .then((semesterRes) => {
        // Stevens is so dumb and doesn't set error codes correctly
        if (semesterRes.Errors) {
          next(createError(HttpStatus.NOT_FOUND, `Can't get Semester ${term} from the Stevens API.`));
        } else {
          res.status(200).json({semester: semesterRes.Semester});
        }
      })
      .catch((err) => {
        throw createError(HttpStatus.INTERNAL_SERVER_ERROR, `Can't get Semester ${term} from the Stevens API: ${err}`)
      });
});

module.exports = router;
