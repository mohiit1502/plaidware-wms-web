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
