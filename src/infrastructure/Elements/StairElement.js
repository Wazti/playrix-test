import TWEEN from '@tweenjs/tween.js';

import { initSpriteFromPos } from '../../utils/helpers';
import { POSITIONS } from '../../utils/consts';

export default class StairElement {
  constructor(container, key, { assetModule, canvasScaler }) {
    this.container = container;
    this.assetModule = assetModule;
    this.currentInteractiveDecor = null;
    this.canvasScaler = canvasScaler;
    this.key = key;
    this.initSprite();
  }

  initSprite() {
    this.currentInteractiveDecor = initSpriteFromPos(
      this.key,
      this.assetModule.getSpriteByKey(this.key),
      POSITIONS[this.key][this.canvasScaler.getTypeResize()],
    );
    this.currentInteractiveDecor.alpha = 0;
    this.canvasScaler.addDynamicElement(this.currentInteractiveDecor);
    this.container.addChild(this.currentInteractiveDecor);
  }

  hideElement() {
    this.currentTweenAppear?.stop();

    this.currentInteractiveDecor.alpha = 0;
  }

  showElement() {
    this.currentTweenAppear?.stop();
    const twnCfg = { val: 0 };

    this.currentTweenAppear = new TWEEN.Tween(twnCfg)
      .to({ val: 1 }, 600)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        const pos = POSITIONS[this.key][this.canvasScaler.getTypeResize()];
        this.currentInteractiveDecor.y = pos.y - 80 * (1 - twnCfg.val);
        this.currentInteractiveDecor.alpha = twnCfg.val;
      })
      .start();
  }
}
