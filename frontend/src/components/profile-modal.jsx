"use client"

import { X, User, Settings, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"

export const ProfileModal = ({ showProfile, setShowProfile, gameProfile }) => {
  if (!showProfile) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowProfile(false)} />
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-gray-900 text-white border-l border-gray-700 animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gradient-to-r from-red-600/20 to-yellow-500/20">
            <h2 className="text-lg font-semibold">Your Profile</h2>
            <button
              onClick={() => setShowProfile(false)}
              className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              {/* Profile Info */}
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="flex items-center space-x-4 mb-2">
                  <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center text-2xl">👤</div>
                  <div>
                    <h3 className="text-xl font-semibold">ShopperPro</h3>
                    <p className="text-sm text-gray-400">Level {gameProfile.level}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300">
                  Welcome to your profile! Here you can manage your account and view your activity.
                </p>
              </div>

              {/* Game Stats */}
              <div className="bg-gray-800 rounded-xl p-4">
                <h4 className="text-lg font-semibold mb-3">Game Progress</h4>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-yellow-500">{gameProfile.level}</div>
                    <div className="text-xs text-gray-400">Level</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-500">{gameProfile.coins}</div>
                    <div className="text-xs text-gray-400">Coins</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-500">{gameProfile.xp}</div>
                    <div className="text-xs text-gray-400">XP</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-yellow-500">{gameProfile.streak}</div>
                    <div className="text-xs text-gray-400">Day Streak</div>
                  </div>
                </div>
              </div>

              {/* Account Settings */}
              <div className="bg-gray-800 rounded-xl p-4">
                <h4 className="text-lg font-semibold mb-2">Account Settings</h4>
                <div className="space-y-2">
                  <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-left text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                    <User className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                  <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-left text-sm text-gray-300 hover:text-white hover:bg-gray-700 transition-colors">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="border-t border-gray-700 p-4">
            <Button className="w-full bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
