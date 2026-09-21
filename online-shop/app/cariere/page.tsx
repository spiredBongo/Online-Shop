import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "Cariere" };

const roles = [
  { title: "Frontend Engineer", type: "Full-time", place: "Remote" },
  { title: "Customer Support", type: "Part-time", place: "București" },
  { title: "Logistică & depozit", type: "Full-time", place: "Otopeni" },
];

export default function CarierePage() {
  return (
    <div className="shell pb-12">
      <PageHeader
        eyebrow="Cariere"
        title="Căutăm oameni care întreabă „de ce?”"
        description="Echipă mică, decizii rapide, fără ședințe inutile. Dacă îți place să construiești lucruri pe care le folosesc oameni reali, scrie-ne."
      />

      <div className="stagger grid gap-3">
        {roles.map((role, i) => (
          <Card
            key={role.title}
            style={{ "--i": i } as React.CSSProperties}
            className="lift group/role"
          >
            <CardContent className="flex flex-wrap items-center gap-3">
              <div className="min-w-0 flex-1">
                <h2 className="font-heading text-sm font-medium transition-colors group-hover/role:text-primary">
                  {role.title}
                </h2>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {role.place}
                </p>
              </div>
              <Badge variant="secondary">{role.type}</Badge>
              <ArrowUpRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover/role:translate-x-0.5 group-hover/role:-translate-y-0.5 group-hover/role:text-primary" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
