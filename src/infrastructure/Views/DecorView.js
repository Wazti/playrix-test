import TWEEN from '@tweenjs/tween.js';

import { randomBetween, initSpriteFromConfig } from '../../utils/helpers';
import { ELEMENTS_DECOR, STATIC_ELEMENTS } from '../../utils/filesPathes';
import { POSITIONS, TYPES_RESIZE } from '../../utils/consts';

export default class DecorView {
  constructor(app, { assetModule, container, canvasScaler }) {
    this.app = app;

    this.assetModule = assetModule;
    this.container = container;
    this.canvasScaler = canvasScaler;

    this.canvasScaler.on('resize', this.handleResize, this);

    this.sprites = {};

    this.createElement(STATIC_ELEMENTS.BACKGROUND);
    this.createElement(STATIC_ELEMENTS.BACKGROUND_MOBILE);
    this.createElement(STATIC_ELEMENTS.AUSTIN, true);

    this.container.removeChild(this.sprites[STATIC_ELEMENTS.BACKGROUND_MOBILE]);
    this.container.removeChild(this.sprites[STATIC_ELEMENTS.BACKGROUND]);

    Object.values(ELEMENTS_DECOR).forEach((element) => this.createElement(element, true, true));

    this.handleResize(this.canvasScaler.getTypeResize());
  }

  createElement(key, addToDynamic, withAnimation = false) {
    this.sprites[key] = initSpriteFromConfig(key, this.assetModule.getSpriteByKey(key));

    if (addToDynamic) { this.canvasScaler.addDynamicElement(this.sprites[key]); }

    this.sprites[key].alpha = withAnimation ? 0 : 1;

    this.container.addChild(this.sprites[key]);

    if (!withAnimation) return;

    this.animateElement(key);
  }

  handleResize(type) {
    if (type === TYPES_RESIZE.DESKTOP) {
      this.container.removeChild(this.sprites[STATIC_ELEMENTS.BACKGROUND_MOBILE]);
      this.container.addChild(this.sprites[STATIC_ELEMENTS.BACKGROUND]);
      return;
    }
    this.container.addChild(this.sprites[STATIC_ELEMENTS.BACKGROUND_MOBILE]);
    this.container.removeChild(this.sprites[STATIC_ELEMENTS.BACKGROUND]);
  }

  animateElement(key) {
    const cfgTween = { val: 0 };

    const tween = new TWEEN.Tween(cfgTween)
      .to(
        { val: 1 },
        randomBetween(300, 500),
      )
      .easing(TWEEN.Easing.Quadratic.Out)
      .delay(randomBetween(600, 800))
      .onUpdate(() => {
        const pos = (this.canvasScaler.isMobile() && POSITIONS[key].MOBILE ? POSITIONS[key].MOBILE
          : POSITIONS[key].DESKTOP);

        this.sprites[key].y = pos.y - 80 * (1 - cfgTween.val);
        this.sprites[key].alpha = cfgTween.val;
      })
      .start();
  }
}
