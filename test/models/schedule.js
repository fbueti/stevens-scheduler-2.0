const mongoose = require('mongoose');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const chaiHttp = require('chai-http');
const HttpStatus = require('http-status-codes');
const config = require('../../lib/utils/config');
const { connect, disconnect } = require('../../lib/utils/mongo');
const {schema} = require('../../lib/models/Schedule');
const Schedule = mongoose.model('Schedule', schema);

const expect = chai.expect;
chai.use(chaiAsPromised);

chai.should();

describe('Schedule Model', () => {
  before((cb) => {
    connect();
    cb();
  });

  after((cb) => {
    disconnect();
    cb();
  });

  it('should make a new model from basic data', () => {
    const prom = Schedule.create({ name: 'test', termCode: '2017F' });
    prom.should.eventually.resolve;
    return prom;
  });
});
