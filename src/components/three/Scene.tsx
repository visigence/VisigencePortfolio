import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { OrbitControls, Preload, useProgress } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import ParticleField from './ParticleField';
import Background from './Background';

function Loader() {
  const { progress } = useProgress();
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-primary-950">
      <div className="w-64">
        <div className="h-2 bg-primary-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-accent-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-center mt-4 text-accent-400 font-orbitron">
          {progress.toFixed(0)}%
        </p>
      </div>
    </div>
  );
}

export default function Scene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className="fixed inset-0">
      <Suspense fallback={<Loader />}>
        <Canvas
          ref={canvasRef}
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ 
            antialias: true,
            powerPreference: "high-performance",
            alpha: false,
            depth: true
          }}
          dpr={[1, 2]}
        >
          <color attach="background" args={['#0A0A0A']} />
          
          <fog attach="fog" args={['#0A0A0A', 5, 15]} />
          
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          
          <Background />
          <ParticleField />
          
          <EffectComposer>
            <Bloom 
              intensity={1.5}
              luminanceThreshold={0.9}
              luminanceSmoothing={0.9}
            />
          </EffectComposer>
          
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
          />
          
          <Preload all />
        </Canvas>
      </Suspense>
    </div>
  );
}