import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="space-y-8">
      {/* Form Card */}
      <div className="max-w-2xl mx-auto p-8 space-y-6">
        {/* Header Section */}
        <div className="space-y-2">
          <Skeleton className="h-10 w-40 bg-gray-300 dark:bg-gray-700" />{" "}
          {/* Back button */}
          <Skeleton className="h-12 w-64 bg-gray-300 dark:bg-gray-700" />{" "}
          {/* Title */}
          <Skeleton className="h-5 w-48 bg-gray-300 dark:bg-gray-700" />{" "}
          {/* Subtitle */}
        </div>
        {/* ReceiptScanner Section */}
        <Skeleton className="h-10 w-32 bg-gray-300 dark:bg-gray-700" />{" "}
        {/* Section title */}
        {/* Transaction Type */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-24 bg-gray-300 dark:bg-gray-700" />{" "}
          {/* Label */}
          <Skeleton className="h-10 w-32 bg-gray-300 dark:bg-gray-700" />{" "}
          {/* Dropdown */}
        </div>
        {/* Amount and Account Row */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-20 bg-gray-300 dark:bg-gray-700" />{" "}
            {/* Label */}
            <Skeleton className="h-10 w-full bg-gray-300 dark:bg-gray-700" />{" "}
            {/* Input */}
          </div>
          <div className="space-y-2">
            <Skeleton className="h-5 w-20 bg-gray-300 dark:bg-gray-700" />{" "}
            {/* Label */}
            <Skeleton className="h-10 w-full bg-gray-300 dark:bg-gray-700" />{" "}
            {/* Dropdown */}
          </div>
        </div>
        {/* Category */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-24 bg-gray-300 dark:bg-gray-700" />{" "}
          {/* Label */}
          <Skeleton className="h-10 w-full bg-gray-300 dark:bg-gray-700" />{" "}
          {/* Dropdown */}
        </div>
        {/* Date */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-16 bg-gray-300 dark:bg-gray-700" />{" "}
          {/* Label */}
          <Skeleton className="h-10 w-full bg-gray-300 dark:bg-gray-700" />{" "}
          {/* Input */}
        </div>
        {/* Description */}
        <div className="space-y-2">
          <Skeleton className="h-5 w-28 bg-gray-300 dark:bg-gray-700" />{" "}
          {/* Label */}
          <Skeleton className="h-20 w-full bg-gray-300 dark:bg-gray-700" />{" "}
          {/* Textarea */}
        </div>
        {/* Submit Button */}
        <Skeleton className="h-10 w-full bg-gray-300 dark:bg-gray-700" />
      </div>
    </div>
  );
}
