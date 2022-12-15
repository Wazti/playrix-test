import * as PIXI from 'pixi.js';

import TWEEN from '@tweenjs/tween.js';

import {
  SIZES, SPRITE_CONFIG, TYPES_RESIZE, SIZES_MOBILE, POSITIONS,
} from '../../utils/consts';
import { UI_ELEMENTS } from '../../utils/filesPathes';
import { initSpriteFromPos } from '../../utils/helpers';

export default class FinalView {
  constructor(app, { assetModule, container, canvasScaler }) {
    this.app = app;
    this.assetModule = assetModule;
    this.parentContainer = container;
    this.canvasScaler = canvasScaler;
    this.loadSprite();

    this.canvasScaler.on('resize', this.handleResize, this);
  }

  loadSprite() {
    this.assetModule.loadSprite(UI_ELEMENTS.FINAL);
  }

  showView() {
    this.initContainer();
    this.createBackground();
    this.createFinalPicture();
  }

  initContainer() {
    this.container = new PIXI.Container();
    this.container.zIndex = 30;
    this.container.x = 0;
    this.container.y = 0;
    this.container.sortableChildren = true;
    this.container.interactive = true;
    this.parentContainer.addChild(this.container);
  }

  handleResize(type) {
    if (!this.background) return;

    if (type === TYPES_RESIZE.DESKTOP) {
      this.background.width = SIZES.width;
      this.background.height = SIZES.height;
      return;
    }

    this.background.width = SIZES_MOBILE.width;
    this.background.height = SIZES_MOBILE.height;
  }

  createBackground() {
    this.background = new PIXI.Sprite(PIXI.Texture.WHITE);
    this.background.alpha = 0;
    this.background.tint = 0x000000;
    this.background.width = SIZES.width;
    this.background.height = SIZES.height;

    this.container.addChild(this.background);
    const backgroundTween = new TWEEN.Tween(this.background)
      .to({ alpha: 0.5 }, 600)
      .easing(TWEEN.Easing.Cubic.InOut)
      .start();

    this.handleResize();
  }

  createFinalPicture() {
    this.final = initSpriteFromPos(
      UI_ELEMENTS.FINAL,
      this.assetModule.getSpriteByKey(UI_ELEMENTS.FINAL),
      POSITIONS[UI_ELEMENTS.FINAL][this.canvasScaler.getTypeResize()],
    );

    this.final.anchor.set(0.5);
    this.final.width = 0;
    this.final.height = 0;
    this.canvasScaler.addDynamicElement(this.final);

    const twf = { val: 0 };
    const finalTween = new TWEEN.Tween(twf)
      .to({ val: 1 }, 400)
      .easing(TWEEN.Easing.Cubic.InOut)
      .onUpdate(() => {
        this.final.width = SPRITE_CONFIG.FINAL.w * twf.val;
        this.final.height = SPRITE_CONFIG.FINAL.h * twf.val;
      })
      .delay(300)
      .start();

    this.container.addChild(this.final);
  }
}
