import { useCallback, useRef } from 'react';
import { RESOLUTION_MAP } from '../constants/shaders';

export function useEngineBridge() {
  const bridgeRef = useRef(null);

  const setBridge = useCallback((api) => {
    bridgeRef.current = api;
  }, []);

  const captureImage = useCallback((resolutionKey = '4K', format = 'image/png') => {
    if (!bridgeRef.current?.captureImage) return;
    return bridgeRef.current.captureImage(resolutionKey, format);
  }, []);

  return { setBridge, captureImage };
}
