import {makeObservable, observable} from 'mobx';

class BLEStore {
  left = 0;
  right = 0;

  constructor() {
    makeObservable(this, {
      left: observable,
      right: observable,
    });
  }

  setLeft(data) {
    this.left = data;
  }

  setRight(data) {
    this.right = data;
  }
}

export default new BLEStore();
