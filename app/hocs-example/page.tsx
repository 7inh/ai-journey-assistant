"use client"

import type React from "react"

import withAuthentication from "@/hocs/with-authentication"
import withDataFetching, { type WithDataFetchingProps } from "@/hocs/with-data-fetching"
import withErrorDisplay from "@/hocs/with-error-display"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// --- Mock Data and Fetcher ---
interface Post {
  id: number
  title: string
  body: string
}

const mockPosts: Post[] = [
  { id: 1, title: "First Post", body: "This is the first blog post." },
  { id: 2, title: "Second Post", body: "Another interesting article." },
]

// Simulate an API call
const fetchPosts = (): Promise<Post[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a chance of error
      if (Math.random() < 0.2) {
        reject(new Error("Failed to fetch posts. Please try again."))
      } else {
        resolve(mockPosts)
      }
    }, 1500)
  })
}

// --- Components ---

// 1. Component to display posts
interface PostListProps extends WithDataFetchingProps<Post[]> {
  // No additional props from parent
}

const PostListComponent: React.FC<PostListProps> = ({ data: posts, isLoading, error, refetch }) => {
  // Note: `error` prop is implicitly handled by withErrorDisplay if composed after withDataFetching
  // but we can still access it here if needed for more specific logic before withErrorDisplay kicks in.

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner size="lg" />
        <p className="ml-2">Loading posts...</p>
      </div>
    )
  }

  // Error display is handled by withErrorDisplay, but we could have a specific check here too
  // if (error) return <p>Error handled by PostListComponent: {error.message}</p>;

  if (!posts || posts.length === 0) {
    return <p>No posts available.</p>
  }

  return (
    <div>
      <Button onClick={refetch} className="mb-4">
        Refresh Posts
      </Button>
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{post.body}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

// 2. A simple "dashboard" component that requires authentication
const DashboardComponent: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>User Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Welcome to your personalized dashboard! Here you can manage your settings and view your activity.</p>
        <p className="mt-2 text-sm text-muted-foreground">This content is only visible to authenticated users.</p>
      </CardContent>
    </Card>
  )
}

// --- Composing HOCs ---

// Apply HOCs to PostListComponent:
// Order matters: withErrorDisplay should ideally wrap the component that receives the error prop.
// withDataFetching provides `data`, `isLoading`, `error`.
// withErrorDisplay consumes `error`.
const EnhancedPostList = withDataFetching<Post[]>({ fetcher: fetchPosts })(
  withErrorDisplay(PostListComponent), // withErrorDisplay wraps PostListComponent first
)

// Apply HOC to DashboardComponent
const SecureDashboard = withAuthentication(DashboardComponent)

// --- Page Component ---
export default function HOCsExamplePage() {
  return (
    <div className="container mx-auto py-8 space-y-8">
      <div>
        <h2 className="text-2xl font-semibold mb-4">Secure Dashboard Example</h2>
        <SecureDashboard />
      </div>

      <hr />

      <div>
        <h2 className="text-2xl font-semibold mb-4">Data Fetching with Error Display Example</h2>
        <EnhancedPostList />
      </div>
    </div>
  )
}
