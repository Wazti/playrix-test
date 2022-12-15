import * as PIXI from 'pixi.js';

import TWEEN from '@tweenjs/tween.js';
import debounce from 'lodash.debounce';

import { delayedCall } from '../utils/helpers';

import {
  TYPES_RESIZE,
  SIZES, SIZES_MOBILE, POSITIONS, SPRITE_CONFIG_MOBILE, SPRITE_CONFIG,
} from '../utils/consts';

function getScaleAndSize(size) {
  const scaleFactor = Math.min(
    window.innerWidth / size.width,
    document.documentElement.clientHeight / size.height,
  );
  const newWidth = Math.ceil(size.width * scaleFactor);
  const newHeight = Math.ceil(size.height * scaleFactor);

  return { w: newWidth, h: newHeight, s: scaleFactor };
}

export default class CanvasScaler {
  constructor(app, container) {
    this.renderer = app.renderer;
    this.app = app;
    this.parentContainer = container;

    this.eventEmitter = new PIXI.utils.EventEmitter();

    this.defaultRationLandscape = SIZES.width / SIZES.height;
    this.defaultRationPortrait = SIZES_MOBILE.width / SIZES_MOBILE.height;

    this.type = TYPES_RESIZE.DESKTOP;

    this.parentContainer = container;
    this.dynamicElements = [];

    this.debounceResize = debounce(() => {
      this.resizeHandler();
    }, 200);

    delayedCall(100, () => {
      this.resizeCanvas();
      this.resizeHandler();
    });

    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.debounceResize();
    }, false);
  }

  resizeCanvas() {
    const w = window.innerWidth;
    const h = document.documentElement.clientHeight;

    this.type = (w > h) ? TYPES_RESIZE.DESKTOP : TYPES_RESIZE.MOBILE;

    const newSize = this.getNewWidthHeight(w, h);

    this.app.view.classList.remove('visible');

    this.app.view.style.width = `${newSize.w}px`;
    this.app.view.style.height = `${newSize.h}px`;

    console.log(document.documentElement.clientHeight, window.innerHeight);
  }

  resizeHandler() {
    const screenSizes = this.isMobile() ? SIZES_MOBILE : SIZES;

    const data = getScaleAndSize(screenSizes);

    this.recalculatePositionsSprite();

    this.parentContainer.scale.set(data.s);

    this.eventEmitter.emit('resize', this.type);

    this.renderer.resize(data.w, data.h);
    this.app.view.classList.add('visible');
  }

  getNewWidthHeight(innerWidth, innerHeight) {
    let w = window.innerWidth;
    let h = document.documentElement.clientHeight;

    const ratio = w / h;
    const finalRatio = innerWidth > innerHeight
      ? this.defaultRationLandscape : this.defaultRationPortrait;

    if (ratio >= finalRatio) {
      w = h * finalRatio;
    } else {
      h = w / finalRatio;
    }
    return { w, h };
  }

  isMobile() {
    return this.type === TYPES_RESIZE.MOBILE;
  }

  getTypeResize() {
    return this.type;
  }

  addDynamicElement(element) {
    this.dynamicElements.push(element);
  }

  recalculatePositionsSprite() {
    this.dynamicElements.forEach((item) => {
      const pos = this.isMobile() ? POSITIONS[item.name].MOBILE : POSITIONS[item.name].DESKTOP;
      const size = this.isMobile() ? SPRITE_CONFIG_MOBILE[item.name] : SPRITE_CONFIG[item.name];
      if (pos) {
        item.x = pos.x;
        item.y = pos.y;
      }
      if (size) {
        item.width = size.w;
        item.height = size.h;
      }
    });
  }

  on(event, fn, context) {
    this.eventEmitter.on(event, fn, context);
  }
}
