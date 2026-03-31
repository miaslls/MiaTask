import { useState, useEffect } from 'react';

export type Orientation = 'landscape' | 'portrait';

// Orientation hook used only for view-level formatting differences.
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
