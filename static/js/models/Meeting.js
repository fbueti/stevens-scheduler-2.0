/**
 * Created by austin on 5/1/17.
 */
class Meeting {
  constructor(data) {
    data = data.$;
    this.activity = data.Activity;
    this.building = data.Building;
    this.site = data.Site;
    this.day = data.Day;
    this.startTime = new Date(data.StartTime);
    this.endTime = new Date(data.EndTime);
  }
}

export default Meeting;
