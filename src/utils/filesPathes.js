import background from '../assets/images/background.jpeg';
import backgroundPortrait from '../assets/images/background_mobile.jpeg';

import bookStand from '../assets/images/decor/book_stand.png';
import globe from '../assets/images/decor/globe.png';
import plant from '../assets/images/decor/plant.png';
import plantSecond from '../assets/images/decor/plant1.png';
import sofa from '../assets/images/decor/sofa.png';
import table from '../assets/images/decor/table.png';
import austin from '../assets/images/austin.png';
import oldStair from '../assets/images/decor/old_stair.png';
import newStairFirst from '../assets/images/decor/new_stair_01.png';
import newStairSecond from '../assets/images/decor/new_stair_02.png';
import newStairThird from '../assets/images/decor/new_stair_03.png';
import plantThird from '../assets/images/decor/dec_1.png';

import iconHammerBack from '../assets/images/ui/icon_hammer_back.png';
import iconHammer from '../assets/images/ui/icon_hammer.png';
import circle from '../assets/images/ui/circle.png';
import circleChosen from '../assets/images/ui/circle_chosen.png';
import miniFirst from '../assets/images/ui/mini_1.png';
import miniSecond from '../assets/images/ui/mini_2.png';
import miniThird from '../assets/images/ui/mini_3.png';
import okButton from '../assets/images/ui/ok_button.png';
import btn from '../assets/images/ui/btn.png';
import logo from '../assets/images/ui/logo.png';
import final from '../assets/images/ui/finalPicture.png';

const FILES = Object.freeze({
  BACKGROUND: background,
  BACKGROUND_MOBILE: backgroundPortrait,
  BOOKSTAND: bookStand,
  GLOBE: globe,
  PLANT: plant,
  PLANT_SECOND: plantSecond,
  PLANT_THIRD: plantThird,
  SOFA: sofa,
  TABLE: table,
  AUSTIN: austin,
  OLDSTAIR: oldStair,
  STAIR_FIRST: newStairFirst,
  STAIR_SECOND: newStairSecond,
  STAIR_THIRD: newStairThird,
  ICON_HAMMER_BACK: iconHammerBack,
  ICON_HAMMER: iconHammer,
  CIRCLEUI: circle,
  CIRCLEUI_CHOSEN: circleChosen,
  MINI_FIRST: miniFirst,
  MINI_SECOND: miniSecond,
  MINI_THIRD: miniThird,
  OK_BUTTON: okButton,
  CONTINUE_BUTTON: btn,
  LOGO: logo,
  FINAL: final,
});

const STATIC_ELEMENTS = Object.freeze({
  BACKGROUND: 'BACKGROUND',
  BACKGROUND_MOBILE: 'BACKGROUND_MOBILE',
  AUSTIN: 'AUSTIN',
});
const ELEMENTS_DECOR = Object.freeze({
  BOOKSTAND: 'BOOKSTAND',
  GLOBE: 'GLOBE',
  PLANT: 'PLANT',
  PLANT_SECOND: 'PLANT_SECOND',
  PLANT_THIRD: 'PLANT_THIRD',
  SOFA: 'SOFA',
  TABLE: 'TABLE',
});
const INTERACTIVE_ELEMENTS = Object.freeze({
  OLDSTAIR: 'OLDSTAIR',
  STAIR_FIRST: 'STAIR_FIRST',
  STAIR_SECOND: 'STAIR_SECOND',
  STAIR_THIRD: 'STAIR_THIRD',
});
const UI_ELEMENTS = Object.freeze({
  ICON_HAMMER_BACK: 'ICON_HAMMER_BACK',
  ICON_HAMMER: 'ICON_HAMMER',
  ICON_HAMMER_CONTAINER: 'ICON_HAMMER_CONTAINER',
  CIRCLEUI: 'CIRCLEUI',
  CIRCLEUI_CHOSEN: 'CIRCLEUI_CHOSEN',
  MINI_FIRST: 'MINI_FIRST',
  MINI_SECOND: 'MINI_SECOND',
  MINI_THIRD: 'MINI_THIRD',
  OK_BUTTON: 'OK_BUTTON',
  CONTINUE_BUTTON: 'CONTINUE_BUTTON',
  LOGO: 'LOGO',
  FINAL: 'FINAL',
});

export {
  FILES, ELEMENTS_DECOR, STATIC_ELEMENTS, INTERACTIVE_ELEMENTS, UI_ELEMENTS,
};
