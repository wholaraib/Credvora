import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8 px-5 pb-8">
      {/* Account Header Card */}
      <Skeleton className="h-6 w-32 bg-gray-300 dark:bg-gray-700" />
      <div className="bg-blue-50 dark:bg-slate-800 rounded-lg p-8 space-y-4">
        <div className="flex justify-between items-start">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3">
              <Skeleton className="h-10 w-48 bg-gray-300 dark:bg-gray-700" />
              <Skeleton className="h-6 w-20 bg-gray-300 dark:bg-gray-700" />
            </div>
            <Skeleton className="h-5 w-32 bg-gray-300 dark:bg-gray-700" />
          </div>
          <div className="space-y-2 text-right">
            <Skeleton className="h-5 w-40 bg-gray-300 dark:bg-gray-700 ml-auto" />
            <Skeleton className="h-8 w-32 bg-gray-300 dark:bg-gray-700 ml-auto" />
            <Skeleton className="h-4 w-36 bg-gray-300 dark:bg-gray-700 ml-auto" />
          </div>
        </div>
      </div>

      {/* Transaction Overview Card */}
      <div className="border rounded-lg p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <Skeleton className="h-6 w-40 bg-gray-300 dark:bg-gray-700" />
          <Skeleton className="h-8 w-28 bg-gray-300 dark:bg-gray-700" />
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 bg-gray-300 dark:bg-gray-700" />
            <Skeleton className="h-6 w-28 bg-gray-300 dark:bg-gray-700" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24 bg-gray-300 dark:bg-gray-700" />
            <Skeleton className="h-6 w-28 bg-gray-300 dark:bg-gray-700" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-16 bg-gray-300 dark:bg-gray-700" />
            <Skeleton className="h-6 w-28 bg-gray-300 dark:bg-gray-700" />
          </div>
        </div>

        {/* Chart Placeholder */}
        <Skeleton className="h-64 w-full bg-gray-300 dark:bg-gray-700" />
      </div>
    </div>
  );
}