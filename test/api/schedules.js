/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const HttpStatus = require('http-status-codes');
const config = require('../../lib/utils/config');
const app = require('../../app');

const expect = chai.expect;
chai.use(chaiAsPromised);
chai.use(chaiHttp);

chai.should();

describe('Schedules API', () => {

});
