const SIZES = Object.freeze({
  width: 1390,
  height: 640,
});
const SIZE_MOBILE = Object.freeze({
  width: 540,
  height: 780,
});
const POSITIONS = Object.freeze({
  BACKGROUND: {
    DESKTOP: { x: 0, y: 0 },
  },
  SOFA: {
    DESKTOP: { x: 127, y: 324 },
  },
  GLOBE: {
    DESKTOP: { x: 87, y: 109 },
  },
  PLANT: {
    DESKTOP: { x: 456, y: -42 },
  },
  PLANT_SECOND: {
    DESKTOP: { x: 1135, y: 164 },
  },
  BOOKSTAND: {
    DESKTOP: { x: 834, y: -29 },
  },
  TABLE: {
    DESKTOP: { x: 202, y: 196 },
  },
  AUSTIN: {
    DESKTOP: { x: 696, y: 113 },
  },
  PLANT_THIRD: {
    DESKTOP: { x: 1122, y: 438 },
  },
  OLDSTAIR: {
    DESKTOP: { x: 833, y: 104 },
  },
  STAIR_FIRST: {
    DESKTOP: { x: 910, y: 30 },
  },
  STAIR_SECOND: {
    DESKTOP: { x: 910, y: 30 },
  },

  STAIR_THIRD: {
    DESKTOP: { x: 910, y: 30 },
  },

  ICON_HAMMER_CONTAINER: {
    DESKTOP: { x: 1147, y: 298 },
  },
  ICON_HAMMER: {
    DESKTOP: { x: 5, y: -12 },
  },
  ICON_HAMMER_BACK: {
    DESKTOP: { x: 0, y: 0 },
  },
  CIRCLEUI: {
    DESKTOP: { x: 0, y: 0 },
  },
  CIRCLEUI_CHOSEN: {
    DESKTOP: { x: 0, y: -4 },
  },
  SELECT_FIRST: {
    DESKTOP: { x: 892, y: 85 },
  },
  SELECT_SECOND: {
    DESKTOP: { x: 1020, y: 85 },
  },
  SELECT_THIRD: {
    DESKTOP: { x: 1148, y: 85 },
  },
  MINI_FIRST: {
    DESKTOP: { x: 5, y: -10 },
  },
  MINI_SECOND: {
    DESKTOP: { x: 23, y: -18 },
  },
  MINI_THIRD: {
    DESKTOP: { x: 20, y: -15 },
  },
  OK_BUTTON: {
    DESKTOP: { x: 0, y: 90 },
  },
  CONTINUE_BUTTON: {
    DESKTOP: { x: 695, y: 570 },
    MOBILE: { x: 925, y: 570 },
  },
  LOGO: {
    DESKTOP: { x: 40, y: 10 },
  },
  FINAL: {
    DESKTOP: {
      x: 695, y: 250,
    },
  },
});

const SPRITE_CONFIG = Object.freeze({
  BACKGROUND: {
    w: SIZES.width,
    h: SIZES.height,
    z: 1,
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
    z: 1,
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
  SIZES, POSITIONS, SPRITE_CONFIG, SIZE_MOBILE,
};
