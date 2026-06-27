import { Component, Suspense } from 'react';
import './SplineScene.css';

// Error Boundary untuk menangani crash dari Spline
class SplineErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <SplineFallback isError />;
    }
    return this.props.children;
  }
}

function SplineFallback({ isError = false }) {
  return (
    <div className="spline-fallback">
      {isError ? (
        <div className="spline-fallback__error">
          <div className="spline-fallback__orb" />
        </div>
      ) : (
        <div className="spline-loader">
          <div className="spline-loader__ring"></div>
          <div className="spline-loader__ring"></div>
          <div className="spline-loader__ring"></div>
        </div>
      )}
      <p className="spline-loader__text">{isError ? '3D Scene' : 'Loading 3D...'}</p>
    </div>
  );
}

/**
 * SplineScene — wrapper aman untuk iframe Spline
 * Gunakan iframeUrl langsung dari Spline share link
 */
export default function SplineScene({ iframeUrl, className = '', style = {} }) {
  if (!iframeUrl) return null;
  
  return (
    <SplineErrorBoundary>
      <div className={`spline-wrapper ${className}`} style={style}>
        <Suspense fallback={<SplineFallback />}>
          <iframe
            src={iframeUrl}
            className="spline-iframe"
            frameBorder="0"
            loading="lazy"
            title="3D Scene"
            allow="autoplay"
          />
        </Suspense>
      </div>
    </SplineErrorBoundary>
  );
}
