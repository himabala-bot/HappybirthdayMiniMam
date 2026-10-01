import React, { useState, useEffect } from 'react';
import { motion, useAnimationControls } from 'framer-motion';

// 6 Achievement Pillars with Distinct Vector Badge Icons
const achievementPillars = [
  {
    id: 1,
    code: "01",
    title: "Clarity in Chaos",
    badgeName: "Launch Master",
    desc: "The unique ability to turn complex roadblocks into clear, calm, and actionable direction without hesitation.",
    quote: "Order is not the absence of chaos, but the mastery of navigating through it.",
    accentColor: "#EF6545",
    badgeBg: "#2D1B4E",
    badgeBorder: "#EF6545",
    badgeSvg: (
      <svg viewBox="0 0 100 100" width="100%" height="100%" className="block">
        <circle cx="50" cy="50" r="46" fill="#2D1B4E" stroke="#EF6545" strokeWidth="5" />
        <path d="M22 68 C22 55, 34 50, 42 56 C48 46, 62 48, 68 56 C76 54, 82 62, 78 72 Z" fill="#9D4EDD" opacity="0.6" />
        <path d="M26 74 C26 62, 38 58, 45 64 C52 56, 66 58, 70 66 C78 64, 82 72, 78 80 Z" fill="#F9D4F8" />
        <circle cx="28" cy="32" r="2.5" fill="#FFD094" />
        <circle cx="74" cy="36" r="2" fill="#FFD094" />
        <circle cx="66" cy="22" r="2" fill="#FFF" />
        <g transform="translate(36, 18) rotate(22 20 20)">
          <path d="M16 32 C12 38, 20 44, 20 44 C20 44, 28 38, 24 32 Z" fill="#F49625" />
          <path d="M18 32 C16 36, 20 40, 20 40 C20 40, 24 36, 22 32 Z" fill="#FFE600" />
          <path d="M8 26 L14 22 L14 30 Z" fill="#EA5E86" />
          <path d="M32 26 L26 22 L26 30 Z" fill="#EA5E86" />
          <path d="M14 10 C14 2, 26 2, 26 10 L26 28 L14 28 Z" fill="#FFFFFF" />
          <path d="M14 10 C14 2, 26 2, 26 10 Z" fill="#EF6545" />
          <circle cx="20" cy="16" r="3.5" fill="#2D1B4E" />
          <circle cx="19" cy="15" r="1.2" fill="#FFFFFF" />
        </g>
      </svg>
    )
  },
  {
    id: 2,
    code: "02",
    title: "Unmatched Mentorship",
    badgeName: "North Star",
    desc: "Investing patience and thoughtful guidance in every single team member's personal growth and craft.",
    quote: "Great leaders do not create followers; they nurture and elevate future leaders.",
    accentColor: "#57B1A8",
    badgeBg: "#123C4D",
    badgeBorder: "#57B1A8",
    badgeSvg: (
      <svg viewBox="0 0 100 100" width="100%" height="100%" className="block">
        <circle cx="50" cy="50" r="46" fill="#1B2A4A" stroke="#57B1A8" strokeWidth="5" />
        <circle cx="68" cy="24" r="2" fill="#FFF" />
        <circle cx="34" cy="20" r="2.5" fill="#FFD094" />
        <path d="M22 18 L32 28" stroke="#FCC4C0" strokeWidth="3" strokeLinecap="round" />
        <path d="M24 24 L28 16 L32 24 L40 24 L34 30 L36 38 L28 32 L20 38 L22 30 L16 24 Z" fill="#FCC4C0" />
        <path d="M8 66 C22 48, 48 50, 60 58 C72 52, 88 56, 92 68 L92 92 L8 92 Z" fill="#2EC4B6" />
        <path d="M8 76 C28 62, 58 64, 72 70 C82 66, 90 70, 92 78 L92 92 L8 92 Z" fill="#037F71" />
        <path d="M38 92 L46 54 L54 54 L62 92 Z" fill="#9D4EDD" opacity="0.85" />
        <path d="M49 58 L49 66 M49 72 L49 82 M49 88 L49 92" stroke="#FFF" strokeWidth="2.5" strokeDasharray="3 3" />
      </svg>
    )
  },
  {
    id: 3,
    code: "03",
    title: "Vision & Execution",
    badgeName: "Cosmic Horizon",
    desc: "Always seeing three steps ahead while keeping our daily momentum sharp, realistic, and focused.",
    quote: "Vision without execution is daydreaming; execution with vision transforms the world.",
    accentColor: "#F49625",
    badgeBg: "#221838",
    badgeBorder: "#FFD094",
    badgeSvg: (
      <svg viewBox="0 0 100 100" width="100%" height="100%" className="block">
        <circle cx="50" cy="50" r="46" fill="#221838" stroke="#FFD094" strokeWidth="5" />
        <ellipse cx="50" cy="50" rx="36" ry="18" fill="none" stroke="#F9D4F8" strokeWidth="1.5" strokeDasharray="4 3" transform="rotate(-25 50 50)" />
        <circle cx="26" cy="36" r="2" fill="#FFF" />
        <circle cx="70" cy="24" r="2" fill="#FFF" />
        <circle cx="34" cy="74" r="1.5" fill="#FFD094" />
        <circle cx="26" cy="22" r="5" fill="#E2EBEE" />
        <circle cx="52" cy="42" r="13" fill="#EF6545" />
        <circle cx="49" cy="39" r="11" fill="#F49625" />
        <path d="M8 82 C28 62, 72 62, 92 82 L92 92 L8 92 Z" fill="#FFD094" />
        <path d="M18 86 C36 72, 70 72, 88 86 L88 92 L18 92 Z" fill="#F7E9B2" />
      </svg>
    )
  },
  {
    id: 4,
    code: "04",
    title: "Culture Builder",
    badgeName: "Skyline Hero",
    desc: "Creating an environment where creative risk-taking, accountability, and genuine kindness thrive together.",
    quote: "Culture is not built on slogans; it is built on how we treat each other every single day.",
    accentColor: "#037F71",
    badgeBg: "#1C2442",
    badgeBorder: "#DDF2B8",
    badgeSvg: (
      <svg viewBox="0 0 100 100" width="100%" height="100%" className="block">
        <circle cx="50" cy="50" r="46" fill="#1C2442" stroke="#DDF2B8" strokeWidth="5" />
        <rect x="20" y="44" width="16" height="46" fill="#2D3B66" />
        <rect x="64" y="38" width="18" height="52" fill="#2D3B66" />
        <rect x="34" y="30" width="32" height="60" fill="#4CC9F0" rx="3" />
        <rect x="40" y="38" width="8" height="6" fill="#FFFFFF" opacity="0.85" />
        <rect x="52" y="38" width="8" height="6" fill="#FFFFFF" opacity="0.85" />
        <rect x="40" y="48" width="8" height="6" fill="#FFFFFF" opacity="0.85" />
        <rect x="52" y="48" width="8" height="6" fill="#FFFFFF" opacity="0.85" />
        <rect x="40" y="58" width="8" height="6" fill="#FFFFFF" opacity="0.85" />
        <rect x="52" y="58" width="8" height="6" fill="#FFFFFF" opacity="0.85" />
        <rect x="40" y="68" width="8" height="6" fill="#FFFFFF" opacity="0.85" />
        <rect x="52" y="68" width="8" height="6" fill="#FFFFFF" opacity="0.85" />
        <path d="M30 32 Q48 26 66 32 Q58 38 52 38 Z" fill="#EF6545" />
        <path d="M66 32 C78 36, 82 46, 86 52 C78 50, 72 42, 64 36 Z" fill="#F49625" />
      </svg>
    )
  },
  {
    id: 5,
    code: "05",
    title: "The Calm Anchor",
    badgeName: "Ocean Leaper",
    desc: "Keeping morale high and stress low, no matter how tight the delivery or launch window gets.",
    quote: "True strength is staying unshakeable when the tides around you are at their wildest.",
    accentColor: "#22808E",
    badgeBg: "#123C4D",
    badgeBorder: "#AECFD0",
    badgeSvg: (
      <svg viewBox="0 0 100 100" width="100%" height="100%" className="block">
        <circle cx="50" cy="50" r="46" fill="#123C4D" stroke="#AECFD0" strokeWidth="5" />
        <ellipse cx="50" cy="74" rx="28" ry="16" fill="#4CC9F0" opacity="0.6" />
        <path d="M26 68 C24 52, 76 52, 74 68 C74 86, 26 86, 26 68 Z" fill="none" stroke="#FFFFFF" strokeWidth="3.5" />
        <ellipse cx="50" cy="62" rx="20" ry="6" fill="#AECFD0" opacity="0.5" />
        <circle cx="42" cy="46" r="2.5" fill="#4CC9F0" />
        <circle cx="58" cy="42" r="2" fill="#4CC9F0" />
        <circle cx="52" cy="38" r="1.5" fill="#FFF" />
        <g transform="translate(48, 22) rotate(-15 16 16)">
          <path d="M6 16 C12 6, 26 8, 30 16 C26 24, 12 26, 6 16 Z" fill="#F49625" />
          <path d="M28 16 L38 8 L34 16 L38 24 Z" fill="#EF6545" />
          <path d="M16 10 L20 4 L22 10 Z" fill="#EF6545" />
          <circle cx="12" cy="14" r="2" fill="#221838" />
          <circle cx="11" cy="13" r="0.8" fill="#FFF" />
        </g>
      </svg>
    )
  },
  {
    id: 6,
    code: "06",
    title: "Celebrator of Wins",
    badgeName: "100% Champion",
    desc: "Ensuring no individual effort goes unnoticed and every single milestone is highlighted and celebrated.",
    quote: "Every summit reached is a testament to the quiet dedication behind each step.",
    accentColor: "#D9406A",
    badgeBg: "#2B1A42",
    badgeBorder: "#FCC4C0",
    badgeSvg: (
      <svg viewBox="0 0 100 100" width="100%" height="100%" className="block">
        <circle cx="50" cy="50" r="46" fill="#2B1A42" stroke="#FCC4C0" strokeWidth="5" />
        <path d="M16 78 L42 42 L58 42 L84 78 Z" fill="#9D4EDD" opacity="0.7" />
        <path d="M30 78 L46 48 L54 48 L70 78 Z" fill="#EA5E86" opacity="0.85" />
        <path d="M36 44 L36 34 L64 34 L64 44 Z" fill="#EF6545" />
        <text x="50" y="28" fill="#FFFFFF" fontSize="18" fontWeight="900" textAnchor="middle" fontFamily="Outfit">
          100
        </text>
        <path d="M12 62 L32 68 M68 68 L88 62" stroke="#FFD094" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="50" cy="64" r="4" fill="#FFD094" />
      </svg>
    )
  }
];

