"use client";

import { CeloProvider } from "@celo/react-celo";
import "@celo/react-celo/lib/styles.css";

import { Inter } from "next/font/google";

import "@/styles/globals.css";
import "@/styles/tailwind.css";
import Navbar from "@/components/navbar/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CeloProvider
          dapp={{
            name: "My awesome dApp",
            description: "My awesome description",
            url: "https://982e-182-208-87-9.ngrok-free.app",
            // if you plan on supporting WalletConnect compatible wallets, you need to provide a project ID, you can find it here: https://docs.walletconnect.com/2.0/cloud/relay
            walletConnectProjectId: "c2d1032a4424947c0a8447929a10a25a",
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
          <div className="bg-background dark:bg-background-900 flex min-h-screen w-full flex-col p-5 dark:text-white">
            <Navbar />

            <div className="flex flex-col justify-center gap-6 overflow-y-auto pt-5">{children}</div>
          </div>
        </CeloProvider>
      </body>
    </html>
  );
}
