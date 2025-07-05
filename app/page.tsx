"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Search, ChevronDown, Check, User, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from "lucide-react"
import { CreditCard, IncomeRangeKey } from "@/app/types"
import { mockCards } from "@/app/data/mockCards"
import { BANKS, CATEGORIES, INCOME_RANGES, FEE_RANGE } from "@/app/constants/filters"

export default function CreditWiseApp() {
  const [cards, setCards] = useState<CreditCard[]>([])
  const [filteredCards, setFilteredCards] = useState<CreditCard[]>([])
  const [selectedCards, setSelectedCards] = useState<CreditCard[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [feeRange, setFeeRange] = useState<[number, number]>([FEE_RANGE.min, FEE_RANGE.max])
  const [isFilterOpen, setIsFilterOpen] = useState(true)
  const [selectedBanks, setSelectedBanks] = useState<string[]>([])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedIncomeRange, setSelectedIncomeRange] = useState<string>("All")

  useEffect(() => {
    setCards(mockCards)
    setFilteredCards(mockCards)
  }, [])

  useEffect(() => {
    let results = [...cards]
    if (searchQuery) {
      results = results.filter(
        (card) =>
          card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          card.bank.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }
    if (selectedBanks.length > 0) {
      results = results.filter((card) => selectedBanks.includes(card.bank))
    }
    if (selectedCategories.length > 0) {
      results = results.filter((card) => card.category.some((cat) => selectedCategories.includes(cat)))
    }
    results = results.filter((card) => card.annualFee >= feeRange[0] && card.annualFee <= feeRange[1])

    if (selectedIncomeRange !== "All") {
      const ranges: Record<IncomeRangeKey, (c: CreditCard) => boolean> = {
        "Under ₹3,00,000": (c) => c.incomeRequirement < 300000,
        "₹3,00,000 - ₹6,00,000": (c) => c.incomeRequirement >= 300000 && c.incomeRequirement < 600000,
        "₹6,00,000 - ₹12,00,000": (c) => c.incomeRequirement >= 600000 && c.incomeRequirement < 1200000,
        "Over ₹12,00,000": (c) => c.incomeRequirement >= 1200000,
      }
      if (selectedIncomeRange in ranges) {
        results = results.filter(ranges[selectedIncomeRange as IncomeRangeKey])
      }
    }

    setFilteredCards(results)
    setSelectedCards(results.filter((c) => c.selected))
  }, [searchQuery, selectedBanks, selectedCategories, feeRange, selectedIncomeRange, cards])

  const toggleCardSelection = (id: number) => {
    const currentSelectedCount = cards.filter((c) => c.selected).length
    const isCurrentlySelected = cards.find((c) => c.id === id)?.selected

    if (currentSelectedCount >= 3 && !isCurrentlySelected) {
      alert("You can select a maximum of 3 cards for comparison.")
      return
    }

    const updatedCards = cards.map((card) => {
      if (card.id === id) {
        return { ...card, selected: !card.selected }
      }
      return card
    })
    setCards(updatedCards)
  }

  const clearFilters = () => {
    setSearchQuery("")
    setFeeRange([FEE_RANGE.min, FEE_RANGE.max])
    setSelectedBanks([])
    setSelectedCategories([])
    setSelectedIncomeRange("All")
  }

  const toggleBank = (bank: string) => {
    setSelectedBanks((prev) => (prev.includes(bank) ? prev.filter((b) => b !== bank) : [...prev, bank]))
  }

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleIncomeChange = (range: IncomeRangeKey | 'All') => {
    setSelectedIncomeRange(range)
  }

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
          <div className="flex items-center">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-black border-b border-gray-800">
        <div className="relative z-10 container mx-auto px-6 py-20 flex flex-col items-center">
          <div className="text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Find Your Perfect Credit Card</h1>
            <p className="text-lg md:text-xl text-gray-200 mb-8">
              Compare features, rewards, and benefits to discover the ideal card for your lifestyle.
            </p>
            <div className="bg-black border border-gray-800 p-2 rounded-lg shadow-lg w-full max-w-2xl mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for cards by name or bank..."
                  className="pl-10 pr-4 py-3 w-full bg-black border-gray-800 text-gray-300 text-sm placeholder:text-gray-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <Search className="h-4 w-4" />
                </div>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {CATEGORIES.map((category: string) => (
                <Badge
                  key={category}
                  variant={selectedCategories.includes(category) ? "default" : "outline"}
                  className={`cursor-pointer whitespace-nowrap px-4 py-2 text-sm rounded-full ${
                    selectedCategories.includes(category)
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "bg-gray-800 text-gray-100 hover:bg-gray-700 border-gray-600"
                  }`}
                  onClick={() => toggleCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="md:w-1/4">
            <div className="bg-black border border-gray-800 rounded-lg p-4 sticky top-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  Clear All
                </Button>
              </div>
              
              {/* Banks Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Banks</h3>
                <div className="space-y-2">
                  {BANKS.map((bank) => (
                    <div key={bank} className="flex items-center space-x-2">
                      <Checkbox
                        id={`bank-${bank}`}
                        checked={selectedBanks.includes(bank)}
                        onCheckedChange={() => toggleBank(bank)}
                      />
                      <label htmlFor={`bank-${bank}`} className="text-sm cursor-pointer">
                        {bank}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Categories Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Categories</h3>
                <div className="space-y-2">
                  {CATEGORIES.map((category) => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox
                        id={`category-${category}`}
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => toggleCategory(category)}
                      />
                      <label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                        {category}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Fee Range Filter */}
              <div className="mb-6">
                <h3 className="font-medium mb-3">Annual Fee Range</h3>
                <div className="px-2">
                  <Slider
                    value={feeRange}
                    onValueChange={(value) => setFeeRange(value as [number, number])}
                    min={FEE_RANGE.min}
                    max={FEE_RANGE.max}
                    step={500}
                    className="my-4"
                  />
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>₹{feeRange[0].toLocaleString()}</span>
                    <span>₹{feeRange[1].toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Income Range Filter */}
              <div>
                <h3 className="font-medium mb-3">Income Range</h3>
                <div className="space-y-2">
                  {INCOME_RANGES.map((range) => (
                    <div key={range} className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id={`income-${range}`}
                        name="income-range"
                        checked={selectedIncomeRange === range}
                        onChange={() => handleIncomeChange(range)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-600"
                      />
                      <label htmlFor={`income-${range}`} className="text-sm cursor-pointer">
                        {range}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Cards Grid */}
          <div className="md:w-3/4">
            <div className="mb-6">
              <h2 className="text-xl font-semibold">Available Cards ({filteredCards.length})</h2>
              {selectedCards.length > 0 && (
                <p className="text-sm text-gray-400 mt-1">
                  {selectedCards.length} card{selectedCards.length !== 1 ? 's' : ''} selected for comparison
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCards.map((card) => (
                <Card
                  key={card.id}
                  className={`overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/50 bg-black border ${
                    card.selected ? 'border-blue-500 ring-2 ring-blue-500' : 'border-gray-800'
                  } flex flex-col hover:-translate-y-1 relative`}
                >
                  <div className="absolute top-2 right-2 z-10">
                    <Checkbox
                      checked={card.selected}
                      onCheckedChange={() => toggleCardSelection(card.id)}
                      className={`h-5 w-5 rounded-md border-2 ${
                        card.selected 
                          ? 'bg-blue-600 border-blue-600' 
                          : 'bg-black/50 border-gray-400 hover:border-gray-300'
                      } transition-colors`}
                    >
                      {card.selected && (
                        <Check className="h-3.5 w-3.5 text-white" />
                      )}
                    </Checkbox>
                  </div>
                  <div
                    className={`relative h-32 overflow-hidden flex items-center justify-center border-b border-gray-800 ${getBankGradient(card.bank)}`}
                  >
                    <div className="absolute inset-0 opacity-20">
                      <img
                        src={`/placeholder.svg?height=300&width=400&text=${encodeURIComponent(card.imagePrompt)}`}
                        alt={card.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="relative z-10 flex items-center space-x-3 text-center">
                      <span className="text-2xl font-bold text-white px-2">{card.name}</span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-gray-300">{card.bank}</CardTitle>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {card.category.map((cat) => (
                        <Badge
                          key={cat}
                          variant="outline"
                          className="text-xs bg-gray-800 text-gray-100 border-gray-600"
                        >
                          {cat}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow flex flex-col">
                    <div className="space-y-1 mb-4 flex-grow">
                      {card.benefits.map((benefit, index) => (
                        <div key={index} className="flex items-start">
                          <Check className="h-3 w-3 text-green-400 mt-1 mr-2 flex-shrink-0" />
                          <p className="text-sm text-gray-300">{benefit}</p>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-800">
                      <div>
                        <span className="text-xs text-gray-500">Annual Fee</span>
                        <p className="font-semibold text-white">
                          {card.annualFee === 0 ? "Zero Fee" : `₹${card.annualFee.toLocaleString("en-IN")}`}
                        </p>
                      </div>
                      <div>
                        <span className="text-xs text-gray-500">Min. Income</span>
                        <p className="font-semibold text-white">₹{(card.incomeRequirement / 100000).toFixed(1)}L</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-black/20">
                    <Button
                      variant="outline"
                      className="w-full rounded-full border-gray-700 bg-black text-white hover:bg-blue-600 hover:border-blue-600"
                    >
                      Learn More
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* No Results */}
            {filteredCards.length === 0 && (
              <div className="bg-black border border-dashed border-gray-800 rounded-lg p-12 text-center mt-6">
                <Search className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-300">No cards found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria</p>
                <Button onClick={clearFilters} className="rounded-full">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Floating Compare Button */}
      {selectedCards.length > 0 && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <Button size="lg" className="px-6 py-4 shadow-lg rounded-full" asChild>
            <a href={`/compare?cards=${selectedCards.map((c) => c.id).join(",")}`}>
              Compare {selectedCards.length} Card{selectedCards.length > 1 ? "s" : ""}{" "}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-black text-white py-12 mt-16 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CreditWise</h3>
              <p className="text-gray-400 mb-6">
                Find your perfect credit card with our comprehensive comparison tools and expert advice.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Cards
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Compare
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    About Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Card Categories</h4>
              <ul className="space-y-2">
                {CATEGORIES.slice(0, 5).map((category: string) => (
                  <li key={category}>
                    <a href="#" className="text-gray-400 hover:text-white">
                      {category}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe to receive updates on new card offers.</p>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="bg-gray-800 border-gray-700 rounded-r-none"
                />
                <Button className="rounded-l-none rounded-r-lg">Subscribe</Button>
              </div>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="text-center text-gray-500 text-sm">
            <p>© 2025 CreditWise. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