// Front Cover Page Component
const FrontCoverFace = () => (
  <div 
    style={{
      backgroundColor: "#1F150E",
      color: "#FFF9E6",
      width: "100%",
      height: "100%",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "2rem 1.75rem",
      boxSizing: "border-box",
      userSelect: "none",
      overflow: "hidden",
      borderRight: "2px solid rgba(82, 60, 40, 0.5)",
      cursor: "pointer",
    }}
  >
    {/* Ornate Gold Foil Border Inset */}
    <div 
      style={{
        position: "absolute",
        inset: "12px",
        border: "2px solid rgba(212, 175, 55, 0.4)",
        borderRadius: "8px",
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "8px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", color: "#D4AF37", fontSize: "11px", opacity: 0.7 }}>
        <span>✦</span><span>✦</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#D4AF37", fontSize: "11px", opacity: 0.7 }}>
        <span>✦</span><span>✦</span>
      </div>
    </div>

    {/* Golden Bookmark Ribbon */}
    <div 
      className="clip-ribbon"
      style={{
        position: "absolute",
        top: 0,
        right: "32px",
        width: "22px",
        height: "70px",
        background: "linear-gradient(to bottom, #E81123, #A5000E)",
        boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
        zIndex: 10,
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        paddingBottom: "6px",
      }}
    >
      <span style={{ fontSize: "8px", color: "#FFE600", fontWeight: "bold" }}>★</span>
    </div>

    {/* Header Label */}
    <div style={{ position: "relative", zIndex: 5, textAlign: "center" }}>
      <div 
        style={{
          display: "inline-block",
          padding: "4px 12px",
          borderRadius: "9999px",
          background: "rgba(212, 175, 55, 0.15)",
          border: "1px solid rgba(212, 175, 55, 0.4)",
          color: "#F5DEB3",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          marginBottom: "6px",
        }}
      >
        ✦ Commemorative Edition ✦
      </div>
      <p style={{ color: "rgba(212, 175, 55, 0.8)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", margin: 0 }}>
        Leadership Chronicle &bull; 2026
      </p>
    </div>

    {/* Center Title & Crest */}
    <div style={{ position: "relative", zIndex: 5, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", margin: "auto 0" }}>
      <div 
        style={{
          width: "74px",
          height: "74px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #B8860B, #FFD700, #FFE066)",
          padding: "3px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
          marginBottom: "14px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div 
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            backgroundColor: "#2A1810",
            border: "2px solid #FFD700",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#FFD700",
          }}
        >
          <span style={{ fontSize: "24px", lineHeight: 1 }}>👑</span>
          <span style={{ fontSize: "8px", fontWeight: "bold", letterSpacing: "0.15em", textTransform: "uppercase", marginTop: "2px" }}>HONOR</span>
        </div>
      </div>

      <h1 
        style={{
          fontSize: "22px",
          fontWeight: 900,
          color: "#FFF4D0",
          letterSpacing: "0.02em",
          lineHeight: 1.25,
          textTransform: "uppercase",
          fontFamily: "Outfit, Georgia, serif",
          margin: 0,
        }}
      >
        The Leadership<br />
        <span style={{ color: "#FFD700" }}>Chronicle</span>
      </h1>
      
      <div style={{ width: "60px", height: "2px", background: "linear-gradient(to right, transparent, #D4AF37, transparent)", margin: "10px 0" }} />

      <p style={{ fontSize: "14px", color: "#F4D06F", fontStyle: "italic", margin: "0 0 4px" }}>
        Dedicated to Mini Ma'am
      </p>
      <p style={{ fontSize: "11px", color: "rgba(230, 194, 128, 0.8)", margin: 0, maxWidth: "220px", lineHeight: 1.4 }}>
        6 Pillars of Unwavering Vision, Mentorship & Everyday Impact
      </p>
    </div>

    {/* Footer action hint */}
    <div style={{ position: "relative", zIndex: 5, textAlign: "center" }}>
      <div 
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "11px",
          fontWeight: 600,
          color: "#FFD700",
          background: "rgba(0,0,0,0.45)",
          padding: "6px 14px",
          borderRadius: "9999px",
          border: "1px solid rgba(212, 175, 55, 0.35)",
        }}
      >
        <span>Click to open</span>
        <span>➔</span>
      </div>
    </div>
  </div>
);

