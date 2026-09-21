import type { Metadata } from "next";
import PageHeader from "@/components/layout/PageHeader";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = { title: "Despre noi" };

const values = [
  {
    title: "Selecție, nu catalog",
    text: "Ținem în stoc doar produse pe care le-am testa și noi. Mai puține opțiuni, alegeri mai ușoare.",
  },
  {
    title: "Preț afișat corect",
    text: "Prețul de pe card e prețul final. Fără taxe surpriză la finalizarea comenzii.",
  },
  {
    title: "Suport de oameni",
    text: "Scrii un email, îți răspunde cineva care chiar cunoaște produsele.",
  },
];

export default function DesprePage() {
  return (
    <div className="shell pb-12">
      <PageHeader
        eyebrow="Despre noi"
        title="Un magazin mic, cu pretenții mari"
        description="EmberShop a pornit dintr-o frustrare simplă: e prea greu să găsești produsul potrivit printre mii de variante aproape identice. Așa că ținem catalogul scurt și explicațiile clare."
      />

      <div className="stagger grid gap-4 sm:grid-cols-3">
        {values.map((value, i) => (
          <Card
            key={value.title}
            style={{ "--i": i } as React.CSSProperties}
            className="lift"
          >
            <CardContent>
              <h2 className="font-heading text-sm font-medium">{value.title}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{value.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
