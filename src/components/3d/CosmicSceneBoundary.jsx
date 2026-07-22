import { Component } from 'react';

/**
 * Class-based error boundary (required — hooks can't catch render errors).
 * If the CosmicScene throws (WebGL unsupported, context loss, shader error,
 * etc.) this renders a static warm gradient instead, so the hero section
 * never breaks.
 */
export class CosmicSceneBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.warn('CosmicScene failed to render, falling back to static gradient.', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div className="w-full h-full cosmic-fallback" />;
    }
    return this.props.children;
  }
}
