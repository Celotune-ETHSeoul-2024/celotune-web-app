"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { createConfig, WagmiProvider, http } from "wagmi";
import { celo, celoAlfajores } from "viem/chains";
import { createClient } from "viem";
import { CeloProvider } from "@celo/react-celo";
import "@celo/react-celo/lib/styles.css";

import { Inter } from "next/font/google";

import "@/styles/globals.css";
import "@/styles/tailwind.css";
import Navbar from "@/components/navbar/navbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

const projectId = "c2d1032a4424947c0a8447929a10a25a";
const url = "http://localhost:7777/";

export const config = createConfig({
  chains: [celoAlfajores],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <CeloProvider
          dapp={{
            name: "My awesome dApp",
            description: "My awesome description",
            url,
            // if you plan on supporting WalletConnect compatible wallets, you need to provide a project ID, you can find it here: https://docs.walletconnect.com/2.0/cloud/relay
            walletConnectProjectId: projectId,
            // icon url is optional, but recommended
            icon: "https://example.com/icon.png",
          }}
          connectModal={{
            // This options changes the title of the modal and can be either a string or a react element
            title: <span>Connect your Wallet</span>,
            providersOptions: {
              // This option toggles on and off the searchbar
              searchable: true,
            },
          }}
        >
          <html lang="en">
            <body className={inter.className}>
              <div className="dark:bg-background-900 flex min-h-screen w-full flex-col bg-[#f4f4f4] p-5 dark:text-white">
                <Navbar />

                <div className="flex flex-col justify-center gap-6 overflow-y-auto pt-5">{children}</div>

                <ToastContainer
                  position="top-center"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="light"
                />
              </div>
            </body>
          </html>
        </CeloProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}
