import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import type { Mesh, Group } from 'three';

function CentralOrb() {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.5}>
      <mesh ref={meshRef} scale={1.8}>
        <dodecahedronGeometry args={[1, 0]} />
        <MeshDistortMaterial
          color="#1ab2ff"
          roughness={0.1}
          metalness={0.95}
          distort={0.3}
          speed={2}
          transparent
          opacity={0.7}
        />
      </mesh>
    </Float>
  );
}

function SmallOrbit({
  radius,
  speed,
  size,
  color,
  offset,
}: {
  radius: number;
  speed: number;
  size: number;
  color: string;
  offset: number;
}) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime * speed + offset;
    meshRef.current.position.x = Math.cos(t) * radius;
    meshRef.current.position.y = Math.sin(t * 0.7) * radius * 0.3;
    meshRef.current.position.z = Math.sin(t) * radius;
  });

  return (
    <mesh ref={meshRef} scale={size}>
      <sphereGeometry args={[1, 12, 12]} />
      <meshStandardMaterial
        color={color}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

function SceneContent() {
  const groupRef = useRef<Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.1,
      0.02
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointer.y * 0.08,
      0.02
    );
  });

  return (
    <group ref={groupRef}>
      <CentralOrb />
      <SmallOrbit radius={2.5} speed={0.6} size={0.15} color="#00e6a0" offset={0} />
      <SmallOrbit radius={3} speed={0.4} size={0.1} color="#1ab2ff" offset={2} />
      <SmallOrbit radius={2} speed={0.8} size={0.12} color="#ffffff" offset={4} />
      <SmallOrbit radius={3.5} speed={0.3} size={0.08} color="#00c987" offset={1} />

      <mesh rotation={[Math.PI / 2.5, 0, 0]}>
        <torusGeometry args={[2.8, 0.006, 8, 100]} />
        <meshBasicMaterial color="#1ab2ff" transparent opacity={0.12} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[3.2, 0.005, 8, 100]} />
        <meshBasicMaterial color="#00e6a0" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

export default function AboutScene() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[3, 3, 5]} intensity={0.5} color="#e6f0ff" />
        <pointLight position={[-3, 2, 3]} intensity={0.3} color="#1ab2ff" />
        <pointLight position={[3, -1, 2]} intensity={0.2} color="#00e6a0" />
        <SceneContent />
        <fog attach="fog" args={['#04060b', 4, 14]} />
      </Canvas>
    </div>
  );
}
