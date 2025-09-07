import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultConfig,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { WagmiProvider, } from 'wagmi';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  base,
} from 'wagmi/chains';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import "@rainbow-me/rainbowkit/styles.css";

const PROJECTID = import.meta.env.VITE_PROJECTID;
const config = getDefaultConfig({
  appName: 'first project',
  projectId: PROJECTID,
  chains: [mainnet, polygon, optimism, arbitrum, base, ],
  ssr: true,
});
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <WagmiProvider config={config}>
       <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact">
        <App />
      </RainbowKitProvider>
    </QueryClientProvider>

    </WagmiProvider>
    
  </StrictMode>,
)
