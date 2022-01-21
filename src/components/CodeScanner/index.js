import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import LOGGER from 'services/Logger';

import { BrowserMultiFormatReader, NotFoundException } from '@zxing/library';

export default function CodeScanner({ onDetect, width, height }) {
  // const [decoded, setDecoded] = useState(null);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);
  const [videoInputDevices, setVideoInputDevices] = useState(null);
  const getMediaDevices = (reader) => {
    reader
      .listVideoInputDevices()
      .then((videoIPDevices) => {
        setVideoInputDevices(videoIPDevices);
        if (videoIPDevices && videoIPDevices.length > 0) {
          setSelectedDeviceId(videoIPDevices[0].deviceId);
        }
      })
      .catch(LOGGER.log);
  };

  const codeReader = useMemo(() => {
    // LOGGER.log('Initializing code reader');
    const reader = new BrowserMultiFormatReader();
    getMediaDevices(reader);
    return reader;
  }, []);

  // LOGGER.log('hasNavigator', codeReader.hasNavigator);
  // LOGGER.log('isMediaDeviceSupported', codeReader.isMediaDevicesSuported);

  useEffect(() => {
    !selectedDeviceId && getMediaDevices(codeReader);

    async function startStream() {
      // LOGGER.log('Starting stream');
      if (videoInputDevices) {
        codeReader
          .decodeFromVideoDevice(selectedDeviceId, '#scan-view', (result, err) => {
            if (result) {
              LOGGER.log(result);
              onDetect(result.text);
              // setDecoded(result.text);
            }
            if (err && !(err instanceof NotFoundException)) {
              LOGGER.error(err);
            }
          })
          .catch(() => {
            getMediaDevices(codeReader);
          });
      }
    }
    startStream();
    return () => {
      // LOGGER.log('resetting code reader');
      codeReader.reset();
    };
  }, [selectedDeviceId]);

  // Use when debugging
  // return videoInputDevices && selectedDeviceId ? (
  //   <div>
  //     <video id="#scan-view" width={width.toString()} height={height.toString()} />
  //     <p>Value: {decoded}</p>
  //     <br />
  //     <br />
  //     <pre style={{ fontSize: 12 }}>
  //       Debug data: <br /> {JSON.stringify(videoInputDevices, null, 4)}
  //     </pre>
  //   </div>
  // ) : (
  //   <p>Not supported</p>
  // );

  return codeReader.hasNavigator && codeReader.isMediaDevicesSuported ? (
    videoInputDevices && selectedDeviceId ? (
      <video id="#scan-view" width={width.toString()} height={height.toString()} />
    ) : (
      <p>Please grant camera permissions</p>
    )
  ) : (
    <p>Not supported</p>
  );
}

CodeScanner.defaultProps = {
  width: 300,
  height: 200
};

CodeScanner.propTypes = {
  onDetect: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number
};
