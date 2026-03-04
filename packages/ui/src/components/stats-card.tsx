import type { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  description?: string;
}

const StatsCard = ({ title, value, icon: Icon }: StatsCardProps) => {
  return (
    <div className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="font-medium text-muted-foreground text-sm">{title}</p>
          <p className="font-bold text-3xl text-card-foreground tracking-tight">
            {value.toLocaleString()}
          </p>
        </div>
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
