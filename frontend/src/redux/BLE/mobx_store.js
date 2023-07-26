import {makeObservable, observable} from 'mobx';

class BLEStore {
  left = 0;
  right = 0;
  animationSelection = 0;

  constructor() {
    makeObservable(this, {
      left: observable,
      right: observable,
      animationSelection: observable,
    });
  }

  setLeft(data) {
    this.left = data;
  }

  setRight(data) {
    this.right = data;
  }

  setAnimationSelection(data) {
    this.animationSelection = data;
  }
}

export default new BLEStore();
