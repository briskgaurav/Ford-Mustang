// hooks/useWebsiteLoader.js
import { useEffect, useState } from "react";
import { LoadingManager } from "three";

export default function useWebsiteLoader() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const manager = new LoadingManager();

    let totalAssets = 0;
    let loadedAssets = 0;

    const checkAllLoaded = () => {
      if (loadedAssets >= totalAssets) {
        setTimeout(() => {
          setIsLoaded(true);
        }, 500); // small delay for polish
      }
    };

    // Count images
    const images = Array.from(document.images);
    totalAssets += images.length;
    images.forEach((img) => {
      if (img.complete) {
        loadedAssets++;
      } else {
        img.onload = () => {
          loadedAssets++;
          checkAllLoaded();
        };
        img.onerror = () => {
          loadedAssets++;
          checkAllLoaded();
        };
      }
    });

    // Custom fonts (optional)
    if (document.fonts) {
      totalAssets++;
      document.fonts.ready.then(() => {
        loadedAssets++;
        checkAllLoaded();
      });
    }

    // 3D assets via manager (optional)
    manager.onLoad = () => {
      loadedAssets++;
      checkAllLoaded();
    };

    checkAllLoaded();
  }, []);

  return { isLoaded };
}
