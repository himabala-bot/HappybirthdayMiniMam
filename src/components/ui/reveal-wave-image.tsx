"use client";
import * as THREE from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useMemo, useRef, useState, useEffect } from "react";

/* =========================================================
RevealWaveImage Component (Full Viewport Non-Cropping Edition)
- Occupies 100% of the viewport from edge to edge.
- Preserves 100% of the subject composition (hat, cake, shoulders, body).
- Centered aspect-aware UV mapping inside shader with zero subject cropping.
- Bayer 4x4 dithering across entire viewport canvas.
- Continuous waves and interactive flashlight color reveal.
========================================================= */

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;
uniform sampler2D uTexture;
uniform float uTime;
uniform vec2 uMouse;
uniform float uRevealRadius;
uniform float uRevealSoftness;
uniform float uPixelSize;
uniform float uMouseActive;
uniform float uWaveSpeed;
uniform float uWaveFrequency;
uniform float uWaveAmplitude;
uniform float uMouseRadius;
uniform float uViewportAspect;
uniform float uImageAspect;
varying vec2 vUv;

// Bayer 4x4 dithering pattern
float bayer4x4(vec2 pos) {
  int x = int(mod(pos.x, 4.0));
  int y = int(mod(pos.y, 4.0));
  int index = x + y * 4;
  float pattern[16]; 
  pattern[0] = 0.0; pattern[1] = 8.0; pattern[2] = 2.0; pattern[3] = 10.0; 
  pattern[4] = 12.0; pattern[5] = 4.0; pattern[6] = 14.0; pattern[7] = 6.0; 
  pattern[8] = 3.0; pattern[9] = 11.0; pattern[10] = 1.0; pattern[11] = 9.0; 
  pattern[12] = 15.0; pattern[13] = 7.0; pattern[14] = 13.0; pattern[15] = 5.0; 
  for (int i = 0; i < 16; i++) { 
    if (i == index) return pattern[i] / 16.0; 
  } 
  return 0.0;
}

