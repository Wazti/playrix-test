import * as PIXI from 'pixi.js';

import TWEEN from '@tweenjs/tween.js';
import LoadingModule from './LoadingModule';
import { SIZES } from '../utils/consts';
import CanvasScaler from './CanvasScaler';
import DecorView from './Views/DecorView';
import InteractiveView from './Views/InteractiveView';
import UIView from './Views/UIView';
import FinalView from './Views/FinalView';

export default class App {
  constructor() {
    this.initialRender();

    this.loaderModule = new LoadingModule();

    this.loaderModule.loadDefault(() => {
      this.setup();
    });
  }

  setup() {
    this.container = new PIXI.Container();

    this.container.sortableChildren = true;
    this.app.stage.addChild(this.container);

    this.decorView = new DecorView(this.app, {
      loaderModule: this.loaderModule,
      container: this.container,
    });

    this.interactiveView = new InteractiveView(this.app, {
      loaderModule: this.loaderModule,
      container: this.container,
    });

    this.interactiveView.on('confirm', () => {
      this.finalView.showView();
    }, this);

    this.uiView = new UIView(this.app, {
      loaderModule: this.loaderModule,
      container: this.container,
    });

    this.uiView.on('handleContinue', () => { console.log('Continue pressed'); });

    this.finalView = new FinalView(this.app, {
      loaderModule: this.loaderModule,
      container: this.container,
    });
    this.canvasScaler = new CanvasScaler(this.app, this.container);
  }

  initialRender() {
    this.app = new PIXI.Application({
      ...SIZES,
      resolution: window.devicePixelRatio || 1,
      //  resizeTo: window,
      autoDensity: true,
      // backgroundColor: 0x000000,
    });
    document.body.appendChild(this.app.view);

    // this.app.renderer.view.id = 'pixi-canvas';
    PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;

    this.app.ticker.add((dt) => this.update(dt));
  }

  update(dt) {
    TWEEN.update();
  }
}
