"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Check, Star, DollarSign, TrendingUp, Shield, Gift } from "lucide-react"

interface CardProps {
  id: number
  bank: string
  name: string
  category: string[]
  annualFee: number
  incomeRequirement: number
  benefits: string[]
  imagePrompt: string
  selected: boolean
  rewardRate?: string
  welcomeBonus?: string
  creditLimit?: string
  interestRate?: string
  foreignTransaction?: string
  cashAdvance?: string
}

export default function ComparePage() {
  const searchParams = useSearchParams()
  const [compareCards, setCompareCards] = useState<CardProps[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const cardIdsParam = searchParams.get("cards")
    const cardIds = cardIdsParam?.split(",").map(Number) || []

    // Mock data - in a real app, this would come from an API or database
    const allCards: CardProps[] = [
      {
        id: 1,
        bank: "HDFC Bank",
        name: "Regalia First",
        category: ["Travel", "Rewards"],
        annualFee: 1000,
        incomeRequirement: 600000,
        benefits: ["5x reward points on dining and travel", "Airport lounge access", "Fuel surcharge waiver"],
        imagePrompt: "Premium blue credit card with metallic finish",
        selected: false,
        rewardRate: "5x on dining & travel, 1x on others",
        welcomeBonus: "5,000 reward points",
        creditLimit: "Up to ₹10 lakhs",
        interestRate: "3.49% per month",
        foreignTransaction: "3.5% + GST",
        cashAdvance: "2.5% (min ₹500)",
      },
      {
        id: 2,
        bank: "ICICI Bank",
        name: "Sapphiro Card",
        category: ["Rewards", "Dining", "Luxury"],
        annualFee: 3000,
        incomeRequirement: 800000,
        benefits: ["4x reward points on dining", "Buy 1 Get 1 movie tickets", "Complimentary golf sessions"],
        imagePrompt: "Elegant gold metal credit card",
        selected: false,
        rewardRate: "4x on dining, 2x on others",
        welcomeBonus: "10,000 reward points",
        creditLimit: "Up to ₹15 lakhs",
        interestRate: "3.25% per month",
        foreignTransaction: "3.5% + GST",
        cashAdvance: "2.5% (min ₹500)",
      },
      {
        id: 3,
        bank: "SBI Card",
        name: "SimplySAVE",
        category: ["Cashback"],
        annualFee: 499,
        incomeRequirement: 300000,
        benefits: ["5% cashback on groceries", "1% cashback on all purchases", "Welcome gift vouchers"],
        imagePrompt: "Modern white credit card with blue accents",
        selected: false,
        rewardRate: "5% on groceries, 1% on others",
        welcomeBonus: "₹2,000 cashback",
        creditLimit: "Up to ₹5 lakhs",
        interestRate: "3.35% per month",
        foreignTransaction: "3.5% + GST",
        cashAdvance: "2.5% (min ₹300)",
      },
      {
        id: 4,
        bank: "Axis Bank",
        name: "Privilege Card",
        category: ["Travel", "Rewards"],
        annualFee: 2000,
        incomeRequirement: 500000,
        benefits: ["4x reward points on travel", "Complimentary lounge access", "Milestone benefits"],
        imagePrompt: "Sleek black credit card with silver accents",
        selected: false,
        rewardRate: "4x on travel, 2x on others",
        welcomeBonus: "7,500 reward points",
        creditLimit: "Up to ₹8 lakhs",
        interestRate: "3.40% per month",
        foreignTransaction: "3.5% + GST",
        cashAdvance: "2.5% (min ₹400)",
      },
      {
        id: 5,
        bank: "Kotak Mahindra",
        name: "Royale Signature",
        category: ["Cashback", "Rewards"],
        annualFee: 999,
        incomeRequirement: 400000,
        benefits: ["2% cashback on all spends", "Dining privileges at premium restaurants", "Movie ticket offers"],
        imagePrompt: "Modern blue and white credit card",
        selected: false,
        rewardRate: "2% cashback on all spends",
        welcomeBonus: "₹3,000 cashback",
        creditLimit: "Up to ₹6 lakhs",
        interestRate: "3.30% per month",
        foreignTransaction: "3.5% + GST",
        cashAdvance: "2.5% (min ₹350)",
      },
    ]

    const selectedCards = allCards.filter((card) => cardIds.includes(card.id))
    setCompareCards(selectedCards)
    setLoading(false)
  }, [searchParams.get("cards")])

  const getBankGradient = (bank: string) => {
    switch (bank) {
      case "HDFC Bank":
        return "bg-gradient-to-r from-blue-900 to-blue-800"
      case "ICICI Bank":
        return "bg-gradient-to-r from-orange-800 to-orange-700"
      case "SBI Card":
        return "bg-gradient-to-r from-purple-900 to-purple-800"
      case "Axis Bank":
        return "bg-gradient-to-r from-red-900 to-red-800"
      case "Kotak Mahindra":
        return "bg-gradient-to-r from-indigo-900 to-indigo-800"
      case "Yes Bank":
        return "bg-gradient-to-r from-green-900 to-green-800"
      default:
        return "bg-gradient-to-r from-gray-900 to-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-gray-300 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading comparison...</p>
        </div>
      </div>
    )
  }

  if (compareCards.length === 0) {
    return (
      <div className="min-h-screen bg-black text-gray-300">
        <header className="bg-black text-white py-4 px-6 shadow-md border-b border-gray-800">
          <div className="container mx-auto flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">CreditWise</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="font-medium hover:text-gray-300">
                Home
              </a>
              <a href="/cards" className="font-medium hover:text-gray-300">
                Cards
              </a>
              <a href="/compare" className="font-medium hover:text-gray-300">
                Compare
              </a>
              <a href="/about" className="font-medium hover:text-gray-300">
                About
              </a>
            </nav>
          </div>
        </header>

        <div className="container mx-auto px-6 py-20 text-center">
          <Star className="h-24 w-24 text-gray-600 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-white mb-4">No Cards Selected</h1>
          <p className="text-gray-400 mb-8">Please select cards from the home page to compare them here.</p>
          <Button asChild>
            <a href="/">Browse Cards</a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-gray-300">
      {/* Header */}
      <header className="bg-black text-white py-4 px-6 shadow-md border-b border-gray-800">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold">CreditWise</h1>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="font-medium hover:text-gray-300">
              Home
            </a>
            <a href="/cards" className="font-medium hover:text-gray-300">
              Cards
            </a>
            <a href="/compare" className="font-medium hover:text-gray-300">
              Compare
            </a>
            <a href="/about" className="font-medium hover:text-gray-300">
              About
            </a>
          </nav>
        </div>
      </header>

      {/* Page Header */}
      <div className="bg-black border-b border-gray-800">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" size="sm" asChild>
              <a href="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Cards
              </a>
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Card Comparison</h1>
          <p className="text-gray-400">Compare {compareCards.length} selected credit cards side by side</p>
        </div>
      </div>

      {/* Comparison Table */}
      <main className="container mx-auto px-6 py-12">
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Card Headers */}
            <div
              className="grid gap-4 mb-8"
              style={{ gridTemplateColumns: `200px repeat(${compareCards.length}, 1fr)` }}
            >
              <div></div>
              {compareCards.map((card) => (
                <Card key={card.id} className="bg-black border-gray-800">
                  <div className={`h-24 ${getBankGradient(card.bank)} relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{card.name}</span>
                    </div>
                  </div>
                  <CardHeader className="text-center">
                    <CardTitle className="text-gray-300">{card.bank}</CardTitle>
                    <div className="flex flex-wrap gap-1 justify-center">
                      {card.category.map((cat) => (
                        <Badge key={cat} variant="outline" className="text-xs bg-gray-800 border-gray-600">
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Comparison Rows */}
            <div className="space-y-4">
              {/* Annual Fee */}
              <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${compareCards.length}, 1fr)` }}>
                <div className="flex items-center gap-2 font-semibold text-white">
                  <DollarSign className="h-4 w-4" />
                  Annual Fee
                </div>
                {compareCards.map((card) => (
                  <Card key={card.id} className="bg-black border-gray-800">
                    <CardContent className="p-4 text-center">
                      <span className="text-lg font-bold text-white">
                        {card.annualFee === 0 ? "FREE" : `₹${card.annualFee.toLocaleString("en-IN")}`}
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Income Requirement */}
              <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${compareCards.length}, 1fr)` }}>
                <div className="flex items-center gap-2 font-semibold text-white">
                  <TrendingUp className="h-4 w-4" />
                  Min. Income
                </div>
                {compareCards.map((card) => (
                  <Card key={card.id} className="bg-black border-gray-800">
                    <CardContent className="p-4 text-center">
                      <span className="text-lg font-bold text-white">
                        ₹{(card.incomeRequirement / 100000).toFixed(1)}L
                      </span>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Reward Rate */}
              <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${compareCards.length}, 1fr)` }}>
                <div className="flex items-center gap-2 font-semibold text-white">
                  <Star className="h-4 w-4" />
                  Reward Rate
                </div>
                {compareCards.map((card) => (
                  <Card key={card.id} className="bg-black border-gray-800">
                    <CardContent className="p-4 text-center">
                      <span className="text-sm text-gray-300">{card.rewardRate}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Welcome Bonus */}
              <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${compareCards.length}, 1fr)` }}>
                <div className="flex items-center gap-2 font-semibold text-white">
                  <Gift className="h-4 w-4" />
                  Welcome Bonus
                </div>
                {compareCards.map((card) => (
                  <Card key={card.id} className="bg-black border-gray-800">
                    <CardContent className="p-4 text-center">
                      <span className="text-sm text-gray-300">{card.welcomeBonus}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Credit Limit */}
              <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${compareCards.length}, 1fr)` }}>
                <div className="flex items-center gap-2 font-semibold text-white">
                  <Shield className="h-4 w-4" />
                  Credit Limit
                </div>
                {compareCards.map((card) => (
                  <Card key={card.id} className="bg-black border-gray-800">
                    <CardContent className="p-4 text-center">
                      <span className="text-sm text-gray-300">{card.creditLimit}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Interest Rate */}
              <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${compareCards.length}, 1fr)` }}>
                <div className="flex items-center gap-2 font-semibold text-white">
                  <TrendingUp className="h-4 w-4" />
                  Interest Rate
                </div>
                {compareCards.map((card) => (
                  <Card key={card.id} className="bg-black border-gray-800">
                    <CardContent className="p-4 text-center">
                      <span className="text-sm text-gray-300">{card.interestRate}</span>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Benefits */}
              <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${compareCards.length}, 1fr)` }}>
                <div className="flex items-center gap-2 font-semibold text-white">
                  <Check className="h-4 w-4" />
                  Key Benefits
                </div>
                {compareCards.map((card) => (
                  <Card key={card.id} className="bg-black border-gray-800">
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        {card.benefits.map((benefit, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Check className="h-3 w-3 text-green-400 mt-1 flex-shrink-0" />
                            <span className="text-xs text-gray-300">{benefit}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className="grid gap-4 mt-8"
              style={{ gridTemplateColumns: `200px repeat(${compareCards.length}, 1fr)` }}
            >
              <div></div>
              {compareCards.map((card) => (
                <div key={card.id} className="space-y-2">
                  <Button className="w-full">Apply Now</Button>
                  <Button variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-800">
                    Learn More
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
