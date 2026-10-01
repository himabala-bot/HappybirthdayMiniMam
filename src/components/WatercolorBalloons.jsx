import React from 'react';

export default function WatercolorBalloons({ className = '' }) {
  return (
    <div className={`watercolor-balloons-container ${className}`}>
      <svg
        viewBox="50 40 300 375"
        className="watercolor-balloons-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* 1. Primary Watercolor Pigment & Edge Displacement Filter */}
          <filter id="wc-texture" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.04 0.04"
              numOctaves="4"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="7"
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
            <feGaussianBlur in="displaced" stdDeviation="0.4" result="blurred" />
            <feMerge>
              <feMergeNode in="blurred" />
              <feMergeNode in="SourceGraphic" opacity="0.3" />
            </feMerge>
          </filter>

          {/* 2. Paper Grain Filter for Pigment Variation */}
          <filter id="wc-grain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.06 0.06"
              numOctaves="3"
              result="grainNoise"
            />
            <feColorMatrix
              type="matrix"
              values="0.33 0.33 0.33 0 0
                      0.33 0.33 0.33 0 0
                      0.33 0.33 0.33 0 0
                      0    0    0    0.25 0"
              result="grain"
            />
            <feComposite in="SourceGraphic" in2="grain" operator="in" />
          </filter>

          {/* 3. Subtle hand-drawn wiggle for strings */}
          <filter id="string-rough" x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.05 0.05"
              numOctaves="2"
              result="stringNoise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="stringNoise"
              scale="2"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>

        {/* =================================================================
            WATERCOLOR BALLOON CLUSTER (Multiplied Alpha Blending)
            ================================================================= */}
        <g style={{ mixBlendMode: 'multiply' }}>
          
          {/* 1. TOP GREEN / MINT BALLOON */}
          <g filter="url(#wc-texture)">
            {/* Base wash */}
            <ellipse cx="205" cy="92" rx="49" ry="50" fill="#58C682" opacity="0.75" />
            {/* Uneven pigment pooling */}
            <ellipse cx="202" cy="88" rx="42" ry="43" fill="#48B872" opacity="0.45" />
            <path
              d="M 180 60 Q 235 65 240 115 Q 185 140 170 100 Z"
              fill="#3AA862"
              opacity="0.25"
            />
          </g>

          {/* 2. TEAL / TURQUOISE BALLOON (Upper Left) */}
          <g filter="url(#wc-texture)">
            <ellipse cx="152" cy="135" rx="47" ry="48" fill="#38B8CD" opacity="0.78" />
            <ellipse cx="148" cy="130" rx="40" ry="41" fill="#28A6BC" opacity="0.45" />
            <path
              d="M 125 110 Q 180 115 185 160 Q 135 180 120 145 Z"
              fill="#1894A8"
              opacity="0.25"
            />
          </g>

          {/* 3. YELLOW BALLOON (Upper Right) */}
          <g filter="url(#wc-texture)">
            <ellipse cx="268" cy="142" rx="46" ry="47" fill="#FDD247" opacity="0.82" />
            <ellipse cx="264" cy="138" rx="39" ry="40" fill="#F5C430" opacity="0.45" />
            <path
              d="M 240 115 Q 295 120 300 165 Q 250 185 235 150 Z"
              fill="#EAB31A"
              opacity="0.22"
            />
          </g>

          {/* 4. ORANGE / CORAL BALLOON (Left) */}
          <g filter="url(#wc-texture)">
            <ellipse cx="102" cy="182" rx="43" ry="44" fill="#F97352" opacity="0.80" />
            <ellipse cx="98" cy="178" rx="36" ry="37" fill="#EC5F3C" opacity="0.45" />
            <path
              d="M 80 155 Q 130 160 135 205 Q 90 220 75 190 Z"
              fill="#DE4D28"
              opacity="0.25"
            />
          </g>

          {/* 5. LARGE YELLOW BALLOON (Lower Left) */}
          <g filter="url(#wc-texture)">
            <ellipse cx="150" cy="228" rx="49" ry="50" fill="#FED843" opacity="0.82" />
            <ellipse cx="146" cy="224" rx="42" ry="43" fill="#F6C828" opacity="0.45" />
            <path
              d="M 120 198 Q 180 205 185 255 Q 130 275 115 240 Z"
              fill="#EBB512"
              opacity="0.25"
            />
          </g>

          {/* 6. BRIGHT PINK / MAGENTA BALLOON (Center) */}
          <g filter="url(#wc-texture)">
            <ellipse cx="210" cy="178" rx="48" ry="49" fill="#EC4899" opacity="0.74" />
            <ellipse cx="206" cy="174" rx="41" ry="42" fill="#DB2777" opacity="0.45" />
            <path
              d="M 180 148 Q 240 155 245 205 Q 190 225 175 190 Z"
              fill="#BE185D"
              opacity="0.25"
            />
          </g>

          {/* 7. LIGHT BLUE BALLOON (Right) */}
          <g filter="url(#wc-texture)">
            <ellipse cx="264" cy="212" rx="41" ry="42" fill="#60A5FA" opacity="0.80" />
            <ellipse cx="260" cy="208" rx="34" ry="35" fill="#3B82F6" opacity="0.45" />
            <path
              d="M 240 188 Q 288 192 292 235 Q 250 250 235 222 Z"
              fill="#2563EB"
              opacity="0.25"
            />
          </g>

          {/* 8. DEEP / PERIWINKLE BLUE BALLOON (Bottom Center) */}
          <g filter="url(#wc-texture)">
            <ellipse cx="225" cy="260" rx="44" ry="45" fill="#5E68F5" opacity="0.78" />
            <ellipse cx="221" cy="256" rx="37" ry="38" fill="#4853E8" opacity="0.45" />
            <path
              d="M 198 232 Q 252 238 255 285 Q 210 300 195 270 Z"
              fill="#3742D6"
              opacity="0.25"
            />
          </g>

          {/* Small Watercolor Knot Triangles at Balloon Bases */}
          <polygon
            points="170,274 177,286 163,286"
            fill="#F6C828"
            opacity="0.85"
            filter="url(#wc-texture)"
          />
          <polygon
            points="212,224 218,235 206,235"
            fill="#DB2777"
            opacity="0.85"
            filter="url(#wc-texture)"
          />
          <polygon
            points="226,302 232,313 220,313"
            fill="#4853E8"
            opacity="0.85"
            filter="url(#wc-texture)"
          />
        </g>

        {/* =================================================================
            HAND-DRAWN BLACK STRINGS CONVERGING TO THUMBS-UP
            ================================================================= */}
        <g filter="url(#string-rough)" stroke="#2B241C" strokeWidth="1.4" fill="none" strokeLinecap="round">
          {/* String from Left Yellow Balloon */}
          <path d="M 170 285 Q 182 320 197 352" opacity="0.88" />
          
          {/* String from Center Pink Balloon */}
          <path d="M 212 234 Q 208 295 200 352" opacity="0.88" />
          
          {/* String from Bottom Blue Balloon */}
          <path d="M 226 312 Q 215 334 203 352" opacity="0.88" />
        </g>

        {/* =================================================================
            HAND-DRAWN THUMBS UP ICON (Enlarged & Prominent)
            ================================================================= */}
        <g
          transform="translate(160, 342) scale(0.96)"
          stroke="#2B241C"
          strokeWidth="2.5"
          fill="#FFFFFF"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Sleeve cuff */}
          <rect x="0" y="24" width="18" height="32" rx="3" fill="#FFFFFF" />
          {/* Hand + Thumb contour */}
          <path
            d="M 18 30 C 24 30 28 26 30 16 C 32 5 39 1 43 3 C 48 5 48 13 45 23 L 50 23 C 57 23 60 27 59 32 C 60 35 59 38 57 40 C 59 43 58 46 56 48 C 57 51 55 54 48 54 L 18 54 Z"
            fill="#FFFFFF"
          />
          {/* Finger crease lines */}
          <path d="M 40 31 L 52 31" />
          <path d="M 39 39 L 50 39" />
          <path d="M 38 47 L 48 47" />
        </g>
      </svg>
    </div>
  );
}
