"use client"

import { PageLayout } from "@/components/pages/page-layout"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function SettingsPage() {
  return (
    <PageLayout title="Settings">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Account Settings</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="notifications" className="text-white">
                  Email Notifications
                </Label>
                <p className="text-sm text-slate-400">Receive email alerts for important events</p>
              </div>
              <Switch id="notifications" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="2fa" className="text-white">
                  Two-Factor Authentication
                </Label>
                <p className="text-sm text-slate-400">Add an extra layer of security</p>
              </div>
              <Switch id="2fa" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="activity" className="text-white">
                  Activity Logs
                </Label>
                <p className="text-sm text-slate-400">Track all account activity</p>
              </div>
              <Switch id="activity" defaultChecked />
            </div>
          </div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Security Settings</h2>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="whitelist" className="text-white">
                  Address Whitelist
                </Label>
                <p className="text-sm text-slate-400">Only allow transfers to whitelisted addresses</p>
              </div>
              <Switch id="whitelist" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="spending" className="text-white">
                  Spending Limits
                </Label>
                <p className="text-sm text-slate-400">Set daily transaction limits</p>
              </div>
              <Switch id="spending" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="biometric" className="text-white">
                  Biometric Authentication
                </Label>
                <p className="text-sm text-slate-400">Use fingerprint or face ID for transactions</p>
              </div>
              <Switch id="biometric" />
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
