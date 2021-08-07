const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getMixedArray = (elements) => {
  let mixedElements = [];
  mixedElements = elements.slice();
  for (let i = mixedElements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [mixedElements[i], mixedElements[j]] = [mixedElements[j], mixedElements[i]];
  }
  return mixedElements;
};

const getMixedRandomLenghtArray = (elements) => {
  const newArrayLength = getRandomInteger(0, elements.length);
  let cutElements = [];
  if (newArrayLength !== 0){
    cutElements =  getMixedArray(elements).slice(0, newArrayLength);
  }
  return cutElements;
};

const getRandomBoolean = () => Math.random() < 0.5;


export {getRandomInteger, getMixedArray, getMixedRandomLenghtArray, getRandomBoolean};
