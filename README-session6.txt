SITE-WIDE SEARCH (Garden part 2, session 6)
Upload every file in this ZIP to the main site repo (growwithgrounded.com), keeping the folders.
Upload them all at once: sprout/index.html needs sprout/guides.js, and soul-tree/index.html needs
soul-tree/guides.js. Nothing to delete. No Cloudflare changes.

NEW
  search.js              The search box on the Tools page. The EVERYDAY WORDS list near the top
                         teaches it words people really type ("vape," "blow up," "cutting").
                         Add a line there any time a search comes up empty that shouldn't.
  sprout/guides.js       Sprout's When Life Changes guides, moved out of sprout/index.html.
                         Edit guide words here now.
  soul-tree/guides.js    Soul Tree's When Life Changes guides, moved out of soul-tree/index.html.
                         Edit guide words here now.
  heartwood/guides.js    DRAFT, not live. The high school de-escalation guide, waiting for Heartwood.
                         Nothing loads or links to it yet.

CHANGED
  tools.html             "Find help fast" search box above Check-ins.
  style.css              Search styles (added at the bottom).
  sprout/index.html      Loads sprout/guides.js. Works exactly as before.
  soul-tree/index.html   Loads soul-tree/guides.js. Works exactly as before.
  sapling/index.html     New single-guide links: /sapling/#talk=vaping opens that guide.
  sapling/guides.js      New guide: In the middle of a blowup (Home and family).
  grove/index.html       New link: /grove/#library=Breath Prayer opens the Library searched for it.
  site.js                A link like stories.html#story-birth-plan opens that story's preview.

NEW DE-ESCALATION GUIDES
  Sprout (K to 5)        In the middle of a meltdown          /sprout/#talk=meltdown
  Sapling (6 to 8)       In the middle of a blowup            /sapling/#talk=blowup
  Soul Tree (adults)     When someone is escalating (Safety)  /soul-tree/#life=escalating
                         Its "If children are involved" links to the Sprout meltdown guide.
  Heartwood (9 to 12)    In the middle of a blowup            drafted, held in heartwood/guides.js
  Safety lines: all three live guides name 988 and 911. Please read them closely.

WHAT PEOPLE SEE
  Type in the box (or tap a starter like Vaping or A meltdown). Results come grouped:
  Hard Talks (tagged Kids K to 5, Grades 6 to 8, or Adults), Practices, Tools, and Stories.
  Tap a Hard Talk to open its quick card right there, with a button to the full guide.
  Tap a practice for its steps, with a button to find it in The Grove.
  Tools and stories go straight to their page.
  Crisis words (suicide, cutting, self harm, abuse, and similar) put 911 and 988 at the top first,
  plus Childhelp and the Domestic Violence Hotline for abuse words.
  tools.html?q=vaping opens the page with that search already run, handy to share with a teacher.
  Search runs on the device. Nothing typed is sent anywhere. The guide files only load when
  someone taps into the box, so the Tools page stays fast.

TESTED (Chromium, local server)
  About 130 real-world searches. 1280px, 390px, and 320px, light and dark. No sideways scrolling.
  Every Sprout, Sapling, and Soul Tree guide link, the Grove library link, the story link.
  Sprout, Sapling, Soul Tree, The Grove, home, and Stories pages load with no script errors.

SEARCHES THAT CAME UP EMPTY OR THIN (possible new guides)
  ADHD and learning differences: nothing.
  Self-harm: no guide of its own for parents or teachers. Search shows the crisis lines and
    the suicide and "friend is hurting" guides.
  Eating disorders: nothing. Body image for middle schoolers exists.
  College, graduation, and leaving home: nothing (fits Heartwood).
  Lying and stealing: nothing.
  Gambling: nothing.
  Bedwetting: nothing.
  Car accidents and sudden injury: only general trauma and tragedy guides.
  Pornography: only the online pictures guides.
