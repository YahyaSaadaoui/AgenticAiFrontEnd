"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Navbar } from "@/components/navbar"
import { Bell, Shield, Palette, Database, Trash2, Download, Moon, Sun, Volume2, VolumeX } from "lucide-react"

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: true,
    soundEffects: true,
    dataCollection: false,
    emailUpdates: true,
    securityAlerts: true,
  })

  const updateSetting = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-8">Settings</h1>

          <div className="grid gap-6">
            {/* Appearance */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Appearance
                </CardTitle>
                <CardDescription className="text-gray-400">Customize how AgentHub looks and feels</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {settings.darkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                    <div>
                      <p className="font-medium">Dark Mode</p>
                      <p className="text-sm text-gray-400">Use dark theme across the application</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={(checked) => updateSetting("darkMode", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {settings.soundEffects ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                    <div>
                      <p className="font-medium">Sound Effects</p>
                      <p className="text-sm text-gray-400">Play sounds for notifications and interactions</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.soundEffects}
                    onCheckedChange={(checked) => updateSetting("soundEffects", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Notifications */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Notifications
                </CardTitle>
                <CardDescription className="text-gray-400">Manage how you receive updates and alerts</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-gray-400">Receive notifications in your browser</p>
                  </div>
                  <Switch
                    checked={settings.notifications}
                    onCheckedChange={(checked) => updateSetting("notifications", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Updates</p>
                    <p className="text-sm text-gray-400">Get updates about new features and improvements</p>
                  </div>
                  <Switch
                    checked={settings.emailUpdates}
                    onCheckedChange={(checked) => updateSetting("emailUpdates", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Security Alerts</p>
                    <p className="text-sm text-gray-400">Important security and account notifications</p>
                  </div>
                  <Switch
                    checked={settings.securityAlerts}
                    onCheckedChange={(checked) => updateSetting("securityAlerts", checked)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Privacy & Security
                </CardTitle>
                <CardDescription className="text-gray-400">Control your data and security preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Data Collection</p>
                    <p className="text-sm text-gray-400">Allow anonymous usage data collection for improvements</p>
                  </div>
                  <Switch
                    checked={settings.dataCollection}
                    onCheckedChange={(checked) => updateSetting("dataCollection", checked)}
                  />
                </div>
                <div className="pt-4 space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download My Data
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card className="bg-gray-900/50 backdrop-blur-sm border-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5" />
                  Data Management
                </CardTitle>
                <CardDescription className="text-gray-400">Manage your chat history and stored data</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400 mb-1">127</div>
                    <div className="text-sm text-gray-400">Total Chats</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400 mb-1">2.4k</div>
                    <div className="text-sm text-gray-400">Messages</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-400 mb-1">12MB</div>
                    <div className="text-sm text-gray-400">Storage Used</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-700 text-gray-300 hover:bg-gray-800 bg-transparent"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Chat History
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-red-700 text-red-400 hover:bg-red-900/20 bg-transparent"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete All Chat History
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="bg-red-900/20 backdrop-blur-sm border-red-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-400">
                  <Trash2 className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
                <CardDescription className="text-red-300">
                  Irreversible actions that will permanently affect your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="border-red-700 text-red-400 hover:bg-red-900/30 bg-transparent">
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
