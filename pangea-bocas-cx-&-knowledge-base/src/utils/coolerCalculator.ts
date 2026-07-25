import { CoolerProvisioning } from '../types';

export function calculateCoolerProvisioning(pax: number): CoolerProvisioning {
  const safePax = Math.max(1, Math.round(pax));
  const pairs = Math.ceil(safePax / 2);

  // Exact 2 PAX multipliers
  const cocaColaCans = safePax * 1;
  const frescaCans = safePax * 1;
  const gingerAleCans = safePax * 1;
  const waterBottles = Math.ceil(safePax * 1.5);
  const sparklingWaterCans = safePax * 1;
  const beerCans = safePax * 2;

  // Fruit estimates
  const fruitMultiplier = Math.ceil(safePax / 4);

  const warmSnackUnits = safePax * 2; // e.g. 2 empanadas/patacones per guest
  const foilSheets = Math.ceil(safePax / 4) + 1;
  const iceBagsKg = Math.max(3, pairs * 2.5);

  return {
    pax: safePax,
    cocaColaCans,
    frescaCans,
    gingerAleCans,
    waterBottles,
    sparklingWaterCans,
    beerCans,
    fruitPortions: {
      pineappleEn: `${fruitMultiplier} whole ripe Pineapple(s) (peeled & cubed)`,
      pineappleEs: `${fruitMultiplier} Piña(s) maduras enteras (peladas y en cubos)`,
      papayaEn: `${fruitMultiplier} whole Papaya(s) (seeded & sliced)`,
      papayaEs: `${fruitMultiplier} Papaya(s) enteras (sin semillas y en rodajas)`,
      watermelonEn: `${Math.max(0.5, fruitMultiplier * 0.5)} Watermelon(s) (triangled wedges)`,
      watermelonEs: `${Math.max(0.5, fruitMultiplier * 0.5)} Sandía(s) (en triángulos)`,
    },
    warmSnackUnits,
    foilSheets,
    iceBagsKg,
    essentialsListEn: [
      'Clean sanitized cutting board',
      'Food-grade disposable gloves (for fruit prep)',
      '2 Sharp stainless steel knives',
      '1 Roll of eco-friendly napkins',
      'Thin aluminum foil sheets (to cover top of warm snacks)',
      'Heavy-duty waterproof cooler with drainage plug closed',
      'Crew snack packed for Captain & Mate',
      'First Aid Kit placed in top dry pocket',
      'VHF Radio checked & charged',
      'Life jackets verified for PAX count + 2 children sizes',
    ],
    essentialsListEs: [
      'Tabla de picar limpia y desinfectada',
      'Guantes desechables para preparación de alimentos',
      '2 Cuchillos afilados de acero inoxidable',
      '1 Rollo de servilletas ecológicas',
      'Láminas delgadas de papel aluminio (cubrir solo por arriba)',
      'Hielera impermeable resistente con tapón cerrado',
      'Bocadillo de tripulación empacado para Capitán y Marinero',
      'Botiquín de primeros auxilios en bolsillo seco superior',
      'Radio VHF verificado y cargado',
      'Chalecos salvavidas verificados para total de PAX + 2 niños',
    ],
  };
}
