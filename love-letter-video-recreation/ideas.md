# Love Letter Video Recreation — Design Ground Truth

This project is a direct recreation of the supplied reference video. The reference itself overrides alternate concept exploration: the implementation should preserve its sequence, emotional tone, typography, and interaction language while adding a polished, responsive web treatment.

## Ground-Truth Reference Spec

The experience opens with a deep red-to-maroon radial vignette and a restrained landing composition: a small all-caps eyebrow, the large name “SHAILA,” an italic invitation to scroll, and a small scroll cue at the bottom. The next story beat is a rounded translucent blush letter card with a right-aligned date, serif salutation, several romantic paragraphs, and an all-caps sign-off. The proposal section then introduces a large pulsing heart, the heading “WILL YOU BE MY VALENTINE?”, a soft italic subline, and two buttons. The “NO” button escapes as the cursor approaches; each attempt makes the “YES” button more persuasive and larger. The final state replaces the proposal with “SHE SAID YES!” and floating pink/red hearts plus celebration confetti.

## Chosen Direction: Burgundy Editorial Love Letter

### Design Movement

Contemporary romantic editorial design with cues from tactile stationery, intimate letterpress print, and cinematic Valentine ephemera.

### Core Principles

1. **The scroll is the narrative.** Each viewport should feel like a distinct page in one unfolding letter.
2. **Warmth over gloss.** Use paper grain, soft vignettes, low-contrast translucency, and imperfect petal-like details instead of generic glassmorphism.
3. **Typography carries intimacy.** High-contrast serif headlines and italic asides should feel personal and authored.
4. **Playful interaction earns the finale.** The evasive “NO” button and growing “YES” response provide a gentle, memorable tease before the celebration.

### Color Philosophy

The base is a near-black wine red, not a generic bright Valentine pink: it creates a private, evening atmosphere and makes the white letter text feel luminous. Blush pink is reserved for cards and hopeful actions, while coral and warm gold appear only as small moments of delight. The ownable signature color is **Rosewood Ink** `#7A1F3D`, a deep berry-red that feels like a handwritten love note rather than a product UI.

### Layout Paradigm

Use a vertical sequence of full-viewport story panels, with the letter card slightly offset and visually “placed” in the scene rather than centered inside a generic container. The proposal remains focused but allows the evasive button to travel across the available stage. The success screen expands into an open, celebratory field.

### Signature Elements

The recurring motifs are a small rose-petal mark, a thin hand-drawn rule, and a soft vignette that keeps the eye in the center of each story beat. The generated heart-letter mark appears in the opening label and celebration state.

### Interaction Philosophy

Interactions should feel like a private joke between two people: calm and inviting at first, then lightly mischievous. Buttons should respond clearly to hover, focus, and press. The “NO” action is intentionally evasive with a keyboard-accessible fallback: pressing Escape or tabbing never traps the user, while a clear “YES” path always remains available.

### Animation

The landing copy enters with a quiet upward drift. The letter card reveals with a short opacity-and-translate transition. The central heart uses a restrained pulse rather than a constant glow. The evasive button moves with a spring-like transition and remains bounded inside the proposal stage. The celebration uses floating hearts and confetti with randomized delays, but respects `prefers-reduced-motion` by becoming static.

### Typography System

Use **Cormorant Garamond** for display headlines, the name, the salutation, and the letter body; its high-contrast forms echo romantic print. Use **DM Sans** for compact utility labels, buttons, dates, and accessibility-facing UI. Headlines are uppercase with generous tracking, body copy is relaxed and readable, and italic sublines use the display serif for an authored voice.

### Brand Essence

**A small, cinematic love letter for one person, built to turn a scroll into a shared memory.** Personality: tender, playful, handcrafted.

### Brand Voice

Headlines are direct and intimate; CTAs sound like a real person rather than a product. Microcopy can be self-aware, but never sarcastic or generic.

Example lines: “This page was made with love — scroll down.” / “I know I’m more comfortable with code than poetry, but I would never debug what I feel for you.”

### Wordmark & Logo

Use the generated heart-letter mark as the visual signature: a heart whose point folds into a paper-letter tip, paired with the small caption “A MESSAGE, JUST FOR YOU.” Never render the brand identity as a default wordmark font.

### Signature Brand Color

**Rosewood Ink — `#7A1F3D`.**

