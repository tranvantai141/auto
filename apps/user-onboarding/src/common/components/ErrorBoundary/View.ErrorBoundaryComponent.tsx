import React from "react";
import { GestureResponderEvent } from "react-native";
import ErrorScreen from "./ErrorScreen";
import { TErrorBoundaryState, IErrorBoundaryProps, IErrorScreenProps } from './Model.ErrorBoundaryComponent';

class ErrorBoundary extends React.Component<IErrorBoundaryProps, TErrorBoundaryState> {
  state: TErrorBoundaryState = { error: null };

  static defaultProps: { ErrorScreen: React.ComponentType<IErrorScreenProps> } = {
    ErrorScreen: ErrorScreen,
  };

  static getDerivedStateFromError(error: Error): TErrorBoundaryState {
    return { error };
  }

  componentDidCatch(error: Error, { componentStack }: React.ErrorInfo) {
    if (typeof this.props.onError === "function") {
      this.props.onError.call(this, error, componentStack);
    }
  }

  resetError: (event: GestureResponderEvent) => void = () => {
    this.setState({ error: null });
  };

  render(): React.ReactNode {
    const { ErrorScreen } = this.props;

    return this.state.error ? (
      <ErrorScreen error={this.state.error} resetError={this.resetError} />
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
