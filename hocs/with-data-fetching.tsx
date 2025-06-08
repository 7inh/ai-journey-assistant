"use client" // Data fetching often involves client-side effects and state

import type { ComponentType, FC } from "react"
import { useState, useEffect } from "react"

export interface WithDataFetchingProps<TData = any> {
  data: TData | null
  isLoading: boolean
  error: Error | null
  refetch: () => void
}

interface DataFetchingOptions<TData> {
  fetcher: () => Promise<TData>
  initialData?: TData | null
}

function withDataFetching<TData, P extends object = {}>(options: DataFetchingOptions<TData>) {
  return (WrappedComponent: ComponentType<P & WithDataFetchingProps<TData>>): FC<P> => {
    const DataFetchingComponent: FC<P> = (props) => {
      const [data, setData] = useState<TData | null>(options.initialData || null)
      const [isLoading, setIsLoading] = useState<boolean>(true)
      const [error, setError] = useState<Error | null>(null)

      const fetchData = async () => {
        setIsLoading(true)
        setError(null)
        try {
          const result = await options.fetcher()
          setData(result)
        } catch (err) {
          setError(err instanceof Error ? err : new Error("An unknown error occurred"))
        } finally {
          setIsLoading(false)
        }
      }

      useEffect(() => {
        fetchData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []) // Consider dependencies if options.fetcher changes or needs params

      const injectedProps: WithDataFetchingProps<TData> = {
        data,
        isLoading,
        error,
        refetch: fetchData,
      }

      return <WrappedComponent {...(props as P)} {...injectedProps} />
    }

    const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || "Component"
    DataFetchingComponent.displayName = `WithDataFetching(${wrappedComponentName})`
    return DataFetchingComponent
  }
}

export default withDataFetching
