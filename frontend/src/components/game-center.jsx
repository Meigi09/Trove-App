"use client"

import { useState } from "react"
import { X, Gamepad2, Target, Sparkles, Trophy, Coins, ChevronLeft, RotateCcw, Play, Zap, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

export const GameCenter = ({ showGameCenter, setShowGameCenter, gameProfile, addXP, addCoins, products }) => {
  const [activeMinigame, setActiveMinigame] = useState(null)
  const [memoryGame, setMemoryGame] = useState({
    cards: [],
    flipped: [],
    matched: [],
    moves: 0,
    score: 0,
    gameActive: false,
  })
  const [spinWheel, setSpinWheel] = useState({
    spinning: false,
    result: null,
    angle: 0,
  })
  const [quickTap, setQuickTap] = useState({
    active: false,
    score: 0,
    timeLeft: 30,
    targets: [],
  })

  const minigames = [
    {
      id: "memory",
      name: "Product Memory",
      description: "Match product pairs to win coins!",
      icon: "🧠",
      reward: "50-200 coins",
      difficulty: "Easy",
    },
    {
      id: "spin",
      name: "Lucky Spin",
      description: "Spin the wheel for amazing rewards!",
      icon: "🎰",
      reward: "10-500 coins",
      difficulty: "Luck",
    },
    {
      id: "quicktap",
      name: "Coin Rush",
      description: "Tap coins as fast as you can!",
      icon: "⚡",
      reward: "100-300 coins",
      difficulty: "Hard",
    },
    {
      id: "quiz",
      name: "Product Quiz",
      description: "Test your product knowledge!",
      icon: "🧩",
      reward: "75-250 coins",
      difficulty: "Medium",
    },
  ]

  const wheelPrizes = [
    { label: "10 Coins", value: 10, color: "from-gray-500 to-gray-600" },
    { label: "50 Coins", value: 50, color: "from-blue-500 to-blue-600" },
    { label: "100 Coins", value: 100, color: "from-green-500 to-green-600" },
    { label: "25 XP", value: 25, color: "from-purple-500 to-purple-600", type: "xp" },
    { label: "200 Coins", value: 200, color: "from-yellow-500 to-yellow-600" },
    { label: "500 Coins", value: 500, color: "from-red-500 to-red-600" },
    { label: "50 XP", value: 50, color: "from-pink-500 to-pink-600", type: "xp" },
    { label: "75 Coins", value: 75, color: "from-teal-500 to-teal-600" },
  ]

  const initMemoryGame = () => {
    const gameProducts = [...products, ...products].map((product, index) => ({
      id: index,
      productId: product._id,
      image: product.image,
      name: product.name,
      flipped: false,
      matched: false,
    }))

    // Shuffle cards
    for (let i = gameProducts.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[gameProducts[i], gameProducts[j]] = [gameProducts[j], gameProducts[i]]
    }

    setMemoryGame({
      cards: gameProducts,
      flipped: [],
      matched: [],
      moves: 0,
      score: 0,
      gameActive: true,
    })
  }

  const flipCard = (cardId) => {
    if (memoryGame.flipped.length >= 2 || memoryGame.flipped.includes(cardId) || memoryGame.matched.includes(cardId))
      return

    const newFlipped = [...memoryGame.flipped, cardId]
    setMemoryGame((prev) => ({ ...prev, flipped: newFlipped }))

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped
      const firstCard = memoryGame.cards.find((c) => c.id === first)
      const secondCard = memoryGame.cards.find((c) => c.id === second)

      setTimeout(() => {
        if (firstCard.productId === secondCard.productId) {
          setMemoryGame((prev) => ({
            ...prev,
            matched: [...prev.matched, first, second],
            flipped: [],
            moves: prev.moves + 1,
            score: prev.score + 50,
          }))

          if (memoryGame.matched.length + 2 === memoryGame.cards.length) {
            const bonus = Math.max(100 - memoryGame.moves * 5, 50)
            addCoins(memoryGame.score + bonus, "completing memory game")
            addXP(75, "completing memory game")
          }
        } else {
          setMemoryGame((prev) => ({
            ...prev,
            flipped: [],
            moves: prev.moves + 1,
          }))
        }
      }, 1000)
    }
  }

  const spinTheWheel = () => {
    if (spinWheel.spinning) return

    setSpinWheel((prev) => ({ ...prev, spinning: true }))

    const randomAngle = Math.random() * 360 + 1440
    const finalAngle = randomAngle % 360
    const prizeIndex = Math.floor((360 - finalAngle) / 45) % wheelPrizes.length
    const prize = wheelPrizes[prizeIndex]

    setTimeout(() => {
      setSpinWheel({
        spinning: false,
        result: prize,
        angle: randomAngle,
      })

      if (prize.type === "xp") {
        addXP(prize.value, "spinning the wheel")
      } else {
        addCoins(prize.value, "spinning the wheel")
      }
    }, 3000)
  }

  const startQuickTap = () => {
    setQuickTap({
      active: true,
      score: 0,
      timeLeft: 30,
      targets: [],
    })

    const interval = setInterval(() => {
      setQuickTap((prev) => {
        if (prev.timeLeft <= 0) {
          clearInterval(interval)
          addCoins(prev.score * 2, "quick tap game")
          addXP(prev.score, "quick tap game")
          return { ...prev, active: false }
        }

        const newTargets = [...prev.targets]
        if (Math.random() < 0.7 && newTargets.length < 5) {
          newTargets.push({
            id: Date.now(),
            x: Math.random() * 80 + 10,
            y: Math.random() * 60 + 20,
            type: Math.random() < 0.8 ? "coin" : "gem",
          })
        }

        return {
          ...prev,
          timeLeft: prev.timeLeft - 1,
          targets: newTargets.filter((t) => Date.now() - t.id < 3000),
        }
      })
    }, 1000)
  }

  const tapTarget = (targetId, type) => {
    setQuickTap((prev) => ({
      ...prev,
      score: prev.score + (type === "gem" ? 10 : 5),
      targets: prev.targets.filter((t) => t.id !== targetId),
    }))
  }

  if (!showGameCenter) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowGameCenter(false)} />
      <div className="absolute inset-0 bg-gray-900 text-white animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gradient-to-r from-red-600/20 to-yellow-500/20">
            <div className="flex items-center space-x-3">
              <Gamepad2 className="w-6 h-6 text-yellow-500" />
              <h2 className="text-xl font-bold">Game Center</h2>
            </div>
            <button
              onClick={() => setShowGameCenter(false)}
              className="w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Game Content */}
          <div className="flex-1 overflow-y-auto">
            {!activeMinigame ? (
              <div className="p-4">
                {/* Stats Overview */}
                <div className="bg-gradient-to-r from-red-600/20 to-yellow-500/20 rounded-xl p-4 mb-6 border border-yellow-500/30">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-yellow-500">{gameProfile.level}</div>
                      <div className="text-xs text-gray-400">Level</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-500">{gameProfile.coins}</div>
                      <div className="text-xs text-gray-400">Coins</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-500">{gameProfile.streak}</div>
                      <div className="text-xs text-gray-400">Day Streak</div>
                    </div>
                  </div>
                </div>

                {/* Daily Quests */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Target className="w-5 h-5 mr-2 text-yellow-500" />
                    Daily Quests
                  </h3>
                  <div className="space-y-3">
                    {gameProfile.dailyQuests.map((quest) => (
                      <div key={quest.id} className="bg-gray-800 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{quest.title}</span>
                          <div className="flex items-center space-x-2">
                            <Coins className="w-4 h-4 text-yellow-500" />
                            <span className="text-sm font-bold text-yellow-500">+{quest.reward}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={(quest.progress / quest.target) * 100} className="flex-1" />
                          <span className="text-xs text-gray-400">
                            {quest.progress}/{quest.target}
                          </span>
                          {quest.completed && <Trophy className="w-4 h-4 text-yellow-500" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Minigames */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 flex items-center">
                    <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
                    Mini Games
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {minigames.map((game) => (
                      <button
                        key={game.id}
                        onClick={() => {
                          setActiveMinigame(game.id)
                          if (game.id === "memory") initMemoryGame()
                        }}
                        className="bg-gray-800 rounded-xl p-4 hover:bg-gray-700 transition-colors text-left"
                      >
                        <div className="text-3xl mb-2">{game.icon}</div>
                        <h4 className="font-semibold mb-1">{game.name}</h4>
                        <p className="text-xs text-gray-400 mb-2">{game.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge className="bg-yellow-500/20 text-yellow-500 text-xs">{game.reward}</Badge>
                          <Badge className="bg-gray-700 text-gray-300 text-xs">{game.difficulty}</Badge>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4">
                {/* Memory Game */}
                {activeMinigame === "memory" && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setActiveMinigame(null)}
                          className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <h3 className="text-lg font-semibold">Product Memory</h3>
                      </div>
                      <div className="flex items-center space-x-4 text-sm">
                        <span>Moves: {memoryGame.moves}</span>
                        <span>Score: {memoryGame.score}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 mb-4">
                      {memoryGame.cards.map((card) => (
                        <button
                          key={card.id}
                          onClick={() => flipCard(card.id)}
                          className={`aspect-square rounded-xl flex items-center justify-center text-4xl transition-all duration-300 ${
                            memoryGame.flipped.includes(card.id) || memoryGame.matched.includes(card.id)
                              ? "bg-yellow-500/20 border-2 border-yellow-500"
                              : "bg-gray-800 hover:bg-gray-700"
                          }`}
                        >
                          {(memoryGame.flipped.includes(card.id) || memoryGame.matched.includes(card.id)) && card.image}
                        </button>
                      ))}
                    </div>

                    <Button onClick={initMemoryGame} className="w-full bg-gradient-to-r from-red-600 to-yellow-500">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      New Game
                    </Button>
                  </div>
                )}

                {/* Spin Wheel */}
                {activeMinigame === "spin" && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setActiveMinigame(null)}
                          className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <h3 className="text-lg font-semibold">Lucky Spin</h3>
                      </div>
                    </div>

                    <div className="flex flex-col items-center space-y-6">
                      <div className="relative w-64 h-64">
                        <div
                          className={`w-full h-full rounded-full border-8 border-gray-700 relative overflow-hidden transition-transform duration-3000 ease-out ${
                            spinWheel.spinning ? "animate-spin" : ""
                          }`}
                          style={{
                            transform: `rotate(${spinWheel.angle}deg)`,
                          }}
                        >
                          {wheelPrizes.map((prize, index) => (
                            <div
                              key={index}
                              className={`absolute w-full h-full bg-gradient-to-r ${prize.color} opacity-80`}
                              style={{
                                clipPath: `polygon(50% 50%, ${50 + 40 * Math.cos(((index * 45 - 22.5) * Math.PI) / 180)}% ${50 + 40 * Math.sin(((index * 45 - 22.5) * Math.PI) / 180)}%, ${50 + 40 * Math.cos(((index * 45 + 22.5) * Math.PI) / 180)}% ${50 + 40 * Math.sin(((index * 45 + 22.5) * Math.PI) / 180)}%)`,
                              }}
                            >
                              <div
                                className="absolute text-xs font-bold text-white"
                                style={{
                                  top: "30%",
                                  left: "60%",
                                  transform: `rotate(${index * 45}deg)`,
                                }}
                              >
                                {prize.label}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-white z-10"></div>
                      </div>

                      {spinWheel.result && (
                        <div className="text-center bg-gray-800 rounded-xl p-4">
                          <h4 className="text-lg font-bold text-yellow-500 mb-2">You Won!</h4>
                          <p className="text-2xl font-bold">{spinWheel.result.label}</p>
                        </div>
                      )}

                      <Button
                        onClick={spinTheWheel}
                        disabled={spinWheel.spinning}
                        className="w-full bg-gradient-to-r from-red-600 to-yellow-500 disabled:opacity-50"
                      >
                        {spinWheel.spinning ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Spinning...
                          </>
                        ) : (
                          <>
                            <Play className="w-4 h-4 mr-2" />
                            Spin the Wheel
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}

                {/* Quick Tap Game */}
                {activeMinigame === "quicktap" && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setActiveMinigame(null)}
                          className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <h3 className="text-lg font-semibold">Coin Rush</h3>
                      </div>
                      {quickTap.active && (
                        <div className="flex items-center space-x-4 text-sm">
                          <span>Time: {quickTap.timeLeft}s</span>
                          <span>Score: {quickTap.score}</span>
                        </div>
                      )}
                    </div>

                    {quickTap.active ? (
                      <div className="relative w-full h-96 bg-gray-800 rounded-xl overflow-hidden">
                        {quickTap.targets.map((target) => (
                          <button
                            key={target.id}
                            onClick={() => tapTarget(target.id, target.type)}
                            className={`absolute w-12 h-12 rounded-full flex items-center justify-center text-2xl animate-pulse ${
                              target.type === "gem" ? "bg-purple-500" : "bg-yellow-500"
                            }`}
                            style={{
                              left: `${target.x}%`,
                              top: `${target.y}%`,
                            }}
                          >
                            {target.type === "gem" ? "💎" : "🪙"}
                          </button>
                        ))}
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-lg font-bold">
                          Tap the coins and gems!
                        </div>
                      </div>
                    ) : (
                      <div className="text-center space-y-4">
                        <div className="bg-gray-800 rounded-xl p-6">
                          <Zap className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                          <h4 className="text-lg font-bold mb-2">Ready to Rush?</h4>
                          <p className="text-gray-400 mb-4">Tap coins and gems as fast as you can in 30 seconds!</p>
                          <div className="text-sm text-gray-500">🪙 Coins = 5 points • 💎 Gems = 10 points</div>
                        </div>
                        <Button onClick={startQuickTap} className="w-full bg-gradient-to-r from-red-600 to-yellow-500">
                          <Zap className="w-4 h-4 mr-2" />
                          Start Game
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Quiz Game */}
                {activeMinigame === "quiz" && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => setActiveMinigame(null)}
                          className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center"
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </button>
                        <h3 className="text-lg font-semibold">Product Quiz</h3>
                      </div>
                    </div>

                    <div className="text-center space-y-4">
                      <div className="bg-gray-800 rounded-xl p-6">
                        <Brain className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                        <h4 className="text-lg font-bold mb-2">Coming Soon!</h4>
                        <p className="text-gray-400">
                          Test your knowledge about products and suppliers to earn coins and XP!
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
