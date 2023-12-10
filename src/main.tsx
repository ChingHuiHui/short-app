import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ErrorBoundary } from 'react-error-boundary';

const Fallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => {
  return (
    <div className='flex flex-col justify-center items-center h-[100dvh]'>
      <div className='max-w-[768px] space-y-6'>
        <h2 className='text-3xl'>Something went wrong:</h2>
        <div className='border p-2 w-full'>
          <pre className='text-red-500'>{error.message}</pre>
        </div>
        <button className='underline font-bold' onClick={resetErrorBoundary}>Try Again</button>
      </div>
    </div>
  );
}


const router = createBrowserRouter([
  {
    path: "/",
    element:  (
      <React.StrictMode>
        <ErrorBoundary 
          fallbackRender={Fallback}
          onReset={() => window.location.reload()}
        >
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    )
  }
]);

ReactDOM.createRoot(document.getElementById("root")  as HTMLElement).render(
  <RouterProvider router={router} />
);