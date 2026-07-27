# GOLDEN DEER — THE 33 MISSING ASSETS (matched to your build's exact filenames)

The math: **12 videos to generate in HyperFrames** + **21 files created free via ffmpeg frame extraction**. Do the 12 generations, drop them in, run two command blocks, done.

---

## WHICH REFERENCE FILE TO ATTACH WITH EACH PROMPT

| Prompt | Attach |
|---|---|
| logo-reveal.mp4 | **Gold_deer_fl-01.png (logo)** — mandatory, the crest must match exactly |
| gifting.mp4 | **Golden_deer_Makhana_Mockup.jpg (pouch)** — mandatory, pouch appears in frame |
| story-4.mp4 | **Golden_deer_Makhana_Mockup.jpg (pouch)** — mandatory, pouch appears in frame |
| story-1, story-2, story-3 | pouch mockup optional (palette consistency only — no pack in frame) |
| all 6 recipe loops | pouch mockup optional (palette consistency only — no pack in frame) |

Prepend this Global Style Prefix to EVERY prompt:

```
Brand: Golden Deer, a premium roasted makhana (fox nuts) snack by Cosmic Power Pvt. Ltd.
Visual world: calm luxury — deep forest green (#0F2E1E) environments, antique gold accents,
warm cream highlights, soft studio lighting, shallow depth of field, photorealistic, high-end
food-commercial grade. SEAMLESS LOOP: the final frame must match the first frame exactly.
No text overlays, no captions, no watermarks, no invented labels — the only text allowed is
what's printed on the attached pouch, kept accurate and legible. Match the attached logo's
stag-and-wreath crest exactly wherever the crest appears. No human faces in focus.
```

---

## GENERATE THESE 12 (HyperFrames)

### → public/videos/ (root)

**1. gifting.mp4** · 6 s · 16:9 (1920×1080)
```
Six-second seamless loop: hands in soft focus tie a gold satin ribbon on a forest-green gift
box, the attached Golden Deer pouch visible inside as the lid closes partially, warm
candle-like light, slow motion. Keep the center-left third visually calm for overlay text.
```

**2. logo-reveal.mp4** · 3 s · 1:1 (1080×1080)
```
Elegant three-second loop: fine gold particles drift inward on a deep forest-green backdrop and
assemble into the attached Golden Deer stag-and-wreath crest (match it exactly), a soft shimmer
travels across the antlers, then the particles gently disperse back so the loop restarts
seamlessly. Minimal, jewel-like.
```

### → public/videos/story/

**3. story-1.mp4** · 6 s · 4:3 (1440×1080)
```
Six-second seamless cinemagraph at golden hour: a serene Indian wetland pond covered in lotus
leaves, a wooden boat with woven baskets of freshly gathered fox nut seeds, a farmer's hands
(no face in focus) lifting seeds from the water; only the water ripples and drifting mist move.
Documentary dignity, warm light — fair-trade partnership feel, never poverty imagery.
```

**4. story-2.mp4** · 6 s · 4:3
```
Six-second seamless cinemagraph: overhead view of hands sorting popped makhana on a woven
bamboo tray, separating the largest, brightest jumbo pops; slow deliberate hand motion loops
cleanly, warm natural window light, rustic workshop table.
```

**5. story-3.mp4** · 6 s · 4:3
```
Six-second seamless cinemagraph: makhana slow-roasting in a modern stainless-steel roasting
drum, tumbling gently in one smooth looping motion, faint warm particles rising in clean bright
light; hygienic, touchless, patient craft — no open flames, no hands touching the food.
```

**6. story-4.mp4** · 6 s · 4:3
```
Six-second seamless cinemagraph: in a clean, softly-lit packing line, the attached gold Golden
Deer pouch stands sealed and pristine as a gentle stream of makhana finishes filling a second
open pouch beside it; a subtle cool mist (nitrogen-flush suggestion) drifts once per loop;
freshness locked in, laboratory-clean but warm-lit.
```

### → public/videos/recipes/

All 5 s · 4:3 (1440×1080):

