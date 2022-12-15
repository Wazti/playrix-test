import { Loader } from 'pixi.js';

import {
  FILES, STATIC_ELEMENTS, ELEMENTS_DECOR, INTERACTIVE_ELEMENTS, UI_ELEMENTS,
} from '../utils/filesPathes';

export default class AssetModule {
  constructor() {
    this.loader = Loader.shared;
  }

  loadDefault(callback) {
    this.loadSprites([
      ...Object.values(STATIC_ELEMENTS),
      ...Object.values(ELEMENTS_DECOR),
      INTERACTIVE_ELEMENTS.OLDSTAIR,
      UI_ELEMENTS.ICON_HAMMER,
      UI_ELEMENTS.ICON_HAMMER_BACK,
      UI_ELEMENTS.CONTINUE_BUTTON,
      UI_ELEMENTS.LOGO,
    ]).then(callback);
  }

  async loadSprites(keys) {
    return new Promise((resolve) => {
      keys.forEach((key) => {
        this.loader.add(key, FILES[key]);
      });

      this.loader.load();

      this.loader.onComplete.add(() => {
        resolve();
      });
    });
  }

  async loadSprite(key) {
    return new Promise((resolve) => {
      this.loader.add(key, FILES[key]);

      this.loader.load();

      this.loader.onComplete.add(() => {
        resolve();
      });
    });
  }

  getSpriteByKey(key) {
    return this.loader.resources[key] && this.loader.resources[key].texture;
  }
}
