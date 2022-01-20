import React, { useEffect, useState } from 'react';
import { BrowserQRCodeSvgWriter } from '@zxing/browser';
import PropTypes from 'prop-types';

/**
 * Generates a QR code with the payload
 * Ref: https://zxing-js.github.io/library/
 * @param {{payload: string, className: string, width: number, height: number}}
 */
export default function QRcode({ payload, className, width, height }) {
  const [svgHtml, setSvgHtml] = useState('Loading QR code');

  useEffect(() => {
    const codeWriter = new BrowserQRCodeSvgWriter();
    const svgElement = codeWriter.write(payload, width, height);
    setSvgHtml(svgElement.outerHTML);
  }, [payload]);

  return <div className={className} dangerouslySetInnerHTML={{ __html: svgHtml }}></div>;
}

QRcode.defaultProps = {
  width: 300,
  height: 300
};

// Typechecking props for the Breadcrumbs
QRcode.propTypes = {
  payload: PropTypes.string.isRequired,
  className: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number
};
