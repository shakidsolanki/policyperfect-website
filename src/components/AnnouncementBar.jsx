import { useState, useEffect } from 'react';
import { db } from '../utils/db';

const TYPE_STYLES = {
  info: {
    bg: 'linear-gradient(90deg, #0d9488 0%, #0891b2 100%)',
    color: '#ffffff',
    iconBg: 'rgba(255,255,255,0.18)',
    closeBg: 'rgba(255,255,255,0.15)',
    closeHover: 'rgba(255,255,255,0.28)',
    icon: '📢'
  },
  warning: {
    bg: 'linear-gradient(90deg, #d97706 0%, #f59e0b 100%)',
    color: '#ffffff',
    iconBg: 'rgba(255,255,255,0.18)',
    closeBg: 'rgba(255,255,255,0.15)',
    closeHover: 'rgba(255,255,255,0.28)',
    icon: '⚠️'
  },
  success: {
    bg: 'linear-gradient(90deg, #16a34a 0%, #15803d 100%)',
    color: '#ffffff',
    iconBg: 'rgba(255,255,255,0.18)',
    closeBg: 'rgba(255,255,255,0.15)',
    closeHover: 'rgba(255,255,255,0.28)',
    icon: '✅'
  },
  promo: {
    bg: 'linear-gradient(90deg, #7c3aed 0%, #a855f7 50%, #ec4899 100%)',
    color: '#ffffff',
    iconBg: 'rgba(255,255,255,0.18)',
    closeBg: 'rgba(255,255,255,0.15)',
    closeHover: 'rgba(255,255,255,0.28)',
    icon: '🎉'
  }
};

const SESSION_KEY = 'announcement_bar_dismissed';

export default function AnnouncementBar() {
  const [announcement, setAnnouncement] = useState(null);
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const data = db.getAnnouncement();
    const dismissed = sessionStorage.getItem(SESSION_KEY) === 'true';

    if (data && data.enabled && !dismissed) {
      setAnnouncement(data);
      // Trigger slide-down animation after a short delay
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setVisible(true);
        });
      });
      setMounted(true);
    }
  }, []);

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, 'true');
    // Remove from DOM after animation completes
    setTimeout(() => setMounted(false), 350);
  };

  if (!mounted || !announcement) return null;

  const style = TYPE_STYLES[announcement.type] || TYPE_STYLES.info;

  return (
    <>
      <style>{`
        @keyframes announcementSlideDown {
          from {
            transform: translateY(-100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .announcement-bar {
          width: 100%;
          overflow: hidden;
          transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1),
                      opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          max-height: 0;
          opacity: 0;
        }

        .announcement-bar.visible {
          max-height: 60px;
          opacity: 1;
        }

        .announcement-inner {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 8px 16px;
          position: relative;
          min-height: 40px;
          font-family: 'Inter', 'Outfit', sans-serif;
        }

        .announcement-icon-badge {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          font-size: 14px;
          flex-shrink: 0;
          backdrop-filter: blur(4px);
        }

        .announcement-text {
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.01em;
          line-height: 1.4;
          text-align: center;
          flex: 1;
          max-width: 700px;
        }

        .announcement-link {
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          padding: 3px 10px;
          border-radius: 12px;
          border: 1.5px solid rgba(255,255,255,0.55);
          background: rgba(255,255,255,0.12);
          color: inherit;
          white-space: nowrap;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
          backdrop-filter: blur(4px);
          flex-shrink: 0;
        }

        .announcement-link:hover {
          background: rgba(255,255,255,0.25);
          border-color: rgba(255,255,255,0.8);
          transform: scale(1.04);
        }

        .announcement-close {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          color: rgba(255,255,255,0.85);
          transition: background 0.18s, color 0.18s, transform 0.15s;
          flex-shrink: 0;
          line-height: 1;
          padding: 0;
        }

        .announcement-close:hover {
          color: #fff;
          transform: translateY(-50%) scale(1.15);
        }

        @media (max-width: 600px) {
          .announcement-text {
            font-size: 11.5px;
          }
          .announcement-inner {
            padding: 7px 42px 7px 12px;
            gap: 7px;
          }
          .announcement-icon-badge {
            display: none;
          }
        }
      `}</style>

      <div
        className={`announcement-bar${visible ? ' visible' : ''}`}
        style={{ background: style.bg }}
        role="alert"
        aria-live="polite"
      >
        <div className="announcement-inner">
          {/* Left Icon */}
          <div
            className="announcement-icon-badge"
            style={{ background: style.iconBg }}
            aria-hidden="true"
          >
            {style.icon}
          </div>

          {/* Text */}
          <span className="announcement-text" style={{ color: style.color }}>
            {announcement.text}
          </span>

          {/* Optional CTA Link */}
          {announcement.link && announcement.linkText && (
            <a
              href={announcement.link}
              className="announcement-link"
              style={{ color: style.color }}
            >
              {announcement.linkText} →
            </a>
          )}

          {/* Close Button */}
          <button
            className="announcement-close"
            onClick={handleDismiss}
            aria-label="Dismiss announcement"
            style={{ background: style.closeBg }}
            onMouseEnter={e => (e.currentTarget.style.background = style.closeHover)}
            onMouseLeave={e => (e.currentTarget.style.background = style.closeBg)}
          >
            ✕
          </button>
        </div>
      </div>
    </>
  );
}
