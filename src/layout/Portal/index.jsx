// src/components/Portal.js
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  const elRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const el = document.createElement("div");
    elRef.current = el;
    document.body.appendChild(el);
    setMounted(true);

    return () => {
      document.body.removeChild(el);
    };
  }, []);

  return mounted ? createPortal(children, elRef.current) : null;
};

export default Portal;
