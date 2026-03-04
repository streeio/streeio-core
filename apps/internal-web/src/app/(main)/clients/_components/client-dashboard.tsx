"use client";

import { Button } from "@streeio-core/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@streeio-core/ui/components/dropdown-menu";
import StatsCard from "@streeio-core/ui/components/stats-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@streeio-core/ui/components/table";
import {
  AtSign,
  Briefcase,
  Building2,
  Calendar,
  MoreHorizontal,
  Plus,
  Shield,
  User,
  UserCheck,
  Users as UsersIcon,
  UserX,
} from "lucide-react";
import { useState } from "react";
import type { Client } from "@/types/client";
import { CreateClientSheet } from "./create-client-sheet";
import { initialClients } from "./mock-data";

const formatDate = (dateString: string) => {
  if (!dateString) {
    return "";
  }
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  };
  return date.toLocaleDateString("en-GB", options).replace(",", "");
};

const getAvatarColor = (name: string) => {
  const colors = [
    "bg-blue-500",
    "bg-emerald-500",
    "bg-violet-500",
    "bg-rose-500",
    "bg-amber-500",
    "bg-cyan-500",
  ];
  return colors[name.length % colors.length];
};

export function ClientDashboard() {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const handleCreateClient = (newClient: Client) => {
    setClients((prev) => [newClient, ...prev]);
  };

  // const handleDeactivateClient = (id: string) => {
  //   setClients((prev) =>
  //     prev.map((c) => (c.id === id ? { ...c, status: "Deactivated" } : c))
  //   );
  // };

  // const handleDeleteClient = (id: string) => {
  //   setClients((prev) => prev.filter((c) => c.id !== id));
  // };
  const stats = {
    companies: 12,
    total: 120,
    active: 100,
    inactive: 20,
  };

  const getStatusBadge = (status: Client["status"]) => {
    switch (status) {
      case "Active":
        return (
          <div className="flex w-fit items-center gap-2 rounded-md border border-emerald-900/30 bg-emerald-950/20 px-2 py-1 font-medium text-emerald-400 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-20" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Active
          </div>
        );
      case "Pending":
        return (
          <div className="flex w-fit items-center gap-2 rounded-md border border-amber-900/30 bg-amber-950/20 px-2 py-1 font-medium text-amber-400 text-xs">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
            Pending
          </div>
        );
      case "Deactivated":
        return (
          <div className="flex w-fit items-center gap-2 rounded-md border border-red-900/30 bg-red-950/20 px-2 py-1 font-medium text-red-400 text-xs">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            Inactive
          </div>
        );
      default:
        return (
          <div className="flex w-fit items-center gap-2 rounded-md border border-slate-800 bg-slate-900/50 px-2 py-1 font-medium text-xs">
            <span className="relative inline-flex h-2 w-2 rounded-full bg-slate-500" />
            {status}
          </div>
        );
    }
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">
            Client Management
          </h1>
          <p className="mt-1 text-slate-500 text-sm dark:text-slate-400">
            Create and manage client records before activation.
          </p>
        </div>
        <Button
          className="h-10 rounded-lg px-5 font-medium shadow-sm transition-opacity"
          onClick={() => setIsCreateOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Create Client
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          icon={Building2}
          title="Total Companies"
          value={stats.companies}
        />
        <StatsCard icon={UsersIcon} title="Total Users" value={stats.total} />
        <StatsCard icon={UserCheck} title="Active Users" value={stats.active} />
        <StatsCard icon={UserX} title="Inactive Users" value={stats.inactive} />
      </div>

      <CreateClientSheet
        onCreate={handleCreateClient}
        onOpenChange={setIsCreateOpen}
        open={isCreateOpen}
      />

      {/* <Card className="overflow-hidden rounded-xl border-slate-200 shadow-sm dark:border-slate-800/60 dark:bg-[#0c0c0e]"> */}
      {/* <CardContent className="p-0"> */}
      <div className="rounded-lg border">
        <Table className="rounded-lg">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="py-4 font-medium">
                <div className="ml-2 flex items-center gap-2">
                  <User className="h-4 w-4" /> Full name
                </div>
              </TableHead>
              <TableHead className="font-medium">
                <div className="flex items-center gap-2">
                  <AtSign className="h-4 w-4" /> Email
                </div>
              </TableHead>
              <TableHead className="font-medium">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" /> Company
                </div>
              </TableHead>
              <TableHead className="font-medium">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" /> Status
                </div>
              </TableHead>
              <TableHead className="font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" /> Joined date
                </div>
              </TableHead>
              {/* <TableHead className="font-medium">
                <div className="">Actions</div>
              </TableHead> */}
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.length === 0 ? (
              <TableRow>
                <TableCell className="py-10 text-center" colSpan={7}>
                  No clients found.
                </TableCell>
              </TableRow>
            ) : (
              clients.map((client) => (
                <TableRow className="" key={client.id}>
                  <TableCell className="py-3 pl-0">
                    <div className="ml-2 flex items-center gap-3">
                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-medium text-white text-xs ${getAvatarColor(client.contactPerson)}`}
                      >
                        {client.contactPerson.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-medium">
                        {client.contactPerson}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm underline underline-offset-4 dark:decoration-slate-700">
                      {client.email}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{client.companyName}</span>
                  </TableCell>
                  <TableCell>{getStatusBadge(client.status)}</TableCell>
                  <TableCell>
                    <span className="text-sm">
                      {formatDate(client.createdAt)}
                    </span>
                  </TableCell>
                  <TableCell className="pr-6 text-right">
                    {/* <ClientActions
                      client={client}
                      onDeactivate={() => handleDeactivateClient(client.id)}
                      onDelete={() => handleDeleteClient(client.id)}
                    /> */}
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button className="h-8 w-8 p-0" variant="ghost" />
                        }
                      >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Resend Invite</DropdownMenuItem>
                        <DropdownMenuItem>Revoke</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-500 focus:bg-red-500/10 focus:text-red-500">
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
