import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Sphere, MeshDistortMaterial, Float, Stars } from '@react-three/drei'
import * as THREE from 'three'

// Animated floating sphere
const AnimatedSphere = ({ position, color, speed, distort }) => {
    const meshRef = useRef()
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * speed * 0.3
            meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5
        }
    })
    return (
        <Float speed={speed} rotationIntensity={0.5} floatIntensity={1.5}>
            <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
                <MeshDistortMaterial
                    color={color}
                    attach="material"
                    distort={distort}
                    speed={2}
                    roughness={0.1}
                    metalness={0.8}
                    transparent
                    opacity={0.85}
                />
            </Sphere>
        </Float>
    )
}

// Floating particles
const Particles = ({ count = 80, darkMode }) => {
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10
        }
        return pos
    }, [count])

    const pointsRef = useRef()
    useFrame((state) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03
        }
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.08}
                color={darkMode ? '#6366f1' : '#2a68ff'}
                transparent
                opacity={0.7}
                sizeAttenuation
            />
        </points>
    )
}

// Rotating torus ring
const TorusRing = ({ darkMode }) => {
    const torusRef = useRef()
    useFrame((state) => {
        if (torusRef.current) {
            torusRef.current.rotation.x = state.clock.elapsedTime * 0.3
            torusRef.current.rotation.z = state.clock.elapsedTime * 0.2
        }
    })
    return (
        <mesh ref={torusRef} position={[3, 0, -2]}>
            <torusGeometry args={[1.5, 0.08, 16, 100]} />
            <meshStandardMaterial
                color={darkMode ? '#a855f7' : '#6366f1'}
                metalness={0.9}
                roughness={0.1}
                transparent
                opacity={0.6}
            />
        </mesh>
    )
}

const ThreeScene = ({ darkMode }) => {
    return (
        <Canvas
            camera={{ position: [0, 0, 8], fov: 60 }}
            style={{ background: 'transparent' }}
            gl={{ antialias: true, alpha: true }}
        >
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} color="#ffffff" />
            <pointLight position={[-10, -10, -5]} intensity={0.8} color={darkMode ? '#6366f1' : '#2a68ff'} />
            <pointLight position={[10, -5, 5]} intensity={0.5} color={darkMode ? '#a855f7' : '#60a5fa'} />

            {darkMode && <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />}

            <Particles count={80} darkMode={darkMode} />
            <TorusRing darkMode={darkMode} />

            <AnimatedSphere
                position={[-3, 1, 0]}
                color={darkMode ? '#6366f1' : '#2a68ff'}
                speed={1.5}
                distort={0.4}
            />
            <AnimatedSphere
                position={[3, -1, -1]}
                color={darkMode ? '#a855f7' : '#60a5fa'}
                speed={1.2}
                distort={0.3}
            />
            <AnimatedSphere
                position={[0, 2, -3]}
                color={darkMode ? '#00d4ff' : '#818cf8'}
                speed={0.8}
                distort={0.5}
            />
        </Canvas>
    )
}

export default ThreeScene
