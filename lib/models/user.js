// getting-started.js
var mongoose = require('mongoose');
var schedule = require('schedule');
var logger = require('../utils/loggers').logger;
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  logger.log("Connection Successful");
});

var userSchema = mongoose.Schema({
    googleUuid:String,
    schedules:[schedule.scheduleSchema]
});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
userSchema.methods.addSchedule = function (newSchedule) {
    if(newSchedule instanceof schedule.scheduleSchema) {
        this.schedules.push(newSchedule); 
    } else {
        logger.log("Schedule input is an incorrect type.");
    }
};

userSchema.methods.saveToDB = function () {
    //Saves to the MongoDB
    this.save(function (err, this) {
        if (err) return console.error(err);
        console.log(this);
    });
};

var User = mongoose.model("User", userSchema);

module.exports = User;



