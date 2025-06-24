"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Shield, TrendingUp, Award, Target, Heart, Zap, Code, Coffee, Lightbulb } from "lucide-react"

export default function AboutPage() {
  const features = [
    {
      icon: <CreditCard className="h-8 w-8 text-blue-500" />,
      title: "Comprehensive Database",
      description: "Access to hundreds of credit cards from major Indian banks and financial institutions.",
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: "Unbiased Comparisons",
      description: "Independent analysis with no hidden agendas or biased recommendations.",
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-500" />,
      title: "Smart Filtering",
      description: "Advanced filters to find cards that match your income, spending, and lifestyle.",
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-500" />,
      title: "Real Data",
      description: "Up-to-date information sourced directly from official bank websites and documents.",
    },
  ]

  const values = [
    {
      icon: <Target className="h-6 w-6 text-blue-500" />,
      title: "Simplicity",
      description: "Making complex financial decisions simple and accessible for everyone.",
    },
    {
      icon: <Heart className="h-6 w-6 text-red-500" />,
      title: "No BS",
      description: "Straight facts, no marketing fluff, no affiliate link spam.",
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: "Open Source Spirit",
      description: "Built with love for the community, by someone who needed this tool too.",
    },
  ]

  const journey = [
    {
      icon: <Coffee className="h-6 w-6 text-amber-500" />,
      title: "The Problem",
      description: "Spent hours comparing credit cards across multiple bank websites. It was painful.",
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
      title: "The Idea",
      description: "Why not build a tool that does this automatically? How hard could it be?",
    },
    {
      icon: <Code className="h-6 w-6 text-blue-500" />,
      title: "The Build",
      description: "Many late nights, lots of coffee, and probably too much Stack Overflow.",
    },
  ]

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
            <a href="/about" className="font-medium hover:text-gray-300 text-blue-400">
              About
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-black border-b border-gray-800">
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">About CreditWise</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            A simple tool built by someone who got tired of manually comparing credit cards across dozens of bank
            websites. Sometimes the best solutions come from personal frustration.
          </p>
          <div className="flex justify-center gap-4">
            <Badge className="px-4 py-2 text-sm bg-blue-600">Side Project</Badge>
            <Badge className="px-4 py-2 text-sm bg-green-600">Open Data</Badge>
            <Badge className="px-4 py-2 text-sm bg-purple-600">No Ads</Badge>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">How This Started</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {journey.map((step, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gray-900/50 rounded-lg p-8">
            <p className="text-gray-300 mb-6 leading-relaxed">
              Like many people, I found myself drowning in credit card comparison websites that were either outdated,
              biased towards high-commission products, or just plain confusing. After spending way too many hours
              manually comparing cards across different bank websites, I thought: "There has to be a better way."
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              So I built this tool. It started as a weekend project to solve my own problem, but I figured others might
              find it useful too. No fancy business model, no affiliate links, no BS - just a straightforward way to
              compare credit cards without the marketing noise.
            </p>
            <p className="text-gray-300 leading-relaxed">
              The data is scraped and compiled from official bank sources, updated regularly, and presented in a way
              that actually makes sense. Because sometimes the internet needs more tools built by people who actually
              use them.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-900/50 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">What Makes This Different</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-black border-gray-800 text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <CardTitle className="text-white">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">The Philosophy</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {values.map((value, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
              <p className="text-gray-400">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="bg-gray-900/50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Built With</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Modern web technologies, lots of coffee, and the occasional existential crisis about whether this was
            actually a good use of time (spoiler: it was).
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="outline" className="px-4 py-2 bg-gray-800 border-gray-600">
              React
            </Badge>
            <Badge variant="outline" className="px-4 py-2 bg-gray-800 border-gray-600">
              Next.js
            </Badge>
            <Badge variant="outline" className="px-4 py-2 bg-gray-800 border-gray-600">
              TypeScript
            </Badge>
            <Badge variant="outline" className="px-4 py-2 bg-gray-800 border-gray-600">
              Tailwind CSS
            </Badge>
            <Badge variant="outline" className="px-4 py-2 bg-gray-800 border-gray-600">
              shadcn/ui
            </Badge>
            <Badge variant="outline" className="px-4 py-2 bg-gray-800 border-gray-600">
              Lots of ☕
            </Badge>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-500 mb-2">500+</div>
            <p className="text-gray-400">Credit Cards Tracked</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-500 mb-2">50+</div>
            <p className="text-gray-400">Banks Covered</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-purple-500 mb-2">0</div>
            <p className="text-gray-400">Affiliate Links</p>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-500 mb-2">∞</div>
            <p className="text-gray-400">Hours of Manual Work Saved</p>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-gray-900/50 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Fair Warning</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-gray-400 mb-6">
              This tool is maintained by a human who occasionally makes mistakes, drinks too much coffee, and sometimes
              forgets to update things. While I try to keep everything accurate and up-to-date, always double-check with
              the actual banks before making any financial decisions.
            </p>
            <p className="text-gray-400 mb-6">
              I'm not a financial advisor, just someone who got really annoyed with the existing tools and decided to
              build something better. Use this information wisely, and remember that the best credit card is the one
              that actually fits your spending habits and financial situation.
            </p>
            <p className="text-gray-400">
              If you find bugs, outdated information, or have suggestions, feel free to reach out. This is a work in
              progress, just like all of us.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Ready to Find Your Card?</h2>
        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Stop wasting time on biased comparison sites. Use a tool built by someone who actually needed it.
        </p>
        <Button size="lg" asChild>
          <a href="/">Start Comparing Cards</a>
        </Button>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-gray-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CreditWise</h3>
              <p className="text-gray-400 mb-6">
                A simple credit card comparison tool built by someone who got tired of the existing options.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/" className="text-gray-400 hover:text-white">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/cards" className="text-gray-400 hover:text-white">
                    Cards
                  </a>
                </li>
                <li>
                  <a href="/compare" className="text-gray-400 hover:text-white">
                    Compare
                  </a>
                </li>
                <li>
                  <a href="/about" className="text-gray-400 hover:text-white">
                    About
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Disclaimer</h4>
              <p className="text-gray-400 text-sm">
                This is an independent tool. Always verify information with official bank sources before making
                financial decisions.
              </p>
            </div>
          </div>
          <Separator className="my-8" />
          <div className="text-center text-gray-500 text-sm">
            <p>© 2025 CreditWise. Built with ☕ and mild frustration with existing tools.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
