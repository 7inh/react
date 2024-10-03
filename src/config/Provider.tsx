import store from "@redux/store.ts"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ComponentType, FunctionComponent, PropsWithChildren } from "react"
import { Provider as ReduxProvider } from "react-redux"

interface IProvider<TProps> {
  Component: ComponentType<PropsWithChildren<TProps>>
  props?: Omit<TProps, "children">
}

function composeProviders<TProviders extends Array<IProvider<any>>>(
  providers: TProviders
): ComponentType<PropsWithChildren> {
  const ProviderComponent: FunctionComponent<PropsWithChildren> = ({
    children,
  }) => {
    const initialJSX = <>{children}</>

    return providers.reduceRight<JSX.Element>(
      (prevJSX, { Component: CurrentProvider, props = {} }) => {
        return <CurrentProvider {...props}>{prevJSX}</CurrentProvider>
      },
      initialJSX
    )
  }

  return ProviderComponent
}

function createProvider<TProps>(
  Component: ComponentType<PropsWithChildren<TProps>>,
  props?: Omit<TProps, "children">
): IProvider<TProps> {
  return { Component, props }
}

const queryClient = new QueryClient()

const providers = [
  createProvider(ReduxProvider, { store }),
  createProvider(QueryClientProvider, { client: queryClient }),
]

const Provider = ({ children }: PropsWithChildren) => {
  const ProviderComponent = composeProviders(providers)

  return <ProviderComponent>{children}</ProviderComponent>
}

export default Provider
