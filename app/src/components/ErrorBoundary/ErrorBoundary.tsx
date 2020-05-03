import React, { ReactNode, PureComponent } from "react";
import { ErrorState } from "src/components/ErrorState/ErrorState";

interface Props {
  children: ReactNode;
}

interface State {
  error: boolean;
}

export class ErrorBoundary extends PureComponent<Props, State> {
  state = {
    error: false,
  };

  componentDidCatch(error: Error | null) {
    this.setState({ error: true });
  }

  render() {
    return this.state.error ? <ErrorState /> : this.props.children;
  }
}

export default ErrorBoundary;
