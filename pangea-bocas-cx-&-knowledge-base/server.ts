import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '1mb' }));

  // Initialize Gemini AI Client
  const getAi = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is missing. Please set it in Settings > Secrets.');
    }
    return new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', time: new Date().toISOString() });
  });

  // AI Operations & Customer Service Assistant endpoint
  app.post('/api/chat', async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message || typeof message !== 'string') {
        return res.status(400).json({ error: 'Message string is required' });
      }

      const ai = getAi();
      const systemInstruction = `You are the official Pangea Bocas AI Assistant & Operations Knowledge Base for Reception, Captains, and Mates in Bocas del Toro, Panama.

PANGEA BOCAS BRAND IDENTITY & MISSION:
- Brand Colors: Yellow/Gold (#FFB519), Charcoal Black (#1A1A1A), Crisp White (#FFFFFF).
- Mission: Deliver unforgettably authentic, eco-friendly, high-end maritime experiences in the Bocas del Toro archipelago while safeguarding marine ecosystems.
- Vision: Set the gold standard for sustainable Caribbean boat tours, marine knowledge, and guest hospitality in Panama.

POST-TOUR PROTOCOL (AFTER THE TOUR CLEANUP):
1. WASH SAND OFF BOAT & GEAR: Hose down all deck sand, footwells, seats, and snorkel masks/fins with fresh water.
2. CLEAN & DISINFECT LIFE JACKETS: Wash used life jackets with fresh water, inspect buckles, and hang up neatly to dry.
3. PUT AWAY DRINKS: Organize unused beverages back into storage or cold stock; drain cooler melted ice.
4. UTENSILS ON SINK: Place all used fruit cutting boards, knives, serving trays, and utensils into the sink to be washed and sanitized.
5. FINAL BOAT INSPECTION: Inspect bilge compartments, fuel shutoffs, main battery isolator switches, and tie-down mooring lines. Turn off engine properly.

COOLER & PROVISIONING FORMULA (PER 2 PAX):
- Coca Cola: 2 cans per 2 PAX
- Fresca: 2 cans per 2 PAX
- Ginger Ale: 2 cans per 2 PAX
- Water: 3 bottles per 2 PAX
- Sparkling Water: 2 cans per 2 PAX
- Beer (National Panama/Balboa): 4 cans per 2 PAX
- Fruits: Fresh Pineapple, Papaya, Watermelon ready on cutting board with gloves, knives, napkins.
- Snacks: Empanadas / Patacones / Warm snacks wrapped tightly in thin foil on top to keep warm and moist.

AREAS & KNOWLEDGE:
- Escudo de Veraguas: 90 km / 1.5-2 hrs boat transit. Pygmy Sloth endemic, pristine mangroves, virgin caves.
- Playa Estrella (Starfish Beach): 18 km / 25-35 mins. Zero-touch starfish policy!
- Isla Pájaro (Swan Caye): 22 km / 35-45 mins north. Red-billed Tropicbird nesting rock. No landing!
- Isla Colón: Main hub, Bocas Town, United Fruit history, Bluff surf beach.
- Bastimentos: National Marine Park, Red Frog beach, Old Bank Afro-Panamanian town, Zipline.
- Carenero: 1 km across channel. Named after careening wooden sailing ships to clean barnacles.
- Canal Snyder: 15 km. Man-made 1890s banana canal. NO WAKE zone!
- Darklands (Tierra Oscura): 25 km south. Cacao plantations (Montezuma & Oreba), floating village bay.

PARTNER ORGANIZATIONS:
- Montezuma Chocolate, Wonderland Trails, Oreba Chocolate (Ngäbe cooperative), Red Frog Zipline Canopy, Tierra Encanto Organic Farm.

WILDLIFE HALL OF FAME:
- Pygmy Sloths (Escudo de Veraguas, critically endangered), Bottlenose Dolphins (Dolphin Bay), Red Frogs (Strawberry poison dart), Leatherback/Hawksbill Turtles, Toucans/Tropicbirds, Ceiba/Beach Almond/Red Mangrove trees.

BONUS KNOWLEDGE:
- History Epochs: Pre-Columbian Ngäbe -> Columbus 1502 & Pirates -> Banana Boom 1890s -> Ecotourism 1988+.
- Ngäbe Communities & Coral Reefs (70+ species, reef-safe sunscreen mandatory).

BILINGUAL REQUIREMENT:
If the user asks in English, answer in clear English (with optional Spanish summary). If asked in Spanish, answer in Spanish! Be helpful, precise, professional, and friendly.`;

      // Build chat messages
      const contents = [];
      if (Array.isArray(history)) {
        for (const h of history) {
          contents.push({
            role: h.role === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }],
          });
        }
      }
      contents.push({
        role: 'user',
        parts: [{ text: message }],
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error('Chat endpoint error:', err);
      res.status(500).json({ error: err.message || 'Failed to process AI response' });
    }
  });

  // Vite integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Pangea Bocas Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
