import { useState, useEffect } from 'react';

export type Orientation = 'landscape' | 'portrait';

export default function useDeviceOrientation() {
  const [orientation, setOrientation] = useState<Orientation | undefined>();

  useEffect(() => {
    const query = window.matchMedia('(orientation: landscape)');

    if (query.matches) {
      setOrientation('landscape');
    } else {
      setOrientation('portrait');
    }
  }, []);

  return orientation;
}