void main() {
  vec2 screenUv = vUv;
  float screenDist = distance(vUv, uMouse);
  
  // Wave and Ripple Distortions across viewport
  float time = uTime; 
  float waveStrength = uWaveAmplitude * 0.04; 
  
  float wave1 = sin(vUv.y * uWaveFrequency + time * uWaveSpeed) * waveStrength; 
  float wave2 = sin(vUv.x * uWaveFrequency * 0.7 + time * uWaveSpeed * 0.8) * waveStrength * 0.5; 
  
  vec2 distortedScreenUv = vUv; 
  distortedScreenUv.x += wave1; 
  distortedScreenUv.y += wave2; 
  
  // Interactive Mouse Ripple
  if (uMouseActive > 0.01) { 
    float mouseInfluence = smoothstep(uMouseRadius, 0.0, screenDist); 
    float rippleFreq = uWaveFrequency * 5.0; 
    float rippleSpeed = uWaveSpeed * 1.2; 
    float rippleStrength = uWaveAmplitude * 0.025; 
    float ripple = sin(screenDist * rippleFreq - time * rippleSpeed) * rippleStrength * mouseInfluence * uMouseActive; 
    distortedScreenUv.x += ripple; 
    distortedScreenUv.y += ripple; 
  } 
  
  // Aspect-Ratio Preserving UV Mapping:
  // Fits 100% of the composition (party hat, face, cake, hands) with zero cropping!
  float fitScale = 0.94;
  vec2 centeredUv = (distortedScreenUv - 0.5) / fitScale + 0.5;
  
  vec2 imageUv = centeredUv;
  if (uViewportAspect > uImageAspect) {
    float scaleFactor = uViewportAspect / uImageAspect;
    imageUv.x = (centeredUv.x - 0.5) * scaleFactor + 0.5;
    imageUv.y = centeredUv.y;
  } else {
    float scaleFactor = uImageAspect / uViewportAspect;
    imageUv.x = centeredUv.x;
    imageUv.y = (centeredUv.y - 0.5) * scaleFactor + 0.5;
  }

  vec4 color = vec4(0.0); 
  float alpha = 0.0;
  
  if (imageUv.x >= 0.0 && imageUv.x <= 1.0 && imageUv.y >= 0.0 && imageUv.y <= 1.0) {
    vec4 texColor = texture2D(uTexture, imageUv);
    color.rgb = texColor.rgb;
    alpha = texColor.a;
  }
  
  // High-fidelity monochrome conversion
  float luminance = dot(color.rgb, vec3(0.299, 0.587, 0.114)); 
  
  // Clean editorial tonal mapping: deep rich blacks, radiant highlights, perfectly crisp facial details
  float contrastGray = smoothstep(0.02, 0.98, luminance);
  
  // Subtle, fine micro-dither to add subtle art-gallery texture without harsh pixelation
  vec2 pixelCoord = floor(gl_FragCoord.xy / max(uPixelSize * 0.5, 1.0)); 
  float dither = (bayer4x4(pixelCoord) - 0.5) * 0.06; 
  
  float tone = clamp(contrastGray + dither, 0.0, 1.0);
  vec3 bwColor = vec3(tone); 
  
  // Reveal Flashlight in screen space (unveils original full color on cursor hover)
  float revealDist = distance(vUv, uMouse); 
  float innerRadius = uRevealRadius * (1.0 - uRevealSoftness); 
  float outerRadius = uRevealRadius; 
  float revealAmount = 1.0 - smoothstep(innerRadius, outerRadius, revealDist); 
  revealAmount *= uMouseActive; 
  
  // Smooth bottom edge fade so image naturally dissolves into background
  float bottomFade = smoothstep(0.0, 0.10, imageUv.y);
  alpha *= bottomFade;
  
  vec3 finalColor = mix(bwColor, color.rgb, revealAmount); 
  gl_FragColor = vec4(finalColor, alpha);
}
`;

interface ImagePlaneProps {
  src: string;
  aspectRatio: number;
  revealRadius: number;
  revealSoftness: number;
  pixelSize: number;
  waveSpeed: number;
  waveFrequency: number;
  waveAmplitude: number;
  mouseRadius: number;
  isMouseInCanvas: boolean;
}

function ImagePlane({
  src,
  aspectRatio,
  revealRadius,
  revealSoftness,
  pixelSize,
  waveSpeed,
  waveFrequency,
  waveAmplitude,
  mouseRadius,
  isMouseInCanvas,
}: ImagePlaneProps) {
  const texture = useTexture(src);
  const meshRef = useRef<THREE.Mesh>(null);
  const { pointer, viewport } = useThree();
  const mouseActiveRef = useRef(0);
  const hasEnteredRef = useRef(false);

  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(-10, -10) },
      uRevealRadius: { value: revealRadius },
      uRevealSoftness: { value: revealSoftness },
      uPixelSize: { value: pixelSize },
      uMouseActive: { value: 0 },
      uWaveSpeed: { value: waveSpeed },
      uWaveFrequency: { value: waveFrequency },
      uWaveAmplitude: { value: waveAmplitude },
      uMouseRadius: { value: mouseRadius },
      uViewportAspect: { value: viewport.width / viewport.height },
      uImageAspect: { value: aspectRatio },
    }),
    [
      texture,
      revealRadius,
      revealSoftness,
      pixelSize,
      waveSpeed,
      waveFrequency,
      waveAmplitude,
      mouseRadius,
      viewport.width,
      viewport.height,
      aspectRatio,
    ],
  );

  useFrame((state) => {
    if (meshRef.current) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      material.uniforms.uTime.value = state.clock.elapsedTime;
      material.uniforms.uViewportAspect.value = state.viewport.width / state.viewport.height;
      material.uniforms.uImageAspect.value = aspectRatio;

      if (isMouseInCanvas) {
        hasEnteredRef.current = true;
      }
      const targetActive = isMouseInCanvas ? 1 : 0;
      const easingSpeed = 0.08;
      mouseActiveRef.current += (targetActive - mouseActiveRef.current) * easingSpeed;
      material.uniforms.uMouseActive.value = mouseActiveRef.current;
      
      if (hasEnteredRef.current) {
        material.uniforms.uMouse.value.set(
          (pointer.x + 1) / 2,
          (pointer.y + 1) / 2,
        );
      }
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
}

export interface RevealWaveImageProps {
  src: string;
  revealRadius?: number;
  revealSoftness?: number;
  pixelSize?: number;
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  mouseRadius?: number;
  className?: string;
}

export const RevealWaveImage = ({
  src,
  revealRadius = 0.35,
  revealSoftness = 0.65,
  pixelSize = 3,
  waveSpeed = 0.22,
  waveFrequency = 1.8,
  waveAmplitude = 0.08,
  mouseRadius = 0.32,
  className = "absolute inset-0 w-full h-full",
}: RevealWaveImageProps) => {
  const [isMouseInCanvas, setIsMouseInCanvas] = useState(false);
  const [aspectRatio, setAspectRatio] = useState<number>(1024 / 783);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setAspectRatio(img.naturalWidth / img.naturalHeight);
    };
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsMouseInCanvas(true)}
      onMouseLeave={() => setIsMouseInCanvas(false)}
      style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
    >
      <Canvas
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          display: "block",
        }}
        gl={{ antialias: false, alpha: true }}
        camera={{ position: [0, 0, 1] }}
      >
        <ImagePlane
          src={src}
          aspectRatio={aspectRatio}
          revealRadius={revealRadius}
          revealSoftness={revealSoftness}
          pixelSize={pixelSize}
          waveSpeed={waveSpeed}
          waveFrequency={waveFrequency}
          waveAmplitude={waveAmplitude}
          mouseRadius={mouseRadius}
          isMouseInCanvas={isMouseInCanvas}
        />
      </Canvas>
    </div>
  );
};

export default RevealWaveImage;

