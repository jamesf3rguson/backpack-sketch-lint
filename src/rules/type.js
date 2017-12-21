import { typesettings } from 'bpk-tokens/tokens/base.es6';

import { BASE_FONT_SIZE } from '../constants';

const VALID_FONT_SIZES = [
  typesettings.fontSizeSm,
  typesettings.fontSizeBase,
  typesettings.fontSizeLg,
  typesettings.fontSizeXl,
  typesettings.fontSizeXxl,
].map((size) => BASE_FONT_SIZE * parseFloat(size.replace('rem')));

const VALID_LINE_HEIGHTS = [
  typesettings.lineHeightSm,
  typesettings.lineHeightBase,
  typesettings.lineHeightLg,
  typesettings.lineHeightXl,
  typesettings.lineHeightXxl,
].map((size) => BASE_FONT_SIZE * parseFloat(size.replace('rem')));

export default {
  relevantToLayer: layer => layer.isText,
  isValid: layer => {
    const fontIndex = VALID_FONT_SIZES.indexOf(layer.sketchObject.fontSize());
    const lineIndex = VALID_LINE_HEIGHTS.indexOf(layer.sketchObject.lineHeight());

    return fontIndex != -1 && lineIndex != -1 && fontIndex == lineIndex;
  },
  identifier: 'ty',
};
