import * as PIXI from 'pixi.js';

import SelectElementUI from './SelectElementUI';
import StairElement from '../elements/StairElement';

import { INTERACTIVE_ELEMENTS, UI_ELEMENTS } from '../../utils/filesPathes';

export default class ListElementsUI {
  constructor(container, { assetModule, parentContainer, canvasScaler }) {
    this.container = container;
    this.parentContainer = parentContainer;
    this.assetModule = assetModule;
    this.canvasScaler = canvasScaler;

    this.eventEmitter = new PIXI.utils.EventEmitter();

    this.elements = {
      SELECT_FIRST: {
        stairElement: null,
        selectElement: null,
        miniKey: UI_ELEMENTS.MINI_FIRST,
        stairKey: INTERACTIVE_ELEMENTS.STAIR_FIRST,
      },
      SELECT_SECOND: {
        stairElement: null,
        selectElement: null,
        miniKey: UI_ELEMENTS.MINI_SECOND,
        stairKey: INTERACTIVE_ELEMENTS.STAIR_SECOND,
      },
      SELECT_THIRD: {
        stairElement: null,
        selectElement: null,
        miniKey: UI_ELEMENTS.MINI_THIRD,
        stairKey: INTERACTIVE_ELEMENTS.STAIR_THIRD,
      },
    };

    Object.keys(this.elements).forEach((key) => {
      this.createElements(key);
    });
  }

  createElements(key) {
    this.elements[key].selectElement = new SelectElementUI(
      this.container,
      key,
      this.elements[key].miniKey,
      { assetModule: this.assetModule, canvasScaler: this.canvasScaler },
    );

    this.elements[key].selectElement.on('click', () => this.handleSelect(key), this);

    this.elements[key].stairElement = new StairElement(
      this.parentContainer,
      this.elements[key].stairKey,

      { assetModule: this.assetModule, canvasScaler: this.canvasScaler },
    );
  }

  handleSelect(key) {
    this.eventEmitter.emit('select', this.currentSelectKey && this.elements[this.currentSelectKey], this.elements[key]);

    if (this.currentSelectKey) {
      this.elements[this.currentSelectKey].stairElement.hideElement();
      this.elements[this.currentSelectKey].selectElement.deselect();
    }

    this.currentSelectKey = key;
    this.elements[this.currentSelectKey].stairElement.showElement();

    this.elements[this.currentSelectKey].selectElement.select();
  }

  on(event, fn, context) {
    this.eventEmitter.on(event, fn, context);
  }
}
