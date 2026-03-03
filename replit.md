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
- `client/src/lib/notion.ts` - Client-side data fetching + fallback mock data
- `server/notion.ts` - Notion API integration (fetchCabinsFromNotion)
- `server/routes.ts` - API routes (/api/cabins, /api/notion/databases)
- `client/src/components/layout/Header.tsx` - Multi-brand navigation header
- `client/src/index.css` - Global styles, CSS variables, theme

## Notion Database
- **ID**: Set via `NOTION_DATABASE_ID` secret
- **Properties**: `Nombre`, `Galería` (accent!), `Description`, `Capacidad`, `Habitaciones`, `Banos`, `Camas`, `Foto_Hero`, `Precio_Base`, `Precios_Escalonados` (JSON), `Detalles_Completos`
- `Precios_Escalonados` format: `[{"persons": 2, "price": 600}, {"persons": 4, "price": 700}]`
- "Renta Todo el Sitio" filtered from cabin list; fetched separately for exclusivity section

## Features
- Parallax hero slider with smooth scroll indicators
- Vertical cabin sections with horizontal image galleries
- Reservation Calculator: person counter (respects Capacidad), animated price from tiered/base pricing, WhatsApp CTA with dynamic message
- Tours/Experiences section
- Photo Safari section
- Pet-friendly info section
- Floating WhatsApp button (523121500516)

## Design Tokens
- Fonts: Lora (serif) + DM Sans
- Accent: Volcanic orange (#FF5A5F Airbnb, #00AF87 TripAdvisor)
- Primary: Deep forest green
- Icons: lucide-react only (no emojis)
