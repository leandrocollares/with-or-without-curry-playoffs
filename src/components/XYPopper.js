/* 
  Written by Peter Beshai (@pbesh)
*/

import React, { useState, useEffect } from 'react';
import { usePopper } from 'react-popper';

/* eslint-disable react/prop-types */

const XYPopper = ({ x, y, children }) => {
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const [arrowElement, setArrowElement] = useState(null);
  const offsetX = 0;
  const offsetY = 10;
  const { styles, attributes, update } = usePopper(
    referenceElement,
    popperElement,
    {
      placement: 'top',
      modifiers: [
        { name: 'offset', options: { offset: [offsetX, offsetY] } },
        { name: 'arrow', options: { element: arrowElement, padding: 8 } },
      ],
    },
  );

  // force the popper to update its reference element when x and y change
  // since we are using a dummy element
  useEffect(() => {
    if (x !== null && y !== null) {
      update?.();
    }
  }, [x, y, update]);

  return (
    <>
      <div /** dummy element to position popper with */
        ref={setReferenceElement}
        style={{
          position: 'absolute',
          left: x,
          top: y,
          width: 0,
          height: 0,
          pointerEvents: 'none',
        }}
      />
      <div
        ref={setPopperElement}
        className="xy-popper"
        style={styles.popper}
        {...attributes.popper}
      >
        <div
          ref={setArrowElement}
          style={styles.arrow}
          {...attributes.arrow}
          className="xy-popper-arrow"
        />
        <div className="xy-popper-content">
          {/* the actual tooltip contents go here */}
          {children}
        </div>
      </div>
    </>
  );
};

export default XYPopper;
