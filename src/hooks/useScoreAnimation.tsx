import { useEffect, useRef } from "react";
const mojs = require("@mojs/core");
export const useScoreAnimation = (element: React.RefObject<HTMLDivElement>) => {
  const animRef = useRef<any>(null);
  useEffect(() => {
    if (animRef.current) return;
    const tlDuration = 400;
    animRef.current = new mojs.Html({
      el: element.current,
      duration: tlDuration,
      opacity: { 0: 1 },
      y: { 0: -25 },
    }).then({
      delay: tlDuration / 2,
      opacity: { 1: 0 },
      y: -25,
    });
  }, [animRef, element]);
  return { animRef };
};
