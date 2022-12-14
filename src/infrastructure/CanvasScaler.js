import { SIZES, SIZE_MOBILE } from '../utils/consts';

export default class CanvasScaler {
  constructor(app, container) {
    this.renderer = app.renderer;
    this.app = app;
    this.defaultRationLandscape = SIZES.width / SIZES.height;
    this.defaultRationPortrait = SIZE_MOBILE.width / SIZES.height;
    this.parentContainer = container;
    console.log(this.parentContainer);

    this.resizeHandler();
    window.addEventListener('resize', () => {
      this.resizeHandler();
    }, false);
  }

  resizeHandler() {
    let w = window.innerWidth;
    let h = window.innerHeight;

    const ratio = window.innerWidth / window.innerHeight;

    if (window.innerWidth > window.innerHeight) {
      if (ratio >= this.defaultRationLandscape) {
        w = window.innerHeight * this.defaultRationLandscape;
      } else {
        h = window.innerWidth / this.defaultRationLandscape;
      }
      this.parentContainer.width = 1390;
      this.parentContainer.height = 724;
      this.parentContainer.x = 0;
      this.parentContainer.y = 0;
    } else {
      if (ratio > this.defaultRationPortrait) {
        h = window.innerWidth / this.defaultRationPortrait;
      } else {
        w = window.innerHeight * this.defaultRationPortrait;
      }
      console.log(this.defaultRationPortrait);
      // this.parentContainer.width = 540;
      // this.parentContainer.height = 960;
      this.parentContainer.x = 0;
      this.parentContainer.pivot.x = 0;
      this.parentContainer.y = 0;
    }

    console.log(this.parentContainer.width, this.parentContainer.height);
    this.app.view.style.width = `${w}px`;
    this.app.view.style.height = `${h}px`;
  }

  // The dynamic width and height lets us do some smart
  // scaling of the main game content; here we're just
  // using it to maintain a 9:16 aspect ratio and giving
  // our scenes a 375x667 stage to work with
}
