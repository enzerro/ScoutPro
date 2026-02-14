"use client"

import { AppProvider } from "@/components/app-provider"
import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { FeaturesSection } from "@/components/features-section"
import { TopPlayersSection } from "@/components/top-players-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <AppProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">
          <HeroSection />
          <FeaturesSection />
          <TopPlayersSection />
        </main>
        <Footer />
      </div>
    </AppProvider>
  )
}
