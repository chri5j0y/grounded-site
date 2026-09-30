THE GROVE (Garden part 2, session 4)
Upload every file in this ZIP to the main site repo (growwithgrounded.com), keeping the folders.

IMPORTANT: DELETE THE OLD garden/data.js AND garden/share-image.png FROM THE REPO
  The garden folder now holds only one file, garden/index.html, which forwards people to /grove/
  (keeping any ?who= link). Everything else moved to the new grove/ folder.
  No Cloudflare changes are needed. /grove/ is just a folder in the repo.

NEW
  grove/index.html, grove/data.js      The Grove (was Tending the Garden)
  grove/apple-touch-icon.png           App icon: the five trees in cream (Option C)
  grove/favicon.png                    Bolder cut of the same, for browser tabs
  grove/share-image.png                The locked scene with "the GROVE." wordmark
  garden/index.html                    Forwarding page from the old address

CHANGED
  soul-tree/index.html        Thin dark brown seam everywhere the tree appears. "Tend Your Grove"
                              replaces "Send to my garden". #quick and #checkup open the quick
                              check-in or full checkup directly (The Grove's season nudges use them).
  soul-tree/apple-touch-icon.png, favicon.png, share-image.png   Redrawn with the dark seam.
  sprout/index.html           Check-in only. Tabs: My tree, My checkups, How I've grown. Every
                              checkup adds a ring. Results lead with Tend Your Grove.
  sapling/index.html          Check-in only. Each checkup adds a ring and three leaves. Tree kind
                              chosen in The Grove shows on the Sapling tree.
  shared/gg-profiles.js       Saved gardens move to the new "grove" key when a profile opens.
                              Teen shared progress moves too. Welcome back card: "Tend Your Grove".
  shared/gg-care.js           Comments only.
  nav.js                      The Grove with its own icon. Old Growth listed as coming soon.
  index.html, tools.html      New Grove card and art. Old Growth coming soon cards.
  style.css                   Old Growth card color (Driftwood #7A6A58), Grove art frame.
  privacy.html, terms.html    The Grove wording. PRIVACY_V and TERMS_V were not changed.
  Every other page            Footer links and trademark line say The Grove.

HOW THE GROVE WORKS NOW
  Six parts   Roots (Holy), Trunk (Meaning), Bark (Mind), Branches (Community), Leaves (Body),
              Fruit (Hope). Leaves holds three strands: Move, Rest, Nourish. When someone tends
              Leaves, the practice comes from the strand that needs it most (score under 60),
              or rotates if none or several do.
  Quiz        Same 64 questions on 8 pages, labeled by part ("Leaves: Rest"). Results suggest the
              two parts that need the most care.
  Your tree   Shaped by life stage: Sprout, Sapling, Heartwood, or Soul Tree. Grows through
              Planting, Rooting, and Blooming. Parts being tended show their colors on the tree.
  Visitors    Ladybug 1 day, Butterfly 7, Bluebird 14, Butterfly 21, Bunny 35, Butterfly 50.
  Unlocks     Tree kinds: Birch 15 days, Maple 35, Pine 60. Scenery: Lake 10, Autumn 25,
              Winter 45, Dusk 70. Sapling leaves earned before the move unlock the matching
              kinds and scenery (Birch 10 leaves, Maple 35, Pine 75, Winter 20, Autumn 50, Dusk 100).
  Check-ins   A nudge at the start of Rooting (week 5) and Blooming (week 9), and after twelve
              weeks: Soul Tree quick check-in, then the full checkup at twelve weeks. Kids go to
              Sprout, middle schoolers to Sapling. High schoolers keep The Grove's short weekly
              check-in until Heartwood is ready. "Feeling off? Check on your tree" is always on Today.
  Family      The Family tab shows everyone's trees side by side in one grove, then the rows.
  Daily tap   "Tend Your Grove" (was "Water your garden").

BEHIND THE SCENES
  Storage key the-grove-v1 (old tending-the-garden-v1 moves once, then is erased).
  Vault key grove (old garden moves once). Shared record grove (old garden read, then removed).
  Old gardens: each bed moves into its part (Body, Rest, Nourish into Leaves, and so on).
  Backups: new app id the-grove; old tending-the-garden backups still restore.
  Check-in handoffs use the same strand ids as before, so the question mappings from session 3
  still apply unchanged.

TESTED (Chromium, local server)
  Home, Tools, The Grove, Soul Tree, Sprout, Sapling, Privacy, Terms, Field Guide, Stories at
  320px and 1280px: no sideways scrolling, no script errors. /garden/?who=abc forwards to
  /grove/?who=abc. An old saved garden opened as a six-part grove. Quiz pages, results, Today,
  My tree, This week, and a four-tree family grove rendered at every life stage, with pine,
  birch, and maple, and lake, autumn, and winter scenery. Sprout tree tab and results rendered.

NOT CHANGED HERE
  The old garden.growwithgrounded.com moving page (in its own repo) still sends people to
  /garden/, which now forwards to /grove/. You can update it to /grove/ whenever you like.
