import { Eye, TrendingUp, Users } from "lucide-react";

const stats = [
  { icon: Users, value: "30k+", label: "makers / month" },
  { icon: Eye, value: "320k+", label: "monthly visitors" },
  { icon: TrendingUp, value: "550k+", label: "impressions" },
];

export function Stats() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((s) => (
        <div
          key={s.label}
          className="flex items-center gap-4 rounded-xl border border-border/60 bg-card/50 p-5 backdrop-blur"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <s.icon className="h-5 w-5" />
          </span>
          <div>
            <div className="text-2xl font-bold tracking-tight">{s.value}</div>
            <div className="text-sm text-muted-foreground">{s.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
