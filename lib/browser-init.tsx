"use client"

import type React from "react"

class StorageMock {
  data: Record<string, string>

  constructor() {
    this.data = {} as Record<string, string>
  }

  setItem(name: string, value: string) {
    this.data[name] = value
  }

  getItem(name: string) {
    return this.data[name] || null
  }

  removeItem(name: string) {
    delete this.data[name]
  }

  clear() {
    this.data = {}
  }
}

let localStorageRef: Storage, sessionStorageRef: Storage

try {
  localStorageRef = globalThis.localStorage
  sessionStorageRef = globalThis.sessionStorage
} catch (e) {
  localStorageRef = new StorageMock()
  sessionStorageRef = new StorageMock()
}

if (typeof globalThis !== "undefined") {
  Object.defineProperty(globalThis, "localStorage", {
    value: localStorageRef,
    writable: true, // Make it writable if you might re-assign or re-configure
    configurable: true,
  })

  Object.defineProperty(globalThis, "sessionStorage", {
    value: sessionStorageRef,
    writable: true,
    configurable: true,
  })
}

const BrowserInitor = ({ children }: { children: React.ReactNode }) => {
  // This component itself doesn't do much other than render children.
  // Its main purpose is to ensure the module's side effects (storage mocking)
  // are executed on the client when this module is imported and used.
  return <>{children}</>
}

export default BrowserInitor
