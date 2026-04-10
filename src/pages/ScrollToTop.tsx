import { useEffect } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  useEffect(() => {
    const savedPosition = sessionStorage.getItem(location.pathname);

    if (navigationType === "POP" && savedPosition) {
      // 👈 Back button
      window.scrollTo(0, parseInt(savedPosition));
    } else {
      // 👈 Normal navigation
      window.scrollTo(0, 0);
    }
  }, [location.pathname, navigationType]);

  useEffect(() => {
    return () => {
      // Save scroll before leaving page
      sessionStorage.setItem(
        location.pathname,
        window.scrollY.toString()
      );
    };
  }, [location.pathname]);

  return null;
};

export default ScrollToTop;