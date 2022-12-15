import * as PIXI from 'pixi.js';

import TWEEN from '@tweenjs/tween.js';
import AssetModule from './AssetModule';
import { SIZES } from '../utils/consts';
import CanvasScaler from './CanvasScaler';
import DecorView from './views/DecorView';
import InteractiveView from './views/InteractiveView';
import UIView from './views/UIView';
import FinalView from './views/FinalView';

export default class App {
  constructor() {
    this.initialRender();

    this.assetModule = new AssetModule();

    this.assetModule.loadDefault(() => {
      this.setup();
    });
  }

  setup() {
    this.container = new PIXI.Container();

    this.container.sortableChildren = true;
    this.canvasScaler = new CanvasScaler(this.app, this.container);

    this.app.stage.addChild(this.container);

    this.decorView = new DecorView(this.app, {
      assetModule: this.assetModule,
      container: this.container,
      canvasScaler: this.canvasScaler,
    });

    this.interactiveView = new InteractiveView(this.app, {
      assetModule: this.assetModule,
      canvasScaler: this.canvasScaler,
      container: this.container,
    });

    this.interactiveView.on('confirm', () => {
      this.finalView.showView();
    }, this);

    this.uiView = new UIView(this.app, {
      assetModule: this.assetModule,
      container: this.container,
      canvasScaler: this.canvasScaler,
    });

    this.uiView.on('handleContinue', () => { console.log('Continue pressed'); });

    this.finalView = new FinalView(this.app, {
      assetModule: this.assetModule,
      container: this.container,
      canvasScaler: this.canvasScaler,
    });
  }

  initialRender() {
    this.app = new PIXI.Application({
      ...SIZES,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
    });

    document.body.appendChild(this.app.view);
    PIXI.SCALE_MODES.DEFAULT = PIXI.SCALE_MODES.NEAREST;
    this.app.ticker.add((dt) => this.update(dt));
  }

  update(dt) {
    TWEEN.update();
  }
}
