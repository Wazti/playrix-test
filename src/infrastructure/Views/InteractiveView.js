import * as PIXI from 'pixi.js';

import { INTERACTIVE_ELEMENTS, UI_ELEMENTS } from '../../utils/filesPathes';
import { initSpriteFromConfig } from '../../utils/helpers';
import StairElement from '../Elements/StairElement';
import BubbleElementUI from '../UI/BubbleElementUI';
import ListElementsUI from '../UI/ListElementsUI';

export default class InteractiveView {
  constructor(app, { loaderModule, container }) {
    this.app = app;
    this.loaderModule = loaderModule;
    this.parentContainer = container;
    this.container = null;

    this.initContainer();

    this.defaultStair = null;
    this.okButton = null;
    this.eventEmitter = new PIXI.utils.EventEmitter();

    this.initBubbleElement();
    this.showDefault();
  }

  async clickBubble() {
    await this.loaderModule.loadSprites([
      UI_ELEMENTS.CIRCLEUI_CHOSEN,
      UI_ELEMENTS.CIRCLEUI,
      UI_ELEMENTS.MINI_FIRST,
      UI_ELEMENTS.MINI_SECOND,
      UI_ELEMENTS.MINI_THIRD,
      UI_ELEMENTS.OK_BUTTON,
      INTERACTIVE_ELEMENTS.STAIR_FIRST,
      INTERACTIVE_ELEMENTS.STAIR_SECOND,
      INTERACTIVE_ELEMENTS.STAIR_THIRD,
    ]);

    this.createButtonOk();

    this.listElements = new ListElementsUI(this.container, {
      loaderModule: this.loaderModule,
      parentContainer: this.parentContainer,
    });

    this.listElements.on('select', (oldVal, newVal) => {
      this.handleSelect(oldVal, newVal);
    });
  }

  handleSelect(oldVal, newVal) {
    if (oldVal) {
      oldVal.selectElement.removeChild(this.okButton);
    } else {
      this.defaultStair.hideElement();
    }
    newVal.selectElement.addChild(this.okButton);
  }

  handleConfirmClick() {
    this.parentContainer.removeChild(this.container);
    this.eventEmitter.emit('confirm');
  }

  on(event, fn, context) {
    this.eventEmitter.on(event, fn, context);
  }

  showDefault() {
    this.defaultStair = new StairElement(
      this.parentContainer,
      INTERACTIVE_ELEMENTS.OLDSTAIR,
      { loaderModule: this.loaderModule },
    );
    this.defaultStair.showElement();
  }

  createButtonOk() {
    this.okButton = initSpriteFromConfig(
      UI_ELEMENTS.OK_BUTTON,
      this.loaderModule.getSpriteByKey(UI_ELEMENTS.OK_BUTTON),
    );
    this.okButton.anchor.set(0.5);
    this.okButton.interactive = true;
    this.okButton.on('pointerdown', this.handleConfirmClick, this);
  }

  initBubbleElement() {
    this.bubbleElement = new BubbleElementUI(
      this.container,
      UI_ELEMENTS.ICON_HAMMER,
      UI_ELEMENTS.ICON_HAMMER_BACK,

      { loaderModule: this.loaderModule },
    );

    this.bubbleElement.on('click', () => {
      this.clickBubble();
    }, this);
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
}
