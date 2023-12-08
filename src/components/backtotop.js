import React, { useState } from "react";

const BackToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 300) {
      setVisible(true);
    } else if (scrolled <= 300) {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", toggleVisible);

  return (
    <div className="back-to-top">
      {visible && (
        <button onClick={scrollToTop}>
        <div class="text">
            <span>Back</span>
            <span>to</span>
            <span>top</span>
        </div>
        <div class="clone">
            <span>Back</span>
            <span>to</span>
            <span>top</span>
        </div>
        <svg width="20px" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
        </svg>
    </button>
      )}
    </div>
  );
};

export default BackToTopButton;
