import React, { useState, useMemo, useEffect, useRef } from "react";
import { Minus, Plus, MessageCircle, PawPrint } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Cabin, TieredPrice } from "@/lib/notion";

interface ReservationCalculatorProps {
  cabin: Cabin;
  onWhatsApp: (message: string) => void;
}

function getPriceForPersons(tieredPricing: TieredPrice[], persons: number, basePrice?: number): number {
  if (tieredPricing.length === 0) return basePrice || 0;

  const exactMatch = tieredPricing.find(t => t.persons === persons);
  if (exactMatch) return exactMatch.price;

  let matchedPrice = tieredPricing[0].price;
  for (const tier of tieredPricing) {
    if (persons >= tier.persons) {
      matchedPrice = tier.price;
    }
  }
  return matchedPrice;
}

function AnimatedPrice({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(value);
  const animRef = useRef<number>();

  useEffect(() => {
    const start = displayValue;
    const end = value;
    const duration = 400;
    const startTime = performance.now();

    if (animRef.current) cancelAnimationFrame(animRef.current);

    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(start + (end - start) * eased));
      if (progress < 1) {
        animRef.current = requestAnimationFrame(animate);
      }
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [value]);

  return <span>${displayValue.toLocaleString('es-MX')}</span>;
}

const PET_FEE = 100;

export function ReservationCalculator({ cabin, onWhatsApp }: ReservationCalculatorProps) {
  const maxCapacity = Math.max(Number(cabin.capacity) || 2, 1);
  const sortedPricing = useMemo(
    () => [...cabin.tieredPricing].sort((a, b) => a.persons - b.persons),
    [cabin.tieredPricing]
  );
  const minPersons = sortedPricing.length > 0 ? Math.min(sortedPricing[0].persons, maxCapacity) : 1;
  const [persons, setPersons] = useState(minPersons);
  const [hasPet, setHasPet] = useState(false);

  const basePrice = useMemo(
    () => getPriceForPersons(cabin.tieredPricing, persons, cabin.price),
    [cabin.tieredPricing, persons, cabin.price]
  );

  const totalPrice = basePrice + (hasPet ? PET_FEE : 0);

  const handleDecrease = () => setPersons((p) => Math.max(minPersons, p - 1));
  const handleIncrease = () => setPersons((p) => Math.min(maxCapacity, p + 1));

  const handleReserve = () => {
    const petPart = hasPet ? ' y 1 mascotas' : '';
    const msg = `Hola, me gustaría reservar la ${cabin.title} para ${persons} personas${petPart} por un total de $${totalPrice.toLocaleString('es-MX')}.`;
    onWhatsApp(msg);
  };

  const hasPricing = cabin.tieredPricing.length > 0 || cabin.price;

  if (!hasPricing) {
    return (
      <div data-testid={`calculator-${cabin.id}`} className="bg-card border border-border/60 rounded-2xl p-5 space-y-4">
        <p className="text-sm text-muted-foreground text-center">Consulta disponibilidad y precios directamente.</p>
        <Button
          data-testid={`btn-reserve-${cabin.id}`}
          size="lg"
          className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm py-5 rounded-xl shadow-lg shadow-[#25D366]/20 transition-all hover:scale-[1.02] border-0"
          onClick={() => onWhatsApp(`Hola, me gustaría información sobre la ${cabin.title}.`)}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          Consultar por WhatsApp
        </Button>
      </div>
    );
  }

  return (
    <div data-testid={`calculator-${cabin.id}`} className="bg-card border border-border/60 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">Personas</span>
        <div className="flex items-center gap-3">
          <button
            data-testid={`btn-decrease-${cabin.id}`}
            onClick={handleDecrease}
            disabled={persons <= minPersons}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>
          <span data-testid={`persons-count-${cabin.id}`} className="text-xl font-bold text-foreground w-6 text-center tabular-nums">
            {persons}
          </span>
          <button
            data-testid={`btn-increase-${cabin.id}`}
            onClick={handleIncrease}
            disabled={persons >= maxCapacity}
            className="w-8 h-8 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <label
        data-testid={`pet-checkbox-${cabin.id}`}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className={`w-4.5 h-4.5 rounded border-2 flex items-center justify-center transition-all ${
          hasPet
            ? 'bg-accent border-accent'
            : 'border-border group-hover:border-accent/50'
        }`}>
          {hasPet && (
            <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </div>
        <input
          data-testid={`input-pet-${cabin.id}`}
          type="checkbox"
          checked={hasPet}
          onChange={(e) => setHasPet(e.target.checked)}
          className="sr-only"
        />
        <PawPrint className="w-3.5 h-3.5 text-accent" />
        <span className="text-sm text-muted-foreground">Traigo mascota</span>
        <span className="text-xs text-accent font-semibold ml-auto">+${PET_FEE}</span>
      </label>

      <div className="h-px bg-border/40" />

      <div className="flex items-end justify-between">
        <span className="text-xs text-muted-foreground uppercase tracking-widest">Total / noche</span>
        <p data-testid={`price-total-${cabin.id}`} className="text-2xl font-bold text-accent leading-none">
          <AnimatedPrice value={totalPrice} />
          <span className="text-xs text-muted-foreground font-normal ml-1">MXN</span>
        </p>
      </div>

      <Button
        data-testid={`btn-reserve-${cabin.id}`}
        size="lg"
        className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm py-5 rounded-xl shadow-lg shadow-[#25D366]/20 transition-all hover:scale-[1.02] border-0"
        onClick={handleReserve}
      >
        <MessageCircle className="w-4 h-4 mr-2" />
        Reservar por WhatsApp
      </Button>
    </div>
  );
}
