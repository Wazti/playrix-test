import * as PIXI from 'pixi.js';

import { UI_ELEMENTS } from '../../utils/filesPathes';
import { initSpriteFromConfig } from '../../utils/helpers';
import ContinueElementUI from '../UI/ContinueElementUI';

export default class UIView {
  constructor(app, { loaderModule, container }) {
    this.app = app;
    this.parentContainer = container;
    this.loaderModule = loaderModule;
    this.eventEmitter = new PIXI.utils.EventEmitter();

    this.initContainer();
    this.addLogo();

    this.continueButton = new ContinueElementUI(this.container, { loaderModule });
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
      this.loaderModule.getSpriteByKey(UI_ELEMENTS.LOGO),
    );

    this.container.addChild(this.logo);
  }

  on(event, func, ctx) {
    this.eventEmitter.on(event, func, ctx);
  }
}
