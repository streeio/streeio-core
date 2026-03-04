import { Button } from "@streeio-core/ui/components/button";
import StatsCard from "@streeio-core/ui/components/stats-card";
import {
  Building2,
  Plus,
  UserCheck,
  Users as UsersIcon,
  UserX,
} from "lucide-react";
import TableDemo from "@/components/custom-table";

const stats = {
  companies: 12,
  total: 120,
  active: 100,
  inactive: 20,
};

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default function Users() {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-full w-full flex-col">
        {/* Header */}
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="font-semibold text-3xl tracking-tight">
              Users Management
            </h1>
            <p className="text-muted-foreground text-sm">
              Manage your team members and their account permissions.
            </p>
          </div>

          <Button className="gap-2 shadow-sm">
            <Plus className="h-4 w-4" />
            Create User
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            icon={Building2}
            title="Total Companies"
            value={stats.companies}
          />
          <StatsCard icon={UsersIcon} title="Total Users" value={stats.total} />
          <StatsCard
            icon={UserCheck}
            title="Active Users"
            value={stats.active}
          />
          <StatsCard
            icon={UserX}
            title="Inactive Users"
            value={stats.inactive}
          />
        </div>

        <div className="mt-12 rounded-xl border bg-card shadow-sm">
          <div className="overflow-x-auto">
            <TableDemo invoices={invoices} />
          </div>
        </div>
      </div>
    </div>
  );
}
