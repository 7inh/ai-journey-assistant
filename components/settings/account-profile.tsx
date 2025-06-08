import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function AccountProfile() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Profile</CardTitle>
        <CardDescription>Update your personal information and account settings.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" defaultValue="John Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input id="email" type="email" defaultValue="john.doe@example.com" />
        </div>
        <Button>Save Changes</Button>
      </CardContent>
    </Card>
  )
}
