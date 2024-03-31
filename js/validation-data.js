const HASHTAG_AMOUNT = 5;
const MAX_COMMENT_LENGTH = 140;

function validateCommentLength (value) {
  return value.length <= MAX_COMMENT_LENGTH;
}

function isHashtagTrueSymbols (value) {
  const hashtagConstraint = /^[a-zа-яё0-9]*$/i;
  const hashtags = value.split(' ');
  if(!value){
    return true;
  } else {
    return hashtags.every((hashtag) => hashtagConstraint.test(hashtag.replace('#', '')));
  }
}

function isHashtagTrueLength (value) {
  const hashtags = value.split(' ');
  if(!value){
    return true;
  } else {
    return hashtags.every((hashtag) => hashtag.length <= 20);
  }
}

function isHashtagTrueStart(value) {
  const hashtags = value.split(' ');
  let isValid = true;
  hashtags.forEach((element) => {
    const hashtag = element.trim();
    if (hashtag !== '' && !hashtag.startsWith('#')) {
      isValid = false;
    }
  });
  return isValid;
}

function isHashtagNotOneSymbol (value) {
  const hashtags = value.split(' ');
  let isValid = true;
  hashtags.forEach((element) => {
    const hashtag = element.trim();
    if (hashtag.length === 1) {
      isValid = false;
    }
  });
  return isValid;
}


function isHashtagTrueAmount (value) {
  const spaceNone = value.replaceAll(' ', '');
  const hashtags = spaceNone.split('#');
  return hashtags.length - 1 <= HASHTAG_AMOUNT;
}

function isHashtagUnique(value) {

  const hashtags = value.toLowerCase().split(' ');
  const uniqueHashtags = {};

  for (const hashtag of hashtags) {
    if (hashtag.trim() === '' || !hashtag.startsWith('#')) {
      continue;
    }
    if (uniqueHashtags[hashtag]) {
      return false;
    }
    uniqueHashtags[hashtag] = true;
  }
  return true;
}

export { validateCommentLength, isHashtagNotOneSymbol, isHashtagTrueAmount, isHashtagTrueLength, isHashtagTrueStart, isHashtagTrueSymbols, isHashtagUnique };
