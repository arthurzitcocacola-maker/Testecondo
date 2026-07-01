import { useEffect, useRef } from 'react';
import { logPageView, logAction } from '@/lib/discord-logger';

/**
 * Home page for Roblox Condo
 * Integrates the original React app and overlay.js for the interactive UI
 * Includes Discord webhook logging for all events
 */
export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Log page view
    logPageView('/');

    // Dynamically load the original React app scripts
    const loadScripts = async () => {
      try {
        // Load the CSS files
        const link1 = document.createElement('link');
        link1.rel = 'stylesheet';
        link1.href = '/index-C4WK_e_L.css';
        document.head.appendChild(link1);

        const link2 = document.createElement('link');
        link2.rel = 'stylesheet';
        link2.href = '/index-BhkNl5vo.css';
        document.head.appendChild(link2);

        // Load the main app script
        const script = document.createElement('script');
        script.src = '/index-EMoPcdfT.js';
        script.type = 'module';
        script.crossOrigin = 'anonymous';
        document.body.appendChild(script);

        // Load the overlay script after a short delay
        setTimeout(() => {
          const overlayScript = document.createElement('script');
          overlayScript.src = '/overlay.js';
          overlayScript.type = 'text/javascript';
          document.body.appendChild(overlayScript);

          logAction('Application Loaded', {
            timestamp: new Date().toISOString(),
          });
        }, 500);
      } catch (error) {
        console.error('Error loading RobloxCondo scripts:', error);
        logAction('Application Load Error', {
          error: String(error),
        });
      }
    };

    loadScripts();

    // Monitor button clicks for logging
    const handleButtonClick = (e: Event) => {
      const target = e.target as HTMLElement;
      const testId = target.getAttribute('data-testid');
      
      if (testId?.includes('button-generate-token')) {
        logAction('Token Generation Initiated', {
          element: testId,
        });
      } else if (testId?.includes('button-access-game')) {
        logAction('Game Access Attempted', {
          element: testId,
        });
      } else if (testId?.includes('button-play')) {
        const gameId = testId.replace('button-play-', '');
        logAction('Play Button Clicked', {
          gameId,
        });
      }
    };

    document.addEventListener('click', handleButtonClick);

    return () => {
      document.removeEventListener('click', handleButtonClick);
    };
  }, []);

  return (
    <div ref={containerRef} id="root" className="min-h-screen">
      {/* The original React app will be rendered here */}
    </div>
  );
}
