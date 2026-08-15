// Pulled from Diana's live Square service menu.
// durationMinutes is used to block out the right number of slots when a service is booked.
export const services = [
  {
    id: "brow-lami",
    name: { en: "Signature Brow Lami", es: "Lami de Cejas Signature" },
    description: {
      en: "Creates fuller, more lifted brows for a natural yet polished finish. Smooths and sets the brow hairs into your desired shape.",
      es: "Crea cejas más llenas y levantadas para un acabado natural y pulido. Alisa y fija el vello de la ceja en la forma deseada.",
    },
    price: 70,
    durationMinutes: 90,
  },
  {
    id: "brow-wax",
    name: { en: "Signature Brow Wax", es: "Cera de Cejas Signature" },
    description: {
      en: "Includes brow mapping, precision waxing, trimming if needed, and a concealer finish.",
      es: "Incluye mapeo de cejas, cera de precisión, recorte si es necesario y acabado con corrector.",
    },
    price: 30,
    durationMinutes: 60,
  },
  {
    id: "brow-wax-tint",
    name: { en: "Brow Wax + Tint", es: "Cera de Cejas + Tinte" },
    description: {
      en: "A detailed, luxury brow service for a more defined and polished look, including tinting.",
      es: "Un servicio de cejas detallado y de lujo para un look más definido y pulido, incluye tinte.",
    },
    price: 40,
    durationMinutes: 75,
  },
  {
    id: "lip-chin-wax",
    name: { en: "Lip or Chin Wax Treatment", es: "Cera de Labio o Barbilla" },
    description: {
      en: "A quick and gentle waxing service, perfect on its own or paired with any brow service.",
      es: "Un servicio de cera rápido y suave, perfecto solo o junto con cualquier servicio de cejas.",
    },
    price: 15,
    durationMinutes: 15,
  },
  {
    id: "brow-lami-tint",
    name: { en: "Signature Brow Lami + Tint", es: "Lami de Cejas Signature + Tinte" },
    description: {
      en: "Fuller, fluffier, perfectly styled brows with a soft glam finish.",
      es: "Cejas más llenas, esponjosas y perfectamente estilizadas con un acabado suave y glam.",
    },
    price: 85,
    durationMinutes: 110,
  },
  {
    id: "korean-lash-lift",
    name: { en: "Korean Lash Lift", es: "Lifting de Pestañas Coreano" },
    description: {
      en: "A soft, lifted curl and rich tint for a mascara-like finish, no daily effort needed.",
      es: "Un rizo suave y levantado con tinte intenso para un acabado tipo máscara, sin esfuerzo diario.",
    },
    price: 65,
    durationMinutes: 105,
  },
];

export const eventServices = [
  {
    id: "makeup",
    name: { en: "Makeup", es: "Maquillaje" },
  },
  {
    id: "hairstyle",
    name: { en: "Hairstyle", es: "Peinado" },
  },
  {
    id: "both",
    name: { en: "Both Services", es: "Ambos Servicios (Maquillaje y Peinado)" },
  },
];