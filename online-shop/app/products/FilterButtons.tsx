"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { categories } from "@/db/schemas";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type Category = typeof categories.$inferSelect;

const SORTS = [
  { value: "name", label: "Nume (A–Z)" },
  { value: "asc", label: "Preț crescător" },
  { value: "desc", label: "Preț descrescător" },
];

export default function FilterButtons({
  categories,
}: {
  categories: Category[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCat = searchParams.get("cat");
  const activeSort = searchParams.get("sort") ?? "name";
  const hasFilters = Boolean(activeCat) || activeSort !== "name";

  function push(mutate: (params: URLSearchParams) => void) {
    const params = new URLSearchParams(searchParams.toString());
    mutate(params);
    const query = params.toString();
    router.push(query ? `/products?${query}` : "/products");
  }

  function toggleCategory(id: number) {
    push((params) => {
      // Al doilea click pe aceeași categorie deselectează filtrul.
      if (params.get("cat") === String(id)) params.delete("cat");
      else params.set("cat", String(id));
    });
  }

  function setSort(value: string) {
    push((params) => {
      if (value === "name") params.delete("sort");
      else params.set("sort", value);
    });
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        variant={activeCat ? "ghost" : "secondary"}
        size="sm"
        onClick={() => push((params) => params.delete("cat"))}
      >
        Toate
      </Button>

      {categories.map((category) => {
        const active = activeCat === String(category.id);
        return (
          <Button
            key={category.id}
            variant={active ? "default" : "ghost"}
            size="sm"
            onClick={() => toggleCategory(category.id)}
            className={cn(!active && "text-muted-foreground")}
          >
            {category.name}
          </Button>
        );
      })}

      <div className="ml-auto flex items-center gap-2">
        {hasFilters && (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={() => router.push("/products")}
          >
            <X />
            Resetează
          </Button>
        )}
        <Select value={activeSort} onValueChange={setSort}>
          <SelectTrigger size="sm" className="w-48">
            <SelectValue placeholder="Sortează" />
          </SelectTrigger>
          <SelectContent>
            {SORTS.map((sort) => (
              <SelectItem key={sort.value} value={sort.value}>
                {sort.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
