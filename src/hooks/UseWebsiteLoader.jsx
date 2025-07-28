import { useEffect, useState } from "react";
import { LoadingManager } from "three";

export default function useWebsiteLoader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [targetProgress, setTargetProgress] = useState(0);

  useEffect(() => {
    const manager = new LoadingManager();
    let totalAssets = 0;
    let loadedAssets = 0;

    // Smooth progress animation
    const animateProgress = () => {
      if (progress < targetProgress) {
        setProgress(prev => Math.min(prev + 1, targetProgress));
        requestAnimationFrame(animateProgress);
      }
    };

    const updateProgress = () => {
      const percent = totalAssets > 0 ? (loadedAssets / totalAssets) * 100 : 100;
      setTargetProgress(Math.round(percent));
      requestAnimationFrame(animateProgress);
    };

    const checkAllLoaded = () => {
      updateProgress();
      if (loadedAssets >= totalAssets) {
        // Ensure progress reaches 100 before showing loaded
        const finishLoading = () => {
          if (progress >= 100) {
            setTimeout(() => setIsLoaded(true), 500);
          } else {
            requestAnimationFrame(finishLoading);
          }
        };
        finishLoading();
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
    manager.onProgress = (url, itemsLoaded, itemsTotal) => {
      totalAssets = itemsTotal;
      loadedAssets = itemsLoaded;
      checkAllLoaded();
    };

    manager.onLoad = () => {
      loadedAssets++;
      checkAllLoaded();
    };

    checkAllLoaded();

  }, [progress, targetProgress]);

  return { isLoaded, progress };
}
