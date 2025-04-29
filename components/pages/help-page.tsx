"use client"

import { PageLayout } from "@/components/pages/page-layout"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function HelpPage() {
  return (
    <PageLayout title="Help & Support">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I connect my wallet?</AccordionTrigger>
              <AccordionContent>
                Click on the "Connect Wallet" button in the top right corner and select your preferred wallet provider.
                Follow the prompts to complete the connection process.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>What are the fees for transactions?</AccordionTrigger>
              <AccordionContent>
                Transaction fees vary depending on the blockchain network and current network congestion. FinX charges a
                0.1% platform fee on all transactions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How do I recover my account?</AccordionTrigger>
              <AccordionContent>
                Account recovery depends on your wallet provider. Most wallets can be recovered using your seed phrase
                or private key. Never share these with anyone.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Contact Support</h2>
          <p className="text-slate-300 mb-4">
            Our support team is available 24/7 to assist you with any questions or issues.
          </p>
          <div className="space-y-4">
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Email Support</h3>
              <p className="text-sm text-slate-400">support@finxultimate.com</p>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Live Chat</h3>
              <p className="text-sm text-slate-400">Available in the bottom right corner of the app</p>
            </div>
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Community Support</h3>
              <p className="text-sm text-slate-400">Join our Discord or Telegram community</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
