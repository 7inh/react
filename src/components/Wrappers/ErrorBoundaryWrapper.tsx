import React, { ErrorInfo, ReactNode } from "react"
import { Outlet } from "react-router-dom"

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

const ErrorBoundary = ({
  error,
  errorInfo,
}: Pick<ErrorBoundaryState, "error" | "errorInfo">) => {
  if (!error || !errorInfo) {
    return null
  }

  return (
    <div>
      <pre>
        <div>
          <h1>Something went wrong</h1>
          <p>
            Please try refreshing the page. If the issue persists, please
            contact support.
          </p>
        </div>
      </pre>
    </div>
  )
}

class MyErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = { hasError: false, error: null, errorInfo: null }

  constructor(props: ErrorBoundaryProps) {
    super(props)
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    this.setState({ hasError: true, error, errorInfo })
  }

  render(): React.ReactNode {
    const { hasError, errorInfo, error } = this.state

    const { children } = this.props

    if (hasError) {
      return <ErrorBoundary error={error} errorInfo={errorInfo} />
    }

    return <>{children}</>
  }
}

const ErrorBoundaryWrapper = () => {
  return (
    <>
      <MyErrorBoundary>
        <Outlet />
      </MyErrorBoundary>
    </>
  )
}

export default ErrorBoundaryWrapper
