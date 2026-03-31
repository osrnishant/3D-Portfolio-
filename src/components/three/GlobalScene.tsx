import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import type { Points as PointsType, Group } from 'three';

function ParticleField() {
  const pointsRef = useRef<PointsType>(null);
  const count = 300;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.008;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#94a3b8"
        transparent
        opacity={0.35}
        size={0.04}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

function FloatingOrbs() {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <group ref={groupRef}>
      <mesh position={[-6, 2, -12]}>
        <sphereGeometry args={[1.5, 32, 32]} />
        <meshStandardMaterial color="#2a96ff" transparent opacity={0.06} roughness={0.8} />
      </mesh>
      <mesh position={[8, -4, -15]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#10b981" transparent opacity={0.05} roughness={0.8} />
      </mesh>
      <mesh position={[0, 8, -18]}>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshStandardMaterial color="#2a96ff" transparent opacity={0.04} roughness={0.8} />
      </mesh>
      <mesh position={[-10, -6, -10]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#10b981" transparent opacity={0.06} roughness={0.8} />
      </mesh>
    </group>
  );
}

function OrbitalRings() {
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = state.clock.elapsedTime * 0.03;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <>
      <mesh ref={ring1Ref} position={[0, 0, -14]} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[8, 0.008, 8, 128]} />
        <meshBasicMaterial color="#2a96ff" transparent opacity={0.08} />
      </mesh>
      <mesh ref={ring2Ref} position={[0, 0, -14]} rotation={[Math.PI / 4, Math.PI / 6, 0]}>
        <torusGeometry args={[10, 0.006, 8, 128]} />
        <meshBasicMaterial color="#10b981" transparent opacity={0.06} />
      </mesh>
    </>
  );
}

function CameraController() {
  const { camera } = useThree();
  const targetY = useRef(0);
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollFraction = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      targetY.current = -scrollFraction * 15;
    };

    const handleMouse = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY.current = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
    };
  }, []);

  useFrame(() => {
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY.current, 0.03);
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouseX.current * 0.3, 0.02);
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, -mouseY.current * 0.02, 0.02);
  });

  return null;
}

function SceneContent() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 5, 10]} intensity={0.3} color="#e8f0fe" />
      <pointLight position={[-5, 3, 5]} intensity={0.15} color="#2a96ff" />
      <pointLight position={[5, -2, 5]} intensity={0.1} color="#10b981" />
      <CameraController />
      <ParticleField />
      <FloatingOrbs />
      <OrbitalRings />
      <fog attach="fog" args={['#fafbfc', 15, 40]} />
    </>
  );
}

export default function GlobalScene() {
  const [webglSupported, setWebglSupported] = useState(true);

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setWebglSupported(false);
    } catch {
      setWebglSupported(false);
    }
  }, []);

  if (!webglSupported) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <SceneContent />
      </Canvas>
    </div>
  );
}
