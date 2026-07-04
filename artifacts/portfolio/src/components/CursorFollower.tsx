import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CursorFollower() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible,  setIsVisible]  = useState(false);

  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);

  const sx = useSpring(mx, { stiffness: 500, damping: 40 });
  const sy = useSpring(my, { stiffness: 500, damping: 40 });
  const rx = useSpring(mx, { stiffness: 150, damping: 28 });
  const ry = useSpring(my, { stiffness: 150, damping: 28 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onEnter = () => setIsHovering(true);
    const onLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', onMove);

    const attach = () => {
      document.querySelectorAll('a, button, [role="button"], input, textarea, select').forEach((el) => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    attach();

    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      obs.disconnect();
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      {/* Dot — snappy */}
      <motion.div
        style={{ x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: isHovering ? 0 : 1, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 w-2 h-2 bg-[#C6F135] rounded-full pointer-events-none z-[999]"
      />

      {/* Ring — laggy, expands on hover */}
      <motion.div
        style={{ x: rx, y: ry, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width:       isHovering ? 52 : 32,
          height:      isHovering ? 52 : 32,
          opacity:     isVisible  ? 1  : 0,
          borderColor: isHovering ? 'rgba(198,241,53,0.6)' : 'rgba(198,241,53,0.22)',
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="fixed top-0 left-0 rounded-full border pointer-events-none z-[998]"
      />
    </>
  );
}
