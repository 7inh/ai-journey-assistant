"use client" // This HOC might rely on client-side auth state/hooks

import type { ComponentType, FC } from "react"
import { useEffect, useState } from "react"
import { Spinner } from "@/components/ui/spinner" // Assuming you have a Spinner component

// Mock authentication hook (replace with your actual auth logic)
const useMockAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    // Simulate async auth check
    const timer = setTimeout(() => {
      // In a real app, check a token, context, etc.
      // For this example, let's randomly authenticate or use a localStorage item.
      const mockAuthStatus = Math.random() > 0.5 // Or: localStorage.getItem('isLoggedIn') === 'true';
      setIsAuthenticated(mockAuthStatus)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  return { isAuthenticated }
}

type WithAuthenticationProps = {}

// Define the HOC
// P represents the props of the WrappedComponent
function withAuthentication<P extends object>(WrappedComponent: ComponentType<P>): FC<P & WithAuthenticationProps> {
  const AuthenticatedComponent: FC<P & WithAuthenticationProps> = (props) => {
    const { isAuthenticated } = useMockAuth()

    if (isAuthenticated === null) {
      // Loading state while checking authentication
      return (
        <div className="flex items-center justify-center h-screen">
          <Spinner size="lg" />
          <p className="ml-2">Authenticating...</p>
        </div>
      )
    }

    if (!isAuthenticated) {
      // User is not authenticated, render fallback or redirect
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-xl text-destructive mb-4">Access Denied</p>
          <p>Please log in to view this page.</p>
          {/* Optionally, include a login button or redirect logic here */}
        </div>
      )
    }

    // User is authenticated, render the wrapped component with its original props
    return <WrappedComponent {...(props as P)} />
  }

  // Set a display name for easier debugging
  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || "Component"
  AuthenticatedComponent.displayName = `WithAuthentication(${wrappedComponentName})`

  return AuthenticatedComponent
}

export default withAuthentication
