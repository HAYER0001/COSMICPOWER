export const site = {
  name: 'Golden Deer',
  tagline: 'Premium Roasted Makhana — Naturally Good.',
  legal: {
    company: 'Cosmic Power Pvt. Ltd.',
    cin: 'U46307BR2026PTC085787',
    gstin: '10AANCC9477F2ZG',
    startupIndia: 'DIPP269634',
    msme: 'UDYAM-BR-26-0237862',
    fssaiLicense: 'ADD_FSSAI_NUMBER',
    address: 'C/o 1639, MALKANA, Gangachak, Ganga Chak, Masaurhi, Bihar 804452',
  },
  contact: {
    email: 'chandan@cosmicpower.ltd',
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+91 97791 55132',
  },
  socials: {
    instagram: 'ADD_URL',
    youtube: 'ADD_URL',
    linkedin: 'ADD_URL',
  },
  commerce: {
    blinkit: 'ADD_URL',
    zepto: 'ADD_URL',
    amazon: 'ADD_URL',
  },
} as const
