import _ from 'underscore';

export const getErrorValue = (data, type) => {
  try {
    return _.omit(data, type);
  } catch {
    return data;
  }
};

export const getFetchingValue = (data, type) => {
  try {
    return _.without(data, type);
  } catch (error) {
    return data;
  }
};

export const not = (a, b) => {
  return a.filter((value) => b.indexOf(value) === -1);
};

export const notBy = (matchProp, a, b) => {
  if (matchProp && typeof matchProp === 'object') {
    return a.filter((aItem) => b.findIndex(bItem => (matchProp.a ? aItem[matchProp.a] : aItem) === (matchProp.b ? bItem[matchProp.b] : bItem)) === -1);
  }
  // eslint-disable-next-line no-console
  console.error('Incorrect match prop received');
  return [];
};

export const intersection = (a, b) => {
  return a.filter((value) => b.indexOf(value) !== -1);
};

export const intersectionBy = (matchProp, a, b) => {
  if (matchProp && typeof matchProp === 'object') {
    return a.filter((aItem) => b.findIndex(bItem => (matchProp.a ? aItem[matchProp.a] : aItem) === (matchProp.b ? bItem[matchProp.b] : bItem)) !== -1);
  }
  // eslint-disable-next-line no-console
  console.error('Incorrect match prop received');
  return [];
};
