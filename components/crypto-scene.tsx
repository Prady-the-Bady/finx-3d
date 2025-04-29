"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment, OrbitControls, Text, Html } from "@react-three/drei"
import type { Group } from "three"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeftRight } from "lucide-react"

function CryptoModel({ position, rotation, scale, type, onClick, isSelected }) {
  const group = useRef<Group>()

  // Rotate the model
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.01
    }
  })

  // Different models for different crypto types
  const getModel = () => {
    switch (type) {
      case "btc":
        return (
          <mesh position={[0, 0, 0]} scale={[1, 1, 1]} onClick={onClick}>
            <cylinderGeometry args={[1, 1, 0.2, 32]} />
            <meshStandardMaterial color={isSelected ? "#ffa500" : "#f7931a"} metalness={0.8} roughness={0.2} />
            <Text position={[0, 0, 0.11]} fontSize={0.5} color="#ffffff" anchorX="center" anchorY="middle">
              ₿
            </Text>
          </mesh>
        )
      case "eth":
        return (
          <mesh position={[0, 0, 0]} scale={[1, 1, 1]} onClick={onClick}>
            <cylinderGeometry args={[1, 1, 0.2, 6]} />
            <meshStandardMaterial color={isSelected ? "#7c9aff" : "#627eea"} metalness={0.8} roughness={0.2} />
            <Text position={[0, 0, 0.11]} fontSize={0.5} color="#ffffff" anchorX="center" anchorY="middle">
              Ξ
            </Text>
          </mesh>
        )
      case "matic":
        return (
          <mesh position={[0, 0, 0]} scale={[1, 1, 1]} onClick={onClick}>
            <cylinderGeometry args={[1, 1, 0.2, 5]} />
            <meshStandardMaterial color={isSelected ? "#b57aff" : "#8247e5"} metalness={0.8} roughness={0.2} />
            <Text position={[0, 0, 0.11]} fontSize={0.4} color="#ffffff" anchorX="center" anchorY="middle">
              MATIC
            </Text>
          </mesh>
        )
      case "usdc":
        return (
          <mesh position={[0, 0, 0]} scale={[1, 1, 1]} onClick={onClick}>
            <cylinderGeometry args={[1, 1, 0.2, 32]} />
            <meshStandardMaterial color={isSelected ? "#4d9fff" : "#2775ca"} metalness={0.8} roughness={0.2} />
            <Text position={[0, 0, 0.11]} fontSize={0.4} color="#ffffff" anchorX="center" anchorY="middle">
              USDC
            </Text>
          </mesh>
        )
      case "usd":
        return (
          <mesh position={[0, 0, 0]} scale={[1, 1, 1]} onClick={onClick}>
            <cylinderGeometry args={[1, 1, 0.2, 32]} />
            <meshStandardMaterial color={isSelected ? "#5cb85c" : "#4caf50"} metalness={0.8} roughness={0.2} />
            <Text position={[0, 0, 0.11]} fontSize={0.5} color="#ffffff" anchorX="center" anchorY="middle">
              $
            </Text>
          </mesh>
        )
      case "eur":
        return (
          <mesh position={[0, 0, 0]} scale={[1, 1, 1]} onClick={onClick}>
            <cylinderGeometry args={[1, 1, 0.2, 32]} />
            <meshStandardMaterial color={isSelected ? "#5c85b8" : "#4c6faf"} metalness={0.8} roughness={0.2} />
            <Text position={[0, 0, 0.11]} fontSize={0.5} color="#ffffff" anchorX="center" anchorY="middle">
              €
            </Text>
          </mesh>
        )
      default:
        return null
    }
  }

  return (
    <group ref={group} position={position} rotation={rotation} scale={scale}>
      {getModel()}
    </group>
  )
}