**7. makhana-bhel.mp4**
```
Five-second seamless cinemagraph: overhead matte-black bowl of makhana bhel — roasted makhana
with chopped onion, tomato, coriander, pomegranate; a final drizzle of tangy chutney falls in
slow motion on loop, everything else still; vibrant but moody.
```
**8. makhana-kheer.mp4**
```
Five-second seamless cinemagraph: warm brass katori of makhana kheer; saffron strands and
slivered pistachios drift down in slow motion onto the surface on loop; festive but restrained,
gold spoon beside.
```
**9. peri-peri-makhana.mp4**
```
Five-second seamless cinemagraph: close bowl of fiery peri-peri makhana; a pinch of red spice
dust falls and settles in slow motion on loop; dramatic warm side light, scattered chili flakes.
```
**10. golden-trail-mix.mp4**
```
Five-second seamless cinemagraph: golden trail mix — makhana, almonds, cashews, raisins,
pumpkin seeds — pouring in ultra-slow motion from a glass jar onto dark slate, loop-safe
mid-pour; warm light.
```
**11. makhana-chaat.mp4**
```
Five-second seamless cinemagraph: rustic ceramic plate of makhana chaat; a thin yogurt drizzle
loops falling across tamarind chutney, sev and pomegranate; street-food-meets-fine-dining
plating.
```
**12. makhana-curry.mp4**
```
Five-second seamless cinemagraph: copper handi of rich makhana curry, a cream swirl slowly
rotating into the tomato-cashew gravy on loop, coriander garnish, tandoori roti edge in frame.
```

---

## THE OTHER 21 — FREE VIA EXTRACTION (no generation)

**Step 1 — all 13 posters, automatically.** After dropping the 12 videos into their folders (hero.mp4 is already there), run from the project root:
```bash
bash scripts/optimize-videos.sh
```
That compresses anything oversized AND auto-extracts every missing `-poster.jpg` (hero-poster, logo-reveal-poster, gifting-poster, 4× story posters, 6× recipe posters).

**Step 2 — og-home.jpg** (the WhatsApp/social preview, 1200×630, from the hero):
```bash
ffmpeg -ss 3 -i public/videos/hero.mp4 -vframes 1 -vf "scale=1200:630:force_original_aspect_ratio=increase,crop=1200:630" public/images/og/og-home.jpg
```

**Step 3 — the 7 journal covers** (1600×900, each pulled from the loop that fits its topic — tweak `-ss N` to pick a prettier frame):
```bash
ffmpeg -ss 3 -i public/videos/hero.mp4               -vframes 1 -vf "scale=1600:900:force_original_aspect_ratio=increase,crop=1600:900" public/images/journal/golden-grain-ancient-superfood.jpg
ffmpeg -ss 2 -i public/videos/story/story-1.mp4      -vframes 1 -vf "scale=1600:900:force_original_aspect_ratio=increase,crop=1600:900" public/images/journal/from-wetlands-to-your-bowl.jpg
ffmpeg -ss 2 -i public/videos/recipes/golden-trail-mix.mp4 -vframes 1 -vf "scale=1600:900:force_original_aspect_ratio=increase,crop=1600:900" public/images/journal/5-reasons-switch-to-makhana.jpg
ffmpeg -ss 2 -i public/videos/story/story-3.mp4      -vframes 1 -vf "scale=1600:900:force_original_aspect_ratio=increase,crop=1600:900" public/images/journal/art-of-slow-roasting.jpg
ffmpeg -ss 2 -i public/videos/story/story-4.mp4      -vframes 1 -vf "scale=1600:900:force_original_aspect_ratio=increase,crop=1600:900" public/images/journal/why-nitrogen-flushed-packaging-matters.jpg
ffmpeg -ss 2 -i public/videos/recipes/makhana-curry.mp4 -vframes 1 -vf "scale=1600:900:force_original_aspect_ratio=increase,crop=1600:900" public/images/journal/makhana-for-every-diet.jpg
ffmpeg -ss 2 -i public/videos/recipes/peri-peri-makhana.mp4 -vframes 1 -vf "scale=1600:900:force_original_aspect_ratio=increase,crop=1600:900" public/images/journal/beyond-bhujia-reinventing-indian-snacking.jpg
```

**Step 4 — verify.** Re-run the missing-assets scan (or `npm run build` + browse in incognito). All 33 should be resolved.

---

## GENERATION PRIORITY (if time runs short)
1. **gifting.mp4** — visible on the home banner AND the bulk page (highest traffic)
2. **story-1.mp4** — home FarmDirect band + Our Story
3. The 3 recipe loops shown in the home teaser (first three: bhel, kheer, peri-peri)
4. story-2/3/4, remaining recipes
5. **logo-reveal.mp4 last** — footer nicety; its absence is already handled gracefully

Budgets: each loop ≤2.5 MB, logo-reveal ≤1.5 MB, posters ≤200 KB — the optimize script enforces/reports this.
