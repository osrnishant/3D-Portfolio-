import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import type { Mesh, Group } from 'three';

function FloatingSphere({ position, scale, speed, color }: {
  position: [number, number, number];
  scale: number;
  speed: number;
  color: string;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
  });

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function FloatingTorus({ position, scale, speed, color }: {
  position: [number, number, number];
  scale: number;
  speed: number;
  color: string;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.4;
    meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.2;
  });

  return (
    <Float speed={speed * 0.8} rotationIntensity={0.8} floatIntensity={1}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.4, 16, 32]} />
        <meshStandardMaterial
          color={color}
          roughness={0.3}
          metalness={0.7}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const groupRef = useRef<Group>(null);

  const particles = useMemo(() => {
    return Array.from({ length: 80 }, () => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
      ] as [number, number, number],
      scale: Math.random() * 0.04 + 0.01,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position} scale={p.scale}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial color="#60aef8" transparent opacity={0.6} />
        </mesh>
      ))}
    </group>
  );
}

export default function FloatingGeometry() {
  return (
    <group>
      <FloatingSphere position={[-3, 1, -2]} scale={0.8} speed={1.2} color="#3b8ff4" />
      <FloatingSphere position={[3.5, -1, -3]} scale={0.5} speed={0.8} color="#10b981" />
      <FloatingSphere position={[0, 2.5, -4]} scale={0.4} speed={1.5} color="#60aef8" />
      <FloatingTorus position={[2, 1.5, -2]} scale={0.6} speed={0.6} color="#3b8ff4" />
      <FloatingTorus position={[-2.5, -1.5, -3]} scale={0.4} speed={1} color="#34d399" />
      <ParticleField />
    </group>
  );
}
