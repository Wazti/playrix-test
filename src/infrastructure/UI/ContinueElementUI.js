import * as PIXI from 'pixi.js';

import TWEEN from '@tweenjs/tween.js';
import { initSpriteFromConfig } from '../../utils/helpers';
import { UI_ELEMENTS } from '../../utils/filesPathes';
import { SPRITE_CONFIG } from '../../utils/consts';

export default class ContinueElementUI {
  constructor(container, { loaderModule }) {
    this.parentContainer = container;
    this.loaderModule = loaderModule;

    this.eventEmitter = new PIXI.utils.EventEmitter();

    this.createButton();
    this.button.on('pointerdown', this.handleClick, this);

    this.pulseButton();
  }

  handleClick() {
    this.eventEmitter.emit('handleClick');
  }

  createButton() {
    this.button = initSpriteFromConfig(
      UI_ELEMENTS.CONTINUE_BUTTON,
      this.loaderModule.getSpriteByKey(UI_ELEMENTS.CONTINUE_BUTTON),
    );

    this.button.anchor.set(0.5);
    this.button.interactive = true;
    this.parentContainer.addChild(this.button);
  }

  on(event, fn, context) {
    this.eventEmitter.on(event, fn, context);
  }

  pulseButton() {
    const tweenCfg = { val: 1 };
    const tweenPulse = new TWEEN.Tween(tweenCfg)
      .to({ val: 1.1 }, 1500)
      .easing(TWEEN.Easing.Sinusoidal.InOut)
      .yoyo(true)
      .repeat(Infinity)
      .onUpdate(() => {
        this.button.width = SPRITE_CONFIG.CONTINUE_BUTTON.w * tweenCfg.val;
        this.button.height = SPRITE_CONFIG.CONTINUE_BUTTON.h * tweenCfg.val;
      })
      .start();
  }
}
