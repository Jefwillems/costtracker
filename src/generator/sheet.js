export default class Sheet {
  constructor(name, others) {
    this.name = name;
    this.others = others;
  }

  get others() {
    return this._others.sort();
  }
  set others(value) {
    this._others = value;
  }
}
