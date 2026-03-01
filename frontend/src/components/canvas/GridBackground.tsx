// @ts-nocheck
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

export const GridBackground = () => {
    const pointsRef = useRef();

    const sphere = useMemo(() => {
        try {
            const data = random.inSphere(new Float32Array(5000), { radius: 10 });
            // Validate data
            if (data.some(v => isNaN(v))) throw new Error("NaN detected");
            return data;
        } catch (e) {
            console.warn("GridBackground: Falling back to native random due to maath error", e);
            const fallback = new Float32Array(5000 * 3);
            for (let i = 0; i < fallback.length; i++) {
                fallback[i] = (Math.random() - 0.5) * 20;
            }
            return fallback;
        }
    }, []);

    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.x -= 0.001;
            pointsRef.current.rotation.y -= 0.001;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={pointsRef} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#0066CC"
                    size={0.015}
                    sizeAttenuation={true}
                    depthWrite={false}
                    opacity={0.15}
                />
            </Points>
        </group>
    );
};
