import { createConfig, http } from 'wagmi'
import { mainnet, sepolia, polygon, optimism, arbitrum, base } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet, sepolia, polygon, optimism, arbitrum, base,],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
})