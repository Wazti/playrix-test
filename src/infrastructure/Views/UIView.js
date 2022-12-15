import * as PIXI from 'pixi.js';

import { UI_ELEMENTS } from '../../utils/filesPathes';
import { initSpriteFromConfig } from '../../utils/helpers';
import ContinueElementUI from '../UI/ContinueElementUI';

export default class UIView {
  constructor(app, { assetModule, container, canvasScaler }) {
    this.app = app;
    this.parentContainer = container;
    this.assetModule = assetModule;
    this.canvasScaler = canvasScaler;
    this.eventEmitter = new PIXI.utils.EventEmitter();

    this.initContainer();
    this.addLogo();

    this.continueButton = new ContinueElementUI(this.container, { assetModule, canvasScaler });
    this.continueButton.on('handleClick', () => { this.handleButtonClick(); }, this);
  }

  handleButtonClick() {
    this.eventEmitter.emit('handleContinue');
  }

  initContainer() {
    this.container = new PIXI.Container();
    this.container.zIndex = 400;

    this.container.sortableChildren = true;

    this.parentContainer.addChild(this.container);
  }

  addLogo() {
    this.logo = initSpriteFromConfig(
      UI_ELEMENTS.LOGO,
      this.assetModule.getSpriteByKey(UI_ELEMENTS.LOGO),
    );

    this.container.addChild(this.logo);
  }

  on(event, func, ctx) {
    this.eventEmitter.on(event, func, ctx);
  }
}
