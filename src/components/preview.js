import React, { useEffect, useRef } from 'react';

function Preview({ htmlCode, cssCode }) {
  const shadowRef = useRef(null);
 
  useEffect(() => {
    const shadowRoot = shadowRef.current.shadowRoot;

    if (!shadowRoot) {
      shadowRef.current.attachShadow({ mode: 'open' });

      // create a new style element with the CSS content
      const styleElement = document.createElement('style');
      styleElement.textContent = cssCode;

      // create a new div element with the HTML content
      const htmlElement = document.createElement('div');
      htmlElement.innerHTML = htmlCode;

      // add the style and html elements to the shadow DOM
      shadowRef.current.shadowRoot.appendChild(styleElement);
      shadowRef.current.shadowRoot.appendChild(htmlElement);
      
    } else {
      // update the content of the existing shadow DOM
      const styleElement = shadowRoot.querySelector('style');
      const htmlElement = shadowRoot.querySelector('div');

      if (styleElement && htmlElement) {
        styleElement.textContent = cssCode;
        htmlElement.innerHTML = htmlCode;
      }
    }
  }, [htmlCode, cssCode]);

  return <div ref={shadowRef} />;
}

export default Preview;
