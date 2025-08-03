"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Star } from "lucide-react"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out our AI agents",
    features: ["7 messages per day", "Access to all 3 agents", "Basic chat history", "Text messages only"],
    limitations: ["No file uploads", "No voice messages", "Limited history"],
    popular: false,
  },
  {
    name: "Weekly Pro",
    price: "$9.99",
    period: "per week",
    description: "Great for short-term projects",
    features: [
      "Unlimited messages",
      "Access to all 3 agents",
      "Full chat history",
      "File uploads (images, docs)",
      "Voice messages",
      "Priority support",
    ],
    limitations: [],
    popular: true,
  },
  {
    name: "Monthly Pro",
    price: "$29.99",
    period: "per month",
    description: "Best value for regular users",
    features: [
      "Unlimited messages",
      "Access to all 3 agents",
      "Full chat history",
      "File uploads (images, docs)",
      "Voice messages",
      "Priority support",
      "Advanced analytics",
      "Custom agent settings",
    ],
    limitations: [],
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8 pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Choose Your Plan</h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Unlock the full potential of our AI agents with flexible pricing options
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card
                className={`relative h-full ${
                  plan.popular ? "border-2 border-blue-500 bg-slate-800/70" : "border-slate-700 bg-slate-800/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-2xl text-white">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    <span className="text-slate-400 ml-2">/{plan.period}</span>
                  </div>
                  <CardDescription className="text-slate-400 mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {plan.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <Check className="h-4 w-4 text-green-400 flex-shrink-0" />
                        <span className="text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        : "bg-slate-700 hover:bg-slate-600"
                    }`}
                  >
                    {plan.name === "Free" ? "Current Plan" : "Upgrade Now"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-slate-400 mb-4">All plans include access to our three specialized AI agents</p>
          <div className="flex justify-center gap-8 text-sm text-slate-500">
            <span>✓ Agent Alpha - Data Analysis</span>
            <span>✓ Agent Beta - Creative Content</span>
            <span>✓ Agent Gamma - Code Generation</span>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
