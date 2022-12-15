import * as PIXI from 'pixi.js';

import TWEEN from '@tweenjs/tween.js';

import { POSITIONS } from '../../utils/consts';
import { initSpriteFromConfig, delayedCall } from '../../utils/helpers';

export default class BubbleElementUI {
  constructor(container, forward, back, { assetModule }) {
    this.parentContainer = container;
    this.forwardKey = forward;
    this.backKey = back;
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

    this.container.x = POSITIONS.ICON_HAMMER_CONTAINER.DESKTOP.x;
    this.container.y = POSITIONS.ICON_HAMMER_CONTAINER.DESKTOP.y;

    this.parentContainer.addChild(this.container);
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
    this.container.y -= 50;
    this.container.alpha = 0;
    const tweenY = new TWEEN.Tween(this.container)
      .to({ y: this.container.y + 50 }, 700)
      .easing(TWEEN.Easing.Elastic.InOut)
      .delay(1000)
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
