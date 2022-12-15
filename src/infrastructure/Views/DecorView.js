import TWEEN from '@tweenjs/tween.js';

import { randomBetween, initSpriteFromConfig } from '../../utils/helpers';
import { ELEMENTS_DECOR, STATIC_ELEMENTS } from '../../utils/filesPathes';
import { POSITIONS } from '../../utils/consts';

export default class DecorView {
  constructor(app, { assetModule, container }) {
    this.app = app;

    this.assetModule = assetModule;
    this.container = container;

    this.sprites = {};

    this.createElement(STATIC_ELEMENTS.BACKGROUND);
    this.createElement(STATIC_ELEMENTS.AUSTIN);

    Object.values(ELEMENTS_DECOR).forEach((element) => this.createElement(element, true));
  }

  createElement(key, withAnimation = false) {
    this.sprites[key] = initSpriteFromConfig(key, this.assetModule.getSpriteByKey(key));

    this.sprites[key].alpha = withAnimation ? 0 : 1;

    this.container.addChild(this.sprites[key]);

    if (!withAnimation) return;

    this.animateElement(key);
  }

  animateElement(key) {
    const cfgTween = { alpha: 0, y: this.sprites[key].y - 80 };

    const tween = new TWEEN.Tween(cfgTween)
      .to(
        { alpha: 1, y: POSITIONS[key].DESKTOP.y },
        randomBetween(300, 500),
      )
      .easing(TWEEN.Easing.Quadratic.Out)
      .delay(randomBetween(600, 800))
      .onUpdate(() => {
        this.sprites[key].y = cfgTween.y;
        this.sprites[key].alpha = cfgTween.alpha;
      })
      .start();
  }
}
