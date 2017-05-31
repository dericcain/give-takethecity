export default class URlParser {

  constructor(queryString: string) {
    this.params = new URLSearchParams(queryString);
  }

  designation() {
    return this.params.get('designation');
  }

  amount() {
    return parseInt(this.params.get('amount'));
  }
}
