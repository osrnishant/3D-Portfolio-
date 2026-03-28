import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import FloatingGeometry from './FloatingGeometry';

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} color="#e0f0ff" />
        <pointLight position={[-3, 2, 4]} intensity={0.5} color="#3b8ff4" />
        <pointLight position={[3, -2, 3]} intensity={0.3} color="#10b981" />
        <FloatingGeometry />
        <Environment preset="night" />
        <fog attach="fog" args={['#0a0a0f', 5, 20]} />
      </Canvas>
    </div>
  );
}
