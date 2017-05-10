/**
 * Created by austin on 5/1/17.
 */
import moment from 'moment';

function getDateFromTime(stevensDateString) {
  // correct for UTC
  const splitStr = stevensDateString.split(':');
  const tzOffset = (new Date()).getTimezoneOffset();
  const hoursDate = Number(splitStr[0]) + (tzOffset / 60);
  const minsDate = Number(splitStr[1]) + (tzOffset % 60);
  return moment().hours(hoursDate).minutes(minsDate);
}

class Meeting {
  constructor(data, day) {
    data = data.$;
    this.activity = data.Activity;
    this.building = data.Building;
    this.site = data.Site;
    this.day = day;
    if (data.StartTime) {
      this.hasMeetings = true;
      // Stored in a moment object, ignore date, just hours minutes
      this.startTime = getDateFromTime(data.StartTime);

      const startDur = moment.duration(data.StartTime.split('Z')[0]);
      const endDur = moment.duration(data.EndTime.split('Z')[0]);
      this.duration = endDur.subtract(startDur);
    } else {
      // No physical meetings
      this.hasMeetings = false;
    }
  }

  static getMeetingDayString(data) {
    return data.$.Day;
  }
}

export default Meeting;
