"use client"

import { X, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export const ChatModal = ({ showChat, setShowChat, currentSupplier }) => {
  const [newMessage, setNewMessage] = useState("")

  if (!showChat) return null

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle message sending logic here
      setNewMessage("")
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowChat(false)} />
      <div className="absolute right-0 top-0 h-full w-full max-w-sm bg-gray-900 text-white border-l border-gray-700 animate-slide-in-right">
        <div className="flex flex-col h-full">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gradient-to-r from-red-600/20 to-yellow-500/20">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">{currentSupplier?.image}</div>
              <div>
                <h2 className="text-lg font-semibold">{currentSupplier?.name}</h2>
                <p className="text-xs text-gray-400">Usually responds within 2 hours</p>
              </div>
            </div>
            <button
              onClick={() => setShowChat(false)}
              className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {/* Example Messages */}
            <div className="space-y-4">
              <div className="flex justify-end">
                <div className="bg-gradient-to-r from-red-600 to-yellow-500 rounded-xl p-3 text-sm text-white max-w-xs">
                  Hello! Do you have this product in other colors?
                </div>
              </div>
              <div className="text-xs text-gray-400 text-right">10:30 AM</div>

              <div className="flex justify-start">
                <div className="bg-gray-800 rounded-xl p-3 text-sm text-white max-w-xs">
                  Yes, we have it in red, blue, and green. Would you like to see photos?
                </div>
              </div>
              <div className="text-xs text-gray-400 text-left">10:32 AM</div>
            </div>
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-700 p-4">
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="bg-gray-800 border-gray-700 text-white flex-1"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-gradient-to-r from-red-600 to-yellow-500 hover:from-red-700 hover:to-yellow-600 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
