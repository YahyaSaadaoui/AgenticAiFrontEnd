"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Navbar } from "@/components/navbar"
import { User, Mail, Calendar, Camera, Save } from "lucide-react"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john@example.com",
    joinedDate: "January 2024",
    avatar: "/placeholder.svg?height=100&width=100",
  })

  const handleSave = () => {
    setIsEditing(false)
    // Save profile changes
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>

          <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription className="text-gray-400">Manage your account details and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xl">
                      {profile.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 p-0"
                  >
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{profile.name}</h3>
                  <p className="text-gray-400">Member since {profile.joinedDate}</p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <User className="inline h-4 w-4 mr-2" />
                    Full Name
                  </label>
                  <Input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    disabled={!isEditing}
                    className="bg-gray-800/50 border-gray-700 text-white disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Mail className="inline h-4 w-4 mr-2" />
                    Email Address
                  </label>
                  <Input
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    disabled={!isEditing}
                    className="bg-gray-800/50 border-gray-700 text-white disabled:opacity-60"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Calendar className="inline h-4 w-4 mr-2" />
                    Member Since
                  </label>
                  <Input
                    value={profile.joinedDate}
                    disabled
                    className="bg-gray-800/50 border-gray-700 text-white opacity-60"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                {isEditing ? (
                  <>
                    <Button
                      onClick={handleSave}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    Edit Profile
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Usage Stats */}
          <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800 mt-6">
            <CardHeader>
              <CardTitle>Usage Statistics</CardTitle>
              <CardDescription className="text-gray-400">Your activity across all agents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400 mb-1">127</div>
                  <div className="text-sm text-gray-400">Total Conversations</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400 mb-1">2.4k</div>
                  <div className="text-sm text-gray-400">Messages Sent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400 mb-1">45h</div>
                  <div className="text-sm text-gray-400">Time Saved</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
