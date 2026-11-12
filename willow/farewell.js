/* =====================================================================
   WILLOW . the Willow Hub wording (GWG BLD 971)
   Everything Willow says on the Wishes, Stories, Farewell, and Learn tabs,
   kept here as data so the words are easy to change and quotes stay escaped.
   The checklist, Obituary, and Eulogy come from Planning a Farewell, the
   Obituary Helper, and the Eulogy Helper (GWG BLD 748, 766), brought inside
   Willow and saved in the person's own locked profile.
   ===================================================================== */
window.WILLOW_FAREWELL = {
  tagline: 'For the last season of life, and the farewell that follows',

  /* The six tabs: [id, name, icon, the pages inside it (first is the tab's own page)] */
  tabs: [
    ['today', 'Today', 'sun', []],
    ['wishes', 'Wishes', 'heart', [['wishes', 'Wishes'], ['matters', 'What Matters'], ['faithpage', 'Faith'], ['vigil', 'Vigil Wishes'], ['service', 'Service Wishes']]],
    ['stories', 'Stories', 'scroll', [['stories', 'Stories'], ['cuttings', 'Cuttings'], ['legacy', 'Legacy Book']]],
    ['bedside', 'Bedside', 'hand', []],
    ['farewell', 'Farewell', 'candle', [['farewell', 'Farewell'], ['plan', 'Checklist'], ['obituary', 'Obituary'], ['eulogy', 'Eulogy'], ['readings', 'Readings'], ['send', 'Send to the Grounded Team']]],
    ['learn', 'Learn', 'play', [['learn', 'Learn'], ['guides', 'When Life Changes'], ['about', 'How It Works']]]
  ],

  /* The painting for each page: [file name in /shared/heroes/p/willow-NAME-*.webp, a short description for screen readers] */
  art: {
    today: ['today', 'A grandfather resting in a sunny chair by the window, his grandson breathing along beside him'],
    wishes: ['wishes', 'A grandmother sharing her wishes on the porch while her granddaughter writes them down'],
    matters: ['matters2', 'A grandfather sharing what matters on a garden bench while his granddaughter writes it down'],
    faithpage: ['faith2', 'A grandmother resting in quiet prayer by a sunny window, her son beside her'],
    vigil: ['vigil', 'A family keeping an evening vigil by candlelight, a friend bringing tea'],
    service: ['celebration', 'A backyard celebration of life with memory cards on a line, flowers, a dog, and a cat'],
    stories: ['stories', 'A grandfather telling a story from the photo album, his granddaughter beside him and his son writing it down'],
    cuttings: ['cuttings2', 'A grandmother laughing over an old recipe card while her grandson copies it down'],
    legacy: ['legacy2', 'Three generations paging through a handmade book of photos and letters'],
    bedside: ['bedside', 'A daughter holding her mother\'s hand at a sunny window, a grandson bringing flowers'],
    farewell: ['farewell', 'A family planning at the kitchen table with his photo, a notebook, readings, and a candle'],
    plan: ['plan2', 'A brother and sister planning together at a sunny table with a notebook and tulips'],
    obituary: ['obituary', 'A woman writing at a sunlit desk, her father laughing in a framed photo'],
    eulogy: ['eulogy', 'A woman sharing a eulogy under an oak in a meadow, family gathered in a half circle'],
    readings: ['readings', 'An older man reading aloud under a rose arbor while his family listens'],
    send: ['send2', 'A daughter on the porch steps holding a folder with a relieved smile, her husband bringing tea'],
    learn: ['learn2', 'A son and his mother reading a short guide together on a sofa in a sunroom'],
    guides: ['guides2', 'A hospice nurse talking gently with a father and his two grown daughters'],
    videos: ['videos2', 'A grandfather resting peacefully in bed, listening, his wife holding his hand'],
    about: ['hero2', 'A family gathered on a quilt under a weeping willow by the lake at golden hour']
  },

  /* The top of each page: [eyebrow, title, a line under it] */
  heads: {
    wishes: ['Wishes', 'What matters, in their own words', 'Who they are, what they hope for, how they want the last days to feel, and the kind of farewell that sounds like them. Write a little or a lot.'],
    matters: ['Wishes', 'What Matters', 'So everyone beside them knows who they are, and what makes a good day.'],
    faithpage: ['Wishes', 'Faith, Spirit, or Something Else', 'Every answer is welcome, including none. Each person answers for themselves.'],
    vigil: ['Wishes', 'Vigil Wishes', 'How they want the last days to feel: the room, the people, the words, and touch.'],
    service: ['Wishes', 'Service Wishes', 'The music, the readings, who speaks, and the feel of the day. What Matters fills in what it can.'],
    stories: ['Stories', 'Stories that root and grow', 'Cuttings keep stories, letters, lessons, and blessings. The Legacy Book gathers them into one book to keep.'],
    cuttings: ['Stories', 'Cuttings', 'Stories, letters, lessons, and blessings, kept for the people who stay.'],
    legacy: ['Stories', 'The Legacy Book', 'Every Cutting in one book, ready to print or save, for the people who stay.'],
    bedside: ['Bedside', 'At the bedside', 'Small, real things families and helpers can do, with how well each one is backed.'],
    farewell: ['Farewell', 'Planning the farewell, together', 'A checklist for the first hours and days, the Obituary and the Eulogy, readings, and an easy way to bring the Grounded team in to help prepare the service.'],
    plan: ['Farewell', 'The Farewell Checklist', 'Any order works, and most of it can wait. Check things off, and hand any of it to someone who asked how to help.'],
    obituary: ['Farewell', 'The Obituary', 'Answer what you can. Willow puts your words into three drafts to shape in your own voice.'],
    eulogy: ['Farewell', 'The Eulogy', 'Who they were, three true stories, what they gave you, and goodbye. Willow lays your words into that simple shape.'],
    readings: ['Farewell', 'Readings', 'Psalms, prayers, poems, and blessings for all faith traditions and everything in-between.'],
    send: ['Farewell', 'Send to the Grounded Team', 'When you are ready, send your plans to the Grounded team, and we help you prepare the service.'],
    learn: ['Learn', 'Words and videos for the hardest days', 'When Life Changes guides, short videos for the person and the people who love them, and how Willow works.'],
    guides: ['Learn', 'When Life Changes', 'Words for the hardest conversations.'],
    about: ['Learn', 'How Willow Works', 'A tree for the last season of life.']
  },

  /* The cards on each tab's own page: [page, title, a line about it] */
  hub: {
    wishes: [
      ['matters', 'What Matters', 'Who they are, a good day, small joys, hopes, and who they want close.'],
      ['faithpage', 'Faith', 'Their tradition, how they live it, and who to call.'],
      ['vigil', 'Vigil Wishes', 'The room, the people, the words, and touch, for the last days.'],
      ['service', 'Service Wishes', 'Music, readings, who speaks, burial or cremation, and the feel of the day.']
    ],
    stories: [
      ['cuttings', 'Cuttings', 'Stories, letters, lessons, recipes, and blessings, in their own words.'],
      ['legacy', 'The Legacy Book', 'Every Cutting gathered into one book to print, save, and keep.']
    ],
    farewell: [
      ['plan', 'The Farewell Checklist', 'The first hours, the first days, the service, and after.'],
      ['service', 'Service Wishes', 'What they hope the day holds, filled in from What Matters.'],
      ['obituary', 'The Obituary', 'Three drafts from the life facts: a notice, the newspaper, and online.'],
      ['eulogy', 'The Eulogy', 'Their Cuttings become the stories, ready to shape and read aloud.'],
      ['readings', 'Readings', 'Words for the service and the bedside, many with Listen.'],
      ['send', 'Send to the Grounded Team', 'One tap shares your plans so we can help you prepare the service.']
    ],
    learn: [
      ['guides', 'When Life Changes', 'Guides for the hardest conversations, each with two short videos.'],
      ['videos', 'Learn Videos', 'Short videos, narrated aloud, for the person and the people who love them.'],
      ['about', 'How Willow Works', 'Tend Four, Grow Two, built for two, and what is inside.']
    ]
  },

  /* Service Wishes. kind: t text, a longer text, m many choices, 1 one choice. The ids match the Farewell Planning Session (GGFW1). */
  service: {
    choices: {
      gatherings: [['funeral', 'Funeral'], ['memorial', 'Memorial'], ['celebration', 'Celebration of Life'], ['visitation', 'Visitation or Wake'], ['prayer', 'Prayer Service'], ['graveside', 'Graveside Committal'], ['reception', 'Reception'], ['unsure', 'Still Deciding']],
      rest: [['burial', 'Burial'], ['cremation', 'Cremation'], ['scattering', 'Cremation and Scattering'], ['unsure', 'Still Deciding']],
      faithway: [['faith', 'Faith at the Center'], ['plain', 'Plain Words'], ['blend', 'A Blend of Both'], ['unsure', 'Still Deciding']],
      customs: [['hymns', 'Hymn Singing'], ['candle', 'Lighting a Candle'], ['memories', 'Sharing Memories Aloud'], ['flowers', 'Flowers on the Casket'], ['silence', 'A Moment of Silence']],
      honors: [['military', 'Military Honors'], ['flag', 'Flag Folding'], ['taps', 'Taps'], ['fraternal', 'Fraternal or Service Group']]
    },
    groups: [
      ['The Gathering', [
        ['gatherings', 'm', 'The kind of gathering'],
        ['rest', '1', 'Burial or cremation'],
        ['feel', 'a', 'The feel of the day', 'Warm and full of stories. Quiet and simple. A party in the backyard.'],
        ['place', 't', 'Place', 'A church, the lake, the backyard, the funeral home'],
        ['when', 't', 'Dates or times already set', '']
      ]],
      ['Words and Music', [
        ['music', 'a', 'Music', 'A favorite hymn or song, and who might sing or play it'],
        ['readings', 'a', 'Readings', 'Psalm 23, a poem they loved, a passage from their tradition'],
        ['speakers', 'a', 'Who speaks', 'One name on each line'],
        ['lead', 't', 'Who leads the service', 'A faith leader, a celebrant, or a family member']
      ]],
      ['Faith and Traditions', [
        ['faithway', '1', 'The words for the service'],
        ['tradition', 't', 'A church or tradition that matters', 'Lutheran, Catholic, Jewish, none'],
        ['customs', 'm', 'Customs to honor'],
        ['honors', 'm', 'Honors']
      ]],
      ['Anything Else', [
        ['funeralHome', 't', 'Funeral home, if you have one', 'Name and phone'],
        ['notes', 'a', 'Anything else', 'Colors, flowers, a favorite food for the meal, something to keep in mind']
      ]]
    ],
    /* What Matters fills these when they are still empty: [service field, What Matters fields, a line to start with] */
    fromMatters: [
      ['feel', ['good', 'joy'], ''],
      ['music', ['comfort'], ''],
      ['speakers', ['close'], ''],
      ['notes', ['never'], 'Please keep in mind: ']
    ],
    filled: 'Filled in from What Matters. Change anything; these are their wishes, in their words.'
  },

  /* Life Facts: written once, used by the Obituary, the Eulogy, the Legacy Book, and Send to the Grounded Team */
  facts: [
    ['name', 'Full name', 'As the family wants it printed. A nickname in quotes is welcome.', 'First, middle, and last name'],
    ['first', 'The name they went by', 'Used all through the drafts. Leave it blank to use the first name.', 'The name friends used'],
    ['age', 'Age', 'A number is enough.', '82'],
    ['city', 'City where they lived', 'City only. Leave out the street address.', 'St. Cloud'],
    ['born', 'Born where, and the year', 'Start with "in." A year, or a month and year, is safer than the full birth date.', 'in Little Falls, Minnesota, in 1944'],
    ['death', 'Date and place of death', 'Add this when the time comes.', 'October 2, 2026, at home, surrounded by family']
  ],

  checklist: {
    lead: 'When someone you love is dying, or has just died, there is a lot to do and very little room to think. This list holds it for you.',
    secs: [
      { id: 'hours', name: 'First Hours', lead: 'Take your time. These are the few things that matter in the first hours.', items: [
        { id: 'time', t: 'Take the time you need', d: 'When a death was expected, everything can wait a while. Sit. Hold their hand. Say goodbye. Let children come in if they want to.' },
        { id: 'call', t: 'Make the first call', d: 'If hospice is caring for them, call the hospice\'s 24/7 line first; the nurse comes to confirm the death and helps with the next steps. If the death was sudden or unexpected, call 911.' },
        { id: 'people', t: 'Call the people who should come now', d: 'Family, a close friend, and a faith leader or chaplain if one is wanted.' },
        { id: 'ritual', t: 'Do what your tradition asks', d: 'Prayers, washing, keeping watch, a reading, or simply sitting together. Willow\'s faith cards and readings can help.', go: [['Readings', 'readings'], ['At the Bedside', 'bedside']] },
        { id: 'home', t: 'Call the funeral home when you\'re ready', d: 'If they made plans ahead, look for those papers first. The hospice can help you make this call.' },
        { id: 'water', t: 'Look after the ones keeping watch', d: 'Water, something to eat, a chair, and a few minutes outside. Let someone else answer the phone for a while.' }
      ] },
      { id: 'days', name: 'First Days', lead: 'The funeral home, the papers, and the people who need to know.', items: [
        { id: 'meet', t: 'Meet with the funeral director', d: 'Bring a friend if you can. You have the right to an itemized General Price List, and to choose only the goods and services you want.' },
        { id: 'choose', t: 'Choose burial, cremation, or another option', d: 'Honor the wishes they wrote down or spoke about. Service Wishes keeps them.', go: [['Service Wishes', 'service']] },
        { id: 'certs', t: 'Order certified death certificates', d: 'Ask the funeral director how many to order; banks, insurers, pension plans, and others may each need one. In Minnesota, certified copies for deaths since 1997 are available from any county vital records office. The first copy is $13, and each extra copy of the same record ordered at the same time is $6. Fees can change.' },
        { id: 'tell', t: 'Tell family and friends', d: 'Ask one or two people to help spread the word, so you can rest between the calls.' },
        { id: 'obit', t: 'Write the death notice and obituary', d: 'The funeral home can place them. Leave out the home address, the full birth date, and the mother\'s maiden name.', go: [['The Obituary', 'obituary']] },
        { id: 'papers', t: 'Gather their papers', d: 'Will, health care directive, life insurance policies, military discharge papers (DD 214), and any prepaid funeral plan.' },
        { id: 'ssa', t: 'Report the death to Social Security', d: 'The funeral home usually does this for you. If not, call Social Security at 1-800-772-1213 (TTY 1-800-325-0778).' },
        { id: 'vet', t: 'If they served, ask about honors', d: 'Ask the funeral director about military funeral honors and VA burial benefits.' },
        { id: 'house', t: 'Look after the house', d: 'Ask someone to stay at the home during the visitation and the service. Plan for pets, mail, and plants.' }
      ] },
      { id: 'service', name: 'The Service', lead: 'A funeral, a memorial, a graveside, or a celebration of life. Make it sound like them.', items: [
        { id: 'kind', t: 'Choose the kind of gathering', d: 'It can happen in a few days, or weeks or months from now.', go: [['Service Wishes', 'service']] },
        { id: 'lead', t: 'Choose who will lead it', d: 'A faith leader, a celebrant or officiant, or a family member. The Grounded team is glad to help.', go: [['Send to the Grounded Team', 'send']] },
        { id: 'words', t: 'Pick readings and music', d: 'Favorite songs, a poem, scripture, or words from their own tradition.', go: [['Readings', 'readings']] },
        { id: 'speak', t: 'Choose who will speak, and write the eulogy', d: 'A family member, a friend, or a few people sharing short stories.', go: [['The Eulogy', 'eulogy']] },
        { id: 'photos', t: 'Gather photos and keepsakes', d: 'A slideshow, a memory table, the hat they always wore.' },
        { id: 'program', t: 'Make a program or order of service', d: 'Ask someone else to check every name and date.' },
        { id: 'meal', t: 'Plan the meal or reception', d: 'Let people help. Saying yes to a casserole is a kindness to them too.' },
        { id: 'thanks', t: 'Keep a list for thank-you notes', d: 'Who brought food, sent flowers, or showed up. A friend can keep it for you.' }
      ] },
      { id: 'after', name: 'After', lead: 'Weeks and months, not days. Take these slowly.', items: [
        { id: 'accounts', t: 'Notify banks, insurers, pensions, and employers', d: 'Each may ask for a certified death certificate.' },
        { id: 'cancel', t: 'Close or change accounts', d: 'Phone, utilities, subscriptions, and online accounts.' },
        { id: 'credit', t: 'Protect their identity', d: 'Send a copy of the death certificate to the three credit bureaus and ask them to mark the file as deceased.' },
        { id: 'estate', t: 'Ask about the will and the estate', d: 'An attorney can explain what your family needs to do.' },
        { id: 'notes', t: 'Write thank-you notes', d: 'Take all the time you need. A few lines is plenty.' },
        { id: 'bereave', t: 'Ask the hospice about bereavement support', d: 'Most hospices offer support to the family for about 13 months after a death. Ask for it by name.' },
        { id: 'days', t: 'Mark the hard days', d: 'Birthdays, anniversaries, and holidays. Plan something small, and tell someone it\'s coming.' },
        { id: 'you', t: 'Look after yourself', d: 'Sleep, food, a walk, and people who let you talk about them. Grief keeps its own time.', go: [['When Life Changes', 'guides']] }
      ] }
    ],
    sources: [
      ['Federal Trade Commission, Shopping for Funeral Services (the Funeral Rule)', 'https://consumer.ftc.gov/articles/shopping-funeral-services'],
      ['Dakota County, Certified Death Certificates', 'https://www.co.dakota.mn.us/Permits/DeathCertificates/Certified'],
      ['Isanti County, Death Certificates', 'https://www.isanticountymn.gov/835/Death-Certificates'],
      ['Social Security Administration, When Someone Dies', 'https://www.ssa.gov/personal-record/when-someone-dies'],
      ['U.S. Department of Veterans Affairs, Burials and Memorials', 'https://www.va.gov/burials-memorials/'],
      ['Bankrate, How to Protect Dead Relatives from Identity Theft', 'https://www.bankrate.com/personal-finance/smart-money/protect-dead-relatives-from-identity-theft']
    ]
  },

  /* The Obituary (from the Obituary Helper, GWG BLD 748). The Basics come from Life Facts. */
  obituary: {
    lead: 'Writing about someone you love, in the middle of missing them, is hard work. Answer what you can, skip the rest, and Willow puts your words into three drafts: a short Death Notice, a Newspaper Obituary, and a longer Online Obituary. Every word stays yours to change.',
    groups: [
      { name: 'Their Life', qs: [
        { id: 'early', ask: 'Growing up and school', hint: 'Hometown, siblings, school, a childhood story. A sentence or two, in your own words.' },
        { id: 'work', ask: 'Work, service, and military', hint: 'Jobs, the one {they} loved most, military branch and years. A sentence or two.' },
        { id: 'married', ask: 'Marriage and partnership', hint: 'Who {they} married, where, and the year. A sentence.' },
        { id: 'loved', ask: 'What {they} loved', hint: 'Hobbies, places, teams, food, music, sayings. A list is fine.', ph: 'fishing on Mille Lacs, polka music, and Sunday dinners', from: ['joy'] },
        { id: 'remembered', ask: 'What {they} will be remembered for', hint: 'The family\'s own words. One honest, warm detail.', from: ['who'] },
        { id: 'faith', ask: 'Faith community (only if the family wants it)', hint: 'A church, synagogue, mosque, temple, or meeting, if you want it named. A sentence, or leave it blank.' }
      ] },
      { name: 'Family', qs: [
        { id: 'survived', ask: 'Survived by', hint: 'Spouse, children and their spouses, grandchildren, siblings. Partners named as the family wishes.', ph: 'a husband of 52 years; three children and their spouses; seven grandchildren' },
        { id: 'preceded', ask: 'Preceded in death by', hint: 'Parents, spouse, siblings, children.', ph: 'parents and a brother' }
      ] },
      { name: 'The Service', qs: [
        { id: 'service', ask: 'Service details', hint: 'Day, date, time, and place; visitation; burial.', ph: 'Saturday, October 10, at 11 a.m. at the funeral home, with visitation one hour before' },
        { id: 'memorials', ask: 'Memorials or donations', hint: 'A charity, the hospice, or a cause {they} loved.', ph: 'the hospice team that walked with the family' },
        { id: 'thanks', ask: 'Thanks', hint: 'Hospice team, caregivers, a care home, neighbors.', ph: 'the hospice nurses and the neighbors who brought meals' }
      ] }
    ],
    shapes: [
      { id: 'notice', name: 'Death Notice', words: 80, about: 'Short and factual: the death, the service, and memorials. Newspapers usually charge by length.', outline: [
        '{Name}, {age}, of {city}, died {death}.',
        '{First} was born {born}.',
        '{First} is survived by {survived}.',
        'A service will be held {service}.',
        'Memorials preferred to {memorials}.'] },
      { id: 'newspaper', name: 'Newspaper Obituary', words: 200, about: 'The life in a few short paragraphs, for the paper or the funeral home\'s page.', outline: [
        '{Name}, {age}, of {city}, died {death}.',
        '{First} was born {born}. {early}',
        '{work}',
        '{married}',
        '{First} loved {loved}.',
        '{remembered}',
        '{First} is survived by {survived}, and was preceded in death by {preceded}.',
        'A service will be held {service}.',
        'Memorials preferred to {memorials}.',
        'The family thanks {thanks}.'] },
      { id: 'online', name: 'Online Obituary', words: 500, about: 'Room for the whole story, for an online memorial page. Add more stories as you like.', outline: [
        '{Name}, {age}, of {city}, died {death}.',
        '{First} was born {born}. {early}',
        '{work}',
        '{married}',
        '{First} loved {loved}.',
        '{remembered}',
        '{faith}',
        '{First} is survived by {survived}.',
        '{Their} family remembers {them} with love, along with those who went before: {preceded}.',
        'A service will be held {service}.',
        'Memorials preferred to {memorials}.',
        'The family thanks {thanks}.'] }
    ],
    tips: [
      'Keep the home address private. The city is enough.',
      'Use the year, or the month and year, in place of the full birth date.',
      'Keep the mother\'s maiden name private; it is a common security question.',
      'Ask a friend or neighbor to stay at the home during the visitation and the service, since some thieves read obituaries.',
      'Death notices are usually paid by length; the funeral home can place them and tell you the cost.',
      'Read the draft out loud with the family before it goes anywhere, and check every name and date.'
    ],
    sources: [
      ['Legacy.com, The Difference Between a Death Notice and an Obituary', 'https://www.legacy.com/memorial-writing/difference-between-a-death-notice-and-obituary'],
      ['Bankrate, How to Protect Dead Relatives from Identity Theft', 'https://www.bankrate.com/personal-finance/smart-money/protect-dead-relatives-from-identity-theft'],
      ['Michigan State University Extension, The Ultimate Identity Theft', 'https://www.canr.msu.edu/news/the_ultimate_identity_theft']
    ]
  },

  /* The Eulogy (from the Eulogy Helper, GWG BLD 748). Cuttings are offered for the three stories. */
  eulogy: {
    lead: 'Being asked to speak is an honor, and it can feel like a lot. A good eulogy says who they were, tells a few true stories, names what they gave you, and says goodbye. Answer the prompts, and Willow lays your words into that simple shape, with a reading time, so you can make it your own.',
    wpm: 130,
    groups: [
      ['Who They Were', '', [
        ['name', 't', 'Their name', 'The name you\'ll call them in the room.', 'Grandpa Joe'],
        ['me', 't', 'Who you are to them', 'One line to open with, so everyone knows who is speaking.', 'I\'m his oldest granddaughter'],
        ['who', 'a', 'Who they were, in one sentence', 'If you had only one sentence. It can be funny, plain, or both.', 'the kind of man who fixed your car and then made you stay for supper']
      ]],
      ['Three Stories', 'Small and true is better than big and general. A story that shows who they were does more than a list of good qualities. Their Cuttings are here to use.', [
        ['s1', 'a', 'Story One', 'A story that makes you smile or laugh.', ''],
        ['s2', 'a', 'Story Two', 'A time they showed up for someone, or a habit everyone knew.', ''],
        ['s3', 'a', 'Story Three', 'A moment between the two of you, or something they always said.', '']
      ]],
      ['What They Gave Us', '', [
        ['taught', 'a', 'What they taught you', 'A lesson, a way of doing things, a way of loving people.', 'that you finish what you start, and you always leave room at the table'],
        ['carry', 'a', 'What we carry forward', 'What the people in this room will keep doing because of them.', ''],
        ['close', 'a', 'A closing line', 'A goodbye, a thank you, a line they loved, or what you want to say to them now.', 'Thank you for everything. We\'ll keep a seat for you.']
      ]]
    ],
    tips: [
      'Print it in large type, double spaced, and mark a slash where you want to stop and breathe.',
      'Give a copy to someone you trust, and ask them to stand nearby. If you need a moment, they can read the rest. Finishing it for you is a gift they will be glad to give.',
      'Keep water and tissues within reach.',
      'Read it out loud a few times before the day. The hard lines get a little easier each time.',
      'Slow down. Most people speed up when they are nervous. A pause feels longer to you than it does to the room.',
      'If tears come, stop, breathe, and wait. Everyone there is on your side.',
      'Find a kind face in the room and speak to them.',
      'Ask how many minutes you have. At an easy pace, five minutes is about 650 words.'
    ],
    useCutting: 'Use a Cutting'
  },

  /* Send to the Grounded Team: what can go, [id, title, a line about it, on at first] */
  send: {
    lead: 'Send your plans to the Grounded team, and we help you prepare the service: a funeral, a memorial, a celebration of life, or whatever fits. Willow makes a short summary and a file that opens right into our planning tool. It leaves this device only when you tap Send.',
    parts: [
      ['facts', 'Life Facts', 'Name, age, city, and the dates.', true],
      ['service', 'Service Wishes', 'Music, readings, who speaks, burial or cremation, and the feel of the day.', true],
      ['plan', 'The Checklist', 'What is done so far.', true],
      ['obituary', 'The Obituary', 'Every draft with words in it.', true],
      ['eulogy', 'The Eulogy', 'The eulogy as it stands.', true],
      ['matters', 'What Matters', 'In their own words.', false],
      ['cuttings', 'Cuttings', 'Their stories, letters, and blessings.', false]
    ],
    after: 'Sent. The Grounded team will reach out to help you prepare. Everything here stays on this device as well.',
    fileNote: 'The file opens right into the Grounded team\'s planning tool.'
  }
};
