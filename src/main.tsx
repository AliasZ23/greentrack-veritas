
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Using a more explicit error boundary for the root
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Failed to find the root element");
}

const root = createRoot(rootElement);

// Add error handler for React errors
const ErrorFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="max-w-md w-full p-6 text-center">
      <h1 className="text-4xl font-bold mb-2">Oops!</h1>
      <p className="text-xl text-muted-foreground mb-6">
        Something went wrong with the application.
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Reload App
      </button>
    </div>
  </div>
);

try {
  root.render(<App />);
} catch (error) {
  console.error("Failed to render app:", error);
  root.render(<ErrorFallback />);
}
