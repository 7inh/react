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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-xl w-full bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Something went wrong.
        </h1>
        <p className="text-gray-700 mb-2">
          We're sorry, but something went wrong. Please try again later.
        </p>
        <details className="bg-gray-100 p-4 rounded-lg text-sm">
          <summary className="cursor-pointer text-blue-600">
            More details
          </summary>
          <p className="text-red-500 mt-2">{error && error.toString()}</p>
          <p className="text-gray-600 overflow-auto">
            {errorInfo && errorInfo.componentStack}
          </p>
        </details>
      </div>
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
