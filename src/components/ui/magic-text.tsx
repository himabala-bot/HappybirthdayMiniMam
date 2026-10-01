"use client";

import * as React from "react";
import * as HoverCardPrimitive from "@radix-ui/react-hover-card";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface LinkPreviewProps {
  children: React.ReactNode;
  imageSrc: string;
  className?: string;
  width?: number;
  height?: number;
}

export const LinkPreview = ({
  children,
  imageSrc,
  className,
  width = 280,
  height = 190,
}: LinkPreviewProps) => {
  const [isOpen, setOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const springConfig = { stiffness: 140, damping: 20 };
  const x = useMotionValue(0);
  const translateX = useSpring(x, springConfig);

  const handleMouseMove = (event: React.MouseEvent<HTMLSpanElement>) => {
    const targetRect = event.currentTarget.getBoundingClientRect();
    const eventOffsetX = event.clientX - targetRect.left;
    const offsetFromCenter = (eventOffsetX - targetRect.width / 2) / 2;
    x.set(offsetFromCenter);
  };

  return (
    <>
      {isMounted && imageSrc ? (
        <div className="hidden" aria-hidden="true">
          <img
            src={imageSrc}
            width={width}
            height={height}
            loading="eager"
            alt="preload preview"
          />
        </div>
      ) : null}

      <HoverCardPrimitive.Root
        openDelay={40}
        closeDelay={80}
        onOpenChange={(open) => {
          setOpen(open);
        }}
      >
        <HoverCardPrimitive.Trigger asChild>
          <span
            onMouseMove={handleMouseMove}
            className={cn(
              "cursor-pointer font-bold text-[#000000] underline decoration-[#EF6545]/50 decoration-2 underline-offset-4 transition-all duration-200 hover:text-[#EF6545] hover:decoration-[#EF6545] inline-block mx-1 select-text",
              className
            )}
          >
            {children}
          </span>
        </HoverCardPrimitive.Trigger>

        <HoverCardPrimitive.Portal>
          <HoverCardPrimitive.Content
            className="z-50 pointer-events-none"
            side="top"
            align="center"
            sideOffset={14}
          >
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 14, scale: 0.88 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 300,
                      damping: 24,
                    },
                  }}
                  exit={{ opacity: 0, y: 8, scale: 0.9, transition: { duration: 0.12 } }}
                  className="shadow-2xl rounded-2xl p-1.5 bg-white border border-[#422F0E]/12"
                  style={{
                    x: translateX,
                  }}
                >
                  <div
                    className="overflow-hidden rounded-xl bg-white shadow-inner"
                    style={{
                      width: `${width}px`,
                      height: `${height}px`,
                    }}
                  >
                    <img
                      src={imageSrc}
                      width={width}
                      height={height}
                      className="w-full h-full object-cover rounded-xl"
                      alt="Moment preview"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </HoverCardPrimitive.Content>
        </HoverCardPrimitive.Portal>
      </HoverCardPrimitive.Root>
    </>
  );
};

export const MagicText = ({ className = "" }: { text?: string; className?: string }) => {
  return (
    <div className="relative w-[86vw] max-w-[1040px] mx-auto flex flex-col items-center justify-center px-4 sm:px-6 py-12 md:py-16 text-center">
      {/* Section Header */}
      <div className="mb-20 sm:mb-24 md:mb-28 flex flex-col items-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#000000] tracking-[-0.03em] mb-2.5">
          The Heart of Our Team
        </h2>
        <p className="text-xs sm:text-sm text-[#6B573E]/80 font-normal tracking-normal">
          (hover over the underlined words)
        </p>
      </div>

      {/* Tribute Paragraph with LinkPreviews */}
      <p
        className={`text-center font-medium text-[#000000] leading-[1.65] tracking-[-0.02em] ${className}`}
        style={{
          fontSize: "clamp(1.35rem, 2.15vw, 1.92rem)",
        }}
      >
        <span>She is the kind of manager who brings </span>
        <LinkPreview imageSrc="/images/tribute/warmth.jpg" width={320} height={215}>
          warmth
        </LinkPreview>
        <span> into the workplace, keeps things moving through the chaos and somehow always knows when someone needs a little guidance. </span>
        <LinkPreview imageSrc="/images/tribute/thoughtful.jpg" width={300} height={220}>
          Thoughtful
        </LinkPreview>
        <span>, </span>
        <LinkPreview imageSrc="/images/tribute/caring.jpg" width={300} height={220}>
          caring
        </LinkPreview>
        <span>, occasionally </span>
        <LinkPreview imageSrc="/images/tribute/dramatic.jpg" width={320} height={215}>
          dramatic
        </LinkPreview>
        <span>, and </span>
        <LinkPreview imageSrc="/images/tribute/always-there.jpg" width={320} height={205}>
          always there
        </LinkPreview>
        <span> when it matters.</span>
      </p>
    </div>
  );
};

export default MagicText;





