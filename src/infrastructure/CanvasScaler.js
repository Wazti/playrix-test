import { SIZES } from '../utils/consts';

export default class CanvasScaler {
  constructor(app) {
    this.renderer = app.renderer;
    this.app = app;

    this.resizeHandler();
    window.addEventListener('resize', () => {
      this.resizeHandler();
    }, false);
  }

  resizeHandler() {
    console.log(this.renderer);
    // const scaleFactor = Math.min(
    //   window.innerWidth / SIZES.width,
    //   window.innerHeight / SIZES.height,
    // );
    // const newWidth = Math.ceil(SIZES.width * scaleFactor);
    // const newHeight = Math.ceil(SIZES.height * scaleFactor);

    // this.renderer.view.style.width = `${newWidth}px`;
    // this.renderer.view.style.height = `${newHeight}px`;

    // this.renderer.resize(newWidth, newHeight);
    const parent = this.renderer.view;

    // Resize the renderer
    this.renderer.resize(parent.clientWidth, parent.clientHeight);

    // You can use the 'screen' property as the renderer visible
    // area, this is more useful than view.width/height because
    // it handles resolution
    this.renderer.position.set(this.app.screen.width, this.app.screen.height);
    // mainContainer.scale.set(scaleFactor);
  }
}
