import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import type { Mesh, Group } from 'three';

function GlowSphere({
  position,
  scale,
  speed,
  color,
}: {
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
    meshRef.current.position.y +=
      Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.001;
  });

  return (
    <Float speed={speed} rotationIntensity={0.4} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 2]} />
        <MeshDistortMaterial
          color={color}
          roughness={0.15}
          metalness={0.9}
          distort={0.25}
          speed={1.5}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function WireframeTorus({
  position,
  scale,
  speed,
  color,
}: {
  position: [number, number, number];
  scale: number;
  speed: number;
  color: string;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.15;
  });

  return (
    <Float speed={speed * 0.7} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <torusGeometry args={[1, 0.35, 16, 48]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.8}
          wireframe
          transparent
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
}

function OrbitalRing({
  radius,
  speed,
  color,
  yOffset,
}: {
  radius: number;
  speed: number;
  color: string;
  yOffset: number;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z = state.clock.elapsedTime * speed * 0.1;
    meshRef.current.rotation.x = Math.PI / 3;
  });

  return (
    <mesh ref={meshRef} position={[0, yOffset, -3]}>
      <torusGeometry args={[radius, 0.008, 8, 128]} />
      <meshBasicMaterial color={color} transparent opacity={0.15} />
    </mesh>
  );
}

function ParticleField() {
  const groupRef = useRef<Group>(null);

  const particles = useMemo(() => {
    return Array.from({ length: 120 }, () => ({
      position: [
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 24,
        (Math.random() - 0.5) * 24,
      ] as [number, number, number],
      scale: Math.random() * 0.035 + 0.008,
      opacity: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    groupRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.03) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <mesh key={i} position={p.position} scale={p.scale}>
          <sphereGeometry args={[1, 6, 6]} />
          <meshBasicMaterial
            color={i % 3 === 0 ? '#1ab2ff' : i % 3 === 1 ? '#00e6a0' : '#ffffff'}
            transparent
            opacity={p.opacity}
          />
        </mesh>
      ))}
    </group>
  );
}

function GlowOrb({
  position,
  color,
  intensity,
}: {
  position: [number, number, number];
  color: string;
  intensity: number;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const pulse = Math.sin(state.clock.elapsedTime * 1.5) * 0.15 + 0.85;
    meshRef.current.scale.setScalar(pulse * intensity);
  });

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[0.5, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.08} />
    </mesh>
  );
}

export default function FloatingGeometry() {
  return (
    <group>
      <GlowSphere position={[-3.5, 1.5, -2]} scale={0.7} speed={1} color="#1ab2ff" />
      <GlowSphere position={[4, -0.5, -4]} scale={0.45} speed={0.7} color="#00e6a0" />
      <GlowSphere position={[1, 3, -5]} scale={0.35} speed={1.2} color="#1ab2ff" />
      <GlowSphere position={[-2, -2.5, -3]} scale={0.3} speed={0.9} color="#00c987" />

      <WireframeTorus position={[2.5, 1.8, -3]} scale={0.6} speed={0.5} color="#1ab2ff" />
      <WireframeTorus position={[-3, -1, -4]} scale={0.45} speed={0.7} color="#00e6a0" />
      <WireframeTorus position={[0, -3, -2.5]} scale={0.3} speed={0.6} color="#1ab2ff" />

      <OrbitalRing radius={5} speed={0.3} color="#1ab2ff" yOffset={0} />
      <OrbitalRing radius={7} speed={-0.2} color="#00e6a0" yOffset={-1} />
      <OrbitalRing radius={3.5} speed={0.5} color="#ffffff" yOffset={1} />

      <GlowOrb position={[-5, 2, -6]} color="#1ab2ff" intensity={2} />
      <GlowOrb position={[5, -3, -5]} color="#00e6a0" intensity={1.5} />
      <GlowOrb position={[0, 4, -8]} color="#1ab2ff" intensity={2.5} />

      <ParticleField />
    </group>
  );
}
