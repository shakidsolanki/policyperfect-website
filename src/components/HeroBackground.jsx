import React from 'react';
import { motion } from 'framer-motion';

const HeroBackground = ({ isDark = false, icons = [] }) => {
  // Colors for the half-round geometric shapes (Logo colors)
  // Increased opacity slightly so the golden color is visible as requested earlier
  const color1 = isDark ? 'rgba(14, 165, 233, 0.15)' : 'rgba(14, 165, 233, 0.15)'; // Sky Blue
  const color2 = isDark ? 'rgba(223, 177, 91, 0.20)' : 'rgba(223, 177, 91, 0.20)';   // Golden
  const iconColor = isDark ? 'rgba(223, 177, 91, 0.25)' : 'rgba(223, 177, 91, 0.35)'; // Golden Icons

  const defaultPositions = [
    { top: '15%', right: '10%', y: -15, rotate: 12, duration: 6, delay: 0 },
    { top: '45%', left: '8%', y: 12, rotate: -8, duration: 5.5, delay: 0.5 },
    { bottom: '20%', right: '12%', y: -10, rotate: 10, duration: 7, delay: 1 },
    { top: '20%', left: '10%', y: 10, rotate: -6, duration: 6.5, delay: 1.5 },
    { bottom: '30%', left: '5%', y: -15, rotate: 15, duration: 5.8, delay: 2 },
    { top: '60%', right: '5%', y: 15, rotate: 20, duration: 7.5, delay: 1.2 },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      
      {/* Original Faint Gradient blobs for the 'light golden blue' effect */}
      <div style={{ position:'absolute', top:'-80px', right:'-80px', width:'420px', height:'420px', background:`radial-gradient(circle, ${color1} 0%, transparent 70%)`, borderRadius:'50%', filter:'blur(40px)' }} />
      <div style={{ position:'absolute', bottom:'-60px', left:'-60px', width:'320px', height:'320px', background:`radial-gradient(circle, ${color2} 0%, transparent 70%)`, borderRadius:'50%', filter:'blur(40px)' }} />
      <div style={{ position:'absolute', top:'40%', left:'30%', width:'500px', height:'500px', background:`radial-gradient(circle, ${color2} 0%, transparent 70%)`, borderRadius:'50%', opacity: 0.5, filter:'blur(40px)' }} />

      {/* Floating Icons */}
      {icons.map((Icon, index) => {
        if (!Icon) return null;
        const pos = defaultPositions[index % defaultPositions.length];
        return (
          <motion.div 
            key={index}
            animate={{ y: [0, pos.y, 0], rotate: [0, pos.rotate, 0] }} 
            transition={{ duration: pos.duration, repeat: Infinity, ease: 'easeInOut', delay: pos.delay }}
            style={{ 
              position: 'absolute', 
              ...(pos.top && { top: pos.top }),
              ...(pos.bottom && { bottom: pos.bottom }),
              ...(pos.left && { left: pos.left }),
              ...(pos.right && { right: pos.right }),
            }}
          >
            <Icon size={56} strokeWidth={1.2} style={{ color: iconColor }} />
          </motion.div>
        );
      })}

      {/* --- PURI SITE ME AADHA ROUND (FULL WIDTH BOTTOM CURVE) --- */}
      {/* 120% width ensures the extreme edges are rendered off-screen, completely hiding any vertical artifacts on all screen sizes! */}
      <div className="absolute bottom-[-1px] left-[-10%] w-[120%] overflow-hidden leading-[0]">
        <svg viewBox="0 0 1440 100" className="w-full h-[60px] md:h-[120px]" preserveAspectRatio="none">
          <path fill="#ffffff" d="M0,100 L1440,100 L1440,0 Q720,100 0,0 Z"></path>
        </svg>
      </div>

    </div>
  );
};

export default HeroBackground;
