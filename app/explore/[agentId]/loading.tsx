import { Skeleton } from "@/components/ui/skeleton"

export default function AgentDetailLoading() {
  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      <Skeleton className="h-8 w-32 mb-6" /> {/* Back button */}
      {/* Header Section */}
      <header className="mb-8 md:mb-12">
        <Skeleton className="relative w-full h-48 md:h-64 lg:h-80 rounded-lg mb-6" />
        <div className="flex flex-col md:flex-row md:items-end md:gap-6">
          <Skeleton className="h-24 w-24 md:h-32 md:w-32 rounded-lg border-4 border-background -mt-12 md:-mt-16 ml-4 md:ml-0" />
          <div className="mt-4 md:mt-0 flex-1 space-y-2">
            <Skeleton className="h-10 w-3/4" /> {/* Agent Name */}
            <Skeleton className="h-4 w-1/2" /> {/* Developer Name, Category */}
            <Skeleton className="h-6 w-1/3" /> {/* Rating */}
          </div>
          <Skeleton className="h-12 w-full md:w-36 mt-4 md:mt-0" /> {/* Install Button */}
        </div>
      </header>
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <section>
            <Skeleton className="h-8 w-1/4 mb-3" /> {/* Section Title */}
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4" />
          </section>
          <section>
            <Skeleton className="h-8 w-1/3 mb-4" /> {/* Section Title */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Skeleton className="aspect-video rounded-lg" />
              <Skeleton className="aspect-video rounded-lg" />
            </div>
          </section>
          <section>
            <Skeleton className="h-8 w-1/2 mb-4" /> {/* Section Title */}
            <Skeleton className="h-20 w-full mb-4 rounded-lg" /> {/* Rating Summary */}
            <Skeleton className="h-24 w-full mb-3 rounded-lg" /> {/* Review Card */}
            <Skeleton className="h-24 w-full rounded-lg" /> {/* Review Card */}
          </section>
        </div>
        {/* Right Column */}
        <aside className="space-y-8">
          <Skeleton className="h-48 w-full rounded-lg" /> {/* Information Card */}
          <section>
            <Skeleton className="h-6 w-1/3 mb-3" /> {/* Section Title */}
            <Skeleton className="h-16 w-full mb-3 rounded-lg" /> {/* Related Agent */}
            <Skeleton className="h-16 w-full rounded-lg" /> {/* Related Agent */}
          </section>
        </aside>
      </div>
    </div>
  )
}