// Inner Pillar Page Component
const PillarPageFace = ({
  item,
  pageNumber,
  isLeftPage,
}: {
  item: typeof achievementPillars[0];
  pageNumber: number;
  isLeftPage: boolean;
}) => (
  <div 
    style={{
      backgroundColor: "#FFFFFF",
      color: "#2D1B4E",
      width: "100%",
      height: "100%",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "1.4rem 1.4rem 1.1rem",
      boxSizing: "border-box",
      userSelect: "none",
      overflow: "hidden",
      borderRight: isLeftPage ? "1px solid #E5DFD5" : "none",
      borderLeft: !isLeftPage ? "1px solid #E5DFD5" : "none",
      cursor: "pointer",
    }}
  >
    {/* Subtle Vintage Parchment Accent */}
    <div 
      style={{
        position: "absolute",
        top: "-40px",
        right: "-40px",
        width: "160px",
        height: "160px",
        borderRadius: "50%",
        backgroundColor: item.accentColor,
        opacity: 0.08,
        filter: "blur(30px)",
        pointerEvents: "none",
      }}
    />

    {/* Top Header Row */}
    <div 
      style={{
        position: "relative",
        zIndex: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #ECE4D8",
        paddingBottom: "8px",
      }}
    >
      <div 
        style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          background: "#F4EFEA",
          padding: "3px 10px",
          borderRadius: "6px",
          fontSize: "11px",
          fontWeight: 800,
          color: "#5C4A38",
          letterSpacing: "0.06em",
        }}
      >
        <span 
          style={{
            width: "7px",
            height: "7px",
            borderRadius: "50%",
            backgroundColor: item.accentColor,
            display: "inline-block",
          }} 
        />
        PILLAR &bull; {item.code}
      </div>

      <span 
        style={{
          fontSize: "10px",
          fontWeight: 600,
          color: "#968168",
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        {isLeftPage ? "◂ Click for Prev" : "Click for Next ▸"}
      </span>
    </div>

    {/* Center Badge & Text Info */}
    <div 
      style={{
        position: "relative",
        zIndex: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        margin: "auto 0",
        padding: "6px 0",
      }}
    >
      {/* Badge container with clean balanced sizing */}
      <div 
        style={{
          width: "116px",
          height: "116px",
          minWidth: "116px",
          minHeight: "116px",
          position: "relative",
          margin: "0 auto 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div 
          style={{
            position: "absolute",
            inset: "-4px",
            borderRadius: "50%",
            backgroundColor: item.accentColor,
            opacity: 0.22,
            filter: "blur(8px)",
            zIndex: 0,
          }}
        />
        <div style={{ position: "relative", zIndex: 1, width: "100%", height: "100%" }}>
          {item.badgeSvg}
        </div>
      </div>

      {/* Main Title */}
      <h3 
        style={{
          fontSize: "20px",
          fontWeight: 800,
          color: "#2A1810",
          lineHeight: 1.25,
          margin: "0 0 10px",
          fontFamily: "Outfit, sans-serif",
        }}
      >
        {item.title}
      </h3>

      {/* Description */}
      <p 
        style={{
          fontSize: "13.5px",
          color: "#4A3B2C",
          lineHeight: 1.6,
          margin: "0",
          maxWidth: "300px",
        }}
      >
        {item.desc}
      </p>
    </div>

    {/* Footer Row */}
    <div 
      style={{
        position: "relative",
        zIndex: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderTop: "1px solid #ECE4D8",
        paddingTop: "6px",
        fontSize: "10px",
        color: "#8C7A68",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: "4px", fontWeight: 600 }}>
        <span style={{ color: "#D4AF37" }}>★</span> Leadership Standard
      </span>
      <span 
        style={{
          fontWeight: 800,
          fontSize: "11px",
          backgroundColor: "#F2ECE1",
          padding: "2px 8px",
          borderRadius: "4px",
          color: "#4A3B2C",
        }}
      >
        {pageNumber}
      </span>
    </div>
  </div>
);

// Back Cover Component
const BackCoverFace = ({ onClose }: { onClose?: () => void }) => (
  <div 
    onClick={(e) => {
      e.stopPropagation();
      if (onClose) onClose();
    }}
    style={{
      backgroundColor: "#1F150E",
      color: "#FFF9E6",
      width: "100%",
      height: "100%",
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "2rem 1.75rem",
      boxSizing: "border-box",
      userSelect: "none",
      overflow: "hidden",
      borderLeft: "2px solid rgba(82, 60, 40, 0.5)",
      cursor: "pointer",
    }}
  >
    <div 
      style={{
        position: "absolute",
        inset: "12px",
        border: "2px solid rgba(212, 175, 55, 0.4)",
        borderRadius: "8px",
        pointerEvents: "none",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "8px",
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", color: "#D4AF37", fontSize: "11px", opacity: 0.7 }}>
        <span>✦</span><span>✦</span>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#D4AF37", fontSize: "11px", opacity: 0.7 }}>
        <span>✦</span><span>✦</span>
      </div>
    </div>

    <div style={{ position: "relative", zIndex: 5, textAlign: "center" }}>
      <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(212, 175, 55, 0.8)" }}>
        Anthology Complete
      </span>
    </div>

    <div style={{ position: "relative", zIndex: 5, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", margin: "auto 0" }}>
      <div 
        style={{
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          border: "2px solid #D4AF37",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "22px",
          color: "#FFD700",
          marginBottom: "16px",
          backgroundColor: "#2A1810",
        }}
      >
        ✦
      </div>
      
      <h3 
        style={{
          fontSize: "20px",
          fontWeight: 800,
          color: "#FFF4D0",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          margin: "0 0 10px",
          fontFamily: "Outfit, Georgia, serif",
        }}
      >
        End of Chronicle
      </h3>
      
      <p style={{ fontSize: "13.5px", color: "#E6C280", fontStyle: "italic", margin: "0", maxWidth: "240px", lineHeight: 1.5 }}>
        Leadership is not a title; it is the ripple effect of your actions and inspiration.
      </p>
    </div>

    <div style={{ position: "relative", zIndex: 5, textAlign: "center" }}>
      <div 
        onClick={(e) => {
          e.stopPropagation();
          if (onClose) onClose();
        }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          fontSize: "11px",
          fontWeight: 600,
          color: "#FFD700",
          background: "rgba(0,0,0,0.45)",
          padding: "6px 14px",
          borderRadius: "9999px",
          border: "1px solid rgba(212, 175, 55, 0.35)",
          cursor: "pointer",
        }}
      >
        <span>↺ Click to close book</span>
      </div>
    </div>
  </div>
);

export default function LeadershipPillars() {
  const [flippedCount, setFlippedCount] = useState(0);
  const [isBookClosed, setIsBookClosed] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [bookDimensions, setBookDimensions] = useState({ width: 380, height: 530 });

  const totalLeaves = 4; // 4 leaves

  // Responsive Book Sizing
  useEffect(() => {
    const handleResize = () => {
      const vw = window.innerWidth;
      if (vw < 480) {
        setBookDimensions({ width: Math.min(290, Math.floor(vw * 0.44)), height: 440 });
      } else if (vw < 640) {
        setBookDimensions({ width: Math.min(320, Math.floor(vw * 0.44)), height: 470 });
      } else if (vw < 900) {
        setBookDimensions({ width: 340, height: 495 });
      } else {
        setBookDimensions({ width: 380, height: 530 });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const controls0 = useAnimationControls();
  const controls1 = useAnimationControls();
  const controls2 = useAnimationControls();
  const controls3 = useAnimationControls();
  const controlsPool = [controls0, controls1, controls2, controls3];
  
  const bookContainerControls = useAnimationControls();

  // Reset / Rewind the whole book smoothly
  const handleResetBook = async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    bookContainerControls.start({
      x: 0,
      transition: { duration: 0.7, ease: "easeInOut" },
    });

    for (let i = totalLeaves - 1; i >= 0; i--) {
      controlsPool[i].start({
        rotateY: 0,
        transition: { duration: 0.4, ease: "easeInOut" },
      });
      await new Promise((r) => setTimeout(r, 60));
    }

    setFlippedCount(0);
    setIsBookClosed(true);
    setIsAnimating(false);
  };

  // Flip Next Page / Advance
  const handleFlipForward = async () => {
    if (isAnimating) return;
    setIsAnimating(true);

    if (flippedCount === 0) {
      setIsBookClosed(false);
      bookContainerControls.start({
        x: bookDimensions.width / 2,
        transition: { duration: 0.65, ease: "easeInOut" },
      });
    }

    if (flippedCount < totalLeaves) {
      const indexToFlip = flippedCount;
      setFlippedCount((prev) => prev + 1);

      await controlsPool[indexToFlip].start({
        rotateY: -180,
        transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] },
      });
    } else {
      // Smooth reset back to closed book!
      await handleResetBook();
    }
    setIsAnimating(false);
  };

  // Flip Back to Previous Page
  const handleFlipBackward = async () => {
    if (isAnimating || flippedCount === 0) return;
    setIsAnimating(true);

    const indexToUnflip = flippedCount - 1;
    setFlippedCount((prev) => prev - 1);

    if (flippedCount === 1) {
      bookContainerControls.start({
        x: 0,
        transition: { duration: 0.65, ease: "easeInOut" },
      });
      setIsBookClosed(true);
    }

    await controlsPool[indexToUnflip].start({
      rotateY: 0,
      transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] },
    });

    setIsAnimating(false);
  };

  const leaves = [
    {
      id: 0,
      front: <FrontCoverFace />,
      back: <PillarPageFace item={achievementPillars[0]} pageNumber={1} isLeftPage={true} />,
    },
    {
      id: 1,
      front: <PillarPageFace item={achievementPillars[1]} pageNumber={2} isLeftPage={false} />,
      back: <PillarPageFace item={achievementPillars[2]} pageNumber={3} isLeftPage={true} />,
    },
    {
      id: 2,
      front: <PillarPageFace item={achievementPillars[3]} pageNumber={4} isLeftPage={false} />,
      back: <PillarPageFace item={achievementPillars[4]} pageNumber={5} isLeftPage={true} />,
    },
    {
      id: 3,
      front: <PillarPageFace item={achievementPillars[5]} pageNumber={6} isLeftPage={false} />,
      back: <BackCoverFace onClose={handleResetBook} />,
    },
  ];

  const closedShadow = "0 20px 45px -8px rgba(42, 24, 16, 0.45), 0 8px 18px -4px rgba(0, 0, 0, 0.2)";

  return (
    <section id="pillars" className="site-section book-pillars-section relative py-16 overflow-hidden">
      <div className="site-section-container max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="site-section-header text-center mb-8 select-none">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#000000] tracking-[-0.03em] mb-2"
          >
            What CCC loves about you
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xs sm:text-sm text-[#6B573E]/80 font-normal tracking-normal max-w-xl mx-auto mt-2"
          >
            click on the book to flip the pages
          </motion.p>
        </div>

        {/* 3D Book Stage Viewport */}
        <div className="book-stage-viewport w-full flex flex-col items-center justify-center my-2 overflow-visible">
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              perspective: 2500,
              overflow: "visible",
              padding: "10px 0 25px",
            }}
          >
            <motion.div
              animate={bookContainerControls}
              style={{
                width: bookDimensions.width,
                height: bookDimensions.height,
                position: "relative",
                transformStyle: "preserve-3d",
                boxShadow: isBookClosed ? closedShadow : "none",
                borderRadius: "8px",
                transition: "box-shadow 0.4s ease",
              }}
            >
              {/* Realistic Open Book Underlay Shadow */}
              {!isBookClosed && (
                <div
                  style={{
                    position: "absolute",
                    left: `-${bookDimensions.width * 0.9}px`,
                    right: `-${bookDimensions.width * 0.1}px`,
                    bottom: "-18px",
                    height: "28px",
                    backgroundColor: "rgba(0, 0, 0, 0.14)",
                    filter: "blur(14px)",
                    borderRadius: "9999px",
                    zIndex: -50,
                    pointerEvents: "none",
                  }}
                />
              )}

              {/* Physical Double-Sided Leaves */}
              {leaves.map((leaf, index) => {
                const isFlipped = index < flippedCount;
                const isFlipping = index === flippedCount - 1;

                const zOffset = isFlipped
                  ? index * 0.4
                  : (totalLeaves - index) * 0.4;

                const zIndex = isFlipping
                  ? 150
                  : isFlipped
                  ? index + 10
                  : (totalLeaves - index) + 10;

                return (
                  <motion.div
                    key={leaf.id}
                    animate={controlsPool[index]}
                    initial={{ rotateY: 0 }}
                    style={{
                      position: "absolute",
                      inset: 0,
                      transformOrigin: "left center",
                      transformStyle: "preserve-3d",
                      zIndex: zIndex,
                      transform: `translateZ(${zOffset}px)`,
                      willChange: "transform",
                      borderRadius: "0px 8px 8px 0px",
                    }}
                  >
                    {/* FRONT FACE (Right Page -> click to flip forward / next) */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFlipForward();
                      }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: index === 0 ? "#1F150E" : "#FFFFFF",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        borderRadius: "0px 8px 8px 0px",
                        overflow: "hidden",
                        boxShadow: "inset 3px 0 10px rgba(0,0,0,0.1), 2px 4px 14px rgba(0,0,0,0.08)",
                        cursor: isAnimating ? "default" : "pointer",
                      }}
                    >
                      {leaf.front}
                      {/* Spine shadow on left edge */}
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: "12%",
                          background: "linear-gradient(to right, rgba(0,0,0,0.18), transparent)",
                          pointerEvents: "none",
                        }}
                      />
                    </div>

                    {/* BACK FACE (Left Page -> click to flip backward / prev or reset on back cover) */}
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        if (index === totalLeaves - 1) {
                          handleResetBook();
                        } else {
                          handleFlipBackward();
                        }
                      }}
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundColor: index === totalLeaves - 1 ? "#1F150E" : "#FFFFFF",
                        transform: "rotateY(180deg) translateZ(0.01px)",
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        borderRadius: "8px 0px 0px 8px",
                        overflow: "hidden",
                        boxShadow: "inset -3px 0 10px rgba(0,0,0,0.1), -2px 4px 14px rgba(0,0,0,0.08)",
                        cursor: isAnimating ? "default" : "pointer",
                      }}
                    >
                      {leaf.back}
                      {/* Spine shadow on right edge */}
                      <div
                        style={{
                          position: "absolute",
                          right: 0,
                          left: "auto",
                          top: 0,
                          bottom: 0,
                          width: "12%",
                          background: "linear-gradient(to left, rgba(0,0,0,0.18), transparent)",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

        </div>

      </div>
    </section>
  );
}
