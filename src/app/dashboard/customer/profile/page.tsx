// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Mail, Phone, MapPin } from "lucide-react";

// export default function CustomerProfile() {
//   return (
//     <div className="flex flex-col gap-6">
//       <div>
//         <h1 className="text-3xl font-extrabold tracking-tight text-secondary dark:text-white">My Profile</h1>
//         <p className="text-muted-foreground mt-1">Manage your account information and preferences.</p>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <Card className="border rounded-xl shadow-md lg:col-span-1 bg-card text-card-foreground">
//           <CardHeader className="flex flex-col items-center gap-4">
//             <div className="h-24 w-24 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-3xl">
//               JD
//             </div>
//             <div className="text-center">
//               <h2 className="font-bold text-lg text-secondary dark:text-white">John Doe</h2>
//               <p className="text-xs text-muted-foreground">Gold Level Gourmet</p>
//             </div>
//           </CardHeader>
//         </Card>

//         <Card className="border rounded-xl shadow-md lg:col-span-2 bg-card text-card-foreground">
//           <CardHeader>
//             <CardTitle className="text-base font-bold text-secondary dark:text-white">Contact & Address Info</CardTitle>
//           </CardHeader>
//           <CardContent className="flex flex-col gap-4">
//             <div className="flex items-center gap-3 border-b pb-3">
//               <Mail className="h-5 w-5 text-primary shrink-0" />
//               <div>
//                 <p className="text-[10px] text-muted-foreground font-bold uppercase">Email Address</p>
//                 <p className="text-sm font-semibold">john.doe@example.com</p>
//               </div>
//             </div>

//             <div className="flex items-center gap-3 border-b pb-3">
//               <Phone className="h-5 w-5 text-primary shrink-0" />
//               <div>
//                 <p className="text-[10px] text-muted-foreground font-bold uppercase">Phone Number</p>
//                 <p className="text-sm font-semibold">+1 (555) 234-5678</p>
//               </div>
//             </div>

//             <div className="flex items-start gap-3">
//               <MapPin className="h-5 w-5 text-primary shrink-0 mt-1" />
//               <div>
//                 <p className="text-[10px] text-muted-foreground font-bold uppercase">Delivery Address</p>
//                 <p className="text-sm font-semibold">123 Culinary Drive, Apt 4B, San Francisco, CA 94103</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }

// 2

"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useUser } from "@clerk/nextjs";
import { Check } from "lucide-react";

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Enter a valid email address"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .max(15, "Enter a valid phone number"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function CustomerProfilePage() {
  const { user } = useUser();
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.fullName ?? "",
      email: user?.primaryEmailAddress?.emailAddress ?? "",
      phone: "",
      address: "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    // In a full implementation this would PATCH /api/v1/users/profile
    await new Promise((resolve) => setTimeout(resolve, 600));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
    console.log("Profile updated:", data);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-[#2D3748] dark:text-white">
          Profile
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Update your personal information.
        </p>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md dark:border-gray-700 dark:bg-[#2D3748]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-[#2D3748] dark:text-white">
              Full Name
            </label>
            <input
              {...register("name")}
              type="text"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-[#2D3748] outline-none ring-[#FF6B35] focus:ring-2 dark:border-gray-600 dark:bg-[#1A202C] dark:text-white"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#2D3748] dark:text-white">
              Email Address
            </label>
            <input
              {...register("email")}
              type="email"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-[#2D3748] outline-none ring-[#FF6B35] focus:ring-2 dark:border-gray-600 dark:bg-[#1A202C] dark:text-white"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#2D3748] dark:text-white">
              Phone Number
            </label>
            <input
              {...register("phone")}
              type="tel"
              placeholder="01XXXXXXXXX"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-[#2D3748] outline-none ring-[#FF6B35] focus:ring-2 dark:border-gray-600 dark:bg-[#1A202C] dark:text-white"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">
                {errors.phone.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-[#2D3748] dark:text-white">
              Delivery Address
            </label>
            <textarea
              {...register("address")}
              rows={3}
              placeholder="House, Road, Area, City"
              className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-[#2D3748] outline-none ring-[#FF6B35] focus:ring-2 dark:border-gray-600 dark:bg-[#1A202C] dark:text-white"
            />
            {errors.address && (
              <p className="mt-1 text-xs text-red-500">
                {errors.address.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center justify-center gap-2 rounded-xl bg-[#FF6B35] px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#e85c2a] disabled:opacity-60"
          >
            {saved ? (
              <>
                <Check className="h-4 w-4" /> Saved
              </>
            ) : isSubmitting ? (
              "Saving..."
            ) : (
              "Save Changes"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}