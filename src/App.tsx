import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, Sparkles, Volume2, VolumeX, Check } from 'lucide-react';
import './App.css';

gsap.registerPlugin(ScrollTrigger);

// SVG Components
const HeartIcon = ({ className = '', size = 64, style }: { className?: string; size?: number; style?: React.CSSProperties }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`text-rose ${className}`}
    style={style}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
);

const StarIcon = ({ className = '', size = 24, style }: { className?: string; size?: number; style?: React.CSSProperties }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    className={`text-rose ${className}`}
    style={style}
  >
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
  </svg>
);

function App() {
  const [answered, setAnswered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Refs for sections
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);
  const section5Ref = useRef<HTMLDivElement>(null);
  
  // Refs for elements
  const heroHeadingRef = useRef<HTMLHeadingElement>(null);
  const heroSublineRef = useRef<HTMLParagraphElement>(null);
  const heroHeartsRef = useRef<HTMLDivElement>(null);
  const heroSparklesRef = useRef<HTMLDivElement>(null);
  const polaroidRef = useRef<HTMLDivElement>(null);
  const promiseRef = useRef<HTMLDivElement>(null);
  const lockCardRef = useRef<HTMLDivElement>(null);
  const keepsakeRef = useRef<HTMLDivElement>(null);

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio('/Valentine.mp3');
    audioRef.current.loop = true;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Toggle audio function
  const toggleAudio = () => {
    if (audioRef.current) {
      if (soundOn) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Auto-play blocked, user needs to interact
        });
      }
      setSoundOn(!soundOn);
    }
  };

  // Initial load animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation
      const tl = gsap.timeline({ delay: 0.3 });
      
      // Hearts pop in
      if (heroHeartsRef.current) {
        const hearts = heroHeartsRef.current.querySelectorAll('.heart-item');
        tl.fromTo(hearts, 
          { scale: 0.6, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.8)', stagger: 0.08 },
          0
        );
      }
      
      // Heading reveal
      if (heroHeadingRef.current) {
        tl.fromTo(heroHeadingRef.current,
          { opacity: 0, y: 40, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power2.out' },
          0.2
        );
      }
      
      // Subline
      if (heroSublineRef.current) {
        tl.fromTo(heroSublineRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
          0.5
        );
      }
      
      // Sparkles
      if (heroSparklesRef.current) {
        const sparkles = heroSparklesRef.current.querySelectorAll('.sparkle-item');
        tl.fromTo(sparkles,
          { scale: 0, rotate: -45 },
          { scale: 1, rotate: 0, duration: 0.6, ease: 'back.out(1.8)', stagger: 0.1 },
          0.6
        );
      }
    });
    
    return () => ctx.revert();
  }, []);

  // Scroll animations - Original design
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section 1: Hero - Pinned
      const section1Tl = gsap.timeline({
        scrollTrigger: {
          trigger: section1Ref.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            gsap.set([heroHeadingRef.current, heroSublineRef.current], { opacity: 1, y: 0 });
            if (heroHeartsRef.current) {
              gsap.set(heroHeartsRef.current.querySelectorAll('.heart-item'), { opacity: 1, x: 0, y: 0 });
            }
          }
        }
      });
      
      // Section 1 EXIT (70%-100%)
      section1Tl.fromTo(heroHeadingRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );
      section1Tl.fromTo(heroSublineRef.current,
        { y: 0, opacity: 1 },
        { y: '-12vh', opacity: 0, ease: 'power2.in' },
        0.72
      );
      if (heroHeartsRef.current) {
        const hearts = heroHeartsRef.current.querySelectorAll('.heart-item');
        hearts.forEach((heart, i) => {
          const xDir = i % 2 === 0 ? '-12vw' : '12vw';
          const yDir = i < 2 ? '-10vh' : '10vh';
          section1Tl.fromTo(heart,
            { x: 0, y: 0, opacity: 1 },
            { x: xDir, y: yDir, opacity: 0, ease: 'power2.in' },
            0.7 + i * 0.02
          );
        });
      }
      
      // Section 2: Memory Snapshot - Pinned
      const section2Tl = gsap.timeline({
        scrollTrigger: {
          trigger: section2Ref.current,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        }
      });
      
      // Section 2 ENTRANCE (0%-30%)
      section2Tl.fromTo(polaroidRef.current,
        { y: '90vh', scale: 0.65, rotate: -6, opacity: 0 },
        { y: 0, scale: 1, rotate: 0, opacity: 1, ease: 'power2.out' },
        0
      );
      
      // Section 2 EXIT (70%-100%)
      section2Tl.fromTo(polaroidRef.current,
        { x: 0, y: 0, scale: 1, opacity: 1 },
        { x: '-18vw', y: '-10vh', scale: 0.92, opacity: 0, ease: 'power2.in' },
        0.7
      );
      
      // Section 3: The Promise - Flowing
      gsap.fromTo(promiseRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section3Ref.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          }
        }
      );
      
      // Section 4: Lock It In - Pinned
      const section4Tl = gsap.timeline({
        scrollTrigger: {
          trigger: section4Ref.current,
          start: 'top top',
          end: '+=120%',
          pin: true,
          scrub: 0.6,
        }
      });
      
      // Section 4 ENTRANCE (0%-30%)
      section4Tl.fromTo(lockCardRef.current,
        { y: '80vh', scale: 0.7, opacity: 0 },
        { y: 0, scale: 1, opacity: 1, ease: 'power2.out' },
        0
      );
      
      // Section 4 EXIT (70%-100%)
      section4Tl.fromTo(lockCardRef.current,
        { y: 0, scale: 1, opacity: 1 },
        { y: '-15vh', scale: 0.95, opacity: 0, ease: 'power2.in' },
        0.7
      );
      
      // Section 5: Keepsake Frame - Flowing
      gsap.fromTo(keepsakeRef.current,
        { opacity: 0, y: 60, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section5Ref.current,
            start: 'top 80%',
            end: 'top 30%',
            scrub: true,
          }
        }
      );
      
      // Global snap for pinned sections
      ScrollTrigger.refresh();
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      if (maxScroll && pinned.length > 0) {
        const pinnedRanges = pinned.map(st => ({
          start: st.start / maxScroll,
          end: (st.end ?? st.start) / maxScroll,
          center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
        }));
        
        ScrollTrigger.create({
          snap: {
            snapTo: (value: number) => {
              const inPinned = pinnedRanges.some(r => value >= r.start - 0.02 && value <= r.end + 0.02);
              if (!inPinned) return value;
              
              const target = pinnedRanges.reduce((closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value) ? r.center : closest,
                pinnedRanges[0]?.center ?? 0
              );
              return target;
            },
            duration: { min: 0.15, max: 0.35 },
            delay: 0,
            ease: 'power2.out',
          }
        });
      }
    });
    
    return () => ctx.revert();
  }, [answered]);

  const handleYesClick = () => {
    setAnswered(true);
    gsap.to('.lock-heart', {
      scale: 1.2,
      duration: 0.2,
      yoyo: true,
      repeat: 1,
      ease: 'power2.out',
      stagger: 0.05
    });
  };

  const handleNoClick = () => {
    setShowTooltip(true);
    gsap.to('.no-button', {
      x: -6,
      duration: 0.1,
      yoyo: true,
      repeat: 3,
      ease: 'power2.inOut',
      onComplete: () => {
        gsap.set('.no-button', { x: 0 });
        setTimeout(() => setShowTooltip(false), 2000);
      }
    });
  };

  return (
    <div className="relative">
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Persistent header */}
      <header className="fixed top-0 left-0 right-0 z-[100] flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose fill-rose" />
          <span className="text-sm text-text-secondary font-medium">ProposeDay</span>
        </div>
        <div className="flex flex-col items-center">
          <button 
            onClick={toggleAudio}
            className="p-2 rounded-full bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-text-secondary" /> : <VolumeX className="w-4 h-4 text-text-secondary" />}
          </button>
          <span className="text-[10px] text-text-secondary/70 mt-1 cursor-pointer" onClick={toggleAudio}>click me</span>
        </div>
      </header>

      {/* Section 1: Hero Proposal Card */}
      <section 
        ref={section1Ref}
        className="relative w-screen h-screen bg-blush heart-pattern overflow-hidden z-10"
      >
        {/* Decorative hearts */}
        <div ref={heroHeartsRef} className="absolute inset-0 pointer-events-none">
          <div className="heart-item absolute left-[6vw] top-[10vh] animate-float">
            <HeartIcon size={100} className="glitter-heart" />
          </div>
          <div className="heart-item absolute right-[6vw] top-[12vh] animate-float" style={{ animationDelay: '0.5s' }}>
            <HeartIcon size={90} className="glitter-heart" />
          </div>
          <div className="heart-item absolute left-[8vw] bottom-[10vh] animate-float" style={{ animationDelay: '1s' }}>
            <HeartIcon size={80} className="glitter-heart" />
          </div>
          <div className="heart-item absolute right-[8vw] bottom-[12vh] animate-float" style={{ animationDelay: '1.5s' }}>
            <HeartIcon size={90} className="glitter-heart" />
          </div>
        </div>
        
        {/* Sparkles */}
        <div ref={heroSparklesRef} className="absolute inset-0 pointer-events-none">
          <div className="sparkle-item absolute left-[52vw] top-[18vh] animate-rotate-slow">
            <StarIcon size={28} className="text-rose/70" />
          </div>
          <div className="sparkle-item absolute left-[22vw] top-[78vh] animate-rotate-slow" style={{ animationDelay: '2s' }}>
            <StarIcon size={22} className="text-rose/60" />
          </div>
          <div className="sparkle-item absolute left-[78vw] top-[82vh] animate-rotate-slow" style={{ animationDelay: '4s' }}>
            <StarIcon size={26} className="text-rose/70" />
          </div>
        </div>
        
        {/* Main content */}
        <div className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[90vw] text-center">
          <h1 
            ref={heroHeadingRef}
            className="font-display font-black text-text-primary uppercase tracking-tight leading-[0.9]"
            style={{ fontSize: 'clamp(48px, 12vw, 140px)' }}
          >
            WILL YOU<br />BE MY BFF?
          </h1>
          <p 
            ref={heroSublineRef}
            className="mt-8 text-lg md:text-xl text-text-secondary font-body"
          >
            Happy Propose Day Babu
          </p>
        </div>
        
        {/* Scroll hint */}
        <div className="absolute bottom-[4vh] left-1/2 -translate-x-1/2 text-sm text-text-secondary/70 animate-pulse">
          Scroll to answer
        </div>
      </section>

      {/* Section 2: Memory Snapshot */}
      <section 
        ref={section2Ref}
        className="relative w-screen h-screen bg-blush overflow-hidden z-20"
      >
        {/* Decorative elements */}
        <div className="absolute left-[6vw] top-[55vh] animate-float">
          <HeartIcon size={90} className="glitter-heart" />
        </div>
        <div className="absolute right-[6vw] top-[58vh] animate-float" style={{ animationDelay: '0.7s' }}>
          <HeartIcon size={100} className="glitter-heart" />
        </div>
        <div className="absolute left-[10vw] top-[18vh] animate-rotate-slow">
          <StarIcon size={24} className="text-rose/60" />
        </div>
        <div className="absolute right-[12vw] bottom-[16vh] animate-rotate-slow" style={{ animationDelay: '3s' }}>
          <StarIcon size={28} className="text-rose/70" />
        </div>
        
        {/* Polaroid frame */}
        <div 
          ref={polaroidRef}
          className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[min(72vw,520px)] bg-white rounded-2xl p-4 shadow-frame"
        >
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden photo-grade">
            <img 
              src="/couple_photo_01.jpg" 
              alt="Us together" 
              className="w-full h-full object-cover"
            />
          </div>
          <p className="mt-4 text-center text-text-secondary text-sm md:text-base font-body">
            Some friendships just feel like home.
          </p>
        </div>
        
        {/* Microtext */}
        <p className="absolute bottom-[6vh] left-1/2 -translate-x-1/2 text-xs text-text-secondary/60 text-center max-w-[80vw]">
          Some moments are too good to keep to myself.
        </p>
      </section>

      {/* Section 3: The Promise */}
      <section 
        ref={section3Ref}
        className="relative w-full min-h-screen bg-sky py-20 z-30"
      >
        {/* Decorative hearts */}
        <div className="absolute right-[6vw] top-[18vh] animate-float">
          <HeartIcon size={70} className="glitter-heart opacity-70" />
        </div>
        <div className="absolute left-[6vw] bottom-[10vh] animate-float" style={{ animationDelay: '1s' }}>
          <HeartIcon size={60} className="glitter-heart opacity-60" />
        </div>
        
        {/* Content */}
        <div 
          ref={promiseRef}
          className="max-w-[720px] mx-auto px-6 pt-[10vh] text-center"
        >
          <h2 className="font-script text-4xl md:text-5xl text-rose font-semibold mb-8">
            You are my forever.
          </h2>
          <p className="text-lg md:text-xl text-text-primary font-body leading-relaxed mb-8">
            I don't need life to be perfect — having you beside me is more than enough. Through every phase, every laugh, and every challenge, I'm choosing this friendship again and again.
          </p>
          <p className="font-script text-2xl md:text-3xl text-rose font-medium">
            Yours, always.
          </p>
          <p className="font-script text-xl md:text-2xl text-rose font-medium mt-2">
            MaddyBaisla
          </p>
          
          {/* Sparkles */}
          <div className="flex justify-center gap-8 mt-12">
            <StarIcon size={20} className="text-rose/50 animate-rotate-slow" />
            <StarIcon size={16} className="text-rose/40 animate-rotate-slow" style={{ animationDelay: '2s' }} />
            <StarIcon size={22} className="text-rose/50 animate-rotate-slow" style={{ animationDelay: '4s' }} />
          </div>
        </div>
      </section>

      {/* Section 4: Lock It In */}
      <section 
        ref={section4Ref}
        className="relative w-screen h-screen bg-blush overflow-hidden z-40"
      >
        {/* Decorative hearts */}
        <div className="lock-heart absolute left-[6vw] top-[14vh] animate-float">
          <HeartIcon size={80} className="glitter-heart" />
        </div>
        <div className="lock-heart absolute right-[6vw] top-[18vh] animate-float" style={{ animationDelay: '0.5s' }}>
          <HeartIcon size={70} className="glitter-heart" />
        </div>
        <div className="lock-heart absolute left-[8vw] bottom-[16vh] animate-float" style={{ animationDelay: '1s' }}>
          <HeartIcon size={75} className="glitter-heart" />
        </div>
        <div className="lock-heart absolute right-[8vw] bottom-[12vh] animate-float" style={{ animationDelay: '1.5s' }}>
          <HeartIcon size={85} className="glitter-heart" />
        </div>
        
        {/* Sparkles */}
        <div className="absolute left-[50%] top-[12vh] animate-rotate-slow">
          <StarIcon size={24} className="text-rose/60" />
        </div>
        <div className="absolute right-[15vw] bottom-[20vh] animate-rotate-slow" style={{ animationDelay: '3s' }}>
          <StarIcon size={20} className="text-rose/50" />
        </div>
        
        {/* Card */}
        <div 
          ref={lockCardRef}
          className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[min(86vw,520px)] bg-white rounded-3xl p-8 shadow-card"
        >
          {!answered ? (
            <>
              <h3 className="text-xl md:text-2xl text-text-primary font-display font-semibold text-center mb-8">
                will you be my pawnkiloyadav?
              </h3>
              
              <div className="flex justify-center gap-4 mb-4">
                <button 
                  onClick={handleYesClick}
                  className="px-8 py-3 bg-rose text-white font-display font-semibold rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                >
                  <Heart className="w-5 h-5 fill-white" />
                  YES
                </button>
                <button 
                  onClick={handleNoClick}
                  className="no-button px-8 py-3 bg-white text-rose border-2 border-rose font-display font-semibold rounded-full hover:scale-102 transition-all duration-300"
                >
                  NO
                </button>
              </div>
              
              {showTooltip && (
                <p className="text-center text-sm text-rose animate-pulse">
                  Try the other one.
                </p>
              )}
              
              <p className="text-center text-xs text-text-secondary/60 mt-4">
                Tap YES to lock it in.
              </p>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-rose rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse-soft">
                <Check className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl text-rose font-display font-bold mb-2">
                Locked in.
              </h3>
              <p className="text-text-secondary font-body">
                You said YES. Best decision ever.
              </p>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-rose/10 rounded-full">
                <Heart className="w-4 h-4 text-rose fill-rose" />
                <span className="text-sm text-rose font-medium">Sealed</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Section 5: Keepsake Frame */}
      <section 
        ref={section5Ref}
        className="relative w-full min-h-screen bg-blush py-16 z-50"
      >
        {/* Decorative elements */}
        <div className="absolute left-1/2 top-[6vh] -translate-x-1/2 animate-float">
          <HeartIcon size={80} className="glitter-heart" />
        </div>
        <div className="absolute left-[6vw] bottom-[10vh] animate-float" style={{ animationDelay: '0.8s' }}>
          <HeartIcon size={65} className="glitter-heart opacity-80" />
        </div>
        <div className="absolute right-[6vw] bottom-[12vh] animate-float" style={{ animationDelay: '1.2s' }}>
          <HeartIcon size={70} className="glitter-heart opacity-80" />
        </div>
        
        {/* Sparkles */}
        <div className="absolute left-[20vw] top-[20vh] animate-rotate-slow">
          <StarIcon size={18} className="text-rose/50" />
        </div>
        <div className="absolute right-[25vw] top-[25vh] animate-rotate-slow" style={{ animationDelay: '2s' }}>
          <StarIcon size={22} className="text-rose/60" />
        </div>
        
        {/* Keepsake frame */}
        <div 
          ref={keepsakeRef}
          className="max-w-[640px] mx-auto px-6 pt-[12vh]"
        >
          <div className="bg-white rounded-3xl p-5 shadow-frame-lg">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden photo-grade">
              <img 
                src="/couple_photo_02.jpg" 
                alt="Us - the beginning of always" 
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-5 text-center text-text-secondary font-body text-base">
              The friendship that lasts.
            </p>
          </div>
          
          <div className="text-center mt-10">
            <p className="font-script text-2xl md:text-3xl text-rose font-semibold mb-4">
              I'll make sure you never regret being stuck with me.
            </p>
            <div className="flex items-center justify-center gap-2 text-text-secondary/60 text-sm">
              <Sparkles className="w-4 h-4" />
              <span>Made with love</span>
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
