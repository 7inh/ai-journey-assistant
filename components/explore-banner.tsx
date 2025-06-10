"use client";

import Image from "next/image";
import Link from "next/link";
import type { Agent } from "@/interfaces";
import { getAgentExploreRoute } from "@/constants/routes.constants";

interface ExploreBannerProps {
  featuredAgent?: Agent; // Make it optional in case no agent is featured
}

export default function ExploreBanner({ featuredAgent }: ExploreBannerProps) {
  if (!featuredAgent) {
    // Fallback or default banner if no specific agent is featured
    return (
      <div className="relative h-[300px] md:h-[400px] lg:h-[480px] overflow-hidden group">
        <Image
          src={`/placeholder.svg?width=1200&height=480&query=Featured+AI+Agents`}
          alt="Featured AI Agents"
          fill
          priority
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end">
          <div className="container mx-auto px-4 md:px-6 pt-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-sky-300 mb-1 md:mb-2">
              Discover Top Agents
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-3 leading-tight">
              Power Up Your Workflow
            </h1>
            <p className="text-base md:text-lg text-neutral-200 max-w-xl">
              Explore a curated selection of AI agents designed to boost your
              productivity and creativity.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const bannerCategoryText = featuredAgent.category
    ? `${featuredAgent.category.toUpperCase()} WE LOVE`
    : "FEATURED AGENT";

  return (
    <Link href={getAgentExploreRoute(featuredAgent.id)} className="block group">
      <div className="-translate-y-20 relative h-[300px] md:h-[400px] lg:h-[480px] overflow-hidden shadow-2xl">
        <Image
          src={
            featuredAgent.bannerImageUrl ||
            `/placeholder.svg?width=1200&height=480&query=${featuredAgent.name}+banner`
          }
          alt={`${featuredAgent.name} banner`}
          fill
          priority
          className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end">
          <div className="container mx-auto px-4 md:px-6 p-4 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-sky-300 mb-1 md:mb-2">
              {bannerCategoryText}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-3 leading-tight">
              {featuredAgent.name}
            </h1>
            <p className="text-base md:text-lg text-neutral-200 max-w-xl line-clamp-2 md:line-clamp-3">
              {featuredAgent.bannerSlogan || featuredAgent.description}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
