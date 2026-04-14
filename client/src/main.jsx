import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/state.css'
import App from './App.jsx'
import { CartProvider } from './context/CartProvider'
import { ToastProvider } from './context/ToastProvider'
import { WishlistProvider } from './context/WishlistProvider'
import { RecentlyViewedProvider } from './context/RecentlyViewedProvider'
import { CompareProvider } from './context/CompareProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ToastProvider>
      <RecentlyViewedProvider>
        <CompareProvider>
          <WishlistProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </WishlistProvider>
        </CompareProvider>
      </RecentlyViewedProvider>
    </ToastProvider>
  </StrictMode>,
)