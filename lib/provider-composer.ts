import type { ComponentType, FC, PropsWithChildren, ReactNode } from "react"

type ProviderWithProps = {
  Provider: ComponentType<any>
  props?: Record<string, any>
}

interface ProviderCompose {
  /**
   * Add a provider component that requires props
   */
  add<P extends PropsWithChildren>(Provider: ComponentType<P>, props: Omit<P, "children">): ProviderCompose

  /**
   * Add a provider component that only needs children
   */
  add<P extends PropsWithChildren>(Provider: ComponentType<P>): ProviderCompose

  /**
   * Compose all providers into a single component
   */
  compose(): FC<PropsWithChildren>
}

export const createProviderCompose = (): ProviderCompose => {
  const providers: ProviderWithProps[] = []

  return {
    add<P extends PropsWithChildren>(
      ProviderComponent: ComponentType<P>, // Renamed Provider to ProviderComponent to avoid conflict
      props?: Omit<P, "children">,
    ): ProviderCompose {
      providers.push({ Provider: ProviderComponent, props })
      return this
    },
    compose(): FC<PropsWithChildren> {
      return ({ children }: { children?: ReactNode }) => {
        return providers.reduceRight(
          (acc, { Provider, props }, index) => (
            <Provider key={index} {...props}>
              {acc}
            </Provider>
          ),
          children as ReactNode,
        )
      }
    },
  }
}
