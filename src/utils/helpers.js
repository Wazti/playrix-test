import * as PIXI from 'pixi.js';

import TWEEN from '@tweenjs/tween.js';

import { POSITIONS, SPRITE_CONFIG } from './consts';

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}
function randomIntegerBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function initSpriteFromConfig(key, texture) {
  const sprite = new PIXI.Sprite(texture);
  sprite.position.set(POSITIONS[key].DESKTOP.x, POSITIONS[key].DESKTOP.y);
  sprite.name = key;
  sprite.width = SPRITE_CONFIG[key].w;
  sprite.height = SPRITE_CONFIG[key].h;
  sprite.zIndex = SPRITE_CONFIG[key].z;

  return sprite;
}

function delayedCall(delay, callback) {
  return new TWEEN.Tween({})
    .to({}, delay)
    .onComplete(() => {
      callback();
    })
    .start();
}

export {
  randomBetween, randomIntegerBetween, initSpriteFromConfig, delayedCall,
};
