import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Float, Environment, ContactShadows, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

const DataStreams = () => {
    const groupRef = useRef<THREE.Group>(null);

    const nodes = useMemo(() => {
        return Array.from({ length: 12 }).map(() => ({
            position: [
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 2
            ] as [number, number, number],
            offset: Math.random() * Math.PI * 2
        }));
    }, []);

    useFrame((state) => {
        if (groupRef.current) {
            const time = state.clock.elapsedTime;
            groupRef.current.children.forEach((child, i) => {
                const node = nodes[i];
                child.position.y = node.position[1] + Math.sin(time + node.offset) * 0.1;
            });
        }
    });

    return (
        <group ref={groupRef}>
            {nodes.map((node, i) => (
                <mesh key={i} position={node.position}>
                    <sphereGeometry args={[0.04, 8, 8]} />
                    <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={2} />
                </mesh>
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
            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
                {/* 1. THE MAIN HEAD (Reduced segments from 64 to 32) */}
                <mesh castShadow receiveShadow>
                    <sphereGeometry args={[1.2, 32, 24]} />
                    <meshStandardMaterial
                        color="#ffffff"
                        metalness={0.05}
                        roughness={0.2}
                    />
                </mesh>

                {/* 2. FACE PLATE */}
                <group ref={faceRef} position={[0, 0, 0.4]}>
                    <mesh>
                        <sphereGeometry args={[1.05, 24, 16, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
                        <meshStandardMaterial color="#050506" roughness={1} metalness={0} />
                    </mesh>

                    {/* 3. EYES */}
                    <group position={[0, 0.15, 1.02]} scale={0.9}>
                        <Sphere args={[0.15, 16, 16]} position={[-0.35, 0, 0]}>
                            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={3} />
                        </Sphere>
                        <Sphere args={[0.15, 16, 16]} position={[0.35, 0, 0]}>
                            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={3} />
                        </Sphere>

                        {/* 4. SMILE */}
                        <mesh position={[0, -0.3, 0]} rotation={[0, 0, Math.PI]}>
                            <torusGeometry args={[0.25, 0.02, 8, 24, Math.PI / 1.1]} />
                            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={3} />
                        </mesh>
                    </group>
                </group>

                {/* 5. ANTENNA EARS */}
                <group position={[1.1, 0.6, 0]} rotation={[0, 0, -Math.PI / 6]}>
                    <Cylinder args={[0.08, 0.08, 0.3, 16]}>
                        <meshStandardMaterial color="#f8f8f8" metalness={0.2} roughness={0.3} />
                    </Cylinder>
                    <Sphere args={[0.1, 16, 16]} position={[0, 0.2, 0]}>
                        <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.5} />
                    </Sphere>
                </group>
                <group position={[-1.1, 0.6, 0]} rotation={[0, 0, Math.PI / 6]}>
                    <Cylinder args={[0.08, 0.08, 0.3, 16]}>
                        <meshStandardMaterial color="#f8f8f8" metalness={0.2} roughness={0.3} />
                    </Cylinder>
                    <Sphere args={[0.1, 16, 16]} position={[0, 0.2, 0]}>
                        <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={1.5} />
                    </Sphere>
                </group>
            </Float>

            {/* 6. DATA NODES (Consolidated animation) */}
            <DataStreams />

            <Environment preset="studio" />
            <ContactShadows opacity={0.25} scale={6} blur={2.5} far={4} color="#000000" position={[0, -1.8, 0]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={0.8} castShadow />
        </group>
    );
};

