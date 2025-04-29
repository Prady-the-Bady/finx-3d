"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Environment, OrbitControls, Text, Float, Html } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

interface ThreeDSceneProps {
  isDarkMode?: boolean
}

function CryptoCoin({ position, rotation, scale, color, symbol, onClick, isSelected, exchangeRate }) {
  const coinRef = useRef()
  const [hovered, setHovered] = useState(false)
  const { toast } = useToast()

  useFrame((state) => {
    if (coinRef.current) {
      coinRef.current.rotation.y += 0.01

      if (hovered && !isSelected) {
        coinRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05
      } else if (isSelected) {
        coinRef.current.position.y = position[1] + 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.1
      } else {
        coinRef.current.position.y = position[1]
      }
    }
  })

  const handleCoinClick = () => {
    onClick(symbol)

    if (!isSelected) {
      toast({
        title: `${symbol} Selected`,
        description: `Current exchange rate: 1 ${symbol} = $${exchangeRate}`,
      })
    }
  }

  return (
    <group
      position={position}
      scale={isSelected ? scale * 1.2 : hovered ? scale * 1.1 : scale}
      onClick={handleCoinClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <mesh ref={coinRef} castShadow receiveShadow>
        <cylinderGeometry args={[1, 1, 0.2, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={isSelected ? 0.5 : hovered ? 0.2 : 0}
        />
      </mesh>
      <Text position={[0, 0, 0.11]} rotation={[0, 0, 0]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">
        {symbol}
      </Text>
    </group>
  )
}

function CurrencyExchange({ selectedCoin, exchangeRate, isDarkMode }) {
  const { camera } = useThree()
  const { toast } = useToast()

  useEffect(() => {
    if (selectedCoin) {
      // Move camera to focus on selected coin
      camera.position.set(0, 3, 8)
    }
  }, [selectedCoin, camera])

  const handleExchange = () => {
    toast({
      title: "Exchange Initiated",
      description: `Converting 1 ${selectedCoin} at rate of $${exchangeRate}`,
      variant: "success",
    })
  }

  if (!selectedCoin) return null

  return (
    <group position={[0, 3, 0]}>
      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
        <Text
          position={[0, 1, 0]}
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={5}
          textAlign="center"
        >
          {`1 ${selectedCoin} = $${exchangeRate}`}
        </Text>
      </Float>

      <Html position={[0, 0, 0]} center transform>
        <div
          className={`p-3 rounded-lg ${isDarkMode ? "bg-slate-800/90 border border-slate-700" : "bg-white/90 border border-slate-300"} backdrop-blur-sm w-[200px] text-center`}
        >
          <p className={`text-sm font-medium mb-2 ${isDarkMode ? "text-white" : "text-slate-900"}`}>
            Exchange {selectedCoin}
          </p>
          <Button
            size="sm"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0"
            onClick={handleExchange}
          >
            Trade Now
          </Button>
        </div>
      </Html>
    </group>
  )
}

function Scene({ isDarkMode }) {
  const [selectedCoin, setSelectedCoin] = useState(null)
  const { toast } = useToast()

  const coins = [
    { symbol: "BTC", position: [-3, 0, 0], color: "#F7931A", exchangeRate: "65,000" },
    { symbol: "ETH", position: [-1, 0, 0], color: "#627EEA", exchangeRate: "3,500" },
    { symbol: "MATIC", position: [1, 0, 0], color: "#8247E5", exchangeRate: "0.75" },
    { symbol: "USDC", position: [3, 0, 0], color: "#2775CA", exchangeRate: "1.00" },
  ]

  const handleCoinClick = (symbol) => {
    setSelectedCoin(selectedCoin === symbol ? null : symbol)
  }

  const getExchangeRate = () => {
    const coin = coins.find((c) => c.symbol === selectedCoin)
    return coin ? coin.exchangeRate : "0"
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color={isDarkMode ? "#1e293b" : "#f1f5f9"} />
      </mesh>

      {coins.map((coin) => (
        <CryptoCoin
          key={coin.symbol}
          symbol={coin.symbol}
          position={coin.position}
          rotation={[0, 0, 0]}
          scale={1}
          color={coin.color}
          onClick={handleCoinClick}
          isSelected={selectedCoin === coin.symbol}
          exchangeRate={coin.exchangeRate}
        />
      ))}

      <CurrencyExchange selectedCoin={selectedCoin} exchangeRate={getExchangeRate()} isDarkMode={isDarkMode} />

      <OrbitControls enableZoom={true} enablePan={true} />
      <Environment preset="city" />
    </>
  )
}

export function ThreeDScene({ isDarkMode = true }: ThreeDSceneProps) {
  return (
    <Canvas shadows camera={{ position: [0, 2, 10], fov: 45 }}>
      <Scene isDarkMode={isDarkMode} />
    </Canvas>
  )
}
