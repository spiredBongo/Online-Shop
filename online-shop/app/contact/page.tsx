import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "Contact" };

const channels = [
  { icon: Mail, label: "Email", value: "salut@embershop.ro" },
  { icon: Phone, label: "Telefon", value: "+40 721 000 000" },
  { icon: Clock, label: "Program", value: "Luni–Vineri, 09:00–18:00" },
  { icon: MapPin, label: "Sediu", value: "Str. Exemplu 12, București" },
];

export default function ContactPage() {
  return (
    <div className="shell pb-12">
      <PageHeader
        eyebrow="Contact"
        title="Hai să vorbim"
        description="Întrebări despre un produs, o comandă sau un retur? Scrie-ne și îți răspundem în aceeași zi lucrătoare."
      />

      <div className="stagger grid gap-4 sm:grid-cols-2">
        {channels.map((channel, i) => (
          <Card
            key={channel.label}
            style={{ "--i": i } as React.CSSProperties}
            className="lift"
          >
            <CardContent className="flex items-center gap-3">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <channel.icon className="size-4.5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{channel.label}</p>
                <p className="truncate text-sm font-medium">{channel.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
