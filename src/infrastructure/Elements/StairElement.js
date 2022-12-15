import TWEEN from '@tweenjs/tween.js';

import { initSpriteFromConfig } from '../../utils/helpers';

export default class StairElement {
  constructor(container, key, { assetModule }) {
    this.container = container;
    this.assetModule = assetModule;
    this.currentInteractiveDecor = null;
    this.key = key;
    this.initSprite();
  }

  initSprite() {
    this.currentInteractiveDecor = initSpriteFromConfig(
      this.key,
      this.assetModule.getSpriteByKey(this.key),
    );
    this.currentInteractiveDecor.alpha = 0;
    this.startPosY = this.currentInteractiveDecor.y;
    this.container.addChild(this.currentInteractiveDecor);
  }

  hideElement() {
    this.currentTweenAppear?.stop();

    this.currentInteractiveDecor.alpha = 0;
  }

  showElement() {
    this.currentTweenAppear?.stop();

    this.currentInteractiveDecor.y = this.startPosY;

    this.currentInteractiveDecor.y -= 80;
    this.currentTweenAppear = new TWEEN.Tween(this.currentInteractiveDecor)
      .to({ alpha: 1, y: this.currentInteractiveDecor.y + 80 }, 600)
      .easing(TWEEN.Easing.Quadratic.Out)
      .start();
  }
}
