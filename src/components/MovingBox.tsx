'use client'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

// Создаем отдельный компонент для куба (или модели)
export const MovingBox = ({ color }: { color: string }) => {
  const meshRef = useRef<Mesh>(null!)

  useFrame((state, delta) => {
    // Вращаем по осям X и Y
    meshRef.current.rotation.x += delta * 0.5
    meshRef.current.rotation.y += delta * 0.2
  })

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial color={color} roughness={0.1} metalness={0.8} />
    </mesh>
  )
}
