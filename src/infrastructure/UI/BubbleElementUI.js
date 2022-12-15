import * as PIXI from 'pixi.js';

import TWEEN from '@tweenjs/tween.js';

import { POSITIONS } from '../../utils/consts';
import { UI_ELEMENTS } from '../../utils/filesPathes';
import { initSpriteFromConfig, delayedCall } from '../../utils/helpers';

export default class BubbleElementUI {
  constructor(container, forward, back, { assetModule, canvasScaler }) {
    this.parentContainer = container;
    this.forwardKey = forward;
    this.backKey = back;
    this.canvasScaler = canvasScaler;
    this.eventEmitter = new PIXI.utils.EventEmitter();
    this.assetModule = assetModule;

    this.initContainer();
    this.initSprite();

    this.container.on('pointerdown', this.handleClick, this);
  }

  handleClick() {
    this.delayedHummer?.stop();
    this.parentContainer.removeChild(this.container);
    this.eventEmitter.emit('click');
  }

  on(event, fn, ctx) {
    this.eventEmitter.on(event, fn, ctx);
  }

  initContainer() {
    this.container = new PIXI.Container();

    this.container.zIndex = 5;
    this.container.pivot.x = this.container.width / 2;
    this.container.pivot.y = this.container.height / 2;
    this.container.sortableChildren = true;
    this.container.interactive = true;
    this.container.cursor = 'pointer';
    this.container.name = UI_ELEMENTS.ICON_HAMMER_CONTAINER;

    this.container.x = POSITIONS.ICON_HAMMER_CONTAINER.DESKTOP.x;
    this.container.y = POSITIONS.ICON_HAMMER_CONTAINER.DESKTOP.y;

    this.parentContainer.addChild(this.container);
    this.canvasScaler.addDynamicElement(this.container);
  }

  initSprite() {
    this.forwardElement = initSpriteFromConfig(
      this.forwardKey,
      this.assetModule.getSpriteByKey(this.forwardKey),
    );

    this.backElement = initSpriteFromConfig(
      this.backKey,
      this.assetModule.getSpriteByKey(this.backKey),
    );

    this.backElement.anchor.set(0.5);
    this.forwardElement.anchor.set(0.5);

    this.container.addChild(this.forwardElement);
    this.container.addChild(this.backElement);

    this.animateContainer();
  }

  animateHummer() {
    new TWEEN.Tween(this.forwardElement)
      .to({ rotation: 0.4 }, 300)
      .easing(TWEEN.Easing.Cubic.InOut)
      .repeat(1)
      .yoyo(true)
      .onComplete(() => {
        this.delayedHummer = delayedCall(1500, () => this.animateHummer());
      })
      .start();
  }

  animateContainer() {
    this.container.alpha = 0;
    const cfg = { val: 0 };
    const tweenY = new TWEEN.Tween(cfg)
      .to({ val: 1 }, 700)
      .easing(TWEEN.Easing.Elastic.InOut)
      .delay(1000)
      .onUpdate(() => {
        const pos = (this.canvasScaler.isMobile() ? POSITIONS[this.container.name].MOBILE
          : POSITIONS[this.container.name].DESKTOP);

        this.container.y = pos.y - 50 * (1 - cfg.val);
      })
      .onComplete(() => {
        this.delayedHummer = delayedCall(1500, () => this.animateHummer());
      })
      .start();

    const tweenAlpha = new TWEEN.Tween(this.container)
      .to({ alpha: 1 }, 300)
      .easing(TWEEN.Easing.Quartic.InOut)
      .delay(1200)
      .start();
  }
}