function Scene() {
  const [sourceCurrency, setSourceCurrency] = useState("btc")
  const [targetCurrency, setTargetCurrency] = useState("usdc")
  const [amount, setAmount] = useState("1.0")
  const [exchangeRate, setExchangeRate] = useState({
    btc: { usd: 65000, eur: 60000, usdc: 65000, eth: 22, matic: 30000 },
    eth: { usd: 3000, eur: 2800, usdc: 3000, btc: 0.045, matic: 1400 },
    matic: { usd: 2.1, eur: 1.9, usdc: 2.1, btc: 0.000033, eth: 0.0007 },
    usdc: { usd: 1, eur: 0.92, btc: 0.000015, eth: 0.00033, matic: 0.48 },
    usd: { eur: 0.92, usdc: 1, btc: 0.000015, eth: 0.00033, matic: 0.48 },
    eur: { usd: 1.09, usdc: 1.09, btc: 0.000017, eth: 0.00036, matic: 0.52 },
  })

  const calculateExchange = () => {
    if (sourceCurrency === targetCurrency) return amount

    const rate = exchangeRate[sourceCurrency][targetCurrency] || 1 / exchangeRate[targetCurrency][sourceCurrency]

    return (Number.parseFloat(amount) * rate).toFixed(targetCurrency === "btc" || targetCurrency === "eth" ? 6 : 2)
  }

  const swapCurrencies = () => {
    const temp = sourceCurrency
    setSourceCurrency(targetCurrency)
    setTargetCurrency(temp)
  }

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Environment preset="city" />

      <CryptoModel
        position={[-3, 0, 0]}
        rotation={[0, 0, 0]}
        scale={[1, 1, 1]}
        type={sourceCurrency}
        isSelected={true}
        onClick={() => {}}
      />

      <CryptoModel
        position={[3, 0, 0]}
        rotation={[0, 0, 0]}
        scale={[1, 1, 1]}
        type={targetCurrency}
        isSelected={true}
        onClick={() => {}}
      />

      {/* Arrow between currencies */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[3, 0.2, 0.1]} />
        <meshStandardMaterial color="#4c6faf" />
      </mesh>

      {/* UI Controls */}
      <Html position={[0, -2.5, 0]} center>
        <div className="bg-slate-800/90 p-4 rounded-lg border border-slate-700 w-[500px] backdrop-blur-sm">
          <h3 className="text-white text-lg font-bold mb-4">Currency Exchange</h3>

          <div className="grid grid-cols-5 gap-2 items-center">
            <div className="col-span-2">
              <Select value={sourceCurrency} onValueChange={setSourceCurrency}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white focus:ring-indigo-500">
                  <SelectValue placeholder="From" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                  <SelectItem value="matic">Polygon (MATIC)</SelectItem>
                  <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                  <SelectItem value="usd">US Dollar (USD)</SelectItem>
                  <SelectItem value="eur">Euro (EUR)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-slate-700/50 hover:bg-slate-700 text-slate-300"
                onClick={swapCurrencies}
              >
                <ArrowLeftRight className="h-5 w-5" />
              </Button>
            </div>

            <div className="col-span-2">
              <Select value={targetCurrency} onValueChange={setTargetCurrency}>
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white focus:ring-indigo-500">
                  <SelectValue placeholder="To" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700 text-white">
                  <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                  <SelectItem value="matic">Polygon (MATIC)</SelectItem>
                  <SelectItem value="usdc">USD Coin (USDC)</SelectItem>
                  <SelectItem value="usd">US Dollar (USD)</SelectItem>
                  <SelectItem value="eur">Euro (EUR)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white"
                placeholder="Amount"
              />
            </div>

            <div className="flex justify-center">
              <span className="text-white">=</span>
            </div>

            <div className="col-span-2">
              <div className="w-full bg-slate-700/50 border border-slate-600 rounded-md px-3 py-2 text-white">
                {calculateExchange()}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0">
              Execute Exchange
            </Button>
          </div>
        </div>
      </Html>

      <OrbitControls enableZoom={false} enablePan={false} />
    </>
  )
}

export function CryptoScene() {
  return (
    <Canvas>
      <Scene />
    </Canvas>
  )
}
