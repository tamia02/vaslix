import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Float, Environment, ContactShadows, Cylinder, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const DataNode = ({ position }: { position: [number, number, number] }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y += Math.sin(state.clock.elapsedTime + position[0]) * 0.002;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={4} />
        </mesh>
    );
};

const DataStreams = () => {
    const nodes = useMemo(() => {
        return Array.from({ length: 12 }).map(() => ({
            position: [
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 2
            ] as [number, number, number]
        }));
    }, []);

    return (
        <group>
            {nodes.map((node, i) => (
                <DataNode key={i} position={node.position} />
            ))}
        </group>
    );
};

export const AICore = () => {
    const groupRef = useRef<THREE.Group>(null);
    const faceRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        if (groupRef.current) {
            groupRef.current.position.y = Math.sin(time * 0.4) * 0.12;
            groupRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
        }
        if (faceRef.current) {
            faceRef.current.rotation.x = Math.sin(time * 0.3) * 0.05;
            faceRef.current.rotation.y = Math.cos(time * 0.4) * 0.05;
        }
    });

    return (
        <group ref={groupRef}>
            <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.6}>
                {/* 1. THE MAIN HEAD (Clean White Ceramic) */}
                <mesh castShadow receiveShadow>
                    <sphereGeometry args={[1.2, 64, 64]} />
                    <meshStandardMaterial
                        color="#ffffff"
                        metalness={0.05}
                        roughness={0.2}
                    />
                </mesh>

                {/* 2. FACE PLATE */}
                <group ref={faceRef} position={[0, 0, 0.4]}>
                    <mesh>
                        <sphereGeometry args={[1.05, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
                        <meshStandardMaterial color="#050506" roughness={1} metalness={0} />
                    </mesh>

                    {/* 3. CUTE EYES */}
                    <group position={[0, 0.15, 1.02]} scale={0.9}>
                        <Sphere args={[0.15, 32, 32]} position={[-0.35, 0, 0]}>
                            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={5} />
                        </Sphere>
                        <Sphere args={[0.15, 32, 32]} position={[0.35, 0, 0]}>
                            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={5} />
                        </Sphere>

                        {/* 4. FULL SMILE */}
                        <mesh position={[0, -0.3, 0]} rotation={[0, 0, Math.PI]}>
                            <torusGeometry args={[0.25, 0.025, 16, 32, Math.PI / 1.1]} />
                            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={4} />
                        </mesh>
                    </group>
                </group>

                {/* 5. ANTENNA EARS */}
                <group position={[1.1, 0.6, 0]} rotation={[0, 0, -Math.PI / 6]}>
                    <Cylinder args={[0.08, 0.08, 0.3, 32]}>
                        <meshStandardMaterial color="#f8f8f8" metalness={0.2} roughness={0.3} />
                    </Cylinder>
                    <Sphere args={[0.1, 32, 32]} position={[0, 0.2, 0]}>
                        <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2} />
                    </Sphere>
                </group>
                <group position={[-1.1, 0.6, 0]} rotation={[0, 0, Math.PI / 6]}>
                    <Cylinder args={[0.08, 0.08, 0.3, 32]}>
                        <meshStandardMaterial color="#f8f8f8" metalness={0.2} roughness={0.3} />
                    </Cylinder>
                    <Sphere args={[0.1, 32, 32]} position={[0, 0.2, 0]}>
                        <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2} />
                    </Sphere>
                </group>
            </Float>

            {/* 6. DATA NODES (Floating intelligence) */}
            <DataStreams />

            <Environment preset="studio" />
            <ContactShadows opacity={0.3} scale={6} blur={2.5} far={4} color="#000000" position={[0, -1.8, 0]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        </group>
    );
};
