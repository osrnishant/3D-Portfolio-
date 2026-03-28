import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import FloatingGeometry from './FloatingGeometry';

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} color="#e6f0ff" />
        <pointLight position={[-4, 3, 5]} intensity={0.4} color="#1ab2ff" />
        <pointLight position={[4, -2, 4]} intensity={0.3} color="#00e6a0" />
        <pointLight position={[0, 0, 3]} intensity={0.15} color="#ffffff" />
        <FloatingGeometry />
        <Environment preset="night" />
        <fog attach="fog" args={['#04060b', 6, 22]} />
      </Canvas>
    </div>
  );
}
