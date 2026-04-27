import { useState, useEffect } from 'react';
import { FastAverageColor } from 'fast-average-color';

export function useDynamicColor(imageUrl) {
  const [color, setColor] = useState('#0f172a');

  useEffect(() => {
    if (!imageUrl) return;

    const fac = new FastAverageColor();
    fac.getColorAsync(imageUrl)
      .then(res => {
        setColor(res.hex);
      })
      .catch(e => console.error(e));
  }, [imageUrl]);

  return color;
}
