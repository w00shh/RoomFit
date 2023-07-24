import {makeAutoObservable, runInAction} from 'mobx';

class BLEStore {
  rawdata = [];
  left = 0;
  right = 0;

  constructor() {
    makeAutoObservable(this, {});
  }

  setRawdata(data) {
    runInAction(() => {
      this.rawdata = data;
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
