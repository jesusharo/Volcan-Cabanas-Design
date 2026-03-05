# Cabañas del Volcán - Eco-Tourism Landing Page

## Overview
Modern eco-tourism landing page for "Cabañas del Volcán" (cabanasdelvolcan.mx) built with React + Tailwind CSS v4, featuring "Bosque Moderno" aesthetic.

## Architecture
- **Frontend**: React + Vite + Tailwind CSS v4 + shadcn/ui
- **Backend**: Express.js on port 5000
- **Data**: Notion API via Replit OAuth connector
- **Deployment**: Autoscale

## Key Files
- `client/src/pages/Home.tsx` - Main landing page with hero slider, cabin sections, tours, safari
- `client/src/components/ReservationCalculator.tsx` - Smart reservation calculator per cabin
- `client/src/lib/notion.ts` - Client-side data fetching + fallback data with local images
- `server/notion.ts` - Notion API integration via @replit/connectors-sdk proxy pattern, with local image caching
- `server/routes.ts` - API routes (/api/cabins, /api/notion/databases)
- `client/src/components/layout/Header.tsx` - Multi-brand navigation header
- `client/src/index.css` - Global styles, CSS variables, theme

## Image Strategy
- All images stored locally in `client/public/assets/images/` (cabins, tours, safari)
- When Notion API is available, images are downloaded and cached to `client/public/assets/notion/`
- Fallback images always available at `/assets/images/` paths (works in dev and production)
- Safari hero fallback: `/assets/safari-hero.jpg`
- Exclusive rental section and tours use fallback local images when Notion is unavailable

## Notion Database
- **ID**: Set via `NOTION_DATABASE_ID` secret
- **Properties**: `Nombre`, `Galería` (accent!), `Description`, `Capacidad`, `Habitaciones`, `Banos`, `Camas`, `Foto_Hero`, `Precio_Base`, `Precios_Escalonados` (JSON), `Detalles_Completos`
- `Precios_Escalonados` format: `{"1": 700, "2": 1000, "3": 1300}` (object with person count as key, price as value) — also supports array format
- "Renta Todo el Sitio" filtered from cabin list; fetched separately for exclusivity section

## Features
- Parallax hero slider with smooth scroll indicators
- Cabin sections: full-width gallery on top with title overlay → specs bar (capacity/rooms/bathrooms) → detailed description with "Leer más" fade truncation → simplified calculator sidebar
- `detailedDescription` field from Notion `Detalles_Completos` (rich_text), rendered as multiple `<p>` tags for SEO
- Reservation Calculator: person counter (respects Capacidad), animated price from tiered/base pricing (no visible tier table), pet checkbox (+$100), WhatsApp CTA; fallback "Consultar" CTA when no pricing data
- Tours/Experiences section
- Photo Safari section
- Pet-friendly info section
- Floating WhatsApp button (523121500516)

## Design Tokens
- Fonts: Lora (serif) + DM Sans
- Accent: Volcanic orange (#FF5A5F Airbnb, #00AF87 TripAdvisor)
- Primary: Deep forest green
- Icons: lucide-react only (no emojis)
