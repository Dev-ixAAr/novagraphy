"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

// Colombo Coordinates roughly converted to 3D Cartesian on a sphere of radius 1
// Lat: 6.9, Lon: 79.8
const MARKER_POS = new THREE.Vector3(0.18, 0.12, 0.98); 

function RotatingGlobe() {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15; // Slow rotation
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Base Dark Sphere (The Ocean) */}
      <Sphere args={[1, 64, 64]}>
        <meshPhongMaterial 
          color="#050505" 
          emissive="#000000"
          shininess={10}
        />
      </Sphere>

      {/* 2. Wireframe Overlay (The Grid) */}
      <Sphere args={[1.001, 32, 32]}>
        <meshBasicMaterial 
          color="#2DE1FC" 
          wireframe 
          transparent 
          opacity={0.15} 
        />
      </Sphere>

      {/* 3. Colombo Marker */}
      <mesh position={MARKER_POS}>
        <sphereGeometry args={[0.03, 16, 16]} />
        <meshBasicMaterial color="#2DE1FC" toneMapped={false} />
      </mesh>
      {/* Marker Glow */}
      <mesh position={MARKER_POS}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color="#2DE1FC" transparent opacity={0.3} toneMapped={false} />
      </mesh>
    </group>
  );
}

export default function GlobeWidget() {
  return (
    <div className="w-full h-full min-h-[250px] cursor-move bg-black/20">
      <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#2DE1FC" />
        <RotatingGlobe />
        <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate={false} 
        />
      </Canvas>
    </div>
  );
}