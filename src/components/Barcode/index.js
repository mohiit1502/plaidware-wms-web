import React from 'react';
import JsBarcode from 'jsbarcode';
import PropTypes from 'prop-types';

/**
 * Generates a barcode with the payload
 * Ref for options: https://github.com/lindell/JsBarcode
 * @param {{payload: string}}
 */
export default function Barcode({ payload, showText, text, options }) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, payload, { displayValue: showText, text, ...options });
    ref.current?.replaceChildren(canvas);
  }, [ref, payload, text, options]);

  return <div ref={ref}></div>;
}

Barcode.defaultProps = {
  showText: true,
  options: {}
};

// Typechecking props for the Breadcrumbs
Barcode.propTypes = {
  payload: PropTypes.string.isRequired,
  showText: PropTypes.bool,
  text: PropTypes.string,
  options: PropTypes.object
};
