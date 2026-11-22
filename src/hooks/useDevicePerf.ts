import { useEffect } from 'react';
import { useAppStore } from '../store/appStore';

export function useDevicePerf() {
  const setPerfTier = useAppStore((s) => s.setPerfTier);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null;

    if (!gl) {
      setPerfTier('low');
      return;
    }

    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = debugInfo
      ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)?.toLowerCase() ?? ''
      : '';

    const isMobile = /android|iphone|ipad|mobile/i.test(navigator.userAgent);
    const isLowEnd = /intel|mesa|swiftshader|llvmpipe/i.test(renderer);
    const isHighEnd = /nvidia|amd|radeon|geforce/i.test(renderer);

    if (isMobile || isLowEnd) {
      setPerfTier('low');
    } else if (isHighEnd) {
      setPerfTier('high');
    } else {
      setPerfTier('medium');
    }
  }, [setPerfTier]);
}
