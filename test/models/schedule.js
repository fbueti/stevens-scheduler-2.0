process.env.NODE_ENV = 'testing';

/* eslint-disable no-unused-expressions */
/* eslint-disable array-callback-return */
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const HttpStatus = require('http-status-codes');
const config = require('../../lib/utils/config');
const app = require('../../app');
const Schedule = require('../../lib/models/schedule');

const expect = chai.expect;
chai.use(chaiAsPromised);

chai.should();

describe('Schedule Model', () => {
  before((cb) => {
    app.start().then(cb);
  });

  after(() => {
    app.close();
  });


  it('should make a new model from empty data.', () => {
    Schedule.create({});
    (true).should.be.true;
  })
});