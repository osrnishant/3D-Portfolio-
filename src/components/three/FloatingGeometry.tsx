import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import type { Mesh, Group, Points as PointsType } from 'three';

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
  const baseY = position[1];

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3;
    meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.2;
    meshRef.current.position.y =
      baseY + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.15;
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
  const pointsRef = useRef<PointsType>(null);
  const count = 200;

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const colorA = new THREE.Color('#1ab2ff');
    const colorB = new THREE.Color('#00e6a0');
    const colorC = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 28;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 28;

      const c = i % 3 === 0 ? colorA : i % 3 === 1 ? colorB : colorC;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return { positions: pos, colors: col };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015;
    pointsRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.03) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        opacity={0.6}
        size={0.06}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
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

function MouseParallax({ children }: { children: React.ReactNode }) {
  const groupRef = useRef<Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.15,
      0.03
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointer.y * 0.1,
      0.03
    );
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function FloatingGeometry() {
  return (
    <MouseParallax>
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
    </MouseParallax>
  );
}
