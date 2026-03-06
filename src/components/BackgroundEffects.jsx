import { motion } from "framer-motion";

const orbBase = {
  position: "absolute",
  borderRadius: "50%",
  willChange: "transform, border-radius",
};

const BackgroundEffects = () => (
  <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">

    {/* 1. Very-light violet tint base — gives orbs something to show against */}
    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #faf5ff 0%, #f5f3ff 40%, #eef2ff 100%)' }} />

    {/* 2. Subtle hairline grid */}
    <svg className="absolute inset-0 h-full w-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="line-grid" width="60" height="60" patternUnits="userSpaceOnUse">
          <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#a855f7" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#line-grid)" />
    </svg>

    {/* 3. Orb — top-left magenta-purple, morphing shape */}
    <motion.div
      animate={{
        x: [0, 75, -28, 52, 0],
        y: [0, -60, 42, -18, 0],
        scale: [1, 1.08, 0.93, 1.06, 1],
        borderRadius: [
          "50%",
          "42% 58% 66% 34% / 52% 40% 60% 48%",
          "50%",
          "56% 44% 36% 64% / 42% 60% 40% 58%",
          "50%",
        ],
      }}
      transition={{
        duration: 26,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1],
      }}
      style={{
        ...orbBase,
        top: "-190px",
        left: "-130px",
        width: "780px",
        height: "780px",
        background:
          "radial-gradient(circle, rgba(192,38,211,0.55) 0%, rgba(168,85,247,0.32) 35%, transparent 68%)",
        filter: "blur(72px)",
      }}
    />

    {/* 4. Orb — top-right deep indigo, morphing shape */}
    <motion.div
      animate={{
        x: [0, -85, 38, -58, 0],
        y: [0, 64, -50, 32, 0],
        scale: [1, 0.93, 1.08, 0.96, 1],
        borderRadius: [
          "50%",
          "56% 44% 36% 64% / 42% 60% 40% 58%",
          "50%",
          "42% 58% 66% 34% / 52% 40% 60% 48%",
          "50%",
        ],
      }}
      transition={{
        duration: 32,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1],
      }}
      style={{
        ...orbBase,
        top: "-150px",
        right: "-110px",
        width: "700px",
        height: "700px",
        background:
          "radial-gradient(circle, rgba(67,56,202,0.50) 0%, rgba(99,102,241,0.30) 35%, transparent 68%)",
        filter: "blur(68px)",
      }}
    />

    {/* 5. Orb — bottom-center wide ellipse sweep */}
    <motion.div
      animate={{ y: [0, -40, 22, 0], scale: [1, 1.06, 0.97, 1] }}
      transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      style={{
        ...orbBase,
        bottom: "-90px",
        left: "50%",
        marginLeft: "-520px",
        width: "1040px",
        height: "400px",
        background:
          "radial-gradient(ellipse, rgba(99,102,241,0.36) 0%, rgba(139,92,246,0.18) 42%, transparent 65%)",
        filter: "blur(60px)",
      }}
    />

    {/* 6. Orb — mid-right lavender accent */}
    <motion.div
      animate={{ x: [0, -40, 28, 0], y: [0, 50, -30, 0], scale: [1, 1.12, 0.92, 1] }}
      transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      style={{
        ...orbBase,
        top: "36%",
        right: "-60px",
        width: "420px",
        height: "420px",
        background:
          "radial-gradient(circle, rgba(216,180,254,0.55) 0%, rgba(192,132,252,0.28) 40%, transparent 68%)",
        filter: "blur(50px)",
      }}
    />

    {/* 8b. Half-circle arc waves — bottom half only, subtle */}
    {[0, 2.2, 4.4, 6.6].map((delay, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          top: '22%',
          left: '50%',
          width: `${520 + i * 140}px`,
          height: `${520 + i * 140}px`,
          marginLeft: `${-(260 + i * 70)}px`,
          marginTop: `${-(260 + i * 70)}px`,
          borderRadius: '50%',
          border: '1px solid rgba(168,85,247,0.22)',
          clipPath: 'polygon(0% 50%, 100% 50%, 100% 100%, 0% 100%)',
          animation: `expandRing 7s ${delay}s cubic-bezier(0.15,0.5,0.3,1) infinite`,
          willChange: 'transform, opacity',
        }}
      />
    ))}

    {/* 8c. Glowing sparkle particles */}
    {Array.from({ length: 22 }, (_, i) => ({
      id: i,
      x: (i * 9.1 + 7) % 92,
      y: 48 + (i * 5.3) % 44,
      sz: [2, 2.5, 3, 3, 4][i % 5],
      dur: `${8 + (i % 7) * 1.3}s`,
      del: `-${(i * 0.7).toFixed(1)}s`,
      col: ['rgba(168,85,247,0.85)', 'rgba(99,102,241,0.85)', 'rgba(192,132,252,0.80)', 'rgba(139,92,246,0.80)'][i % 4],
    })).map(p => (
      <div
        key={p.id}
        style={{
          position: 'absolute',
          left: `${p.x}%`,
          top: `${p.y}%`,
          width: `${p.sz}px`,
          height: `${p.sz}px`,
          borderRadius: '50%',
          background: p.col,
          boxShadow: `0 0 ${p.sz * 4}px ${p.sz * 2}px ${p.col}`,
          animation: `riseParticle ${p.dur} ${p.del} ease-in-out infinite`,
          willChange: 'transform, opacity',
        }}
      />
    ))}

    {/* 9. SVG noise grain — adds premium depth/texture */}
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.030]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="noise-bg">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.72"
          numOctaves="4"
          stitchTiles="stitch"
        />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise-bg)" />
    </svg>

    {/* 10. Top-centre light burst — "lit stage" feel */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "140%",
        height: "58%",
        background:
          "radial-gradient(ellipse at 50% 0%, rgba(250,245,255,0.94) 0%, rgba(255,255,255,0.60) 42%, transparent 70%)",
      }}
    />

    {/* 11. Bottom vignette */}
    <div className="absolute bottom-0 left-0 right-0 h-44 bg-gradient-to-t from-white/92 to-transparent" />
  </div>
);

export default BackgroundEffects;
