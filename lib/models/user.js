// getting-started.js
var mongoose = require('mongoose');
var schedule = require('schedule');
var logger = require('../utils/loggers').logger;

var userSchema = mongoose.Schema({
    googleUuid:String,
    schedules:[schedule.schema]
});

// NOTE: methods must be added to the schema before compiling it with mongoose.model()
userSchema.methods.addSchedule = function (newSchedule) {
    if(newSchedule instanceof schedule.schema) {
        this.schedules.push(newSchedule);
    } else {
        logger.log("Schedule input is an incorrect type.");
    }
};

userSchema.methods.saveToDB = function () {
    //Saves to the MongoDB
    this.save(function (err, savedUser) {
        if (err) return console.error(err);
        logger.log(savedUser);
    });
};

var User = mongoose.model("User", userSchema);

module.exports = User;
module.exports.schema = userSchema;


