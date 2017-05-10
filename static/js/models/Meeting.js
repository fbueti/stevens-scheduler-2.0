/**
 * Created by austin on 5/1/17.
 */
import moment from 'moment';

function getDurationFromTimeString(stevensDateString) {
  // Todo: Should do with moment
  // correct for UTC
  const splitStr = stevensDateString.split(':');
  const tzOffset = (new Date()).getTimezoneOffset();
  const hours = Number(splitStr[0]) + (tzOffset / 60);
  const mins = Number(splitStr[1]) + (tzOffset % 60);
  return moment.duration(`${hours}:${mins}`);
}

/**
 * Todo: store meetings to have days w/ common meetings in one
 */
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
      this.startDuration = getDurationFromTimeString(data.StartTime);
      this.endDuration = getDurationFromTimeString(data.EndTime);
      this.duration = this.endDuration.subtract(this.startDuration);
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
