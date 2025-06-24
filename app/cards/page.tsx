"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function CardsPage() {
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
            <a href="/cards" className="font-medium hover:text-gray-300 text-blue-400">
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

      {/* Content */}
      <div className="container mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold text-white mb-6">All Credit Cards</h1>
        <p className="text-gray-400 mb-8">
          This page will contain all available credit cards with advanced filtering options.
        </p>
        <Button asChild>
          <a href="/">
            Browse Cards on Home Page
            <ArrowRight className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </div>
    </div>
  )
}
