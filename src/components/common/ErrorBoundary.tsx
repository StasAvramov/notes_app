import React, { Component } from 'react';

export default class ErrorBoundary extends Component<
  {},
  { hasError: boolean }
> {
  constructor(props: { error: Error }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    // Обновить состояние с тем, чтобы следующий рендер показал запасной UI.
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Что-то пошло не так.</h1>;
    }

    return this.props.children;
  }
}
