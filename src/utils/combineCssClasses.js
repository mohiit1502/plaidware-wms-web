export const combineClasses = (...classes) => {
  return classes.reduce((classNames, currentClassName) => {
    if (Array.isArray(currentClassName)) {
      return currentClassName[0] ? classNames + ' ' + currentClassName[1] : classNames;
    } else if (currentClassName) {
      return classNames + ' ' + currentClassName;
    } else {
      return classNames;
    }
  }, '');
};

export default combineClasses;

// Ref: https://www.npmjs.com/package/combine-classes
