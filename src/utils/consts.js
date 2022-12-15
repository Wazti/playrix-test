import POSITIONS from '../assets/json/positions.json';

const SIZES = Object.freeze({
  width: 1390,
  height: 640,
});
const SIZES_MOBILE = Object.freeze({
  width: 640,
  height: 1136,
});

const TYPES_RESIZE = Object.freeze({
  DESKTOP: 'DESKTOP',
  MOBILE: 'MOBILE',
});
const SPRITE_CONFIG_MOBILE = Object.freeze({

});

const SPRITE_CONFIG = Object.freeze({
  BACKGROUND: {
    w: SIZES.width,
    h: SIZES.height,
    z: 0,
  },
  BACKGROUND_MOBILE: {
    w: SIZES_MOBILE.width,
    h: SIZES_MOBILE.height,
    z: 0,
  },
  SOFA: {
    w: 375,
    h: 303,
    z: 1,
  },
  GLOBE: {
    w: 147,
    h: 188,
    z: 1,
  },
  PLANT: {
    w: 115,
    h: 151,
    z: 1,
  },
  PLANT_SECOND: {
    w: 115,
    h: 151,
    z: 1,
  },
  BOOKSTAND: {
    w: 140,
    h: 189,
    z: 1,
  },
  TABLE: {
    w: 302,
    h: 222,
    z: 1,
  },
  AUSTIN: {
    z: 2,
    w: 87,
    h: 306,

  },
  PLANT_THIRD: {
    z: 3,
    w: 257,
    h: 244,
  },
  OLDSTAIR: {
    w: 557,
    h: 516,
    z: 2,
  },
  STAIR_FIRST: {
    w: 482,
    h: 615,
    z: 2,
  },
  STAIR_SECOND: {
    w: 492,
    h: 612,
    z: 2,
  },

  STAIR_THIRD: {
    w: 480,
    h: 616,
    z: 2,
  },
  ICON_HAMMER: {
    w: 61,
    h: 59,
    z: 9,
  },
  ICON_HAMMER_BACK: {
    w: 106,
    h: 129,
    z: 3,
  },
  CIRCLEUI: {
    w: 137,
    h: 137,
    z: 1,
  },
  CIRCLEUI_CHOSEN: {
    w: 119,
    h: 119,
    z: 2,
  },
  MINI_FIRST: {
    w: 94,
    h: 99,
    z: 4,
  },
  MINI_SECOND: {
    w: 122,
    h: 100,
    z: 4,
  },
  MINI_THIRD: {
    w: 126,
    h: 103,
    z: 4,
  },
  OK_BUTTON: {
    w: 158,
    h: 95,
    z: 15,
  },
  CONTINUE_BUTTON: {
    w: 337,
    h: 114,
    z: 5,
  },
  LOGO: {
    w: 298,
    h: 97,
    z: 4,
  },
  FINAL: {
    w: 610,
    h: 395,
  },
});

export {
  SIZES, POSITIONS, SPRITE_CONFIG, SIZES_MOBILE, SPRITE_CONFIG_MOBILE,
  TYPES_RESIZE,
};
