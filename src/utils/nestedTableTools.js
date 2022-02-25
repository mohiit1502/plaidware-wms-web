import { API } from 'constant';
import LOGGER from 'services/Logger';

export const getChildLocationType = (parentLocationType) => {
  switch (parentLocationType) {
    case 'warehouse':
      return 'zone';
    case 'zone':
      return 'area';
    case 'area':
      return 'row';
    case 'row':
      return 'bay';
    case 'bay':
      return 'level';
    case 'level':
      return 'sublevel';
    case 'sublevel':
      return 'sublevel';
    default:
      return 'unknown';
  }
};

export const getAPIslugOfLocationType = (locationType) => {
  switch (locationType) {
    case 'zone':
      return API.ADD_NEW_ZONE;

    case 'area':
      return API.ADD_NEW_AREA;

    case 'row':
      return API.ADD_NEW_ROW;

    case 'bay':
      return API.ADD_NEW_BAY;

    case 'level':
      return API.ADD_NEW_LEVEL;

    case 'sublevel':
      return API.ADD_NEW_SUBLEVEL;

    default:
      throw new Error('default values returned');
  }
};

export const getPropertiesOfLocationType = (locationType) => {
  switch (locationType) {
    case 'zone':
      return ['name', 'type', 'specs'];

    case 'area':
      return ['name', 'type', 'specs'];

    case 'row':
      return ['name', 'number', 'specs'];

    case 'bay':
      return ['name', 'type', 'number', 'specs'];

    case 'level':
      return ['name', 'type', 'specs'];

    case 'sublevel':
      return ['name', 'specs'];

    default:
      LOGGER.error('default values returned');
      return ['name', 'type', 'specs'];
  }
};

export const getColorOfLocationType = (locationType) => {
  switch (locationType) {
    case 'zone':
      return '#9b5de5';

    case 'area':
      return '#f15bb5';

    case 'row':
      return '#fee440';

    case 'bay':
      return '#00bbf9';

    case 'level':
      return '#00f5d4';

    default:
      return '#555555';
  }
};

export const toTitleCase = (str) => {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export const getInitialvaluesFromData = (data) => {
  const properties = getPropertiesOfLocationType(data.location);
  const mapper = {};
  properties.forEach((prop) => (mapper[prop] = data[prop] || ''));
  if (data.location === 'sublevel') {
    mapper['type'] = data['type'];
    mapper['parentIsLevel'] = data['current_depth'] === 1;
    mapper['parent_id'] =
      data['current_depth'] === 1 ? data['main_level_id'] : data['parent_sublevel_id'];
    // mapper['positions'] = data['positions'] || [];
  }
  // LOGGER.log('init form values', mapper);
  return mapper;
};

export const getInitialvaluesFromParentData = (data) => {
  const childType = getChildLocationType(data.location);
  const properties = getPropertiesOfLocationType(childType);
  const mapper = {};
  properties.forEach((prop) => (mapper[prop] = ''));
  if (childType === 'sublevel') {
    mapper['parent_id'] = data.id;
    mapper['parentIsLevel'] = data.location === 'level' ? true : false;
    mapper['positions'] = [];
  }
  // LOGGER.log('init form values', mapper);
  return mapper;
};
