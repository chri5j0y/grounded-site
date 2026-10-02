/* Grounded library data. One book per line:
   number | title | author | year | copies | tree parts | summary | tags
   Private books are not listed here. Add a book by adding a line.
   AMAZON_TAG: paste the Amazon Associates tag here once the LLC signs up
   (for example 'growwithgrounded-20'). Until then the Amazon links are plain
   links that earn nothing, and the disclosure line stays hidden. */
const AMAZON_TAG = '';
const SECTIONS = {
  DY: ['Death and dying', 'ti-candle'],
  CP: ['Chaplaincy and care', 'ti-heart-handshake'],
  PS: ['Psychotherapy and mind', 'ti-armchair'],
  CM: ['Contemplative', 'ti-flower'],
  NA: ['Nature and trees', 'ti-trees'],
  BD: ['Body and healing', 'ti-heartbeat'],
  WR: ['World religions', 'ti-world'],
  CD: ['Devotional', 'ti-pray'],
  TH: ['Theology', 'ti-school'],
  PM: ['Preaching and ministry', 'ti-microphone'],
  BS: ['Sacred texts', 'ti-scroll'],
  SH: ['Society and history', 'ti-hourglass'],
  LT: ['Literature and kids', 'ti-feather'],
  OD: ['Outdoors and reference', 'ti-compass']
};
const BOOK_DATA = `
DY-001|Dying Well|Ira Byock|1997|2|Trunk,Fruit|A hospice physician's stories of people finding growth and peace at the end of life.|hospice, dying, meaning
DY-002|The Four Things That Matter Most|Ira Byock|2004|2|Branches,Fruit|Four phrases for mending relationships before death.|forgiveness, family
DY-003|The In-Between|Hadley Vlahos|2023|1|Trunk,Fruit|A hospice nurse's memoir of patients in their final days.|hospice, memoir
DY-004|The Grace in Dying|Kathleen Dowling Singh|1998|1|Roots,Trunk|Maps the inner stages a dying person often moves through.|dying, transformation
DY-005|The American Book of Living and Dying|Richard Groves and Anne Klauser|2005|1|Roots,Trunk|Names four kinds of spiritual pain at the end of life.|spiritual pain, chaplaincy
DY-006|Hospice Chaplain, Interrupted|Kinder-Pyle||1|Trunk|A hospice chaplain's reflections on the work and what breaks into it.|chaplaincy, memoir
DY-007|Life After Life|Raymond A. Moody Jr.|1975|1|Fruit|The first wide study of near-death experiences.|near-death, afterlife
DY-008|Journey of Souls|Michael Newton|1994|1|Fruit|Case studies describing life between lives.|afterlife
DY-009|Heaven Is for Real|Todd Burpo|2010|1|Fruit|A young boy's reported visit to heaven during surgery.|heaven, children
DY-010|The Gift of Heaven|Charles Stanley|2006|1|Roots,Fruit|A pastor's biblical look at what heaven is.|heaven, hope
DY-011|It's OK That You're Not OK|Megan Devine|2017|4|Fruit,Bark|Grief is something to carry, not fix.|grief, loss
DY-012|How to Carry What Can't Be Fixed|Megan Devine|2021|2|Fruit|A grief journal of prompts, art, and practices.|grief, journaling
DY-013|Healing After Loss|Martha Whitmore Hickman|1994|1|Fruit|A short reading for each day of a year of grief.|grief, daily readings
DY-014|When Hello Means Goodbye|Pat Schwiebert and Paul Kirk|1981|1|Fruit,Branches|A gentle guide for parents whose baby dies at or near birth.|perinatal loss
DY-015|The Memory Box|Joanna Rowland|2017|1|Fruit|A child keeps memories of someone who died in a special box.|children, grief
DY-016|Cry, Heart, But Never Break|Glenn Ringtved|2001|1|Fruit|Death visits four children and tells them a story first.|children, grief
CP-001|Professional Spiritual and Pastoral Care|Stephen B. Roberts|2011|1|Roots,Branches|A practical handbook for chaplains across settings and faiths.|chaplaincy, interfaith
CP-002|Spiritual Care in Practice|George Fitchett and Steve Nolan|2015|1|Roots,Branches|Case studies in healthcare chaplaincy.|chaplaincy, case studies
CP-003|How to Get the Most Out of Clinical Pastoral Education|Gordon J. Hilsman|2018|1|Branches|Learning from supervision and verbatims in CPE.|CPE, training
CP-004|Spiritual Care in Common Terms|Gordon J. Hilsman|2017|1|Roots,Branches|Spiritual care in plain words medical teams can use.|chaplaincy, language
CP-005|Pastoral Care: An Essential Guide|John Patton|2005|1|Branches|Pastoral care as remembering and community.|pastoral care
CP-006|Hospital Ministry|Lawrence E. Holst|1985|1|Branches|Essays on the work of hospital chaplains.|hospital, chaplaincy
CP-007|Here If You Need Me|Kate Braestrup|2007|1|Trunk,Fruit|A widowed mother becomes chaplain to Maine's game wardens.|chaplaincy, memoir
CP-008|Kitchen Table Wisdom|Rachel Naomi Remen|1996|1|Trunk,Branches|A physician's stories of healing and meaning.|stories, healing
CP-009|My Grandfather's Blessings|Rachel Naomi Remen|2000|1|Roots,Branches|Stories of blessing and belonging.|blessing, belonging
CP-010|Motivational Interviewing in Health Care|Rollnick, Miller, and Butler|2008|1|Bark|Conversations that help people find their own reasons to change.|behavior change
CP-011|Essential Interviewing|Evans, Hearn, Uhlemann, and Ivey|1979|1|Bark,Branches|Core counseling skills like attending and reflecting.|listening, counseling
CP-012|Addiction and Pastoral Care|Sonia E. Waters|2019|1|Bark,Branches|Walking with people in recovery.|addiction, recovery
CP-013|Stages of Faith|James W. Fowler|1981|1|Roots,Trunk|How faith grows across the lifespan.|faith development
CP-014|Trauma Stewardship|Laura van Dernoot Lipsky|2009|1|Bark,Leaves|Secondary trauma in caregivers, and how to tend yourself.|burnout, self-care
CP-015|The Couple Checkup|Olson, Olson-Sigg, and Larson|2008|1|Branches|A couple's strengths and growth areas.|marriage
CP-016|Prepare/Enrich Resource Kit|David Olson||1|Branches|Premarital and marriage assessment materials.|premarital
CP-017|Core Competencies for Healthcare Ethics Consultation|ASBH|2011|1|Trunk|Skills for clinical ethics consultation.|ethics
CP-018|Restorative Practices of Wellbeing|Kram||1|Branches|Practices that restore wellbeing.|wellbeing
CP-019|Facing Messy Stuff in the Church|Kenneth L. Swetland|2005|1|Branches|Hard pastoral situations, with guidance for each.|pastoral care
PS-001|Love's Executioner|Irvin D. Yalom|1989|3|Trunk,Bark|Therapy tales about death, freedom, isolation, and meaning.|existential, therapy
PS-002|Momma and the Meaning of Life|Irvin D. Yalom|1999|1|Trunk,Bark|Tales of therapy and the therapist's own grief.|existential, grief
PS-003|Existential Psychotherapy|Irvin D. Yalom|1980|1|Trunk|Death, freedom, isolation, and meaninglessness.|existential, meaning
PS-004|The Gift of Therapy|Irvin D. Yalom|2002|1|Bark,Branches|Short lessons on presence and the here and now.|presence
PS-005|Every Day Gets a Little Closer|Irvin D. Yalom and Ginny Elkin|1974|1|Bark,Branches|Therapist and patient write about the same sessions.|therapy
PS-006|Provocative Therapy|Frank Farrelly and Jeff Brandsma|1974|1|Bark|A humorous, challenging style of therapy.|humor, therapy
PS-007|Man's Search for Meaning|Viktor E. Frankl|1946|1|Trunk,Fruit|Meaning sustains people through suffering.|meaning, suffering
PS-008|Man's Search for Ultimate Meaning|Viktor E. Frankl|1997|1|Roots,Trunk|The religious longing in every person.|meaning, spirituality
PS-009|The Body Keeps the Score|Bessel van der Kolk|2014|1|Bark,Leaves|How trauma lives in the body, and paths to healing.|trauma, healing
PS-010|The Emotional Life of Your Brain|Richard J. Davidson|2012|1|Bark|Six emotional styles grounded in brain research.|emotion, neuroscience
PS-011|The Mind's Own Physician|Kabat-Zinn and Davidson|2011|1|Bark,Leaves|The Dalai Lama and scientists on meditation's healing power.|meditation, science
PS-012|Mindfulness, Acceptance, and Positive Psychology|Kashdan and Ciarrochi|2013|1|Bark|ACT and positive psychology together.|ACT, wellbeing
PS-013|Spirituality, Religion, and Cognitive-Behavioral Therapy|David H. Rosmarin|2018|1|Roots,Bark|Bringing a client's faith into CBT.|CBT, faith
PS-014|Internal Family Systems Therapy|Richard C. Schwartz and Martha Sweezy|1995|1|Bark|The mind as a family of parts led by a calm Self.|IFS, parts work
PS-015|Why Zebras Don't Get Ulcers|Robert M. Sapolsky|1994|1|Bark,Leaves|How chronic stress harms the body.|stress
PS-017|Stealing Fire|Steven Kotler and Jamie Wheal|2017|1|Bark|How people chase flow and altered states.|flow
PS-018|Recapture the Rapture|Jamie Wheal|2021|1|Trunk,Branches|Rebuilding meaning and belonging.|meaning, culture
PS-019|Spiral Dynamics|Don Beck and Christopher Cowan|1996|1|Bark,Branches|How values and worldviews develop.|development, values
PS-020|Power vs. Force|David R. Hawkins|1995|1|Bark,Roots|A scale of human consciousness.|consciousness
PS-021|Transcending the Levels of Consciousness|David R. Hawkins|2006|1|Bark|Moving through each level of consciousness.|consciousness
PS-022|Letting Go|David R. Hawkins|2012|1|Bark|Releasing feelings instead of resisting them.|surrender, emotions
PS-023|The Map of Consciousness Explained|David R. Hawkins|2020|1|Bark|A summary of his consciousness model.|consciousness
PS-024|Meeting the Shadow|Connie Zweig and Jeremiah Abrams|1991|1|Bark|The hidden, disowned side of human nature.|shadow, Jung
PS-025|Meeting the Shadow on the Spiritual Path|Connie Zweig|2023|1|Roots,Bark|Spiritual abuse and healing from church harm.|spiritual abuse
PS-026|The Inner Work of Age|Connie Zweig|2021|1|Trunk,Fruit|Turning aging into spiritual growth.|aging, elderhood
PS-027|Synchronicity|C. G. Jung|1952|1|Trunk|Jung on meaningful coincidence.|Jung, meaning
PS-028|Psychology|David G. Myers|1986|1|Bark|A standard intro psychology textbook.|textbook
PS-029|Super Brain|Deepak Chopra and Rudolph E. Tanzi|2012|1|Bark,Leaves|Neuroscience and self-awareness for brain health.|brain health
CM-001|Self-Compassion|Kristin Neff|2011|1|Bark|Kindness, common humanity, and mindfulness toward yourself.|self-compassion
CM-002|Mindful Compassion|Paul Gilbert and Choden|2013|1|Bark|Soothing a harsh inner critic.|compassion
CM-003|A Fearless Heart|Thupten Jinpa|2015|1|Bark,Branches|An eight-week compassion training.|compassion
CM-004|Radical Compassion|Tara Brach|2019|1|Bark|RAIN: recognize, allow, investigate, nurture.|RAIN, compassion
CM-005|Training in Compassion|Norman Fischer|2013|1|Roots,Bark|Zen teaching on the lojong slogans.|lojong, Zen
CM-006|Opening to You|Norman Fischer|2002|2|Roots|Zen-inspired translations of the Psalms.|Psalms, prayer
CM-007|Sabbath|Wayne Muller|1999|2|Roots,Leaves|The case for rest and delight in busy lives.|rest, Sabbath
CM-008|Call Me by My True Names|Thich Nhat Hanh|1993|1|Roots,Trunk|Poems on interbeing, suffering, and peace.|poetry
CM-009|The Heart of the Buddha's Teaching|Thich Nhat Hanh|1998|1|Roots|A clear introduction to core Buddhist teachings.|Buddhism
CM-010|The Art of Living|Thich Nhat Hanh|2017|1|Roots,Fruit|Living and dying with peace.|mindfulness, dying
CM-011|Real Love|Sharon Salzberg|2017|1|Branches|Mindful love for self, others, and life.|loving-kindness
CM-012|Buddha's Brain|Rick Hanson|2009|1|Bark|The neuroscience of happiness, love, and wisdom.|neuroscience
CM-013|Refuge Recovery|Noah Levine|2014|1|Bark,Branches|A Buddhist path to recovery from addiction.|addiction, recovery
CM-014|Walk in a Relaxed Manner|Joyce Rupp|2005|1|Roots,Leaves|Life lessons from walking the Camino.|pilgrimage
CM-015|20-Minute Retreats|Rachel Harris|2000|1|Bark,Leaves|Short practices to revive the spirit.|short practices
CM-016|A Walk in the Wood|Joseph Parent and Nancy Parent|2021|1|Bark|Mindfulness with Winnie the Pooh.|mindfulness, kids
CM-017|The Tao of Pooh|Benjamin Hoff|1982|2|Roots,Bark|Taoism through Winnie the Pooh.|Taoism
CM-018|The Te of Piglet|Benjamin Hoff|1992|1|Roots|The power of the small.|Taoism
CM-019|The Power of TED|David Emerald|2005|2|Bark,Branches|Moving from victim to creator.|empowerment
CM-020|Ikigai|Hector Garcia and Francesc Miralles|2016|1|Trunk|The Japanese idea of a reason for being.|purpose
CM-021|The Little Book of Hygge|Meik Wiking|2016|1|Branches,Leaves|The Danish art of coziness and togetherness.|comfort
NA-001|The Hidden Life of Trees|Peter Wohlleben|2015|1|Branches,Roots|How trees communicate, share, and care for their young.|trees, community
NA-002|The Inner Life of Animals|Peter Wohlleben|2016|1|Branches|Emotion and awareness in animals.|animals
NA-003|The Secret Wisdom of Nature|Peter Wohlleben|2017|1|Branches|How forests, animals, rivers, and weather connect.|ecology
NA-004|Nature as Spiritual Practice|Steven Chase|2011|1|Roots|Creation as a place of prayer.|creation, prayer
NA-005|A Field Guide to Nature as Spiritual Practice|Steven Chase|2011|1|Roots,Leaves|Hands-on outdoor spiritual practices.|practices
NA-006|Forest Bathing|Qing Li|2018|1|Leaves|The health effects of time among trees.|shinrin-yoku
NA-007|Shinrin-yoku|Yoshifumi Miyazaki|2018|1|Leaves|Forest bathing and stress relief.|shinrin-yoku
NA-008|Your Guide to Forest Bathing|M. Amos Clifford|2018|1|Leaves,Roots|Invitations for slow sensory time in nature.|forest therapy
NA-009|Forest Church|Bruce Stanley|2013|1|Roots,Branches|Gathering for worship outdoors.|outdoor worship
NA-010|Walking Your Blues Away|Thom Hartmann|2006|1|Leaves,Bark|Walking to process painful memories.|walking, healing
NA-011|Sacred Earth, Sacred Soul|John Philip Newell|2021|1|Roots|Celtic wisdom for the sacred in creation.|Celtic, creation
NA-012|The Great Search|John Philip Newell|2023|1|Roots,Trunk|Our deepest longings as a path to the sacred.|longing, Celtic
NA-013|The Living Mountain|Nan Shepherd|1977|1|Roots,Leaves|Presence through the senses in the Cairngorms.|presence, place
NA-014|Boundary Waters: The Grace of the Wild|Paul Gruchow|1997|1|Roots|Essays on Minnesota's canoe country.|Minnesota, wilderness
BD-001|Breath|James Nestor|2020|1|Leaves|How breathing shapes health, sleep, and mood.|breathing
BD-002|The Wim Hof Method|Wim Hof|2020|1|Leaves|Breathing, cold, and mindset for resilience.|breathwork, cold
BD-003|Protocols|Andrew D. Huberman|2025|1|Leaves,Bark|Routines for sleep, focus, and stress.|sleep, habits
BD-004|Spark|John J. Ratey|2008|1|Leaves,Bark|Exercise as medicine for the brain and mood.|exercise
BD-005|Endure|Alex Hutchinson|2018|1|Leaves,Bark|How mind and body set the limits of endurance.|endurance
BD-006|Running and Being|George Sheehan|1978|1|Leaves,Trunk|Running as play and self-discovery.|running
BD-007|Stretch Book|Jim and Phil Wharton|1996|1|Leaves|Stretching for flexibility and pain relief.|stretching
BD-008|The New Primal Blueprint|Mark Sisson|2016|1|Leaves|An ancestral approach to food, movement, and sleep.|lifestyle
BD-010|The End of Alzheimer's|Dale E. Bredesen|2017|1|Leaves,Bark|A lifestyle program for cognitive health.|brain health
BD-011|Your Hormones, Balance Your Life|Claudia Welch|2011|1|Leaves|Women's hormonal health across three traditions.|women's health
BD-012|Textbook of Ayurveda, Vol. 1|Vasant Lad|2002|1|Leaves|Fundamental principles of Ayurveda.|Ayurveda
BD-013|Textbook of Ayurveda, Vol. 2|Vasant Lad|2006|1|Leaves|Clinical assessment in Ayurveda.|Ayurveda
BD-014|Ayurveda Beginner's Guide|Susan Weis-Bohlen|2018|1|Leaves|Simple Ayurvedic practices for daily balance.|Ayurveda
BD-016|The Emotion Code|Bradley Nelson|2007|1|Bark,Leaves|An energy-healing method for trapped emotions.|energy healing
BD-017|The Music Physician for Times to Come|Don Campbell|1991|1|Leaves|Music and sound as healing.|sound healing
BD-018|Sound Bath|Sara Auster|2019|1|Leaves,Bark|Listening and sound for relaxation.|sound, rest
BD-019|Essential Chakra Meditation|Pfender|2019|1|Leaves,Roots|Guided meditations for the seven chakras.|chakras
BD-020|Chakra Meditation|Swami Saradananda|2008|1|Leaves,Roots|Working with the chakras through meditation.|chakras, yoga
BD-021|Chakra Healing|Margarita Alcantara|2017|1|Leaves|Self-healing with the chakras.|chakras
BD-022|The Warrior Within|John Little|1996|1|Bark,Leaves|Bruce Lee's philosophy for daily life.|philosophy
BD-023|A Child Is Born|Lennart Nilsson|1965|1|Leaves|Photographs of life from conception to birth.|birth
WR-001|Buddhism: One Teacher, Many Traditions|Dalai Lama and Thubten Chodron|2014|1|Roots|Theravada and Tibetan Buddhism side by side.|Buddhism
WR-002|The Bhagavad Gita|Eknath Easwaran|1985|1|Roots|A readable translation of the Hindu classic.|Hinduism
WR-003|The Yoga Sutras of Patanjali|Sri Swami Satchidananda|1978|1|Roots,Leaves|The foundational yoga text with commentary.|yoga
WR-004|The Analects of Confucius|Confucius||1|Branches|Sayings on virtue, family, and right relationship.|Confucianism
WR-005|The Essential Rumi|Coleman Barks|1995|1|Roots,Fruit|The Sufi poet on love and longing.|Sufism, poetry
WR-006|I and Thou|Martin Buber|1923|1|Branches,Roots|A philosophy of true meeting.|presence
WR-007|The Ethiopian Bible|Ethiopian Orthodox canon||1|Roots|The broad Ethiopian Orthodox canon in English.|canon
WR-008|Books of the Ethiopian Bible|Ethiopian Church||1|Roots|Books in the Ethiopian canon.|canon
WR-009|The Ethiopic Book of the Synod|Michael Mikhail||1|Roots|Church orders of the Ethiopian tradition.|church order
WR-010|The Complete Apocrypha|Covenant Christian Coalition|2018|1|Roots|Apocryphal and deuterocanonical books.|Apocrypha
WR-011|The Book of Enoch|Defender edition||1|Roots|The ancient Jewish apocalyptic text.|Enoch
WR-012|The Nag Hammadi Scriptures|Marvin Meyer|2007|1|Roots|The Gnostic texts found in Egypt in 1945.|Gnosticism
WR-013|The Nag Hammadi Library|James M. Robinson|1977|1|Roots|The first full English edition of the Nag Hammadi texts.|Gnosticism
WR-014|The Gnostic Bible|Willis Barnstone and Marvin Meyer|2003|1|Roots|A wide anthology of Gnostic writings.|Gnosticism
WR-015|Jung and the Lost Gospels|Stephan A. Hoeller|1989|1|Roots,Bark|The scrolls and Nag Hammadi through Jung.|Jung
WR-016|The Perennial Philosophy|Aldous Huxley|1945|1|Roots|The shared core of mystics across faiths.|mysticism, interfaith
WR-018|Reimagining the Divine|Dara Molloy||1|Roots|An Irish Celtic priest rethinks God.|Celtic
WR-019|The Seven Spiritual Laws of Success|Deepak Chopra|1994|1|Roots,Trunk|Seven principles drawn from Vedanta.|Vedanta
WR-020|Buddha: A Story of Enlightenment|Deepak Chopra|2007|1|Roots|A novel of Siddhartha's awakening.|Buddha
WR-021|Reinventing the Body, Resurrecting the Soul|Deepak Chopra|2009|1|Leaves,Roots|Renewing body and soul together.|mind-body
WR-022|You Are the Universe|Deepak Chopra and Menas Kafatos|2017|1|Roots|A participatory, conscious universe.|consciousness
CD-001|Life Together|Dietrich Bonhoeffer|1939|1|Branches,Roots|A classic guide to Christian community.|community, belonging
CD-002|Bonhoeffer: Pastor, Martyr, Prophet, Spy|Eric Metaxas|2010|1|Roots|Bonhoeffer's life and resistance to Hitler.|biography, courage
CD-003|Amazing Grace|Eric Metaxas|2007|1|Branches|Wilberforce's fight to end the slave trade.|biography, justice
CD-004|My Utmost for His Highest|Oswald Chambers|1935|2|Roots|Daily readings on surrender to God.|devotional
CD-005|Devotions for Morning and Evening with Oswald Chambers|Oswald Chambers||1|Roots|Twice-daily readings drawn from Chambers.|devotional
CD-006|Revelations of Divine Love|Julian of Norwich|1395|1|Roots,Fruit|Visions of God's love: all shall be well.|mysticism, hope
CD-007|The Celtic Spirit|Caitlin Matthews|1999|1|Roots|Daily meditations through the Celtic year.|Celtic, seasons
CD-008|The Celtic Wheel of the Year|Tess Ward|2007|1|Roots|Celtic prayers for each day and season.|Celtic, prayer
CD-009|Common Prayer: Pocket Edition|Claiborne, Wilson-Hartgrove, and Okoro|2008|1|Roots,Branches|A daily liturgy shared across traditions.|liturgy, prayer
CD-010|Sacred Pathways|Gary Thomas|1996|1|Roots|Nine spiritual temperaments, from naturalist to contemplative.|spiritual types
CD-011|The Glorious Pursuit|Gary Thomas|1998|1|Roots|Practices drawn from the classic virtues.|virtue, formation
CD-012|Tattoos on the Heart|Gregory Boyle|2010|1|Branches,Roots|Boundless compassion with gang members in Los Angeles.|compassion, kinship
CD-013|Barking to the Choir|Gregory Boyle|2017|1|Branches|More stories of radical kinship.|kinship, mercy
CD-014|The Divine Dance|Richard Rohr|2016|1|Roots,Branches|The Trinity as a flow of relationship.|Trinity, relationship
CD-015|Waking the Dead|John Eldredge|2003|1|Roots|An invitation to a restored heart.|heart, renewal
CD-016|Jesus Calling|Sarah Young|2004|1|Roots,Fruit|Short daily devotions.|devotional
CD-017|Secrets of the Vine|Bruce Wilkinson|2001|1|Fruit,Roots|John 15 on pruning and fruit.|fruitfulness
CD-018|The Prayer of Jabez Devotional|Bruce Wilkinson|2001|1|Roots|Daily readings on a short prayer.|prayer
CD-019|God Came Near|Max Lucado|1987|1|Roots|Short meditations on the incarnation.|incarnation
CD-020|In the Grip of Grace|Max Lucado|1996|1|Roots,Fruit|Romans retold as a story of grace.|grace
CD-021|God's Promises for You|Max Lucado|2007|1|Fruit|Scripture promises arranged by need.|promises, comfort
CD-022|Walking with God through Pain and Suffering|Timothy Keller|2013|2|Roots,Fruit|A pastor's theology and practice of suffering.|suffering
CD-023|Jesus the King|Timothy Keller|2011|1|Roots|Mark's Gospel as the story of who Jesus is.|Mark, Jesus
CD-024|A Meal with Jesus|Tim Chester|2011|1|Branches|Jesus' meals as places of grace and welcome.|hospitality
CD-025|When God Doesn't Answer Your Prayer|Jerry Sittser|2003|1|Roots,Fruit|A widower on unanswered prayer and mystery.|prayer, loss
CD-026|Water from a Deep Well|Gerald L. Sittser|2007|1|Roots|A tour of Christian spirituality through history.|spirituality, history
CD-027|Tortured for Christ|Richard Wurmbrand|1967|1|Roots|A pastor imprisoned for his faith.|persecution
CD-028|Jesus Freaks|dc Talk and The Voice of the Martyrs|1999|1|Roots|Stories of martyrs through history.|martyrs, youth
CD-029|Jesus Freaks, Vol. II|dc Talk and The Voice of the Martyrs|2002|1|Roots|More martyr stories.|martyrs
CD-030|The Pilgrim's Progress|John Bunyan|1678|1|Roots,Fruit|An allegory of the journey to the Celestial City.|allegory, journey
CD-031|My Life with the Saints|James Martin|2006|1|Roots|A Jesuit's memoir of the saints who shaped him.|saints, Catholic
CD-032|Catechism of the Catholic Church|Catholic Church|1994|1|Roots|The official summary of Catholic teaching.|Catholic
CD-033|Faith Alone|Martin Luther|2005|1|Roots|A daily devotional from Luther's writings.|Lutheran
CD-034|According to Promise|Charles Spurgeon|1887|1|Roots,Fruit|How God's promises are claimed and kept.|promises
CD-035|A Passion for Holiness in a Believer's Life|Charles Spurgeon||1|Roots|Sermons on holy living.|holiness
CD-036|Why Grace Changes Everything|Chuck Smith|1994|1|Roots|Grace over law.|grace
CD-037|Christian Excellence|Jon Johnston|1985|1|Trunk|Excellence without perfectionism.|excellence
CD-038|The Divine Mentor|Wayne Cordeiro|2007|1|Roots|A simple method for daily Bible reading and journaling.|journaling
CD-039|Bread and Wine|Plough Publishing|2003|1|Roots|Readings for Lent and Easter.|Lent, Easter
CD-040|Seasons of Life|Charles R. Swindoll|1983|1|Trunk|Reflections organized by the four seasons.|seasons
CD-041|Small Miracles|Yitta Halberstam and Judith Leventhal|1997|1|Fruit|True stories of remarkable coincidences.|coincidence, hope
CD-042|Small Miracles II|Yitta Halberstam and Judith Leventhal|1998|1|Fruit|More stories of meaningful coincidence.|coincidence, hope
CD-043|Angels|Billy Graham|1975|1|Roots,Fruit|A biblical look at angels.|angels
CD-044|The Shack|Wm. Paul Young|2007|1|Fruit,Roots|A grieving father meets God.|grief, forgiveness
CD-045|A New Kind of Christian|Brian D. McLaren|2001|1|Roots|A pastor in crisis finds a new way of faith.|emerging church
CD-046|A Generous Orthodoxy|Brian D. McLaren|2004|1|Roots,Branches|The best from many Christian traditions.|ecumenical
CD-047|A New Kind of Christianity|Brian D. McLaren|2010|1|Roots|Ten questions reshaping faith.|progressive faith
CD-048|Why Did Jesus, Moses, the Buddha, and Mohammed Cross the Road?|Brian D. McLaren|2012|1|Branches,Roots|Christian identity that welcomes other faiths.|interfaith
CD-049|Smith Wigglesworth: The Complete Collection|Smith Wigglesworth|1996|1|Roots|Sermons of an early Pentecostal healing evangelist.|Pentecostal
CD-050|John G. Lake: The Complete Collection|John G. Lake|1999|1|Roots|Sermons of a Pentecostal healing minister.|Pentecostal
CD-051|Intercessory Prayer|Dutch Sheets|1996|1|Roots|Teaching on praying for others.|prayer
TH-001|Systematic Theology|Wayne Grudem|1994|1|Roots|A full evangelical theology written for lay readers.|systematics
TH-002|Systematic Theology|John M. Frame|2013|1|Roots|A Reformed introduction to Christian belief.|systematics
TH-003|Systematic Theology|Louis Berkhof|1938|1|Roots|The classic Reformed summary of doctrine.|systematics
TH-004|Christian Theology|Millard J. Erickson|1983|1|Roots|A broad evangelical theology.|systematics
TH-005|Historical Theology|Alister E. McGrath|1998|1|Roots|Christian doctrine from the early church to today.|church history
TH-006|Evangelical Dictionary of Theology|Walter A. Elwell|1984|1|Roots|Short articles on terms, people, and movements.|reference
TH-007|New Dictionary of Biblical Theology|Alexander and Rosner|2000|1|Roots|Biblical themes across both Testaments.|reference
TH-008|A New Handbook of Christian Theologians|Musser and Price|1996|1|Roots|Profiles of major modern theologians.|reference
TH-009|Theology in the Context of World Christianity|Timothy C. Tennent|2007|1|Roots,Branches|How the global church reshapes theology.|global church
TH-010|Christianity Through the Centuries|Earle E. Cairns|1954|1|Roots|A one-volume history of the church.|church history
TH-011|Turning Points|Mark A. Noll|1997|1|Roots|Twelve decisive moments in Christian history.|church history
TH-012|After Jesus: The Triumph of Christianity|Reader's Digest|1992|1|Roots|An illustrated history of the early church.|early church
TH-013|Biblical Theology|Geerhardus Vos|1948|1|Roots|Revelation as it unfolds through history.|biblical theology
TH-014|Redemptive History and Biblical Interpretation|Geerhardus Vos|1980|1|Roots|Shorter writings on Scripture and redemption.|biblical theology
TH-015|A New Testament Biblical Theology|G. K. Beale|2011|1|Roots,Fruit|The New Testament through new creation.|new creation
TH-016|The King in His Beauty|Thomas R. Schreiner|2013|1|Roots|A biblical theology around God's kingdom.|biblical theology
TH-017|According to Plan|Graeme Goldsworthy|1991|1|Roots|The Bible's big storyline.|biblical theology
TH-018|Gospel-Centered Hermeneutics|Graeme Goldsworthy|2006|1|Roots|Reading Scripture with the gospel at the center.|hermeneutics
TH-019|The Hermeneutical Spiral|Grant R. Osborne|1991|1|Roots|A full guide from text to application.|hermeneutics
TH-020|Grasping God's Word|J. Scott Duvall and J. Daniel Hays|2001|1|Roots|A hands-on method for reading the Bible.|hermeneutics
TH-021|How to Read the Bible for All Its Worth|Gordon Fee and Douglas Stuart|1981|1|Roots|Reading each genre of Scripture on its own terms.|hermeneutics
TH-022|Read the Bible for a Change|Ray Lubeck|2005|1|Roots|Reading Scripture to be changed by it.|Bible reading
TH-023|Exegetical Fallacies|D. A. Carson|1984|1|Roots|Common mistakes in interpreting the Bible.|exegesis
TH-024|A Handbook of New Testament Exegesis|Craig L. Blomberg|2010|1|Roots|Step by step study of NT passages.|exegesis
TH-025|Biblical Theology in the Life of the Church|Michael Lawrence|2010|1|Roots,Branches|Biblical theology at work in ministry.|ministry
TH-026|The Unfolding Mystery|Edmund P. Clowney|1988|1|Roots|Christ throughout the Old Testament.|Christ in OT
TH-027|Jesus in Trinitarian Perspective|Sanders and Issler|2007|1|Roots|Christ within the Trinity.|Christology
TH-028|The Deity of Christ|Morgan and Peterson|2011|1|Roots|Essays on the deity of Christ.|Christology
TH-029|The Man Christ Jesus|Bruce A. Ware|2012|1|Roots|The full humanity of Jesus.|Christology
TH-030|God's Greater Glory|Bruce A. Ware|2004|1|Roots|Providence and human freedom.|providence
TH-031|God of the Possible|Gregory A. Boyd|2000|1|Roots|The case for an open future.|open theism
TH-032|What the Bible Says About God the Ruler|Jack Cottrell|1984|1|Roots|God's sovereignty from a non-Calvinist view.|sovereignty
TH-034|God's Rivals|Gerald R. McDermott|2007|1|Roots,Branches|Why God allows other religions.|other religions
TH-036|One Lord, One Faith|Rex A. Koivisto|1993|1|Branches|Unity across denominations.|ecumenism
TH-037|Five Views on Law and Gospel|Stanley N. Gundry|1996|1|Roots|Scholars debate the law's role.|debate
TH-038|Two Views on Women in Ministry|James R. Beck|2001|1|Branches|Two views side by side.|debate
TH-039|Readings in Christian Ethics, Vol. 1|Clark and Rakestraw|1994|1|Trunk|Ethical theory and method.|ethics
TH-040|Readings in Christian Ethics, Vol. 2|Clark and Rakestraw|1996|1|Trunk|Issues including end-of-life care.|ethics
TH-041|Moral Choices|Scott B. Rae|1995|1|Trunk|An introduction to ethics and medicine.|bioethics
TH-042|3 Crucial Questions about Spiritual Warfare|Clinton E. Arnold|1997|1|Roots|A measured scholarly look.|spiritual warfare
TH-043|Genesis Unbound|John H. Sailhamer|1996|1|Roots|A fresh reading of the creation account.|Genesis
TH-044|The New Testament and the People of God|N. T. Wright|1992|1|Roots|The New Testament in its Jewish world.|NT, history
TH-045|Hard Sayings of Jesus|F. F. Bruce|1983|1|Roots|Seventy difficult sayings explained.|Gospels
TH-046|A Shorter Life of Christ|Donald Guthrie|1970|1|Roots|A compact scholarly life of Jesus.|Gospels
TH-047|The NIV Harmony of the Gospels|Thomas and Gundry|1988|1|Roots|The four Gospels side by side.|Gospels
TH-048|A Survey of the New Testament|Robert H. Gundry|1970|1|Roots|A standard NT introduction.|NT survey
TH-049|A Popular Survey of the Old Testament|Norman L. Geisler|1977|1|Roots|A brief OT overview.|OT survey
TH-050|Understanding the Old Testament|Bernhard W. Anderson|1957|1|Roots|A critical OT introduction.|OT survey
TH-051|A Survey of Israel's History|Leon J. Wood|1970|1|Roots|From the patriarchs to the exile.|OT history
TH-052|An Introduction to the Old Testament Prophets|Hobart E. Freeman|1968|1|Roots|Background on each prophet.|prophets
TH-053|Handbook on the Prophets|Robert B. Chisholm Jr.|2002|1|Roots|A guide through every prophetic book.|prophets
TH-054|An Introduction to the Old Testament Poetic Books|C. Hassell Bullock|1979|1|Roots,Trunk|Job, Psalms, Proverbs, Ecclesiastes, and Song of Songs.|wisdom
TH-055|The Wisdom of Proverbs, Job and Ecclesiastes|Derek Kidner|1985|1|Trunk|Biblical wisdom on suffering and meaning.|wisdom
TH-056|Interpreting the Psalms|Mark D. Futato|2007|1|Roots|How to read and pray the Psalms.|Psalms
PM-001|The Pastor's Wedding Manual|Jim Henry|1985|1|Branches|Services, vows, and planning notes for weddings.|weddings
PM-002|The Star Book for Ministers|Edward T. Hiscox|1878|1|Branches,Roots|Forms for weddings, funerals, and services.|ceremonies
PM-003|Interfaith Ministry Handbook|Sanders||1|Branches|Ceremonies for interfaith ministers.|interfaith
PM-005|Preaching and Preachers|D. Martyn Lloyd-Jones|1971|1|Roots|Lectures on the craft of preaching.|preaching
PM-006|Christ-Centered Preaching|Bryan Chapell|1994|1|Roots|Expository sermons centered on grace.|preaching
PM-007|Preaching God's Word|Carter, Duvall, and Hays|2005|1|Roots|From interpretation to sermon.|preaching
PM-008|Preaching Christ from the Old Testament|Sidney Greidanus|1999|1|Roots|A method for preaching from OT texts.|preaching
PM-009|Preaching Christ in All of Scripture|Edmund P. Clowney|2003|1|Roots|Model sermons across the Bible.|preaching
PM-010|Spirit Empowered Preaching|Arturo G. Azurdia III|1998|1|Roots|The Spirit's role in preaching.|preaching
PM-011|Why Johnny Can't Preach|T. David Gordon|2009|1|Bark|How media culture weakened preaching.|media
PM-012|Preaching and Teaching with Imagination|Warren W. Wiersbe|1994|1|Trunk|Image and story in sermons.|story
PM-013|Heralds of the King|Dennis E. Johnson|2009|1|Roots|Sermons in Christ-centered style.|preaching
PM-014|Pastor|William H. Willimon|2002|1|Branches|A theology of ordained ministry.|pastoral identity
PM-015|The Pastor|Eugene H. Peterson|2011|1|Trunk,Branches|A memoir of unhurried ministry.|memoir, vocation
PM-016|Pastoral Theology|Thomas C. Oden|1983|1|Branches|Essentials of ministry from classic sources.|pastoral theology
PM-017|Practical Theology: An Introduction|Richard R. Osmer|2008|1|Branches,Trunk|Four tasks of practical theological reflection.|method
PM-018|Maximizing Your Effectiveness|Aubrey Malphurs|2006|1|Trunk|Finding your gifts and design.|leadership
PM-019|What Is the Mission of the Church?|DeYoung and Gilbert|2011|1|Branches|The church's mission around disciple-making.|mission
PM-020|Many Colors|Soong-Chan Rah|2010|1|Branches|Cultural intelligence for a multiethnic church.|culture, diversity
PM-021|Creating Understanding|Donald K. Smith|1992|1|Branches|Principles of cross-cultural communication.|communication
PM-022|They Like Jesus but Not the Church|Dan Kimball|2007|1|Branches|Why younger generations leave church.|young adults
PM-023|The Celtic Way of Evangelism|George G. Hunter III|2000|1|Branches|Belonging before believing.|Celtic, belonging
PM-024|Restoring the Fallen|Wilson, Friesen, and Paulson|1997|1|Branches|Caring for leaders after moral failure.|restoration
PM-025|Operation World|Jason Mandryk|2010|1|Branches|A prayer guide to every nation.|prayer
BS-001|ESV Single Column Journaling Bible|Crossway|2016|6|Roots|ESV text with wide margins for notes.|Bible, journaling
BS-002|ESV Study Bible|Crossway|2008|1|Roots|ESV with extensive notes and articles.|study Bible
BS-003|ESV Bible and ESV Allan editions|Crossway and R. L. Allan|2001|3|Roots|The ESV in standard and premium bindings.|Bible
BS-004|The NIV Study Bible|Zondervan|1985|2|Roots|NIV with study notes.|study Bible
BS-005|NIV Archaeological Study Bible|Zondervan|2005|1|Roots|Notes on archaeology and ancient culture.|archaeology
BS-006|Nelson's NKJV Study Bible|Thomas Nelson|1997|1|Roots|NKJV with study notes.|study Bible
BS-007|The Word for Today Bible|Chuck Smith|2005|1|Roots|NKJV with Calvary Chapel notes.|Bible
BS-008|The Woman's Study Bible|Thomas Nelson|1995|1|Roots|NKJV with notes for women readers.|study Bible
BS-009|NKJV Holy Bible|Thomas Nelson|1982|1|Roots|The New King James Version.|Bible
BS-010|The Open Bible|Thomas Nelson|1975|1|Roots|KJV with topical index and helps.|Bible
BS-011|Scofield Reference Bible|C. I. Scofield|1909|1|Roots|KJV with historic reference notes.|Bible
BS-012|The Message: Conversations|Eugene H. Peterson|2004|1|Roots|Peterson's paraphrase with discussion notes.|paraphrase
BS-013|The Living Bible|Kenneth N. Taylor|1971|1|Roots|A paraphrase in everyday English.|paraphrase
BS-014|Holy Bible from Ancient Eastern Manuscripts|George M. Lamsa|1933|1|Roots|A translation from the Aramaic Peshitta.|Aramaic
BS-015|The Reformation Study Bible|R. C. Sproul|1995|1|Roots|Study notes from a Reformed view.|study Bible
BS-016|A Reader's Hebrew Bible|Brown and Smith|2008|1|Roots|Hebrew text with rare words glossed.|Hebrew
BS-017|The Lutheran Hymnal|Lutheran Church Missouri Synod|1941|1|Roots|Historic Lutheran hymns.|hymns
BS-018|Hymns for the Family of God|Paragon|1976|1|Roots|A hymnal for bedsides and funerals.|hymns
BS-019|Basics of Biblical Greek|William D. Mounce|1993|1|Roots|The standard first-year Greek grammar.|Greek
BS-020|Greek Grammar Beyond the Basics|Daniel B. Wallace|1996|1|Roots|Intermediate Greek syntax.|Greek
BS-021|Grammatical Concepts 101 for Biblical Hebrew|Gary A. Long|2002|1|Roots|Grammar concepts needed for Hebrew.|Hebrew
BS-022|Pocket Dictionary for the Study of Biblical Hebrew|Todd J. Murphy|2003|1|Roots|Terms used in Hebrew study.|Hebrew
BS-023|Pocket Dictionary for the Study of New Testament Greek|Matthew S. DeMoss|2001|1|Roots|Terms used in Greek study.|Greek
BS-025|The Journey from Texts to Translations|Paul D. Wegner|1999|1|Roots|How the Bible was formed and translated.|canon
BS-026|Halley's Bible Handbook|Henry H. Halley|1924|1|Roots|A book by book guide with background.|handbook
BS-027|Holman QuickSource Guide to Understanding the Bible|Holman|2008|1|Roots|A quick overview of the Bible.|handbook
BS-028|The Illustrated Bible Dictionary|Knight and Ray||1|Roots|Biblical people, places, and terms.|dictionary
BS-029|Concise Bible Atlas|J. Carl Laney|1988|1|Roots|Maps of the Bible lands.|atlas
BS-030|New Testament Commentary Survey|D. A. Carson|1986|1|Roots|Rates commentaries on each NT book.|commentaries
BS-031|Old Testament Commentary Survey|Tremper Longman III|1991|1|Roots|Rates commentaries on each OT book.|commentaries
BS-032|The Book of Life (10 vols. plus System Bible Study)|John Rudin and Co.|1923|1|Roots,Branches|An illustrated Bible story set for families.|family
BS-033|The Expositor's Bible Commentary, Revised (7 vols.)|Longman and Garland|2008|1|Roots|Evangelical commentary on much of the Bible.|commentary
BS-034|NICOT: The Book of Ezekiel (2 vols.)|Daniel I. Block|1997|1|Roots|Detailed commentary on Ezekiel.|commentary
BS-035|NICNT: The Book of the Acts|F. F. Bruce|1988|1|Roots|Classic commentary on Acts.|commentary
BS-036|NICNT: Colossians, Philemon, and Ephesians|F. F. Bruce|1984|1|Roots|Commentary on three letters of Paul.|commentary
BS-037|NICNT: The Gospel of John|J. Ramsey Michaels|2010|1|Roots|Detailed commentary on John.|commentary
BS-038|NICNT: The Gospel of Matthew|R. T. France|2007|1|Roots|Detailed commentary on Matthew.|commentary
BS-039|NICNT: The Gospel of Luke|Joel B. Green|1997|1|Roots|Narrative commentary on Luke.|commentary
BS-040|NICNT: The First Epistle of Peter|Peter H. Davids|1990|1|Roots,Fruit|Commentary on a letter about suffering.|commentary
BS-041|NICNT: The Book of Revelation|Robert H. Mounce|1977|1|Roots,Fruit|Commentary on Revelation.|commentary
BS-042|NIGTC: The Book of Revelation|G. K. Beale|1999|1|Roots|Greek-text commentary on Revelation.|commentary
BS-043|PNTC: The Acts of the Apostles|David G. Peterson|2009|1|Roots|Pillar commentary on Acts.|commentary
BS-044|PNTC: The Gospel According to John|D. A. Carson|1991|1|Roots|Pillar commentary on John.|commentary
BS-045|TNTC: Hebrews|Donald Guthrie|1983|1|Roots|Brief commentary on Hebrews.|commentary
BS-046|TNTC: The Letters of John|John R. W. Stott|1964|1|Roots|Brief commentary on 1 to 3 John.|commentary
BS-047|NIV Application Commentary (4 vols.)|Duguid, Wilson, McKnight, and Snodgrass|1995|1|Roots|From original meaning to today.|commentary
BS-048|Jon Courson's Application Commentary (3 vols.)|Jon Courson|2003|1|Roots|Devotional commentary on the whole Bible.|commentary
BS-049|Thru the Bible (5 vols.)|J. Vernon McGee|1981|1|Roots|Radio Bible teaching through every book.|commentary
BS-050|Tyndale Concise Bible Commentary|Hughes and Laney|2001|1|Roots|One-volume commentary on the whole Bible.|commentary
BS-051|The Preacher's Commentary: Ezekiel|Douglas Stuart|1989|1|Roots|Sermon-oriented commentary on Ezekiel.|commentary
BS-052|The Preacher's Commentary: John|Roger L. Fredrikson|1985|1|Roots|Sermon-oriented commentary on John.|commentary
BS-053|Psalms (Two Horizons)|Geoffrey W. Grogan|2008|1|Roots|Theological commentary on the Psalms.|Psalms
BS-054|The Psalms as Christian Worship|Waltke and Houston|2010|1|Roots|How the church has prayed the Psalms.|Psalms
BS-055|The Gospel According to John|G. Campbell Morgan|1933|1|Roots|Expository studies in John.|John
BS-056|Galatians for You|Timothy Keller|2013|1|Roots|An accessible guide to Galatians.|grace
BS-057|God's Ultimate Purpose: Ephesians 1|D. Martyn Lloyd-Jones|1978|1|Roots|Sermons on Ephesians 1.|Ephesians
BS-058|The Book of the Revelation|Philip E. Hughes|1990|1|Roots,Fruit|A commentary on Revelation.|Revelation
BS-059|For the Love of God (Vols. 1 and 2)|D. A. Carson|1998|1|Roots|A daily companion for reading the Bible in a year.|Bible reading
BS-060|God With Us: Themes from Matthew|D. A. Carson|1985|1|Roots|Short studies on themes in Matthew.|Matthew
BS-061|Outline Studies in Luke|W. H. Griffith Thomas|1950|1|Roots|Outlines for teaching Luke.|Luke
BS-062|Campbell Morgan, Bible Teacher|Harold Murray|1938|1|Roots|A biography of G. Campbell Morgan.|biography
SH-001|Sapiens|Yuval Noah Harari|2011|1|Branches,Trunk|A history of humankind from foragers to today.|history
SH-002|Homo Deus|Yuval Noah Harari|2016|1|Trunk|Humanity's future and its hunger for more.|future
SH-003|21 Lessons for the 21st Century|Yuval Noah Harari|2018|1|Trunk|Big questions for the present.|meaning
SH-004|Guns, Germs, and Steel|Jared Diamond|1997|1|Branches|Why some societies came to dominate others.|history
SH-005|The Gulag Archipelago|Aleksandr Solzhenitsyn|1973|1|Trunk|Meaning and conscience under terror.|suffering, history
SH-006|Desert Exile|Yoshiko Uchida|1982|1|Branches|A Japanese American family's wartime internment.|memoir
SH-007|American Indian Politics and the American Political System|David E. Wilkins|2002|1|Branches|How tribal nations relate to US government.|Native American
SH-008|The Almost Nearly Perfect People|Michael Booth|2014|1|Branches|A witty look behind Scandinavian happiness.|Scandinavia
SH-009|The Freedom Writers Diary|The Freedom Writers with Erin Gruwell|1999|1|Branches,Fruit|Students whose lives changed through writing.|education, teens
SH-010|Building a StoryBrand|Donald Miller|2017|1|Branches|Clarify a message by making the listener the hero.|story
SH-011|The AI-Driven Leader|Geoff Woods|2024|1|Bark|Using AI as a thought partner.|AI, leadership
SH-012|Fish!|Lundin, Paul, and Christensen|2000|1|Branches|A fable about morale from Seattle's fish market.|workplace
SH-013|The Path|Laurie Beth Jones|1996|1|Trunk|Writing a personal mission statement.|purpose
SH-014|Questions That Matter|Ed L. Miller and Jon Jensen|1984|1|Trunk|An introduction to philosophy.|philosophy
LT-001|The Boy, the Mole, the Fox and the Horse|Charlie Mackesy|2019|1|Branches,Fruit|Kindness, courage, and asking for help.|kindness, courage
LT-002|The Rabbit Listened|Cori Doerrfeld|2018|1|Branches|The quiet rabbit helps by listening.|presence
LT-003|Where the Wild Things Are|Maurice Sendak|1963|1|Bark|A boy tames his wild feelings and comes home.|emotions
LT-004|Guess How Much I Love You|Sam McBratney|1994|1|Branches|Two hares measure their love.|love
LT-005|Horton Hatches the Egg|Dr. Seuss|1940|1|Trunk|Horton keeps his promise no matter what.|faithfulness
LT-006|Lon Po Po|Ed Young|1989|1|Bark|A Chinese Red Riding Hood tale.|folktale
LT-007|Pete the Cat: The Wheels on the Bus|James Dean|2013|1|Leaves|A sing-along picture book.|song
LT-008|The Rainbow Fish|Marcus Pfister|1992|1|Branches|A proud fish learns the joy of sharing.|sharing
LT-009|The Little Soul and the Sun|Neale Donald Walsch|1998|1|Roots|A children's parable about forgiveness.|forgiveness
LT-010|The Little Soul and the Earth|Neale Donald Walsch|2005|1|Roots|A soul learns it is special as it is.|identity
LT-011|The Children's Illustrated Bible|Selina Hastings|1994|1|Roots|Bible stories with photos and notes.|children
LT-012|My First Message|Eugene H. Peterson|2007|1|Roots|A devotional Bible for kids.|children
LT-013|Chicken Soup for the Teenage Soul|Jack Canfield et al.|1997|1|Branches|True stories for teens on life and love.|teens
LT-014|The Night Riders|Matt Furie|2012|1|Bark|A wordless night adventure.|picture book
LT-017|A Wrinkle in Time|Madeleine L'Engle|1962|1|Fruit|A girl crosses space, saved by love.|courage, love
LT-018|The Secret Garden|Frances Hodgson Burnett|1911|1|Leaves,Branches|Healing by restoring a garden.|healing, nature
LT-019|The Chronicles of Narnia|C. S. Lewis|1950|1|Roots,Fruit|Seven tales of a land ruled by Aslan.|allegory, hope
LT-020|Roar! A Christian Family Guide to the Chronicles of Narnia|Heather and David Kopp|2005|1|Branches|Discussion guide for families reading Narnia.|family
LT-021|The Wizard of Oz: The First Five Novels|L. Frank Baum|1900|1|Trunk|Heart, brain, and courage.|courage, home
LT-022|The Hate U Give|Angie Thomas|2017|1|Branches|A teen finds her voice.|justice, teens
LT-023|Zen and the Art of Motorcycle Maintenance|Robert M. Pirsig|1974|1|Trunk|A road trip into quality and values.|philosophy
LT-024|Wild|Cheryl Strayed|2012|1|Fruit,Leaves|Grief healed by a long solo hike.|grief, hiking
LT-025|Beautiful Boy|David Sheff|2008|1|Branches|A father and his son's addiction.|addiction, family
LT-026|Tweak|Nic Sheff|2008|1|Bark|The son's side of the same story.|addiction
LT-027|True Love|Robert Fulghum|1997|1|Branches|Real stories of love from readers.|love
LT-028|I Married Adventure|Osa Johnson|1940|1|Branches|A life of exploring with her husband.|adventure
LT-029|Between a Rock and a Hard Place|Aron Ralston|2004|1|Fruit|A trapped climber's will to live.|resilience
LT-030|Uncle Tom's Cabin|Harriet Beecher Stowe|1852|1|Branches|The antislavery novel.|history
LT-031|1984|George Orwell|1949|1|Bark|Surveillance and control of truth.|dystopia
LT-032|Brave New World|Aldous Huxley|1932|1|Bark|A dystopia of pleasure and control.|dystopia
LT-033|Island|Aldous Huxley|1962|1|Trunk|Huxley's utopia, with a model of conscious dying.|dying
LT-034|Crome Yellow|Aldous Huxley|1921|1|Bark|A satire of a country house party.|satire
LT-035|Fahrenheit 451|Ray Bradbury|1953|1|Bark|A fireman who burns books begins to read.|books
LT-040|Griffin and Sabine|Nick Bantock|1991|1|Branches|A love story told in real letters.|art, letters
LT-041|Sabine's Notebook|Nick Bantock|1992|1|Branches|Second book of the trilogy.|art, letters
LT-042|The Golden Mean|Nick Bantock|1993|1|Branches|Third book of the trilogy.|art, letters
LT-043|Sacred Mirrors|Alex Grey|1990|1|Roots,Leaves|Visionary paintings of body, mind, and spirit.|art
LT-044|Leonardo da Vinci: The Complete Paintings|Frank Zollner|2003|1|Trunk|Every Leonardo painting.|art
LT-045|Drawing on the Right Side of the Brain|Betty Edwards|1979|1|Bark|Drawing by learning to see.|creativity
LT-046|Collected Poems|Edwin Muir|1960|1|Trunk,Roots|Poems on Eden and time.|poetry
LT-047|Devotions|Mary Oliver|2017|1|Roots,Fruit|Poems on attention, nature, and death.|poetry
LT-048|Wild Honey, Tough Salt|Kim Stafford|2019|1|Fruit|Poems of resilience and tenderness.|poetry
LT-049|Made of Rivers|Emory Hall||1|Bark|Poems of healing and self-love.|poetry
LT-050|My Heart Soars|Chief Dan George|1974|1|Roots|Nature-centered wisdom.|Indigenous, poetry
LT-051|Love Poems of Elizabeth and Robert Browning|Elizabeth Barrett and Robert Browning|1850|1|Branches|Love poems for wedding readings.|poetry, love
LT-052|One Hundred and One Poems of Romance|Contemporary Books||1|Branches|A short love poetry anthology.|poetry, love
LT-053|Just Folks|Edgar A. Guest|1917|1|Branches|Homespun poems of everyday life.|poetry
LT-054|The Singing Creek Where the Willows Grow|Opal Whiteley|1920|1|Roots|A child's nature diary from Oregon.|nature, childhood
OD-002|Listening for Coyote|William L. Sullivan|1988|1|Roots,Leaves|A solo trek across Oregon's wilderness.|wilderness
OD-006|Exploring the Boundary Waters|Daniel Pauly|2005|1|Leaves|Routes and natural history of the BWCA.|Minnesota
OD-007|Wildflowers of the Boundary Waters|Betty Vos Hemstad|2003|1|Leaves,Roots|Wildflowers of the north woods.|Minnesota, plants
OD-009|Hiking Minnesota|FalconGuides||1|Leaves|Trail guide to Minnesota.|hiking
OD-010|50 Hikes in Minnesota|Ruff and Wolf||1|Leaves|Walks and hikes across the state.|hiking
OD-011|Edible and Medicinal Plants of the West|Gregory L. Tilford|1997|1|Leaves|Identifying and using wild plants.|foraging
OD-012|All That the Rain Promises, and More|David Arora|1991|1|Leaves|A pocket guide to western mushrooms.|mushrooms
OD-013|Mushrooms Demystified|David Arora|1979|1|Leaves|The full field guide to fleshy fungi.|mushrooms
OD-016|The Encyclopedia of Organic Gardening|J. I. Rodale|1959|1|Leaves|A classic reference on organic growing.|gardening
OD-018|1,000 Places to See Before You Die|Patricia Schultz|2003|1|Fruit|A world travel life list.|travel
OD-019|Handlebar Mustache|David Wolfersberger||1|Leaves|A long cycling journey.|cycling
`;
