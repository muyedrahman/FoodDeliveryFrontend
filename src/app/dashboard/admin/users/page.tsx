// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Edit2, ShieldAlert } from "lucide-react";

// const USERS = [
//   { id: "1", name: "John Doe", email: "john.doe@example.com", role: "Customer" },
//   { id: "2", name: "Bella Italia", email: "manager@bellaitalia.com", role: "Restaurant" },
//   { id: "3", name: "Admin Officer", email: "root@foodieai.com", role: "Admin" },
// ];

// export default function AdminUsers() {
//   return (
//     <div className="flex flex-col gap-6">
//       <div>
//         <h1 className="text-3xl font-extrabold tracking-tight text-secondary dark:text-white">Manage Users</h1>
//         <p className="text-muted-foreground mt-1">Review accounts, credentials, and modify role parameters.</p>
//       </div>

//       <Card className="border rounded-xl shadow-md bg-card text-card-foreground">
//         <CardHeader>
//           <CardTitle className="text-base font-bold text-secondary dark:text-white">Registered Members</CardTitle>
//         </CardHeader>
//         <CardContent className="overflow-x-auto">
//           <table className="w-full text-left border-collapse min-w-[500px]">
//             <thead>
//               <tr className="border-b text-xs text-muted-foreground uppercase font-bold">
//                 <th className="py-3 px-4">Member</th>
//                 <th className="py-3 px-4">Email</th>
//                 <th className="py-3 px-4">Role</th>
//                 <th className="py-3 px-4 text-right">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {USERS.map((u) => (
//                 <tr key={u.id} className="border-b last:border-b-0 hover:bg-muted/10">
//                   <td className="py-4 px-4 font-semibold text-sm text-secondary dark:text-white">{u.name}</td>
//                   <td className="py-4 px-4 text-sm text-muted-foreground">{u.email}</td>
//                   <td className="py-4 px-4">
//                     <span
//                       className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
//                         u.role === "Admin"
//                           ? "bg-rose-500/15 text-rose-500"
//                           : u.role === "Restaurant"
//                           ? "bg-blue-500/15 text-blue-500"
//                           : "bg-accent/15 text-accent"
//                       }`}
//                     >
//                       {u.role}
//                     </span>
//                   </td>
//                   <td className="py-4 px-4 text-right flex justify-end gap-2">
//                     <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-foreground/75">
//                       <Edit2 className="h-4 w-4" />
//                     </Button>
//                     <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-rose-500">
//                       <ShieldAlert className="h-4 w-4" />
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// 2

"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit2, ShieldAlert, Loader2 } from "lucide-react";
import { useAdminUsers, useUpdateUserRole } from "@/hooks/useDashboard";

const ROLE_COLORS: Record<string, string> = {
  admin: "bg-rose-500/15 text-rose-500",
  restaurant_owner: "bg-blue-500/15 text-blue-500",
  customer: "bg-accent/15 text-accent",
};

export default function AdminUsers() {
  const { data, isLoading, isError } = useAdminUsers();
  const updateRole = useUpdateUserRole();
  const [editingId, setEditingId] = useState<string | null>(null);

  const users = data?.users ?? [];

  const handleRoleChange = (id: string, role: string) => {
    updateRole.mutate({ id, role });
    setEditingId(null);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-secondary dark:text-white">
          Manage Users
        </h1>
        <p className="text-muted-foreground mt-1">
          Review accounts, credentials, and modify role parameters.
        </p>
      </div>

      <Card className="border rounded-xl shadow-md bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-base font-bold text-secondary dark:text-white">
            Registered Members ({users.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : isError ? (
            <p className="text-center text-sm text-muted-foreground py-8">
              Failed to load users.
            </p>
          ) : users.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground py-8">
              No users found.
            </p>
          ) : (
            <table className="w-full text-left border-collapse min-w-[500px]">
              <thead>
                <tr className="border-b text-xs text-muted-foreground uppercase font-bold">
                  <th className="py-3 px-4">Member</th>
                  <th className="py-3 px-4">Email</th>
                  <th className="py-3 px-4">Role</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(
                  (u: {
                    _id: string;
                    name: string;
                    email: string;
                    role: string;
                  }) => (
                    <tr
                      key={u._id}
                      className="border-b last:border-b-0 hover:bg-muted/10"
                    >
                      <td className="py-4 px-4 font-semibold text-sm text-secondary dark:text-white">
                        {u.name}
                      </td>
                      <td className="py-4 px-4 text-sm text-muted-foreground">
                        {u.email}
                      </td>
                      <td className="py-4 px-4">
                        {editingId === u._id ? (
                          <select
                            defaultValue={u.role}
                            onChange={(e) =>
                              handleRoleChange(u._id, e.target.value)
                            }
                            className="text-xs border rounded-lg px-2 py-1 bg-background"
                            autoFocus
                            onBlur={() => setEditingId(null)}
                          >
                            <option value="customer">Customer</option>
                            <option value="restaurant_owner">
                              Restaurant Owner
                            </option>
                            <option value="admin">Admin</option>
                          </select>
                        ) : (
                          <span
                            className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                              ROLE_COLORS[u.role] ?? "bg-muted text-foreground"
                            }`}
                          >
                            {u.role}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg text-foreground/75"
                            onClick={() => setEditingId(u._id)}
                            title="Change Role"
                          >
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 rounded-lg text-rose-500"
                            title="Flag User"
                          >
                            <ShieldAlert className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ),
                )}
              </tbody>
            </table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}