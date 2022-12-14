import * as PIXI from 'pixi.js';

import TWEEN from '@tweenjs/tween.js';

import { POSITIONS } from '../../utils/consts';
import { UI_ELEMENTS } from '../../utils/filesPathes';
import { initSpriteFromConfig } from '../../utils/helpers';

export default class SelectElementUI {
  constructor(container, containerKey, textureKey, { loaderModule }) {
    this.parentContainer = container;
    this.loaderModule = loaderModule;
    this.containerKey = containerKey;
    this.textureKey = textureKey;

    this.isSelect = false;

    this.eventEmitter = new PIXI.utils.EventEmitter();

    this.initContainer();
    this.initSprites();
  }

  handleClick() {
    if (this.isSelect) return;

    this.select();
    this.eventEmitter.emit('click');
  }

  select() {
    this.isSelect = true;
    this.runAlphaAnimation(1);
  }

  deselect() {
    this.isSelect = false;
    this.runAlphaAnimation(0);
  }

  runAlphaAnimation(alpha) {
    this.currentTweenIcon?.stop();

    this.currentTweenIcon = new TWEEN.Tween(this.selectElement)
      .to({ alpha }, 150)
      .easing(TWEEN.Easing.Quartic.In)
      .start();
  }

  addChild(element) {
    this.container.addChild(element);
  }

  removeChild(element) {
    this.container.removeChild(element);
  }

  on(event, fn, context) {
    this.eventEmitter.on(event, fn, context);
  }

  initContainer() {
    this.container = new PIXI.Container();
    this.container.zIndex = 10;
    this.container.pivot.x = this.container.width / 2;
    this.container.pivot.y = this.container.height / 2;

    this.container.sortableChildren = true;
    this.container.interactive = true;
    this.container.cursor = 'pointer';

    this.container.x = POSITIONS[this.containerKey].DESKTOP.x;
    this.container.y = POSITIONS[this.containerKey].DESKTOP.y;

    this.container.on('pointerdown', this.handleClick, this);

    this.parentContainer.addChild(this.container);
  }

  initSprites() {
    this.backElement = initSpriteFromConfig(
      UI_ELEMENTS.CIRCLEUI,
      this.loaderModule.getSpriteByKey(UI_ELEMENTS.CIRCLEUI),
    );

    this.backElement.anchor.set(0.5);

    this.selectElement = initSpriteFromConfig(
      UI_ELEMENTS.CIRCLEUI_CHOSEN,
      this.loaderModule.getSpriteByKey(UI_ELEMENTS.CIRCLEUI_CHOSEN),
    );

    this.selectElement.anchor.set(0.5);
    this.selectElement.alpha = 0;

    this.itemElement = initSpriteFromConfig(
      this.textureKey,
      this.loaderModule.getSpriteByKey(this.textureKey),
    );

    this.itemElement.anchor.set(0.5);
    this.container.addChild(this.itemElement);
    this.container.addChild(this.backElement);
    this.container.addChild(this.selectElement);

    this.apperElement();
  }

  apperElement() {
    const tweenCf = { w: this.container.width, h: this.container.height };
    this.container.width = 0;
    this.container.height = 0;
    const tweenScale = new TWEEN.Tween(this.container)
      .to({ width: tweenCf.w, height: tweenCf.h }, 500)
      .easing(TWEEN.Easing.Elastic.InOut)
      .start();
  }
}
