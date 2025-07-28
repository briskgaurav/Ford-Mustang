import { useEffect, useState } from "react";
import { LoadingManager } from "three";

export default function useWebsiteLoader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const manager = new LoadingManager();

    let totalAssets = 0;
    let loadedAssets = 0;

    const updateProgress = () => {
      const percent = totalAssets > 0 ? (loadedAssets / totalAssets) * 100 : 100;
      setProgress(Math.round(percent));
    };

    const checkAllLoaded = () => {
      updateProgress();
      if (loadedAssets >= totalAssets) {
        setTimeout(() => {
          setIsLoaded(true);
        }, 500); // smooth exit delay
      }
    };

    // Count images
    const images = Array.from(document.images);
    totalAssets += images.length;
    images.forEach((img) => {
      if (img.complete) {
        loadedAssets++;
        checkAllLoaded();
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

    // Fonts
    if (document.fonts) {
      totalAssets++;
      document.fonts.ready.then(() => {
        loadedAssets++;
        checkAllLoaded();
      });
    }

    // 3D assets
    manager.onLoad = () => {
      loadedAssets++;
      checkAllLoaded();
    };

    checkAllLoaded();

    // Optional: expose manager if needed
    // return manager
  }, []);

  return { isLoaded, progress };
}
