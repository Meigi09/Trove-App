"use client"

import { useState } from "react"

export const useGameProfile = () => {
  const [gameProfile, setGameProfile] = useState({
    level: 12,
    xp: 2450,
    xpToNext: 550,
    totalXp: 3000,
    coins: 1250,
    gems: 45,
    streak: 7,
    achievements: [],
    badges: ["Early Adopter", "Trendsetter", "Social Butterfly"],
    dailyQuests: [
      {
        id: 1,
        title: "Like 5 products",
        progress: 3,
        target: 5,
        reward: 50,
        completed: false,
      },
      {
        id: 2,
        title: "Add 2 items to cart",
        progress: 1,
        target: 2,
        reward: 75,
        completed: false,
      },
      {
        id: 3,
        title: "Share a product",
        progress: 0,
        target: 1,
        reward: 100,
        completed: false,
      },
    ],
    weeklyChallenge: {
      title: "Shopping Spree",
      description: "Purchase 3 items this week",
      progress: 1,
      target: 3,
      reward: 500,
      timeLeft: "4 days",
    },
  })

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "achievement",
      message: "🏆 Level Up! You reached level 12!",
      time: "2m ago",
      read: false,
    },
    {
      id: 2,
      type: "quest",
      message: "✨ Daily quest completed! +75 XP",
      time: "1h ago",
      read: false,
    },
    {
      id: 3,
      type: "reward",
      message: "🎁 Streak bonus: +50 coins!",
      time: "3h ago",
      read: true,
    },
  ])

  const addXP = (amount, action) => {
    setGameProfile((prev) => {
      const newXp = prev.xp + amount
      const levelUp = newXp >= prev.totalXp

      if (levelUp) {
        setNotifications((prevNotifs) => [
          {
            id: Date.now(),
            type: "achievement",
            message: `🎉 Level Up! You reached level ${prev.level + 1}!`,
            time: "now",
            read: false,
          },
          ...prevNotifs,
        ])
      }

      return {
        ...prev,
        xp: levelUp ? newXp - prev.totalXp : newXp,
        level: levelUp ? prev.level + 1 : prev.level,
        totalXp: levelUp ? prev.totalXp + 500 : prev.totalXp,
        xpToNext: levelUp ? prev.totalXp + 500 - (newXp - prev.totalXp) : prev.xpToNext - amount,
      }
    })

    setNotifications((prev) => [
      {
        id: Date.now(),
        type: "xp",
        message: `+${amount} XP for ${action}! ⭐`,
        time: "now",
        read: false,
      },
      ...prev,
    ])
  }

  const addCoins = (amount, reason) => {
    setGameProfile((prev) => ({ ...prev, coins: prev.coins + amount }))
    setNotifications((prev) => [
      {
        id: Date.now(),
        type: "coins",
        message: `+${amount} coins for ${reason}! 🪙`,
        time: "now",
        read: false,
      },
      ...prev,
    ])
  }

  const completeQuest = (questId) => {
    setGameProfile((prev) => ({
      ...prev,
      dailyQuests: prev.dailyQuests.map((quest) =>
        quest.id === questId ? { ...quest, completed: true, progress: quest.target } : quest,
      ),
    }))
  }

  return {
    gameProfile,
    setGameProfile,
    notifications,
    setNotifications,
    addXP,
    addCoins,
    completeQuest,
  }
}
