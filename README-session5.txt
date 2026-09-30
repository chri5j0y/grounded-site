THE GROVE PRACTICE LIBRARY (Garden part 2, session 5)
Upload every file in this ZIP to the main site repo (growwithgrounded.com), keeping the folders.
Nothing to delete this time. No Cloudflare changes.

NEW
  grove/library.js       Every practice's "Show me how" (why it helps, steps, if it's hard, and a
                         kid version), plus 33 new practices folded in from Sprout and Sapling.
                         Edit words here, the same way you edit grove/data.js.

CHANGED
  grove/index.html       Show me how on every Today card. New Library tab. Picks from the library.
                         The daily reminder row now wraps on narrow phones (it scrolled sideways
                         by a few pixels at 320px before).

WHAT PEOPLE SEE
  Today       Each practice has "Show me how." Tap it and the steps open right on the card.
              Kid trees (Sprout age) see the kid steps. Under it: "Try a different one" and
              "Browse the library," which opens the library to that part of the tree.
  Library     A new tab. Search box, a filter for each part, and "Busy day versions."
              127 practices: The Grove's 94 (the three Movement weeks share one entry) and 33 new.
              Search runs on the device. Nothing is sent anywhere.
  Picks       "Make this my Roots practice" puts a library practice on Today in place of that
              part's rotation. It shows a "Your pick" tag and "Go back to the season's practice."
              It stays until they change it, through new seasons and checkups. Season banners add
              "Your picks come with you." Picking for a part they aren't tending adds that part
              ("Tend Fruit with this practice").
  Family      A grown-up who opens a kid's tree can pick for that kid. Kids see kid wording.
  Care mode   "For someone in my care" also gets the Library tab, to read practices and steps.
              No pick buttons there, since picks belong to a person's own tree.

WHO SEES WHAT
  All ages        Most practices. Kid trees get kid names, words, and steps.
  Teens and up    Carry a Question, Something Bigger, Slow Sacred Reading, Values in Action,
                  True or Just Loud, Both Can Be True, Learn From a Mistake, Scroll Break,
                  What Makes a Good Friend, I Made It Through. Hidden from kid trees.
  Teens only      My No Plan (middle and high school). Hidden from kids and adults.

SAFETY LINES IN THE STEPS
  988 appears in: Lament, Who Counts on Me, Talk It Through, I Made It Through.
  "Tell a grown-up right away": kid Letting Go, kid Worry Monster, kid Worry Jar, My No Plan.
  Health notes: Movement, Strength Training, Water First, Regular Meals, Notice How Food Feels,
  My Body Tree. The existing care notes on Today cards are unchanged.

BEHIND THE SCENES
  Picks save as grove.pins, one per part, inside the person's locked profile like everything else.
  Backups carry them. A pick that no longer exists in library.js is quietly dropped.
  window.GroveLibrary (items, get, fits, search) is ready for session 6's site-wide search.

TESTED (Chromium, local server)
  Adult, Sprout, and Sapling trees at 1280px; adult at 320px and 390px; light and dark.
  Show me how, search, part filters, busy-day view, picking, picking for an untended part,
  going back, bad saved picks, and care mode. No script errors, no sideways scrolling.
