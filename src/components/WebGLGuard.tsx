import {
  Component,
  type ErrorInfo,
  type PropsWithChildren,
  type ReactNode,
} from "react";

interface WebGLGuardProps extends PropsWithChildren {
  fallback: ReactNode;
}

interface WebGLGuardState {
  hasError: boolean;
}

const supportsWebGL = () => {
  if (typeof document === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
};

export class WebGLGuard extends Component<WebGLGuardProps, WebGLGuardState> {
  state: WebGLGuardState = {
    hasError: !supportsWebGL(),
  };

  static getDerivedStateFromError(): WebGLGuardState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn(
      "3D scene unavailable; rendering the accessible fallback.",
      error,
      info
    );
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
