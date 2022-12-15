import { SIZES, SIZE_MOBILE, POSITIONS } from '../utils/consts';

export default class CanvasScaler {
  constructor(app, container) {
    this.renderer = app.renderer;
    this.app = app;
    this.defaultRationLandscape = SIZES.width / SIZES.height;
    this.defaultRationPortrait = SIZE_MOBILE.width / SIZE_MOBILE.height;
    this.parentContainer = container;
    this.dynamicElements = [];
    console.log(this.parentContainer);
    this.eventDesktop = new CustomEvent('desktop');
    this.eventMobile = new CustomEvent('mobile');
    this.resizeHandler();
    window.addEventListener('resize', () => {
      this.resizeHandler();
    }, false);
  }

  resizeHandler() {
    let w = window.innerWidth;
    let h = window.innerHeight;

    let scaleFactor;
    let newWidth;
    let newHeight;

    const ratio = window.innerWidth / window.innerHeight;

    if (window.innerWidth > window.innerHeight) {
      if (ratio >= this.defaultRationLandscape) {
        w = window.innerHeight * this.defaultRationLandscape;
      } else {
        h = window.innerWidth / this.defaultRationLandscape;
      }

      this.app.view.width = 2780;
      this.app.view.height = 1280;

      this.parentContainer.x = 0;
      this.parentContainer.y = 0;
      this.parentContainer.pivot.x = 0;
      scaleFactor = Math.min(
        window.innerWidth / SIZES.width,
        window.innerHeight / SIZES.height,
      );
      newWidth = Math.ceil(SIZES.width * scaleFactor);
      newHeight = Math.ceil(SIZES.height * scaleFactor);
      this.renderer.resize(newWidth, newHeight);
      this.recalculatePositionsSprite(false);
    } else {
      if (ratio > this.defaultRationPortrait) {
        w = window.innerHeight * this.defaultRationPortrait;
      } else {
        h = window.innerWidth / this.defaultRationPortrait;
      }
      scaleFactor = Math.min(
        window.innerWidth / SIZE_MOBILE.width,
        window.innerHeight / SIZE_MOBILE.height,
      );
      newWidth = Math.ceil(SIZE_MOBILE.width * scaleFactor);
      newHeight = Math.ceil(SIZE_MOBILE.height * scaleFactor);
      // newHeight /= 1.2;
      // newWidth /= 1.2;
      scaleFactor *= 1.25;
      this.renderer.resize(newWidth, newHeight);
      this.parentContainer.pivot.x = (this.parentContainer.width / scaleFactor) / 2;
      this.parentContainer.pivot.y = -2;
      console.log(newWidth, newHeight, w, h, scaleFactor);
      //   document.dispatchEvent(this.eventMobile);
      this.recalculatePositionsSprite(true);
    }

    this.parentContainer.scale.set(scaleFactor);
    this.parentContainer.x = 0;

    console.log(this.parentContainer);

    this.app.view.style.width = `${w}px`;
    this.app.view.style.height = `${h}px`;
  }

  addDynamicElement(element) {
    this.dynamicElements.push(element);
  }

  recalculatePositionsSprite(isMobile) {
    console.log(this.dynamicElements);
    this.dynamicElements.forEach((item) => {
      const size = isMobile ? POSITIONS[item.name].MOBILE : POSITIONS[item.name].DESKTOP;
      console.log(item);
      if (size) {
        item.x = size.x;
        item.y = size.y;
      }
    });
  }
  // Create the event

  // Dispatch/Trigger/Fire the event

  // The dynamic width and height lets us do some smart
  // scaling of the main game content; here we're just
  // using it to maintain a 9:16 aspect ratio and giving
  // our scenes a 375x667 stage to work with
}
