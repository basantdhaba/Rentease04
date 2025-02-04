"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"
import { Button } from "@/components/ui/button"

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
    this.setState({ errorInfo })
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
          <h1 className="text-2xl font-bold mb-4">Oops, there was an error!</h1>
          <p className="text-red-500 mb-4">{this.state.error?.message || "An unexpected error occurred."}</p>
          {this.state.errorInfo && (
            <details className="mb-4 p-4 bg-gray-100 rounded-md">
              <summary>Error Details</summary>
              <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
            </details>
          )}
          <Button onClick={() => window.location.reload()}>Reload Page</Button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary

