import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PointMaterial, Points } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleProps {
  count: number;
}

// Optimized particle system
const Particles: React.FC<ParticleProps> = ({ count }) => {
  const points = useRef<THREE.Points>(null);
  
  // Generate particles once using useMemo
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Create a sphere of particles
      const radius = 2.5 + Math.random() * 0.5;
      const phi = Math.random() * Math.PI * 2; // azimuthal angle
      const theta = Math.random() * Math.PI; // polar angle
      
      positions[i3] = radius * Math.sin(theta) * Math.cos(phi);
      positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      positions[i3 + 2] = radius * Math.cos(theta);
      
      // Set colors based on position (normalized)
      colors[i3] = 0.5 + (positions[i3] / radius) * 0.5;
      colors[i3 + 1] = 0.2 + (positions[i3 + 1] / radius) * 0.5;
      colors[i3 + 2] = 0.8 + (positions[i3 + 2] / radius) * 0.2;
    }
    
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (!points.current) return;
    
    // Rotate the entire particle system
    points.current.rotation.y += 0.001;
    
    // Pulse effect
    const time = state.clock.getElapsedTime() * 0.5;
    points.current.scale.set(
      1 + Math.sin(time) * 0.05,
      1 + Math.sin(time) * 0.05,
      1 + Math.sin(time) * 0.05
    );
  });

  return (
    <Points ref={points} limit={count}>
      <pointsMaterial 
        size={0.05} 
        vertexColors 
        transparent 
        opacity={0.8}
        sizeAttenuation 
      />
      <bufferAttribute
        attach="geometry.attributes.position"
        array={particlePositions.positions}
        count={count}
        itemSize={3}
      />
      <bufferAttribute
        attach="geometry.attributes.color"
        array={particlePositions.colors}
        count={count}
        itemSize={3}
      />
    </Points>
  );
};

// Blockchain node
const Node: React.FC<{
  position: [number, number, number];
  size?: number;
  color?: string;
}> = ({ position, size = 0.15, color = "#6366f1" }) => {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!mesh.current) return;
    mesh.current.rotation.x += 0.01;
    mesh.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={mesh} position={position}>
      <octahedronGeometry args={[size, 0]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
    </mesh>
  );
};

// Connection line between nodes
const Connection: React.FC<{
  start: [number, number, number];
  end: [number, number, number];
}> = ({ start, end }) => {
  const ref = useRef<THREE.Line>(null);

  const points = useMemo(() => {
    return [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  }, [start, end]);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const time = clock.getElapsedTime();
    ref.current.material.opacity = (Math.sin(time * 2) * 0.3) + 0.7;
  });

  return (
    <line ref={ref} geometry={lineGeometry}>
      <lineBasicMaterial attach="material" color="#a5b4fc" transparent opacity={0.8} />
    </line>
  );
};

// Blockchain Model
const BlockchainModel: React.FC = () => {
  const group = useRef<THREE.Group>(null);
  
  // Create nodes in a circular pattern
  const nodePositions: [number, number, number][] = useMemo(() => {
    const positions: [number, number, number][] = [];
    const nodeCount = 12;
    
    for (let i = 0; i < nodeCount; i++) {
      // Arrange in a circle with some random offset
      const angle = (i / nodeCount) * Math.PI * 2;
      const radius = 1.8 + Math.random() * 0.2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 1.5;
      
      positions.push([x, y, z]);
    }
    
    return positions;
  }, []);

  // Create connections between nodes
  const connections = useMemo(() => {
    const result = [];
    
    // Connect each node to its neighbors
    for (let i = 0; i < nodePositions.length; i++) {
      const current = nodePositions[i];
      
      // Connect to the next node (with wrap-around)
      const next = nodePositions[(i + 1) % nodePositions.length];
      result.push({ start: current, end: next });
      
      // Connect to a random node
      const randomIndex = (i + 2 + Math.floor(Math.random() * (nodePositions.length - 3))) % nodePositions.length;
      const random = nodePositions[randomIndex];
      result.push({ start: current, end: random });
    }
    
    return result;
  }, [nodePositions]);

  useFrame((state) => {
    if (!group.current) return;
    
    // Rotate the entire model slowly
    group.current.rotation.y += 0.001;
    group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
  });

  return (
    <group ref={group}>
      {nodePositions.map((position, index) => (
        <Node 
          key={`node-${index}`} 
          position={position} 
          color={index % 3 === 0 ? "#6366f1" : index % 3 === 1 ? "#06b6d4" : "#d946ef"}
        />
      ))}
      
      {connections.map((connection, index) => (
        <Connection key={`connection-${index}`} start={connection.start} end={connection.end} />
      ))}
    </group>
  );
};

// Main Canvas Component
const HeroCanvas: React.FC = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      style={{ 
        height: '100%', 
        width: '100%',
        transition: 'transform 0.5s ease-out'
      }}
      dpr={[1, 2]} // Optimize performance by limiting DPR
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <BlockchainModel />
      <Particles count={1500} />
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </Canvas>
  );
};

export default HeroCanvas;