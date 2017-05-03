/**
 * Created by austin on 5/1/17.
 */

class Requirement {
  constructor(data) {
    data = data.$;
    this.argument = data.Argument;
    this.control = data.Control;
    this.operator = data.Operator;
  }
}

export default Requirement;
