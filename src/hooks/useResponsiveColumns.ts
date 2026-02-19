import { useEffect, useState } from "react";

type Breakpoint = {
  width: number;
  cols: number;
};

/**
 * Returns a responsive column count based on viewport breakpoints.
 * Keeps logic in one place so cards/carousels can stay in sync with CSS grids.
 */
export function useResponsiveColumns(
  defaultCols: number,
  breakpoints: Breakpoint[]
) {
  const [cols, setCols] = useState(defaultCols);

  useEffect(() => {
    const calculate = () => {
      const viewport = window.innerWidth;
      let next = defaultCols;

      for (const bp of breakpoints) {
        if (viewport <= bp.width) {
          next = bp.cols;
        }
      }

      setCols(next);
    };

    calculate();
    window.addEventListener("resize", calculate);
    return () => window.removeEventListener("resize", calculate);
  }, [breakpoints, defaultCols]);

  return cols;
}
