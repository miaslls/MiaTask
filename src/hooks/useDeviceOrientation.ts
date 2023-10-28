import { useState, useEffect } from 'react';

export type Orientation = 'landscape' | 'portrait';

export default function useDeviceOrientation() {
  const [orientation, setOrientation] = useState<Orientation | undefined>();

  useEffect(() => {
    const queryString = window.matchMedia('(orientation: landscape)');

    function handleOrientation(query: MediaQueryList | MediaQueryListEvent) {
      if (query.matches) {
        setOrientation('landscape');
      } else {
        setOrientation('portrait');
      }
    }

    handleOrientation(queryString);

    queryString.addEventListener('change', handleOrientation);

    return () => {
      queryString.removeEventListener('change', handleOrientation);
    };
  }, []);

  return orientation;
}
