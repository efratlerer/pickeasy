import React, { useEffect } from 'react';

const ScrollToTopOnRefresh = () => {
  useEffect(() => {
    // Scroll to the top when the component mounts (on page refresh)
    window.scrollTo(0, 0);

    // Optional: You can also add a listener to handle navigation changes
    const handleScrollToTop = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', handleScrollToTop);

    // Cleanup the listener when the component is unmounted
    return () => {
      window.removeEventListener('beforeunload', handleScrollToTop);
    };
  }, []);

  return null; // This component doesn't render anything to the DOM
};

export default ScrollToTopOnRefresh;
