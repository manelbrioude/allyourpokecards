import { Skeleton } from "@/app/[locale]/components/ui/skeleton"; // Adjust path if necessary

export default function CardGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="space-y-4">
          {/* Skeleton for the card image */}
          <Skeleton className="h-48 w-full" />
          {/* Skeleton for the card name */}
          <Skeleton className="h-4 w-3/4" />
          {/* Skeleton for the card details (type, hp, rarity) */}
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
