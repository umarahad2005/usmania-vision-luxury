import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const time = useRef(0);

  useFrame((_, delta) => {
    time.current += delta;
    if (!meshRef.current) return;
    // Gentle floating
    meshRef.current.position.y = Math.sin(time.current * 0.6) * 0.15;
    // Slow rotation
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.25;
  });

  return (
    <mesh ref={meshRef} castShadow>
      <torusKnotGeometry args={[1, 0.32, 200, 32, 2, 3]} />
      <MeshDistortMaterial
        color="#d4af37"
        metalness={0.95}
        roughness={0.08}
        distort={0.12}
        speed={1.2}
        envMapIntensity={1.8}
      />
    </mesh>
  );
}

function Ring() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.z += delta * 0.18;
    ref.current.rotation.x += delta * 0.08;
  });
  return (
    <mesh ref={ref} position={[1.8, -0.4, -0.5]}>
      <torusGeometry args={[0.55, 0.06, 32, 64]} />
      <meshStandardMaterial color="#b8a040" metalness={1} roughness={0.1} />
    </mesh>
  );
}

function SmallSphere() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.position.x = Math.cos(t * 0.5) * 2.2;
    ref.current.position.y = Math.sin(t * 0.7) * 0.8 - 0.5;
    ref.current.position.z = Math.sin(t * 0.4) * 0.6;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.15, 24, 24]} />
      <meshStandardMaterial color="#ffffff" metalness={1} roughness={0} />
    </mesh>
  );
}

/**
 * 3D hero scene with a floating gold torus-knot, orbiting ring, and ambient sphere.
 * Must be rendered client-side only (import lazily from route files).
 */
export default function HeroScene() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <spotLight
          position={[5, 10, 5]}
          angle={0.25}
          penumbra={1}
          intensity={2.5}
          color="#d4af37"
        />
        <pointLight position={[-4, -4, -4]} intensity={0.8} color="#4060ff" />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <FloatingOrb />
          <Ring />
          <SmallSphere />
        </Suspense>
      </Canvas>
    </div>
  );
}
