"use client"

import React from "react"

import { AppProvider } from "@/components/app-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </AppProvider>
  )
}
