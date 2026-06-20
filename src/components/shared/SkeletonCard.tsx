// import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
// import { Skeleton } from "@/components/ui/skeleton";

// export default function SkeletonCard() {
//   return (
//     <Card className="overflow-hidden border rounded-xl shadow-md">
//       {/* Image Skeleton */}
//       <Skeleton className="h-48 w-full rounded-t-xl" />

//       <CardHeader className="p-4 pb-2">
//         <div className="flex items-center justify-between">
//           <Skeleton className="h-3 w-16" />
//           <Skeleton className="h-3 w-12" />
//         </div>
//         <Skeleton className="h-5 w-3/4 mt-2" />
//       </CardHeader>

//       <CardContent className="p-4 pt-0 pb-3">
//         <Skeleton className="h-4 w-full mt-1" />
//         <Skeleton className="h-4 w-5/6 mt-1" />
//         <Skeleton className="h-3 w-1/2 mt-3" />
//       </CardContent>

//       <CardFooter className="p-4 pt-0 flex items-center justify-between border-t mt-2">
//         <Skeleton className="h-6 w-16" />
//         <Skeleton className="h-9 w-24 rounded-xl" />
//       </CardFooter>
//     </Card>
//   );
// }

export default function SkeletonCard() {
  return (
    <div className="flex h-[380px] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-[#2D3748]">
      <div className="h-48 w-full animate-pulse bg-gray-200 dark:bg-gray-700" />
      <div className="flex flex-1 flex-col justify-between p-4">
        <div className="space-y-2">
          <div className="h-4 w-3/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
          <div className="h-3 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="h-5 w-1/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
        <div className="h-9 w-full animate-pulse rounded-xl bg-gray-200 dark:bg-gray-700" />
      </div>
    </div>
  );
}