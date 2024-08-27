import { ComponentType, FunctionComponent, PropsWithChildren } from "react"
import { Provider as ReduxProvider } from "react-redux"
import store from "@redux/store.ts"

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

const providers = [createProvider(ReduxProvider, { store })]

const Provider = ({ children }: PropsWithChildren) => {
  const ProviderComponent = composeProviders(providers)

  return <ProviderComponent>{children}</ProviderComponent>
}

export default Provider
