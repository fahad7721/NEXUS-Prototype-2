export function NexusShieldLogo({ className = "w-10 h-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Sadiq Nexus Official Crest"
    >
      <defs>
        <linearGradient id="nexusViolet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7E22CE" />
          <stop offset="100%" stopColor="#3B0764" />
        </linearGradient>

        <linearGradient id="shieldBorder" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="50%" stopColor="#9333EA" />
          <stop offset="100%" stopColor="#581C87" />
        </linearGradient>

        <filter id="purpleGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#9333EA" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* Outer 3D Shield Path */}
      <path
        d="M100 8 L185 45 L165 175 L100 232 L35 175 L15 45 Z"
        fill="#000000"
        stroke="url(#shieldBorder)"
        strokeWidth="6"
        strokeLinejoin="round"
        filter="url(#purpleGlow)"
      />

      {/* Inner Shield Boundary */}
      <g clipPath="url(#shieldClip)">
        <clipPath id="shieldClip">
          <path d="M100 16 L175 49 L157 167 L100 220 L43 167 L25 49 Z" />
        </clipPath>

        {/* Top-Left Quadrant (Black) */}
        <rect x="0" y="0" width="100" height="110" fill="#000000" />
        {/* Top-Right Quadrant (Violet) */}
        <rect x="100" y="0" width="100" height="110" fill="url(#nexusViolet)" />
        {/* Bottom-Left Quadrant (Violet) */}
        <rect x="0" y="110" width="100" height="130" fill="url(#nexusViolet)" />
        {/* Bottom-Right Quadrant (Black) */}
        <rect x="100" y="110" width="100" height="130" fill="#000000" />

        {/* Quadrant Cross Separators */}
        <line x1="100" y1="16" x2="100" y2="220" stroke="#18181B" strokeWidth="6" />
        <line x1="25" y1="110" x2="175" y2="110" stroke="#18181B" strokeWidth="6" />

        {/* TOP-LEFT: SADIQ NEXUS Typography */}
        <text
          x="62"
          y="62"
          fill="#FFFFFF"
          fontFamily="'Playfair Display', serif"
          fontSize="14"
          fontWeight="800"
          letterSpacing="1"
          textAnchor="middle"
        >
          SADIQ
        </text>
        <text
          x="62"
          y="82"
          fill="#FFFFFF"
          fontFamily="'Playfair Display', serif"
          fontSize="14"
          fontWeight="800"
          letterSpacing="1"
          textAnchor="middle"
        >
          NEXUS
        </text>

        {/* TOP-RIGHT: Gear + Atom + Circuit Traces */}
        <g transform="translate(138, 62) scale(0.95)">
          <circle cx="0" cy="0" r="4.5" fill="#FFFFFF" />
          <ellipse cx="0" cy="0" rx="19" ry="7" fill="none" stroke="#FFFFFF" strokeWidth="1.8" transform="rotate(30)" />
          <ellipse cx="0" cy="0" rx="19" ry="7" fill="none" stroke="#FFFFFF" strokeWidth="1.8" transform="rotate(-30)" />
          <ellipse cx="0" cy="0" rx="19" ry="7" fill="none" stroke="#FFFFFF" strokeWidth="1.8" transform="rotate(90)" />

          <path
            d="M-18 -10 L-25 -10 L-25 -6 L-28 -6 L-28 6 L-25 6 L-25 10 L-18 10"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          <circle cx="-32" cy="-6" r="2.2" fill="#FFFFFF" />
          <circle cx="-32" cy="6" r="2.2" fill="#FFFFFF" />
        </g>

        {/* BOTTOM-LEFT: DNA Double Helix + Greek Pi (π) */}
        <g transform="translate(62, 160) scale(0.9)">
          <text
            x="14"
            y="-14"
            fill="#FFFFFF"
            fontFamily="'Playfair Display', serif"
            fontSize="18"
            fontWeight="bold"
            fontStyle="italic"
            opacity="0.9"
          >
            π
          </text>

          <g transform="rotate(-25)">
            <path
              d="M-8 -24 C 8 -12, -8 0, 8 12 C -8 24, 8 36, -8 48"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <path
              d="M8 -24 C -8 -12, 8 0, -8 12 C 8 24, -8 36, 8 48"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2.4"
              strokeLinecap="round"
            />
            <line x1="-5" y1="-18" x2="5" y2="-18" stroke="#FFFFFF" strokeWidth="1.8" />
            <line x1="-6" y1="-6" x2="6" y2="-6" stroke="#FFFFFF" strokeWidth="1.8" />
            <line x1="-4" y1="6" x2="4" y2="6" stroke="#FFFFFF" strokeWidth="1.8" />
            <line x1="-6" y1="18" x2="6" y2="18" stroke="#FFFFFF" strokeWidth="1.8" />
            <line x1="-5" y1="30" x2="5" y2="30" stroke="#FFFFFF" strokeWidth="1.8" />
            <line x1="-7" y1="42" x2="7" y2="42" stroke="#FFFFFF" strokeWidth="1.8" />
          </g>
        </g>

        {/* BOTTOM-RIGHT: '26 */}
        <text
          x="138"
          y="172"
          fill="#FFFFFF"
          fontFamily="'Playfair Display', serif"
          fontSize="36"
          fontWeight="900"
          textAnchor="middle"
        >
          '26
        </text>
      </g>
    </svg>
  );
}
