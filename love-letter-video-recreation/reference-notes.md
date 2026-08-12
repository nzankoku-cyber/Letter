# Invitation opening reference notes

The provided invitation starts with a full-screen, dark near-black and deep burgundy cover. The opening composition is intentionally sparse and ceremonial: centered gold serif event title, a small date/time line, an italic venue line, and a large ornate rose/crest seal or image grouping in the middle. A clearly labeled “Open Invitation” control sits on the cover as the primary action. After activation, the cover is dismissed and the invitation’s full scrollable page is revealed from the top, with navigation and the rest of the content now available.

For the love-letter recreation, keep the same interaction pattern without copying the debut-specific content: show a dedicated cover first, use the existing Rosewood Ink palette and generated heart-letter mark, place a centered “OPEN YOUR LETTER” call to action, and reveal the current hero, letter, proposal, and success states with a soft cover fade/scale transition. The cover must remain keyboard accessible and the open action should work on click, Enter, and Space.

Responsive QA note: the first mobile capture showed the sender title clipping at narrow widths, so the mobile type scale and letter spacing were reduced to keep “MILOYSKIEE” fully visible while preserving the desktop hierarchy.

Live-preview QA note: the updated page loads with the invitation cover and exposes “OPEN YOUR LETTER” as the primary interactive control. The first automated click snapshot went stale before activation, so the browser view must be refreshed before retesting the click-through.

Final interaction QA: after refreshing the live preview, clicking the cover successfully removed the intro and revealed the existing hero, letter, proposal heading, heart, and YES/NO controls from the top of the page.
