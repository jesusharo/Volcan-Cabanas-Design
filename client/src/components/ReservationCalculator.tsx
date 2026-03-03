import React, { useState, useMemo, useEffect, useRef } from "react";
import { Minus, Plus, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Cabin, TieredPrice } from "@/lib/notion";

interface ReservationCalculatorProps {
  cabin: Cabin;
  onWhatsApp: (message: string) => void;
}

function getPriceForPersons(tieredPricing: TieredPrice[], persons: number, basePrice?: number): number {
  if (tieredPricing.length === 0) return basePrice || 0;

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

export function ReservationCalculator({ cabin, onWhatsApp }: ReservationCalculatorProps) {
  const maxCapacity = Math.max(Number(cabin.capacity) || 2, 1);
  const sortedPricing = useMemo(
    () => [...cabin.tieredPricing].sort((a, b) => a.persons - b.persons),
    [cabin.tieredPricing]
  );
  const minPersons = sortedPricing.length > 0 ? Math.min(sortedPricing[0].persons, maxCapacity) : 1;
  const [persons, setPersons] = useState(minPersons);

  const totalPrice = useMemo(
    () => getPriceForPersons(cabin.tieredPricing, persons, cabin.price),
    [cabin.tieredPricing, persons, cabin.price]
  );

  const handleDecrease = () => setPersons((p) => Math.max(minPersons, p - 1));
  const handleIncrease = () => setPersons((p) => Math.min(maxCapacity, p + 1));

  const handleReserve = () => {
    const msg = `Hola, quiero reservar la ${cabin.title} para ${persons} personas por un total de $${totalPrice.toLocaleString('es-MX')} MXN por noche.`;
    onWhatsApp(msg);
  };

  const hasPricing = cabin.tieredPricing.length > 0 || cabin.price;

  if (!hasPricing) return null;

  return (
    <div data-testid={`calculator-${cabin.id}`} className="bg-card border border-border/60 rounded-2xl p-6 space-y-5">
      <h4 className="text-sm uppercase tracking-widest text-muted-foreground font-bold">Calculadora de Reservación</h4>

      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground font-medium">Personas</span>
        <div className="flex items-center gap-4">
          <button
            data-testid={`btn-decrease-${cabin.id}`}
            onClick={handleDecrease}
            disabled={persons <= minPersons}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span data-testid={`persons-count-${cabin.id}`} className="text-2xl font-bold text-foreground w-8 text-center tabular-nums">
            {persons}
          </span>
          <button
            data-testid={`btn-increase-${cabin.id}`}
            onClick={handleIncrease}
            disabled={persons >= maxCapacity}
            className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="h-px bg-border/50" />

      <div className="flex items-end justify-between">
        <span className="text-sm text-muted-foreground font-medium">Total por noche</span>
        <div className="text-right">
          <p data-testid={`price-total-${cabin.id}`} className="text-3xl font-bold text-accent leading-none">
            <AnimatedPrice value={totalPrice} />
          </p>
          <span className="text-xs text-muted-foreground uppercase tracking-widest">MXN</span>
        </div>
      </div>

      <Button
        data-testid={`btn-reserve-${cabin.id}`}
        size="lg"
        className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white text-base py-6 rounded-xl shadow-lg shadow-[#25D366]/20 transition-all hover:scale-[1.02] border-0"
        onClick={handleReserve}
      >
        <MessageCircle className="w-5 h-5 mr-2" />
        Reservar por WhatsApp
      </Button>

      {sortedPricing.length > 1 && (
        <div className="space-y-1.5">
          {sortedPricing.map((tier, i) => (
            <div
              key={i}
              className={`flex justify-between text-xs px-3 py-1.5 rounded-lg transition-colors ${
                persons >= tier.persons && (i === sortedPricing.length - 1 || persons < sortedPricing[i + 1].persons)
                  ? 'bg-accent/10 text-accent font-semibold'
                  : 'text-muted-foreground'
              }`}
            >
              <span>{tier.persons}+ personas</span>
              <span>${tier.price.toLocaleString('es-MX')}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
