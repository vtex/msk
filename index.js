const DIGIT = "9";
const ALPHA = "A";
const ALPHANUM = "S";
const ALL = "*";

function msk(value, mask) {
  const removeExceedingChars =
    arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!value || !mask) return "";
  value = value.toString();

  for (let i = 0; i < value.length; i++) {
    const maskToken = mask[i];
    // If the character is OK with the mask
    if (maskToken && match(value[i], maskToken)) {
      continue;
    }

    // If it's there's a space or a non-word character in the mask
    // just insert the character inbetween the value
    if (isSpaceOrNonWordChar(maskToken)) {
      const firstPart = value.slice(0, i);
      const secondPart = trimLeft(value.slice(i));
      value = firstPart + maskToken + secondPart;
      value = msk(value, mask, removeExceedingChars);
      break;
    }

    if (removeExceedingChars) {
      // If it doesn't match, remove the character
      const firstPart = value.slice(0, i);
      const secondPart = value.slice(i + 1);
      value = firstPart + secondPart;
      value = msk(value, mask, removeExceedingChars);
    }
  }

  return value;
}

function fit(value, mask) {
  return msk(value, mask, true);
}

function match(char, token) {
  switch (token) {
    case DIGIT:
      return /[0-9]/.test(char);
    case ALPHA:
      return /[A-ú]/.test(char);
    case ALPHANUM:
      return /[A-ú0-9]/.test(char);
    case ALL:
      return true;
    default:
      return new RegExp(escapeRegExp(token)).test(char);
  }
}

function isSpaceOrNonWordChar(maskToken) {
  return maskToken === " " || new RegExp(/\W/).test(maskToken);
}

function trimLeft(str) {
  return str.replace(/^\s+/, "");
}

function escapeRegExp(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

module.exports = msk;
module.exports.fit = fit;
