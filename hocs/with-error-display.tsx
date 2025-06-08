import type { ComponentType, FC } from "react"

interface WithErrorDisplayProps {
  error?: Error | null // Expects an error prop
  // You can add more specific error display options if needed
}

// P represents the props of the WrappedComponent
function withErrorDisplay<P extends WithErrorDisplayProps>(
  WrappedComponent: ComponentType<P>,
  FallbackComponent?: ComponentType<{ error: Error }>, // Optional custom fallback
): FC<P> {
  const ErrorDisplayComponent: FC<P> = (props) => {
    const { error } = props

    if (error) {
      if (FallbackComponent) {
        return <FallbackComponent error={error} />
      }
      return (
        <div className="p-4 border border-destructive bg-destructive/10 rounded-md text-destructive">
          <h3 className="font-semibold">An Error Occurred</h3>
          <p>{error.message || "Something went wrong."}</p>
        </div>
      )
    }

    return <WrappedComponent {...props} />
  }

  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || "Component"
  ErrorDisplayComponent.displayName = `WithErrorDisplay(${wrappedComponentName})`

  return ErrorDisplayComponent
}

export default withErrorDisplay
