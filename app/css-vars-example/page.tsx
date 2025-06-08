import CustomStyledBox from "@/components/custom-styled-box"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"

export default function CssVarsExamplePage() {
  return (
    <div className="container py-lg">
      {" "}
      {/* Using Tailwind's container which now uses CSS vars */}
      <h1 className="text-4xl font-bold mb-lg text-primary">CSS Variables & Design Tokens</h1>
      <p className="mb-md text-base text-muted-foreground">
        This page demonstrates the use of CSS variables for styling. The colors, spacing, and font sizes are defined in{" "}
        <code>app/globals.css</code>
        and are consumed by Tailwind CSS utility classes or can be used directly in styles.
      </p>
      <div className="grid md:grid-cols-2 gap-md">
        <CustomStyledBox title="Styled with Tailwind">
          This box uses Tailwind utility classes like <code>p-md</code> (padding: var(--spacing-md)),
          <code>bg-accent</code>, <code>text-lg</code>, which are configured in <code>tailwind.config.ts</code> to
          reference our CSS variables.
        </CustomStyledBox>

        <div
          style={{
            padding: "var(--spacing-lg)",
            backgroundColor: "hsl(var(--secondary))",
            color: "hsl(var(--secondary-foreground))",
            borderRadius: "var(--radius-lg)",
            border: "1px solid hsl(var(--border))",
            fontSize: "var(--font-size-base)",
            marginBottom: "var(--spacing-sm)",
          }}
        >
          <h3 style={{ fontSize: "var(--font-size-xl)", marginBottom: "var(--spacing-xs)", fontWeight: "600" }}>
            Styled Directly
          </h3>
          This box is styled using inline styles that directly reference CSS variables like{" "}
          <code>var(--spacing-lg)</code> and <code>hsl(var(--secondary))</code>.
        </div>
      </div>
      <Card className="mt-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Interactive Elements</CardTitle>
          <CardDescription>Buttons and inputs also use these CSS variables.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-md">
          <div className="flex flex-wrap gap-sm">
            <Button variant="default">Primary Button</Button>
            <Button variant="secondary">Secondary Button</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline Button</Button>
            <Button variant="ghost">Ghost Button</Button>
            <Button variant="link">Link Button</Button>
          </div>
          <div>
            <label htmlFor="example-input" className="text-sm font-medium mb-xs block">
              Example Input
            </label>
            <Input type="text" id="example-input" placeholder="Styled with CSS vars via Tailwind" />
          </div>
        </CardContent>
        <CardFooter>
          <p className="text-xs text-muted-foreground">
            All shadcn/ui components inherently use these CSS variables for their styling.
          </p>
        </CardFooter>
      </Card>
      <div className="mt-lg p-md border border-dashed rounded-md">
        <h3 className="text-xl font-semibold mb-sm">Font Size Showcase (via Tailwind)</h3>
        <p className="text-xs">Font size xs: var(--font-size-xs)</p>
        <p className="text-sm">Font size sm: var(--font-size-sm)</p>
        <p className="text-base">Font size base: var(--font-size-base)</p>
        <p className="text-lg">Font size lg: var(--font-size-lg)</p>
        <p className="text-xl">Font size xl: var(--font-size-xl)</p>
        <p className="text-2xl">Font size 2xl: var(--font-size-2xl)</p>
        <p className="text-3xl">Font size 3xl: var(--font-size-3xl)</p>
        <p className="text-4xl">Font size 4xl: var(--font-size-4xl)</p>
        <p className="text-5xl">Font size 5xl: var(--font-size-5xl)</p>
      </div>
      <div className="mt-lg p-md border border-dashed rounded-md">
        <h3 className="text-xl font-semibold mb-sm">Spacing Showcase (via Tailwind Margin Bottom)</h3>
        <div className="bg-primary/10 p-xs mb-xs">Margin bottom xs</div>
        <div className="bg-primary/10 p-xs mb-sm">Margin bottom sm</div>
        <div className="bg-primary/10 p-xs mb-md">Margin bottom md</div>
        <div className="bg-primary/10 p-xs mb-lg">Margin bottom lg</div>
        <div className="bg-primary/10 p-xs mb-xl">Margin bottom xl</div>
        <div className="bg-primary/10 p-xs mb-2xl">Margin bottom 2xl</div>
        <div className="bg-primary/10 p-xs mb-3xl">Margin bottom 3xl</div>
      </div>
    </div>
  )
}
