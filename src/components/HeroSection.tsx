import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  TrendingUp,
  RotateCcw,
  ShieldCheck,
  Landmark,
  Factory,
  Zap,
  Activity,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';

interface HeroSectionProps {
  onOpenConsultation: () => void;
  onQuickInquiry: (contact: string) => void;
  onProgressChange?: (progress: number) => void;
}

const TOTAL_FRAMES = 300;

export interface StoryStep {
  id: number;
  stepNumber: string;
  badge?: string;
  value?: string;
  heading: string;
  description: string;
  stats?: { value: string; suffix?: string; label: string; mobileLabel: string }[];
}

export const STORY_STEPS: StoryStep[] = [
  {
    id: 0,
    stepNumber: '01 / RETURN',
    value: '20–30%',
    heading: 'Potential annual return*',
    description: 'Project-dependent · based on system size, tariff, generation and project economics.',
  },
  {
    id: 1,
    stepNumber: '02 / PAYBACK',
    value: '~2.5 YEARS',
    heading: 'Potential payback*',
    description: 'Indicative for applicable commercial and industrial project cases across Maharashtra.',
  },
  {
    id: 2,
    stepNumber: '03 / SYSTEM LIFE',
    value: '30 YEARS',
    heading: 'Long-term solar system life*',
    description: 'Engineered with Tier-1 bifacial photovoltaic modules built for multi-decade endurance.',
  },
  {
    id: 3,
    stepNumber: '04 / SUBSIDY',
    badge: 'UP TO',
    value: '₹78,000',
    heading: 'Government subsidy support*',
    description: 'Eligible residential customers under the applicable central solar rooftop scheme.',
  },
  {
    id: 4,
    stepNumber: '05 / TRACK RECORD',
    heading: 'Western Maharashtra’s premier EPC partner.',
    description: 'End-to-end solar solutions for homes, businesses and industries.',
    stats: [
      { value: '13', suffix: '+', label: 'YEARS EXPERIENCE', mobileLabel: 'YEARS' },
      { value: '500', suffix: '+', label: 'INSTALLATIONS', mobileLabel: 'INSTALLS' },
      { value: '18', suffix: 'MW+', label: 'CUMULATIVE CAPACITY', mobileLabel: 'CAPACITY' },
    ],
  },
];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenConsultation,
  onProgressChange,
}) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mobileCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Cached frame images
  const frameImagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const latestLoadedFrameRef = useRef<number>(0);

  // Smoothstep interpolation helper for continuous transitions
  const smoothstep = (min: number, max: number, val: number) => {
    const x = Math.max(0, Math.min(1, (val - min) / (max - min)));
    return x * x * (3 - 2 * x);
  };

  // Draw frame on canvas: stable centered cover rendering
  const drawFrameOnCanvas = useCallback(
    (canvas: HTMLCanvasElement, img: HTMLImageElement) => {
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const dpr = window.devicePixelRatio || 1;
      const displayW = canvas.clientWidth;
      const displayH = canvas.clientHeight;

      if (!displayW || !displayH) return;

      if (canvas.width !== Math.round(displayW * dpr) || canvas.height !== Math.round(displayH * dpr)) {
        canvas.width = Math.round(displayW * dpr);
        canvas.height = Math.round(displayH * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      const imgW = img.naturalWidth || img.width;
      const imgH = img.naturalHeight || img.height;
      if (!imgW || !imgH) {
        ctx.restore();
        return;
      }

      const canvasRatio = displayW / displayH;
      const imgRatio = imgW / imgH;

      let renderW = displayW;
      let renderH = displayH;

      if (canvasRatio > imgRatio) {
        renderW = displayW;
        renderH = Math.ceil(displayW / imgRatio) + 1;
      } else {
        renderH = displayH;
        renderW = Math.ceil(displayH * imgRatio) + 1;
      }

      // Pre-fill canvas with seamless background to prevent dark gaps
      ctx.fillStyle = '#FDFDFD';
      ctx.fillRect(0, 0, displayW, displayH);

      // Stable, centered cover rendering for continuous video experience
      const offsetX = (displayW - renderW) * 0.5;
      const offsetY = (displayH - renderH) * 0.5;

      ctx.drawImage(img, offsetX, offsetY, renderW, renderH);

      ctx.restore();
    },
    []
  );

  // Render current frame
  const renderFrame = useCallback(
    (progress: number, isMobile = false) => {
      const targetIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
      );

      let activeImg = frameImagesRef.current[targetIndex];
      if (!activeImg || !activeImg.complete) {
        // Find closest loaded frame to avoid visual flashing or jumping to final frame
        for (let offset = 1; offset < TOTAL_FRAMES; offset++) {
          const prev = targetIndex - offset;
          if (prev >= 0 && frameImagesRef.current[prev]?.complete) {
            activeImg = frameImagesRef.current[prev];
            break;
          }
          const next = targetIndex + offset;
          if (next < TOTAL_FRAMES && frameImagesRef.current[next]?.complete) {
            activeImg = frameImagesRef.current[next];
            break;
          }
        }
        if (!activeImg) {
          activeImg = frameImagesRef.current[0];
        }
      }

      if (!activeImg || !activeImg.complete) return;

      if (canvasRef.current) {
        drawFrameOnCanvas(canvasRef.current, activeImg);
      }
      if (mobileCanvasRef.current) {
        drawFrameOnCanvas(mobileCanvasRef.current, activeImg);
      }
    },
    [drawFrameOnCanvas]
  );

  // Preload frame image sequence with progressive window & idle background loader
  const requestedFramesRef = useRef<Set<number>>(new Set());

  const getFrameUrl = useCallback((index: number) => {
    const numStr = String(index + 1).padStart(3, '0');
    return `/sequence/ezgif-frame-${numStr}.jpg`;
  }, []);

  const loadSingleFrame = useCallback((index: number, onDone?: () => void) => {
    if (index < 0 || index >= TOTAL_FRAMES) return;
    if (frameImagesRef.current[index] || requestedFramesRef.current.has(index)) return;

    requestedFramesRef.current.add(index);
    const img = new Image();
    img.src = getFrameUrl(index);
    img.onload = () => {
      frameImagesRef.current[index] = img;
      if (onDone) onDone();
    };
    img.onerror = () => {
      requestedFramesRef.current.delete(index);
    };
  }, [getFrameUrl]);

  // Load a window of frames around a target index
  const preloadFrameWindow = useCallback((centerIndex: number, forwardRadius = 25, backwardRadius = 5) => {
    const start = Math.max(0, centerIndex - backwardRadius);
    const end = Math.min(TOTAL_FRAMES, centerIndex + forwardRadius);
    for (let i = start; i < end; i++) {
      loadSingleFrame(i);
    }
  }, [loadSingleFrame]);

  // Initial mount: load anchor frames and first window ONLY (avoids 300 eager requests on load)
  useEffect(() => {
    let isMounted = true;

    // 1. Load initial frame 0 immediately and render
    loadSingleFrame(0, () => {
      if (!isMounted) return;
      renderFrame(0, false);
      renderFrame(0, true);
    });

    // 2. Preload first 15 frames for immediate smooth scrolling
    for (let i = 1; i <= 15; i++) {
      loadSingleFrame(i);
    }

    // 3. Preload anchor frames of the 5 scenes
    const sceneAnchors = [74, 120, 164, 215, TOTAL_FRAMES - 1];
    sceneAnchors.forEach((idx) => {
      loadSingleFrame(idx);
    });

    // 4. Idle background progressive loader: fill remaining frames during idle periods
    let idleFrameCursor = 16;
    let idleTimer: any = null;

    const loadIdleBatch = () => {
      if (!isMounted || idleFrameCursor >= TOTAL_FRAMES) return;

      let count = 0;
      while (idleFrameCursor < TOTAL_FRAMES && count < 6) {
        if (!frameImagesRef.current[idleFrameCursor]) {
          loadSingleFrame(idleFrameCursor);
          count++;
        }
        idleFrameCursor++;
      }

      if (idleFrameCursor < TOTAL_FRAMES) {
        idleTimer = setTimeout(loadIdleBatch, 250);
      }
    };

    idleTimer = setTimeout(loadIdleBatch, 800);

    return () => {
      isMounted = false;
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, [loadSingleFrame, renderFrame]);

  // Unified scroll listener: shared scroll progress & frame rendering for both desktop & mobile
  useEffect(() => {
    let ticking = false;
    let rafId: number | null = null;

    const handleScroll = () => {
      if (!containerRef.current) return;
      if (!ticking) {
        rafId = window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }

          const isDesktop = window.innerWidth >= 1024;
          const rect = containerRef.current.getBoundingClientRect();
          const totalScroll = containerRef.current.offsetHeight - window.innerHeight;
          const currentScroll = -rect.top;
          const progress = totalScroll > 0
            ? Math.max(0, Math.min(1, currentScroll / totalScroll))
            : 0;

          setScrollProgress(progress);
          renderFrame(progress, !isDesktop);

          const targetFrameIndex = Math.min(TOTAL_FRAMES - 1, Math.floor(progress * (TOTAL_FRAMES - 1)));
          preloadFrameWindow(targetFrameIndex, 25, 5);

          if (onProgressChange) {
            onProgressChange(progress);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, [renderFrame, onProgressChange]);

  // 5 Clean Editorial Slides precisely aligned with the 5 Video Scene cuts
  const computeTextStage = (p: number) => {
    // Scene 1 (Return): 0 - 0.247
    if (p < 0.20) return 0;
    if (p < 0.26) return smoothstep(0.20, 0.26, p);
    // Scene 2 (Payback): 0.247 - 0.400
    if (p < 0.36) return 1;
    if (p < 0.42) return 1 + smoothstep(0.36, 0.42, p);
    // Scene 3 (System Life): 0.400 - 0.547
    if (p < 0.51) return 2;
    if (p < 0.57) return 2 + smoothstep(0.51, 0.57, p);
    // Scene 4 (Subsidy): 0.547 - 0.717
    if (p < 0.68) return 3;
    if (p < 0.74) return 3 + smoothstep(0.68, 0.74, p);
    // Scene 5 (Track Record): 0.717 - 1.000
    return 4;
  };

  const textStage = computeTextStage(scrollProgress);
  const activeSlideIndex = Math.min(4, Math.floor(textStage + 0.35));

  // Desktop slide style: old text moves UP, new text enters from BELOW
  const getSlideStyle = (index: number) => {
    const delta = textStage - index;
    const translateY = -delta * 72; // controlled upward translation
    const opacity = Math.max(0, 1 - Math.abs(delta) * 1.35);
    const pointerEvents = Math.abs(delta) < 0.3 ? 'auto' : 'none';

    return {
      transform: `translate3d(0, ${translateY}px, 0)`,
      opacity,
      pointerEvents: pointerEvents as 'auto' | 'none',
      visibility: opacity > 0.01 ? ('visible' as const) : ('hidden' as const),
    };
  };

  // Mobile slide style: identical transition logic scaled for mobile touch viewport
  const getMobileSlideStyle = (index: number) => {
    const delta = textStage - index;
    const translateY = -delta * 40;
    const opacity = Math.max(0, 1 - Math.abs(delta) * 1.4);
    const pointerEvents = Math.abs(delta) < 0.3 ? 'auto' : 'none';

    return {
      transform: `translate3d(0, ${translateY}px, 0)`,
      opacity,
      pointerEvents: pointerEvents as 'auto' | 'none',
      visibility: opacity > 0.01 ? ('visible' as const) : ('hidden' as const),
    };
  };

  // Intermediate editorial slides matching desktop sequence
  const editorialSlides = [
    {
      id: 0,
      badge: '01 / RETURN',
      value: '20–30%',
      title: 'Potential annual return*',
      desc: 'Project-dependent · based on system size, tariff & generation economics.',
    },
    {
      id: 1,
      badge: '02 / PAYBACK',
      value: '~2.5 YEARS',
      title: 'Potential payback*',
      desc: 'Indicative for commercial & industrial project cases across Maharashtra.',
    },
    {
      id: 2,
      badge: '03 / SYSTEM LIFE',
      value: '30 YEARS',
      title: 'Long-term solar system life*',
      desc: 'Engineered with Tier-1 bifacial photovoltaic modules built for endurance.',
    },
    {
      id: 3,
      badge: '04 / SUBSIDY',
      prefix: 'UP TO',
      value: '₹78,000',
      title: 'Government subsidy support*',
      desc: 'Eligible residential customers under central solar rooftop scheme.',
    },
  ];

  // Sequence concluding (navbar reveal + proof cards reveal)
  const isSequenceEnding = scrollProgress >= 0.74;

  const metricCards = [
    {
      id: 0,
      icon: TrendingUp,
      value: '20–30%',
      label: 'POTENTIAL RETURN',
      mobileLabel: 'POTENTIAL',
      micro: 'Project dependent',
    },
    {
      id: 1,
      icon: RotateCcw,
      value: '~2.5 Yrs',
      label: 'INDICATIVE PAYBACK',
      mobileLabel: 'INDICATIVE',
      micro: 'Commercial & industrial',
    },
    {
      id: 2,
      icon: ShieldCheck,
      value: '30 Years',
      label: 'SYSTEM LIFECYCLE',
      mobileLabel: 'SYSTEM',
      micro: 'Tier-1 bifacial modules',
    },
    {
      id: 3,
      icon: Landmark,
      value: '₹78,000',
      label: 'SUBSIDY SUPPORT',
      mobileLabel: 'SUBSIDY',
      micro: 'Eligible residential scheme',
    },
  ];

  const serviceCards = [
    {
      id: 'industrial-epc',
      icon: Factory,
      title: 'Industrial EPC',
      subtitle: 'Rooftop + ground-mounted systems',
    },
    {
      id: 'net-metering',
      icon: Zap,
      title: 'Net Metering',
      subtitle: 'MSEDCL coordination & approvals',
    },
    {
      id: 'lifecycle-om',
      icon: Activity,
      title: 'Lifecycle O&M',
      subtitle: 'Long-term service & monitoring',
    },
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-[260vh] sm:h-[300vh] lg:h-[380vh] bg-[#FDFDFD]"
    >
      {/*
        ========================================================================
        1. DESKTOP VIEWPORT — RESTORED SMOOTH CINEMATIC SCROLL
        Visible only on lg and above (screens >= 1024px)
        - Visual remains pinned & stable
        - Smooth vertical text transitions (scroll down: old text -> UP, new -> FROM BELOW)
        - Equal 3-column proof metrics with semi-bold typography & Solar Yellow accents
        ========================================================================
      */}
      <div className="hidden lg:flex sticky top-0 h-screen w-full overflow-hidden flex-col justify-between pt-6 sm:pt-8 pb-6 select-none">
        
        {/* Desktop Canvas Split (Right 58%) */}
        <div className="absolute right-0 top-0 bottom-0 w-[58%] pointer-events-none select-none overflow-hidden z-0 bg-[#FDFDFD]">
          <div className="relative w-full h-full border-0 border-none shadow-none">
            <canvas
              ref={canvasRef}
              role="img"
              aria-label="Interactive visual presentation showing solar installation progress and savings"
              className="w-full h-full object-cover object-center block border-0 border-none shadow-none outline-none"
              style={{ display: 'block', border: 'none', boxShadow: 'none', outline: 'none' }}
            />
            {/* Organic misty cloud gradient dissolving smoothly into the white background on the left */}
            <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-[#FDFDFD] via-[#FDFDFD]/80 to-transparent pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-[#FDFDFD]/70 to-transparent pointer-events-none" />
            <div className="absolute -bottom-1 inset-x-0 h-24 bg-gradient-to-t from-[#FDFDFD] to-transparent pointer-events-none" />


          </div>
        </div>

        {/* Desktop Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-12 min-h-[490px] items-center">
            
            {/* Left Column: Masked Vertical Editorial Text Viewport */}
            <div className="col-span-6 max-w-[460px] py-2 relative">
              <div className="relative min-h-[350px] overflow-hidden flex items-center">
                
                {/* Desktop Slide 0: ROI */}
                <div
                  style={getSlideStyle(0)}
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 transition-opacity duration-200"
                >
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F7FD] border border-[#DCEAF2] shadow-xs backdrop-blur-md mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                    <span className="text-[10px] font-bold tracking-[0.18em] text-[#0284C7] uppercase">
                      01 / RETURN
                    </span>
                  </div>
                  <div className="text-[84px] font-[230] tracking-tight leading-none text-[#0A3254]">
                    20–30%
                  </div>
                  <div className="w-9 h-[1.5px] bg-[#0284C7] my-3 rounded-full" />
                  <h2 className="text-2xl font-semibold tracking-tight text-[#0A3254] mb-1.5">
                    Potential annual return*
                  </h2>
                  <p className="text-[13px] text-[#5A6E85] leading-relaxed max-w-sm">
                    Project-dependent · based on system size, tariff, generation and project economics.
                  </p>
                </div>

                {/* Desktop Slide 1: PAYBACK */}
                <div
                  style={getSlideStyle(1)}
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 transition-opacity duration-200"
                >
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F7FD] border border-[#DCEAF2] shadow-xs backdrop-blur-md mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                    <span className="text-[10px] font-bold tracking-[0.18em] text-[#0284C7] uppercase">
                      02 / PAYBACK
                    </span>
                  </div>
                  <div className="text-[80px] font-[230] tracking-tight leading-none text-[#0A3254]">
                    ~2.5 YEARS
                  </div>
                  <div className="w-9 h-[1.5px] bg-[#0284C7] my-3 rounded-full" />
                  <h2 className="text-2xl font-semibold tracking-tight text-[#0A3254] mb-1.5">
                    Potential payback*
                  </h2>
                  <p className="text-[13px] text-[#5A6E85] leading-relaxed max-w-sm">
                    Indicative for applicable commercial and industrial project cases across Maharashtra.
                  </p>
                </div>

                {/* Desktop Slide 2: SOLAR LIFE */}
                <div
                  style={getSlideStyle(2)}
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 transition-opacity duration-200"
                >
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F7FD] border border-[#DCEAF2] shadow-xs backdrop-blur-md mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                    <span className="text-[10px] font-bold tracking-[0.18em] text-[#0284C7] uppercase">
                      03 / SYSTEM LIFE
                    </span>
                  </div>
                  <div className="text-[84px] font-[230] tracking-tight leading-none text-[#0A3254]">
                    30 YEARS
                  </div>
                  <div className="w-9 h-[1.5px] bg-[#0284C7] my-3 rounded-full" />
                  <h2 className="text-2xl font-semibold tracking-tight text-[#0A3254] mb-1.5">
                    Long-term solar system life*
                  </h2>
                  <p className="text-[13px] text-[#5A6E85] leading-relaxed max-w-sm">
                    Engineered with Tier-1 bifacial photovoltaic modules built for multi-decade endurance.
                  </p>
                </div>

                {/* Desktop Slide 3: SUBSIDY */}
                <div
                  style={getSlideStyle(3)}
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 transition-opacity duration-200"
                >
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F7FD] border border-[#DCEAF2] shadow-xs backdrop-blur-md mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                    <span className="text-[10px] font-bold tracking-[0.18em] text-[#0284C7] uppercase">
                      04 / SUBSIDY
                    </span>
                  </div>
                  <span className="text-xs font-semibold tracking-[0.15em] text-[#0284C7] uppercase block mb-1">
                    UP TO
                  </span>
                  <div className="text-[84px] font-[230] tracking-tight leading-none text-[#0A3254]">
                    ₹78,000
                  </div>
                  <div className="w-9 h-[1.5px] bg-[#0284C7] my-3 rounded-full" />
                  <h2 className="text-2xl font-semibold tracking-tight text-[#0A3254] mb-1.5">
                    Government subsidy support*
                  </h2>
                  <p className="text-[13px] text-[#5A6E85] leading-relaxed max-w-sm">
                    Eligible residential customers under the applicable central solar rooftop scheme.
                  </p>
                </div>

                {/* Desktop Slide 4: GVP PROOF — UNIFIED EDITORIAL COMPOSITION */}
                <div
                  style={getSlideStyle(4)}
                  className="absolute inset-x-0 top-1/2 -translate-y-1/2 transition-opacity duration-200"
                >
                  {/* 1. Track Record Eyebrow with strategic GVP Solar brand accent */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F0F7FD] border border-[#DCEAF2] shadow-xs mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                    <span className="text-[10px] font-bold tracking-[0.18em] text-[#0284C7] uppercase">
                      05 / TRACK RECORD
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#F5A623]" />
                  </div>

                  {/* 2. Statistics: Crisp Left-Aligned Editorial Benchmark Bar */}
                  <div className="grid grid-cols-3 divide-x divide-[#E2E8F0] py-2.5 max-w-[430px] border-y border-[#E2E8F0]/80 mb-3.5">
                    <div className="pr-3 text-left">
                      <div className="text-2xl sm:text-[28px] font-bold text-[#0A3254] tracking-tight leading-none">
                        13<span className="text-[#0284C7] font-semibold">+</span>
                      </div>
                      <span className="text-[9.5px] font-bold tracking-wider text-[#5A6E85] uppercase block mt-1.5 leading-tight">
                        YEARS EXPERIENCE
                      </span>
                    </div>

                    <div className="px-3 text-left">
                      <div className="text-2xl sm:text-[28px] font-bold text-[#0A3254] tracking-tight leading-none">
                        500<span className="text-[#0284C7] font-semibold">+</span>
                      </div>
                      <span className="text-[9.5px] font-bold tracking-wider text-[#5A6E85] uppercase block mt-1.5 leading-tight">
                        INSTALLATIONS
                      </span>
                    </div>

                    <div className="pl-3 text-left">
                      <div className="text-2xl sm:text-[28px] font-bold text-[#0A3254] tracking-tight leading-none">
                        18<span className="text-[#0284C7] font-semibold text-xl sm:text-2xl">MW+</span>
                      </div>
                      <span className="text-[9.5px] font-bold tracking-wider text-[#5A6E85] uppercase block mt-1.5 leading-tight">
                        CUMULATIVE CAPACITY
                      </span>
                    </div>
                  </div>

                  {/* 3. Main Message: Bold, Authoritative Headline */}
                  <h2 className="text-2xl sm:text-[27px] font-bold tracking-tight text-[#0A3254] leading-[1.22] mb-2">
                    <span className="text-[#0A3254]">Western Maharashtra’s </span>
                    <span className="text-[#0284C7]">premier EPC partner.</span>
                  </h2>

                  {/* 4. Supporting Text */}
                  <p className="text-[13px] text-[#5A6E85] leading-relaxed max-w-sm mb-4">
                    End-to-end solar solutions for homes, businesses and industries.
                  </p>

                  {/* 5. Direct Conversion CTA */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={onOpenConsultation}
                      className="bg-[#0284C7] hover:bg-[#0369A1] text-white text-xs font-semibold px-5 py-2.5 rounded-full flex items-center gap-2 transition-all shadow-[0_4px_14px_rgba(2,132,199,0.3)] hover:shadow-[0_6px_20px_rgba(2,132,199,0.4)] hover:-translate-y-0.5 cursor-pointer"
                    >
                      <span>Request Site Audit</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Right Column: Service / Info Cards aligned cleanly */}
            <div
              className={`col-span-6 relative flex flex-col justify-center items-end py-2 transition-all duration-700 ${
                isSequenceEnding
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              <div className="flex flex-col gap-3 ml-auto w-[275px] sm:w-[285px] z-20">
                <div
                  onClick={onOpenConsultation}
                  className="group bg-white/95 hover:bg-white backdrop-blur-xl p-3 pl-3.5 pr-4 rounded-[20px] border border-[#DCEAF2] shadow-[0_4px_16px_-2px_rgba(2,132,199,0.06)] flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-2px_rgba(2,132,199,0.14)] hover:border-[#0284C7]/50 cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-[14px] bg-[#0284C7] text-white flex items-center justify-center shrink-0 relative shadow-[0_4px_12px_rgba(2,132,199,0.25)]">
                    <Factory className="w-5 h-5 text-white" />
                    <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-[#38BDF8] border-2 border-white" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <h4 className="text-[14px] font-bold text-[#0284C7] group-hover:text-[#0369A1] transition-colors tracking-tight leading-snug">Industrial EPC</h4>
                    <p className="text-[11.5px] text-[#5A6E85] font-normal leading-snug mt-0.5">
                      Rooftop & ground-mounted systems
                    </p>
                  </div>
                </div>

                <div
                  onClick={onOpenConsultation}
                  className="group bg-white/95 hover:bg-white backdrop-blur-xl p-3 pl-3.5 pr-4 rounded-[20px] border border-[#DCEAF2] shadow-[0_4px_16px_-2px_rgba(2,132,199,0.06)] flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-2px_rgba(2,132,199,0.14)] hover:border-[#0284C7]/50 cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-[14px] bg-[#0284C7] text-white flex items-center justify-center shrink-0 relative shadow-[0_4px_12px_rgba(2,132,199,0.25)]">
                    <Zap className="w-5 h-5 text-white" />
                    <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-[#38BDF8] border-2 border-white" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <h4 className="text-[14px] font-bold text-[#0284C7] group-hover:text-[#0369A1] transition-colors tracking-tight leading-snug">Net Metering</h4>
                    <p className="text-[11.5px] text-[#5A6E85] font-normal leading-snug mt-0.5">
                      MSEDCL coordination & approvals
                    </p>
                  </div>
                </div>

                <div
                  onClick={onOpenConsultation}
                  className="group bg-white/95 hover:bg-white backdrop-blur-xl p-3 pl-3.5 pr-4 rounded-[20px] border border-[#DCEAF2] shadow-[0_4px_16px_-2px_rgba(2,132,199,0.06)] flex items-center gap-3 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_-2px_rgba(2,132,199,0.14)] hover:border-[#0284C7]/50 cursor-pointer"
                >
                  <div className="w-11 h-11 rounded-[14px] bg-[#0284C7] text-white flex items-center justify-center shrink-0 relative shadow-[0_4px_12px_rgba(2,132,199,0.25)]">
                    <Activity className="w-5 h-5 text-white" />
                    <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-[#38BDF8] border-2 border-white" />
                  </div>
                  <div className="text-left flex-1 min-w-0">
                    <h4 className="text-[14px] font-bold text-[#0284C7] group-hover:text-[#0369A1] transition-colors tracking-tight leading-snug">Lifecycle O&M</h4>
                    <p className="text-[11.5px] text-[#5A6E85] font-normal leading-snug mt-0.5">
                      Long-term service & monitoring
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Desktop Bottom 4 Metric Cards exactly matching Image 1 */}
          <div
            className={`mt-6 grid grid-cols-4 gap-4 max-w-4xl transition-all duration-700 ${
              isSequenceEnding
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
          >
            {metricCards.map((card) => {
              const IconComponent = card.icon;
              const isActive = activeSlideIndex === card.id;

              return (
                <div
                  key={card.id}
                  className={`relative p-5 rounded-[22px] backdrop-blur-xl transition-all duration-300 text-left ${
                    isActive
                      ? 'bg-white border-t-[3px] border-t-[#0284C7] border-x border-b border-[#DCEAF2] shadow-[0_14px_36px_-4px_rgba(2,132,199,0.12)] scale-[1.02]'
                      : 'bg-white/95 hover:bg-white border border-[#DCEAF2] shadow-[0_8px_24px_-4px_rgba(2,132,199,0.06)] hover:-translate-y-0.5 hover:border-[#0284C7]/40'
                  }`}
                >
                  <div className="flex items-center gap-1.5 mb-2.5">
                    <div className="w-6 h-6 rounded-lg bg-[#F0F7FD] border border-[#DCEAF2] flex items-center justify-center text-[#0284C7]">
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                  </div>
                  <div className="text-[32px] sm:text-[36px] font-bold text-[#0A3254] tracking-tight leading-none mb-1.5">
                    {card.value}
                  </div>
                  <div className="text-[12px] sm:text-[13px] font-medium text-[#5A6E85] leading-tight truncate">
                    {card.label}
                  </div>
                  <div className="text-[11px] text-[#7E92A2] mt-1 leading-tight truncate font-normal">
                    {card.micro}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* Desktop Minimal Scroll Prompt */}
        <div
          style={{ opacity: Math.max(0, 1 - scrollProgress * 5) }}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none transition-opacity duration-300 flex flex-col items-center gap-1 z-20"
        >
          <span className="text-[10px] uppercase font-medium tracking-[0.2em] text-[#64748B]">
            Scroll to explore
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-[#0284C7] animate-bounce" />
        </div>

      </div>

      {/*
        ========================================================================
        2. MOBILE VIEWPORT — SYNCHRONIZED SCROLL-DRIVEN SEQUENCE
        - 0% to 85% scroll: Visual is prominent + Intermediate slides (0-3) transition with scroll
        - 85% to 100% scroll: Final hero content, proof stats, CTA, and metric cards reveal
        ========================================================================
      */}
      <div
        className="lg:hidden sticky top-0 h-[100dvh] w-full flex flex-col justify-between bg-[#FDFDFD] select-none pt-1 pb-3 overflow-hidden"
        style={{ touchAction: 'pan-y' }}
      >
        {/* 1. GVP VISUAL: Stable responsive canvas frame (zero jump, zero resize flicker) */}
        <div
          className="relative w-full h-[35vh] min-h-[190px] max-h-[240px] overflow-hidden shrink-0 z-0 bg-[#FDFDFD]"
          style={{ touchAction: 'pan-y' }}
        >
          <canvas
            ref={mobileCanvasRef}
            role="img"
            aria-label="Interactive solar installation simulation sequence"
            className="w-full h-full block border-0 border-none shadow-none outline-none"
            style={{ display: 'block', verticalAlign: 'top' }}
          />

          {/* Soft bottom gradient dissolve */}
          <div className="absolute -bottom-1 inset-x-0 h-10 bg-gradient-to-t from-[#FDFDFD] via-[#FDFDFD]/40 to-transparent pointer-events-none" />

          {/* Floating Brand Badge */}
          <div className="absolute top-2.5 left-3 z-10 pointer-events-none">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-white/95 text-[#0A3254] text-[10px] font-bold shadow-[0_2px_10px_rgba(2,132,199,0.08)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
              <span>GVP Solar EPC</span>
              <span className="w-1 h-1 rounded-full bg-[#F5A623]" />
            </div>
          </div>
        </div>

        {/* 2. STORYTELLING STAGE: 5 Seamlessly Transitioning Slides in Fixed Viewport */}
        <div className="relative flex-1 w-full px-4 flex items-center justify-center overflow-hidden min-h-[220px]">
          {/* Slides 0 to 3: Key Value Metrics */}
          {editorialSlides.map((slide) => (
            <div
              key={slide.id}
              style={getMobileSlideStyle(slide.id)}
              className="absolute inset-x-0 transition-all duration-200 text-center flex flex-col items-center px-2"
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0F7FD] border border-[#DCEAF2] shadow-xs backdrop-blur-md mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
                <span className="text-[9.5px] font-bold tracking-[0.18em] text-[#0284C7] uppercase">
                  {slide.badge}
                </span>
              </div>
              {slide.prefix && (
                <span className="text-[10px] font-bold tracking-[0.16em] text-[#0284C7] uppercase block -mb-0.5">
                  {slide.prefix}
                </span>
              )}
              <div className="text-[42px] sm:text-[48px] font-[230] tracking-tight leading-none text-[#0A3254] my-0.5">
                {slide.value}
              </div>
              <div className="w-8 h-[1.5px] bg-[#0284C7] my-1.5 rounded-full" />
              <h3 className="text-sm sm:text-base font-semibold tracking-tight text-[#0A3254] leading-tight">
                {slide.title}
              </h3>
              <p className="text-[11px] text-[#5A6E85] leading-snug max-w-xs mt-1">
                {slide.desc}
              </p>
            </div>
          ))}

          {/* Slide 4 (05 / TRACK RECORD): Mobile Finale */}
          <div
            style={getMobileSlideStyle(4)}
            className="absolute inset-x-0 transition-all duration-200 text-center flex flex-col items-center px-1"
          >
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#F0F7FD] border border-[#DCEAF2] shadow-xs backdrop-blur-sm mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284C7]" />
              <span className="text-[9px] font-bold tracking-[0.16em] text-[#0284C7] uppercase">
                05 / TRACK RECORD
              </span>
              <span className="w-1 h-1 rounded-full bg-[#F5A623]" />
            </div>

            <h2 className="text-[18px] sm:text-xl font-extrabold tracking-tight text-[#0A3254] leading-[1.2] max-w-xs">
              Western Maharashtra’s <span className="text-[#0284C7]">premier EPC partner.</span>
            </h2>

            <p className="text-[11px] text-[#5A6E85] leading-snug mt-1 max-w-xs">
              End-to-end solar solutions for homes, businesses and industries.
            </p>

            {/* 3-Column Proof Statistics */}
            <div className="w-full max-w-xs mt-2 bg-white/95 border border-[#DCEAF2] rounded-[12px] py-1.5 px-1 shadow-[0_3px_12px_-2px_rgba(2,132,199,0.06)] grid grid-cols-3 divide-x divide-[#E2E8F0]">
              <div className="flex flex-col items-center text-center px-0.5">
                <div className="text-lg font-bold text-[#0A3254] leading-none">
                  13<span className="text-[#0284C7]">+</span>
                </div>
                <span className="text-[7.5px] font-bold tracking-wider text-[#5A6E85] uppercase mt-1 leading-none">
                  YEARS EXP
                </span>
              </div>
              <div className="flex flex-col items-center text-center px-0.5">
                <div className="text-lg font-bold text-[#0A3254] leading-none">
                  500<span className="text-[#0284C7]">+</span>
                </div>
                <span className="text-[7.5px] font-bold tracking-wider text-[#5A6E85] uppercase mt-1 leading-none">
                  INSTALLS
                </span>
              </div>
              <div className="flex flex-col items-center text-center px-0.5">
                <div className="text-lg font-bold text-[#0A3254] leading-none">
                  18<span className="text-[#0284C7]">MW+</span>
                </div>
                <span className="text-[7.5px] font-bold tracking-wider text-[#5A6E85] uppercase mt-1 leading-none">
                  CAPACITY
                </span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="w-full max-w-xs mt-2.5">
              <button
                onClick={onOpenConsultation}
                className="w-full bg-[#0284C7] hover:bg-[#0369A1] text-white text-[12px] font-semibold py-2.5 px-4 rounded-full flex items-center justify-center gap-2 transition-all shadow-[0_4px_12px_rgba(2,132,199,0.28)] active:scale-[0.99] cursor-pointer"
              >
                <span>Request Site Audit</span>
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* 3. BOTTOM SCROLL PROMPT */}
        <div
          onClick={() => {
            const el = document.getElementById('mission');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="flex items-center justify-center gap-1.5 pt-1 pb-1 cursor-pointer transition-opacity duration-300"
        >
          <span className="text-[9.5px] uppercase font-semibold tracking-[0.16em] text-[#5A6E85]">
            {scrollProgress >= 0.75 ? 'Explore Services & Projects' : 'Scroll to explore'}
          </span>
          <ChevronDown className="w-3.5 h-3.5 text-[#0284C7] animate-bounce" />
        </div>
      </div>
    </section>
  );
};
