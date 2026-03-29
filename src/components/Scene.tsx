'use client' // Обязательно для Next.js App Router

import { Canvas } from '@react-three/fiber'
import { OrbitControls, ContactShadows, Environment } from '@react-three/drei'
import { Suspense } from 'react'

export default function Scene({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute inset-0 z-0"> {/* Уводим 3D на задний план */}
      <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} shadow-mapSize={2048} castShadow />
        
        <Suspense fallback={null}>
          {children}
          {/* Предустановленное окружение для красивых бликов */}
          <Environment preset="city" /> 
        </Suspense>

        <ContactShadows position={[0, -1.4, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
        <OrbitControls 
            makeDefault 
            minPolarAngle={0} 
            maxPolarAngle={Math.PI / 1.75} 

            autoRotate          // Включает автоматическое вращение
            autoRotateSpeed={4} // Скорость вращения (по умолчанию 2)
            enableDamping={true} // Делает вращение плавным ("инерция")
        />
      </Canvas>
    </div>
  )
}
