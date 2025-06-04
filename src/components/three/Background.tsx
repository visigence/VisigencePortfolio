import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying vec3 vPosition;
  
  void main() {
    vec3 color1 = vec3(0.043, 0.043, 0.043); // #0A0A0A
    vec3 color2 = vec3(0.431, 0.337, 0.812); // #6E56CF
    vec3 color3 = vec3(0.447, 0.945, 0.722); // #72F1B8
    
    float noise = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453123);
    float pattern = sin(vUv.x * 10.0 + uTime) * sin(vUv.y * 10.0 + uTime);
    
    vec3 finalColor = mix(
      mix(color1, color2, abs(sin(uTime * 0.2 + vUv.x))),
      color3,
      abs(pattern * noise * 0.2)
    );
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function Background() {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (!material.current) return;
    material.current.uniforms.uTime.value = state.clock.getElapsedTime();
  });

  return (
    <mesh ref={mesh} position={[0, 0, -5]} scale={[10, 10, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        ref={material}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 }
        }}
      />
    </mesh>
  );
}