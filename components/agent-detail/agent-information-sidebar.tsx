import type React from "react"
import type { Agent, UsagePricingTier } from "@/interfaces"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Info, Tag, GitBranch, CalendarDays, UserSquare, DollarSign, HelpCircle } from "lucide-react"

interface AgentInformationSidebarProps {
  agent: Agent
}

const InfoItem: React.FC<{ icon: React.ElementType; label: string; value?: string | null | React.ReactNode }> = ({
  icon: Icon,
  label,
  value,
}) => {
  if (value === undefined || value === null || value === "") return null
  return (
    <div className="flex items-start text-sm">
      <Icon className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground flex-shrink-0" />
      <div>
        <span className="font-medium">{label}:</span> <span className="text-muted-foreground">{value}</span>
      </div>
    </div>
  )
}

const PricingTierDisplay: React.FC<{ tier: UsagePricingTier }> = ({ tier }) => (
  <div className="p-2 border rounded-md bg-muted/50">
    {tier.tierName && <p className="font-semibold text-xs mb-0.5">{tier.tierName}</p>}
    <p className="text-xs">
      {tier.rate} {tier.currency} {tier.unit}
    </p>
    {tier.freeQuota && (
      <p className="text-xs text-green-600 dark:text-green-500">First {tier.freeQuota} units/month free</p>
    )}
    {tier.description && <p className="text-xs text-muted-foreground mt-0.5">{tier.description}</p>}
  </div>
)

export default function AgentInformationSidebar({ agent }: AgentInformationSidebarProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center">
          <Info className="h-5 w-5 mr-2" />
          Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <InfoItem icon={GitBranch} label="Version" value={agent.version} />
        {agent.latestVersion && agent.version !== agent.latestVersion && (
          <InfoItem icon={GitBranch} label="Latest" value={`${agent.latestVersion} (Update available)`} />
        )}
        <InfoItem
          icon={CalendarDays}
          label="Last Updated"
          value={agent.lastUpdatedDate ? new Date(agent.lastUpdatedDate).toLocaleDateString() : "N/A"}
        />
        <InfoItem icon={UserSquare} label="Developer" value={agent.developerName || "Unknown"} />

        <div className="flex items-start text-sm">
          <DollarSign className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground flex-shrink-0" />
          <div>
            <span className="font-medium">Billing:</span>
            <span className="text-muted-foreground ml-1 capitalize">{agent.billingType.replace("-", " ")}</span>
          </div>
        </div>

        {agent.billingType === "pay-as-you-go" && agent.usagePricingTiers && agent.usagePricingTiers.length > 0 && (
          <div className="space-y-2 pt-1">
            <p className="text-xs font-medium text-muted-foreground">Pricing Tiers:</p>
            {agent.usagePricingTiers.map((tier, index) => (
              <PricingTierDisplay key={index} tier={tier} />
            ))}
          </div>
        )}
        {agent.billingType === "contact-sales" && (
          <InfoItem icon={HelpCircle} label="Pricing" value="Contact sales for enterprise pricing details." />
        )}

        {agent.tags && agent.tags.length > 0 && (
          <div className="flex items-start text-sm pt-1">
            <Tag className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground flex-shrink-0" />
            <div>
              <span className="font-medium">Tags:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {agent.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
