/* =====================================================================
   WILLOW READINGS . the readings library
   Each reading: { id, title, by, trad: [...], rights, lines: [...] }
   rights: pd (public domain), grounded (written for Willow), plain (Grounded
   plain English rendering of an ancient text). '' in lines = stanza break.
   tr = transliteration line shown first, in italics.
   Tradition tags match faith.js card ids, plus 'all' and 'christian'.
   Check every pd text against a print source before launch.
   ===================================================================== */
(function(){
// The Bible version switch (KJV, NKJV, ESV) on Willow's readings. Chris turned it on in BLD 749
// after reading the Crossway and Thomas Nelson terms; false hides it and Willow shows KJV only.
// NIV stays off until Biblica gives written permission (docs/ceremony-tools-plan.md, decision 12).
const GG_VERSIONS_ON = true;

const R = [
  // ---------- Grounded blessings (all faith traditions and everything in-between) ----------
  { id: 'gb-lastdays', title: `For the last days`, by: `Grounded`, trad: ['all'], rights: 'grounded',
    lines: [`May you be warm.`, `May you be comfortable.`, `May the people you love be close,`, `and the people you've lost be closer than you think.`, `May what you gave keep going.`, `May you rest.`] },
  { id: 'gb-watch', title: `For the one keeping watch`, by: `Grounded`, trad: ['all'], rights: 'grounded',
    lines: [`You don't have to say the perfect thing.`, `You only have to stay.`, `Hold the hand. Wet the lips. Tell the story again.`, `Love is doing exactly what it should.`] },
  { id: 'gb-nowords', title: `For when you can't find words`, by: `Grounded`, trad: ['all'], rights: 'grounded',
    lines: [`We're here.`, `You are loved.`, `You can rest now.`] },
  { id: 'gb-after', title: `For after`, by: `Grounded`, trad: ['all'], rights: 'grounded',
    lines: [`The breath is quiet now.`, `The work is done.`, `Thank you for every ordinary day.`, `Go in peace, and leave a little of it here with us.`] },

  // ---------- Christian scripture (KJV) ----------
  { id: 'ps23', title: `Psalm 23`, by: `King James Version`, trad: ['christian'], rights: 'pd',
    lines: [`The LORD is my shepherd; I shall not want.`, `He maketh me to lie down in green pastures: he leadeth me beside the still waters.`, `He restoreth my soul: he leadeth me in the paths of righteousness for his name's sake.`, `Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me.`, `Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over.`, `Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever.`] },
  { id: 'ps121', title: `Psalm 121`, by: `King James Version`, trad: ['christian'], rights: 'pd',
    lines: [`I will lift up mine eyes unto the hills, from whence cometh my help.`, `My help cometh from the LORD, which made heaven and earth.`, `He will not suffer thy foot to be moved: he that keepeth thee will not slumber.`, `Behold, he that keepeth Israel shall neither slumber nor sleep.`, `The LORD is thy keeper: the LORD is thy shade upon thy right hand.`, `The sun shall not smite thee by day, nor the moon by night.`, `The LORD shall preserve thee from all evil: he shall preserve thy soul.`, `The LORD shall preserve thy going out and thy coming in from this time forth, and even for evermore.`] },
  { id: 'ps13', title: `Psalm 13, for honest prayer`, by: `King James Version`, trad: ['christian'], rights: 'pd',
    lines: [`How long wilt thou forget me, O LORD? for ever? how long wilt thou hide thy face from me?`, `How long shall I take counsel in my soul, having sorrow in my heart daily?`, `Consider and hear me, O LORD my God: lighten mine eyes, lest I sleep the sleep of death.`, `But I have trusted in thy mercy; my heart shall rejoice in thy salvation.`, `I will sing unto the LORD, because he hath dealt bountifully with me.`] },
  { id: 'ps46', title: `Psalm 46:1-2, 10`, by: `King James Version`, trad: ['christian'], rights: 'pd',
    lines: [`God is our refuge and strength, a very present help in trouble.`, `Therefore will not we fear, though the earth be removed, and though the mountains be carried into the midst of the sea.`, `Be still, and know that I am God.`] },
  { id: 'ps139', title: `Psalm 139:7-10`, by: `King James Version`, trad: ['christian'], rights: 'pd',
    lines: [`Whither shall I go from thy spirit? or whither shall I flee from thy presence?`, `If I ascend up into heaven, thou art there: if I make my bed in hell, behold, thou art there.`, `If I take the wings of the morning, and dwell in the uttermost parts of the sea;`, `Even there shall thy hand lead me, and thy right hand shall hold me.`] },
  { id: 'eccl3', title: `Ecclesiastes 3:1-2, 4`, by: `King James Version`, trad: ['christian', 'jewish', 'all'], rights: 'pd',
    lines: [`To every thing there is a season, and a time to every purpose under the heaven:`, `A time to be born, and a time to die; a time to plant, and a time to pluck up that which is planted;`, `A time to weep, and a time to laugh; a time to mourn, and a time to dance.`] },
  { id: 'isa43', title: `Isaiah 43:1-2`, by: `King James Version`, trad: ['christian'], rights: 'pd',
    lines: [`Fear not: for I have redeemed thee, I have called thee by thy name; thou art mine.`, `When thou passest through the waters, I will be with thee; and through the rivers, they shall not overflow thee: when thou walkest through the fire, thou shalt not be burned.`] },
  { id: 'lam3', title: `Lamentations 3:22-23`, by: `King James Version`, trad: ['christian'], rights: 'pd',
    lines: [`It is of the LORD's mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.`] },
  { id: 'mt11', title: `Matthew 11:28`, by: `King James Version`, trad: ['christian'], rights: 'pd',
    lines: [`Come unto me, all ye that labour and are heavy laden, and I will give you rest.`] },
  { id: 'jn14', title: `John 14:1-3, 27`, by: `King James Version`, trad: ['christian'], rights: 'pd',
    lines: [`Let not your heart be troubled: ye believe in God, believe also in me.`, `In my Father's house are many mansions: if it were not so, I would have told you. I go to prepare a place for you.`, `And if I go and prepare a place for you, I will come again, and receive you unto myself; that where I am, there ye may be also.`, `Peace I leave with you, my peace I give unto you: not as the world giveth, give I unto you. Let not your heart be troubled, neither let it be afraid.`] },
  { id: 'rom8', title: `Romans 8:38-39`, by: `King James Version`, trad: ['christian'], rights: 'pd',
    lines: [`For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come,`, `Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord.`] },
  { id: 'rev21', title: `Revelation 21:4`, by: `King James Version`, trad: ['christian'], rights: 'pd',
    lines: [`And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.`] },
  { id: 'lk23', title: `Last words of Jesus, Luke 23:46`, by: `King James Version`, trad: ['christian'], rights: 'pd',
    lines: [`Father, into thy hands I commend my spirit.`] },
  { id: 'nunc', title: `The Song of Simeon, Luke 2:29-30`, by: `King James Version`, trad: ['christian', 'lutheran'], rights: 'pd',
    lines: [`Lord, now lettest thou thy servant depart in peace, according to thy word: for mine eyes have seen thy salvation.`] },

  // ---------- Christian prayers ----------
  { id: 'lordsprayer', title: `The Lord's Prayer`, by: `Traditional (Catholics usually end before "For thine is the kingdom")`, trad: ['christian'], rights: 'pd',
    lines: [`Our Father, who art in heaven, hallowed be thy Name, thy kingdom come, thy will be done, on earth as it is in heaven. Give us this day our daily bread. And forgive us our trespasses, as we forgive those who trespass against us. And lead us not into temptation, but deliver us from evil. For thine is the kingdom, and the power, and the glory, for ever and ever. Amen.`] },
  { id: 'julian', title: `All shall be well`, by: `Julian of Norwich`, trad: ['christian', 'all'], rights: 'pd',
    lines: [`All shall be well, and all shall be well, and all manner of thing shall be well.`] },
  { id: 'francis', title: `Prayer attributed to Saint Francis`, by: `Traditional`, trad: ['christian'], rights: 'pd',
    lines: [`Lord, make me an instrument of your peace: where there is hatred, let me sow love; where there is injury, pardon; where there is doubt, faith; where there is despair, hope; where there is darkness, light; where there is sadness, joy. O divine Master, grant that I may not so much seek to be consoled as to console, to be understood as to understand, to be loved as to love. For it is in giving that we receive, it is in pardoning that we are pardoned, and it is in dying that we are born to eternal life. Amen.`] },
  { id: 'newman', title: `For the evening of life`, by: `John Henry Newman`, trad: ['christian'], rights: 'pd',
    lines: [`May He support us all the day long, till the shades lengthen, and the evening comes, and the busy world is hushed, and the fever of life is over, and our work is done. Then in His mercy may He give us a safe lodging, and a holy rest, and peace at the last.`] },
  { id: 'patrick', title: `From Saint Patrick's Breastplate`, by: `Cecil Frances Alexander's version`, trad: ['christian'], rights: 'pd',
    lines: [`Christ be with me, Christ within me, Christ behind me, Christ before me,`, `Christ beside me, Christ to win me, Christ to comfort and restore me.`, `Christ beneath me, Christ above me, Christ in quiet, Christ in danger,`, `Christ in hearts of all that love me, Christ in mouth of friend and stranger.`] },
  { id: 'hailmary', title: `Hail Mary`, by: `Traditional`, trad: ['catholic'], rights: 'pd',
    lines: [`Hail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.`] },
  { id: 'memorare', title: `The Memorare`, by: `Traditional`, trad: ['catholic'], rights: 'pd',
    lines: [`Remember, O most gracious Virgin Mary, that never was it known that anyone who fled to thy protection, implored thy help, or sought thine intercession was left unaided. Inspired by this confidence, I fly unto thee, O Virgin of virgins, my Mother. To thee do I come, before thee I stand, sinful and sorrowful. O Mother of the Word Incarnate, despise not my petitions, but in thy mercy hear and answer me. Amen.`] },
  { id: 'eternalrest', title: `Eternal Rest (after death)`, by: `Traditional`, trad: ['catholic'], rights: 'pd',
    lines: [`Eternal rest grant unto him, O Lord, and let perpetual light shine upon him. May he rest in peace. Amen.`] },
  { id: 'luther', title: `Luther's Evening Prayer`, by: `From the Small Catechism, traditional wording`, trad: ['lutheran'], rights: 'pd',
    lines: [`I thank Thee, my heavenly Father, through Jesus Christ, Thy dear Son, that Thou hast graciously kept me this day; and I pray Thee to forgive me all my sins, wherein I have done wrong, and graciously to keep me this night. For into Thy hands I commend myself, my body and soul, and all things. Let Thy holy angel be with me, that the wicked foe may have no power over me. Amen.`] },
  { id: 'bcp-near', title: `For a person near death`, by: `Book of Common Prayer, 1979`, trad: ['episcopal', 'methodist', 'christian'], rights: 'pd',
    lines: [`Almighty God, look on this your servant, lying in great weakness, and comfort him with the promise of life everlasting, given in the resurrection of your Son Jesus Christ our Lord. Amen.`] },
  { id: 'bcp-depart', title: `Depart, O Christian soul`, by: `Book of Common Prayer, 1979`, trad: ['episcopal', 'methodist', 'christian'], rights: 'pd',
    lines: [`Depart, O Christian soul, out of this world;`, `In the Name of God the Father Almighty who created you;`, `In the Name of Jesus Christ who redeemed you;`, `In the Name of the Holy Spirit who sanctifies you.`, `May your rest be this day in peace,`, `and your dwelling place in the Paradise of God.`] },
  { id: 'bcp-commend', title: `Commendation`, by: `Book of Common Prayer, 1979`, trad: ['episcopal', 'methodist', 'christian'], rights: 'pd',
    lines: [`Into your hands, O merciful Savior, we commend your servant. Acknowledge, we humbly beseech you, a sheep of your own fold, a lamb of your own flock, a sinner of your own redeeming. Receive him into the arms of your mercy, into the blessed rest of everlasting peace, and into the glorious company of the saints in light. Amen.`] },
  { id: 'bcp-watch', title: `For the night watch, from Compline`, by: `Book of Common Prayer, 1979`, trad: ['episcopal', 'christian'], rights: 'pd',
    lines: [`Keep watch, dear Lord, with those who work, or watch, or weep this night, and give your angels charge over those who sleep. Tend the sick, Lord Christ; give rest to the weary, bless the dying, soothe the suffering, pity the afflicted, shield the joyous; and all for your love's sake. Amen.`] },
  { id: 'jesusprayer', title: `The Jesus Prayer`, by: `Traditional`, trad: ['orthodox', 'christian'], rights: 'pd',
    lines: [`Lord Jesus Christ, Son of God, have mercy on me.`] },

  // ---------- Hymns ----------
  { id: 'amazing', title: `Amazing Grace`, by: `John Newton`, trad: ['christian'], rights: 'pd',
    lines: [`Amazing grace! how sweet the sound, that saved a wretch like me!`, `I once was lost, but now am found; was blind, but now I see.`, `Through many dangers, toils, and snares, I have already come;`, `'Tis grace hath brought me safe thus far, and grace will lead me home.`, `When we've been there ten thousand years, bright shining as the sun,`, `We've no less days to sing God's praise than when we'd first begun.`] },
  { id: 'abide', title: `Abide with Me, first and last verses`, by: `Henry Francis Lyte`, trad: ['christian'], rights: 'pd',
    lines: [`Abide with me; fast falls the eventide;`, `The darkness deepens; Lord, with me abide.`, `When other helpers fail and comforts flee,`, `Help of the helpless, O abide with me.`, ``, `Hold Thou Thy cross before my closing eyes;`, `Shine through the gloom and point me to the skies.`, `Heaven's morning breaks, and earth's vain shadows flee;`, `In life, in death, O Lord, abide with me.`] },
  { id: 'itiswell', title: `It Is Well with My Soul`, by: `Horatio Spafford`, trad: ['christian'], rights: 'pd',
    lines: [`When peace, like a river, attendeth my way,`, `When sorrows like sea billows roll;`, `Whatever my lot, Thou hast taught me to say,`, `It is well, it is well with my soul.`] },
  { id: 'bestill', title: `Be Still, My Soul`, by: `Katharina von Schlegel, translated by Jane Borthwick`, trad: ['christian'], rights: 'pd',
    lines: [`Be still, my soul: the Lord is on thy side.`, `Bear patiently the cross of grief or pain.`, `Leave to thy God to order and provide;`, `In every change, He faithful will remain.`] },
  { id: 'children', title: `Children of the Heavenly Father`, by: `Lina Sandell, translated by Ernst Olson`, trad: ['lutheran', 'christian'], rights: 'pd',
    lines: [`Children of the heavenly Father`, `Safely in His bosom gather;`, `Nestling bird nor star in heaven`, `Such a refuge e'er was given.`] },
  { id: 'garden', title: `In the Garden, refrain`, by: `C. Austin Miles`, trad: ['christian'], rights: 'pd',
    lines: [`And He walks with me, and He talks with me,`, `And He tells me I am His own;`, `And the joy we share as we tarry there,`, `None other has ever known.`] },
  { id: 'assurance', title: `Blessed Assurance, refrain`, by: `Fanny Crosby`, trad: ['christian'], rights: 'pd',
    lines: [`This is my story, this is my song,`, `Praising my Savior all the day long.`] },
  { id: 'nearer', title: `Nearer, My God, to Thee`, by: `Sarah Flower Adams`, trad: ['christian'], rights: 'pd',
    lines: [`Nearer, my God, to Thee, nearer to Thee!`, `E'en though it be a cross that raiseth me,`, `Still all my song shall be, nearer, my God, to Thee.`] },
  { id: 'river', title: `Shall We Gather at the River, refrain`, by: `Robert Lowry`, trad: ['christian'], rights: 'pd',
    lines: [`Yes, we'll gather at the river, the beautiful, the beautiful river;`, `Gather with the saints at the river that flows by the throne of God.`] },
  { id: 'swinglow', title: `Swing Low, Sweet Chariot, refrain`, by: `African American spiritual`, trad: ['christian'], rights: 'pd',
    lines: [`Swing low, sweet chariot, coming for to carry me home.`] },

  // ---------- Jewish ----------
  { id: 'shema', title: `The Shema (Deuteronomy 6:4)`, by: `Traditionally among the last words`, trad: ['jewish'], rights: 'pd',
    tr: `Sh'ma Yisrael, Adonai Eloheinu, Adonai Echad.`, lines: [`Hear, O Israel: the LORD our God, the LORD is one.`] },
  { id: 'ps23-jps', title: `Psalm 23`, by: `Jewish Publication Society, 1917`, trad: ['jewish'], rights: 'pd',
    lines: [`The LORD is my shepherd; I shall not want.`, `He maketh me to lie down in green pastures; He leadeth me beside the still waters.`, `He restoreth my soul; He guideth me in straight paths for His name's sake.`, `Yea, though I walk through the valley of the shadow of death, I will fear no evil, for Thou art with me; Thy rod and Thy staff, they comfort me.`, `Thou preparest a table before me in the presence of mine enemies; Thou hast anointed my head with oil; my cup runneth over.`, `Surely goodness and mercy shall follow me all the days of my life; and I shall dwell in the house of the LORD for ever.`] },
  { id: 'vidui', title: `A short Vidui, confession before death`, by: `Traditional form`, trad: ['jewish'], rights: 'plain',
    lines: [`I acknowledge before You, Lord my God and God of my ancestors, that my healing and my death are in Your hands. May it be Your will to heal me completely. And if I die, may my death bring atonement for all the wrongs I have done. Shelter me in the shadow of Your wings, and grant me a share in the world to come.`] },
  { id: 'adonolam', title: `From Adon Olam, closing lines`, by: `Traditional`, trad: ['jewish'], rights: 'plain',
    lines: [`Into Your hand I entrust my spirit, when I sleep and when I wake. And with my spirit, my body too. God is with me; I will not fear.`] },
  { id: 'dayan', title: `On hearing of a death`, by: `Traditional`, trad: ['jewish'], rights: 'pd',
    tr: `Baruch Dayan HaEmet.`, lines: [`Blessed is the true Judge.`] },
  { id: 'kaddish', title: `The Mourner's Kaddish`, by: `Said by mourners, traditionally with a minyan`, trad: ['jewish'], rights: 'plain',
    tr: `Yitgadal v'yitkadash sh'mei raba.`, lines: [`"Magnified and sanctified be God's great name." The Kaddish never mentions death. It praises God in the face of loss. Families will have their own siddur.`] },

  // ---------- Muslim (meanings only; the Qur'an is the Arabic recitation) ----------
  { id: 'shahada', title: `The Shahada`, by: `Softly near the dying`, trad: ['muslim'], rights: 'plain',
    tr: `Ashhadu an la ilaha illallah, wa ashhadu anna Muhammadan rasulullah.`, lines: [`I bear witness that there is no god but God, and I bear witness that Muhammad is the messenger of God.`] },
  { id: 'innalillahi', title: `On hearing of a death (Qur'an 2:156)`, by: `Meaning`, trad: ['muslim'], rights: 'plain',
    tr: `Inna lillahi wa inna ilayhi raji'un.`, lines: [`Truly, we belong to God, and truly, to Him we return.`] },
  { id: 'fatiha', title: `Al-Fatiha, the Opening`, by: `Meaning`, trad: ['muslim'], rights: 'plain',
    lines: [`In the name of God, the Most Gracious, the Most Merciful. Praise be to God, Lord of all the worlds, the Most Gracious, the Most Merciful, Master of the Day of Judgment. You alone we worship, and You alone we ask for help. Guide us on the straight path: the path of those You have blessed, not of those who earn anger, nor of those who go astray.`] },
  { id: 'soulatpeace', title: `For the soul at peace (Qur'an 89:27-30)`, by: `Meaning`, trad: ['muslim'], rights: 'plain',
    lines: [`O soul at peace, return to your Lord, well pleased and well pleasing. Enter among My servants, and enter My garden.`] },
  { id: 'harddays', title: `For hard days`, by: `Meanings`, trad: ['muslim'], rights: 'plain',
    lines: [`God does not burden any soul beyond what it can bear. (2:286)`, `So surely with hardship comes ease. Surely with hardship comes ease. (94:5-6)`] },
  { id: 'sickprayer', title: `A prayer for the sick`, by: `From the Prophet's practice`, trad: ['muslim'], rights: 'plain',
    lines: [`O God, Lord of all people, take away the suffering and heal. You are the Healer. There is no healing but Yours, a healing that leaves no illness behind.`] },

  // ---------- Hindu ----------
  { id: 'gita220', title: `Bhagavad Gita 2:20`, by: `Edwin Arnold, The Song Celestial, 1885`, trad: ['hindu'], rights: 'pd',
    lines: [`Never the spirit was born; the spirit shall cease to be never;`, `Never was time it was not; End and Beginning are dreams!`, `Birthless and deathless and changeless remaineth the spirit for ever;`, `Death hath not touched it at all, dead though the house of it seems!`] },
  { id: 'gita222', title: `Bhagavad Gita 2:22`, by: `Edwin Arnold`, trad: ['hindu'], rights: 'pd',
    lines: [`Nay, but as when one layeth`, `His worn-out robes away,`, `And, taking new ones, sayeth,`, `"These will I wear to-day!"`, `So putteth by the spirit`, `Lightly its garb of flesh,`, `And passeth to inherit`, `A residence afresh.`] },
  { id: 'asatoma', title: `Asato Ma`, by: `Brihadaranyaka Upanishad`, trad: ['hindu'], rights: 'plain',
    tr: `Asato ma sadgamaya, tamaso ma jyotirgamaya, mrityor ma amritam gamaya. Om shanti shanti shanti.`, lines: [`Lead me from the unreal to the real. Lead me from darkness to light. Lead me from death to the deathless. Om, peace, peace, peace.`] },
  { id: 'mahamrityunjaya', title: `The Mahamrityunjaya Mantra`, by: `Rig Veda`, trad: ['hindu'], rights: 'plain',
    tr: `Om tryambakam yajamahe sugandhim pushtivardhanam, urvarukam iva bandhanan mrityor mukshiya mamritat.`, lines: [`We honor the three-eyed One, fragrant, who nourishes all. As the ripe fruit falls free from the vine, may we be freed from death, and not from the deathless.`] },
  { id: 'name', title: `Chanting the Name`, by: `Traditional`, trad: ['hindu'], rights: 'plain',
    lines: [`Om Namah Shivaya. Hare Rama, Hare Krishna. Or simply: Ram. Families often chant softly near the end.`] },

  // ---------- Buddhist ----------
  { id: 'refuge', title: `Taking Refuge`, by: `Traditional`, trad: ['buddhist'], rights: 'plain',
    lines: [`I take refuge in the Buddha. I take refuge in the Dharma. I take refuge in the Sangha.`] },
  { id: 'metta', title: `Loving-kindness`, by: `In the spirit of the Metta Sutta`, trad: ['buddhist', 'all'], rights: 'plain',
    lines: [`May you be safe. May you be peaceful. May you be free from suffering. May you be held in kindness. May all beings everywhere be at ease.`] },
  { id: 'remembrances', title: `The Five Remembrances`, by: `Traditional`, trad: ['buddhist'], rights: 'plain',
    lines: [`I am of the nature to grow old. I am of the nature to have ill health. I am of the nature to die. All that is dear to me, and everyone I love, are of the nature to change. My actions are my only true belongings.`] },
  { id: 'dhammapada5', title: `From the Dhammapada, verse 5`, by: `Max Müller, 1881`, trad: ['buddhist'], rights: 'pd',
    lines: [`For hatred does not cease by hatred at any time: hatred ceases by love, this is an old rule.`] },
  { id: 'lastwords', title: `The Buddha's last words`, by: `Traditional`, trad: ['buddhist'], rights: 'plain',
    lines: [`All conditioned things pass away. Strive on with care.`] },
  { id: 'chant', title: `Chanting`, by: `Ask which the family uses`, trad: ['buddhist'], rights: 'plain',
    lines: [`Namo Amituofo (Chinese Pure Land). Namu Amida Butsu (Japanese Pure Land). Om Mani Padme Hum (Tibetan).`] },

  // ---------- Sikh ----------
  { id: 'moolmantar', title: `The Mool Mantar, opening of the Japji Sahib`, by: `Guru Nanak`, trad: ['sikh'], rights: 'plain',
    tr: `Ik Onkar, Satnam, Kartapurakh, Nirbhau, Nirvair, Akal Murat, Ajuni, Saibhang, Gurprasad.`, lines: [`One Creator. Truth is the Name. Creative Being, without fear, without hate, timeless in form, beyond birth, self-existent, known by the Guru's grace.`] },
  { id: 'simran', title: `Simran`, by: `Traditional`, trad: ['sikh'], rights: 'plain',
    lines: [`Quiet, repeated Waheguru, the Wondrous Lord. The family may recite Kirtan Sohila and Sukhmani Sahib near the end, and the Ardas prayer after.`] },

  // ---------- Poems ----------
  { id: 'crossing', title: `Crossing the Bar`, by: `Alfred, Lord Tennyson, 1889`, trad: ['all'], rights: 'pd',
    lines: [`Sunset and evening star,`, `And one clear call for me!`, `And may there be no moaning of the bar,`, `When I put out to sea,`, ``, `But such a tide as moving seems asleep,`, `Too full for sound and foam,`, `When that which drew from out the boundless deep`, `Turns again home.`, ``, `Twilight and evening bell,`, `And after that the dark!`, `And may there be no sadness of farewell,`, `When I embark;`, ``, `For tho' from out our bourne of Time and Place`, `The flood may bear me far,`, `I hope to see my Pilot face to face`, `When I have crost the bar.`] },
  { id: 'remember', title: `Remember`, by: `Christina Rossetti, 1862`, trad: ['all'], rights: 'pd',
    lines: [`Remember me when I am gone away,`, `Gone far away into the silent land;`, `When you can no more hold me by the hand,`, `Nor I half turn to go yet turning stay.`, `Remember me when no more day by day`, `You tell me of our future that you planned:`, `Only remember me; you understand`, `It will be late to counsel then or pray.`, `Yet if you should forget me for a while`, `And afterwards remember, do not grieve:`, `For if the darkness and corruption leave`, `A vestige of the thoughts that once I had,`, `Better by far you should forget and smile`, `Than that you should remember and be sad.`] },
  { id: 'hope', title: `"Hope" is the thing with feathers`, by: `Emily Dickinson, 1891 edition`, trad: ['all'], rights: 'pd',
    lines: [`"Hope" is the thing with feathers`, `That perches in the soul,`, `And sings the tune without the words,`, `And never stops at all,`, ``, `And sweetest in the gale is heard;`, `And sore must be the storm`, `That could abash the little bird`, `That kept so many warm.`, ``, `I've heard it in the chillest land,`, `And on the strangest sea;`, `Yet, never, in extremity,`, `It asked a crumb of me.`] },
  { id: 'donne', title: `Death, be not proud`, by: `John Donne, Holy Sonnet 10`, trad: ['christian', 'all'], rights: 'pd',
    lines: [`Death, be not proud, though some have called thee`, `Mighty and dreadful, for thou art not so;`, `For those whom thou think'st thou dost overthrow`, `Die not, poor Death, nor yet canst thou kill me.`, `From rest and sleep, which but thy pictures be,`, `Much pleasure; then from thee much more must flow,`, `And soonest our best men with thee do go,`, `Rest of their bones, and soul's delivery.`, `Thou art slave to fate, chance, kings, and desperate men,`, `And dost with poison, war, and sickness dwell,`, `And poppy or charms can make us sleep as well`, `And better than thy stroke; why swell'st thou then?`, `One short sleep past, we wake eternally`, `And death shall be no more; Death, thou shalt die.`] },
  { id: 'requiem', title: `Requiem`, by: `Robert Louis Stevenson, 1887`, trad: ['all'], rights: 'pd',
    lines: [`Under the wide and starry sky,`, `Dig the grave and let me lie.`, `Glad did I live and gladly die,`, `And I laid me down with a will.`, ``, `This be the verse you grave for me:`, `Here he lies where he longed to be;`, `Home is the sailor, home from sea,`, `And the hunter home from the hill.`] },
  { id: 'fearnomore', title: `Fear no more the heat o' the sun`, by: `Shakespeare, Cymbeline`, trad: ['all'], rights: 'pd',
    lines: [`Fear no more the heat o' the sun,`, `Nor the furious winter's rages;`, `Thou thy worldly task hast done,`, `Home art gone, and ta'en thy wages:`, `Golden lads and girls all must,`, `As chimney-sweepers, come to dust.`] },
  { id: 'holland', title: `Death is nothing at all (excerpt)`, by: `Henry Scott Holland, from a 1910 sermon`, trad: ['all'], rights: 'pd',
    lines: [`Death is nothing at all. I have only slipped away into the next room. I am I and you are you. Whatever we were to each other, that we are still. Call me by my old familiar name. Speak to me in the easy way which you always used. Put no difference into your tone. Wear no forced air of solemnity or sorrow. Laugh as we always laughed at the little jokes we enjoyed together. Life means all that it ever meant. It is the same as it ever was. I am but waiting for you, for an interval, somewhere very near, just around the corner. All is well.`] },

  // ---------- Nature and spiritual but not religious ----------
  { id: 'whitman', title: `From Song of Myself, 52`, by: `Walt Whitman`, trad: ['nature', 'sbnr', 'atheist', 'humanist', 'all'], rights: 'pd',
    lines: [`I bequeath myself to the dirt to grow from the grass I love,`, `If you want me again look for me under your boot-soles.`, `You will hardly know who I am or what I mean,`, `But I shall be good health to you nevertheless,`, `And filter and fibre your blood.`, `Failing to fetch me at first keep encouraged,`, `Missing me one place search another,`, `I stop somewhere waiting for you.`] },
  { id: 'tagore93', title: `From Gitanjali, 93`, by: `Rabindranath Tagore, 1912`, trad: ['hindu', 'sbnr', 'all'], rights: 'pd',
    lines: [`I have got my leave. Bid me farewell, my brothers! I bow to you all and take my departure. Here I give back the keys of my door, and I give up all claims to my house. I only ask for last kind words from you. We were neighbours for long, but I received more than I could give. Now the day has dawned and the lamp that lit my dark corner is out. A summons has come and I am ready for my journey.`] },
  { id: 'gibran', title: `On Death, from The Prophet (excerpt)`, by: `Kahlil Gibran, 1923`, trad: ['sbnr', 'all'], rights: 'pd',
    lines: [`For life and death are one, even as the river and the sea are one.`, `For what is it to die but to stand naked in the wind and to melt into the sun?`, `And what is it to cease breathing, but to free the breath from its restless tides, that it may rise and expand and seek God unencumbered?`, `Only when you drink from the river of silence shall you indeed sing.`, `And when you have reached the mountain top, then you shall begin to climb.`, `And when the earth shall claim your limbs, then shall you truly dance.`] },
  { id: 'deeppeace', title: `Deep Peace`, by: `Fiona Macleod, after an old Gaelic blessing. Families without a faith can stop before the last line.`, trad: ['nature', 'sbnr', 'christian', 'all'], rights: 'pd',
    lines: [`Deep peace of the running wave to you.`, `Deep peace of the flowing air to you.`, `Deep peace of the quiet earth to you.`, `Deep peace of the shining stars to you.`, `Deep peace of the Son of Peace to you.`] },
  { id: 'irish', title: `An Irish blessing`, by: `Traditional`, trad: ['christian', 'all'], rights: 'pd',
    lines: [`May the road rise to meet you. May the wind be always at your back. May the sun shine warm upon your face, the rains fall soft upon your fields. And until we meet again, may God hold you in the palm of His hand.`] },

  // ---------- Humanist and philosophical ----------
  { id: 'aurelius', title: `Meditations 4.48`, by: `Marcus Aurelius, George Long translation, 1862`, trad: ['humanist', 'atheist', 'agnostic', 'all'], rights: 'pd',
    lines: [`Pass then through this little space of time conformably to nature, and end thy journey in content, just as an olive falls off when it is ripened, blessing nature who produced it, and thanking the tree on which it grew.`] },
  { id: 'epicurus', title: `Letter to Menoeceus`, by: `Epicurus, R. D. Hicks translation, 1925`, trad: ['humanist', 'atheist', 'agnostic'], rights: 'pd',
    lines: [`Death, the most awful of evils, is nothing to us, seeing that, when we are, death is not come, and, when death is come, we are not.`] },
  { id: 'ingersoll', title: `At his brother's grave (excerpt)`, by: `Robert Ingersoll, 1879`, trad: ['humanist', 'atheist', 'agnostic'], rights: 'pd',
    lines: [`Life is a narrow vale between the cold and barren peaks of two eternities. We strive in vain to look beyond the heights. We cry aloud, and the only answer is the echo of our wailing cry. From the voiceless lips of the unreplying dead there comes no word; but in the night of death hope sees a star and listening love can hear the rustle of a wing.`] }
];

// Copyrighted favorites: listed and linked, never printed. Ask permission for full text.
const LINKED = [
  [`When Death Comes; Wild Geese; The Summer Day`, `Mary Oliver`, `New and Selected Poems`, `Nature, SBNR, anyone`],
  [`For the Dying; For Grief`, `John O'Donohue`, `To Bless the Space Between Us`, `Celtic, Catholic, SBNR`],
  [`The Peace of Wild Things`, `Wendell Berry`, `The Selected Poems`, `Nature, rural Minnesota families`],
  [`The Guest House`, `Rumi, trans. Coleman Barks`, `The Essential Rumi`, `Sufi Muslim, SBNR`],
  [`No Death, No Fear`, `Thich Nhat Hanh`, `the book of that name`, `Buddhist, SBNR`],
  [`Our Greatest Gift`, `Henri Nouwen`, `the book of that name`, `Catholic, Protestant`],
  [`Walking Each Other Home`, `Ram Dass and Mirabai Bush`, `the book of that name`, `SBNR, Hindu-influenced`],
  [`The Five Invitations`, `Frank Ostaseski`, `the book of that name`, `Buddhist, doulas`],
  [`Sacred Dying`, `Megory Anderson`, `the book of that name`, `Vigil rituals, doulas`],
  [`The Four Things That Matter Most`, `Ira Byock`, `the book of that name`, `Everyone`],
  [`Death Is But a Dream`, `Christopher Kerr`, `the book of that name`, `Families seeing visions`],
  [`Do not stand at my grave and weep`, `Attributed to Mary Elizabeth Frye`, `widely printed; rights disputed`, `Everyone`]
];
const SONGS = [`Precious Lord, Take My Hand`, `How Great Thou Art`, `I'll Fly Away`, `On Eagle's Wings`, `Be Not Afraid`, `Here I Am, Lord`, `10,000 Reasons`];
const RITES = `The Catholic Pastoral Care of the Sick, the ELCA and LCMS pastoral care books, and the Orthodox prayer books belong to clergy. Willow names them and helps families call the priest or pastor who uses them.`;
const KEPT = [
  [`Hmong`, `The Showing the Way chant and funeral rituals belong to the family's ritual specialists. Willow helps the family reach them.`],
  [`Ojibwe, Dakota, and other nations`, `Prayers and songs belong to elders and families. Many "Native American prayers" passed around online are misattributed or made up. Willow won't include them.`],
  [`Muslim`, `The Qur'an is recited in Arabic, by family or a recording. Willow gives meanings only, and links to recitations of Surah Yasin (36), Al-Fatiha (1), and Al-Mulk (67).`],
  [`Sikh`, `Gurbani is read from the family's own Gutka or by the granthi.`],
  [`Jewish`, `The Kaddish and many prayers are said from the family's own siddur, often with a minyan.`],
  [`Bahá'í`, `Families use their own prayer books. Willow links to the Healing Prayer, the Prayer for the Departed, and the short prayer of the Báb.`]
];

// Bible versions (GWG BLD 749). NKJV and ESV texts for the passages above that are also in the
// Ceremony Readings, whole verses, taken from the Service Builder's texts (Staff library ceremonies).
// Each version's notice shows and prints under its text. KJV stays in R above. NIV is not offered
// until Biblica gives written permission, so no NIV text is in this file.
const VERSIONS = {"ps23": {"nkjv": ["The LORD is my shepherd; I shall not want.", "He makes me to lie down in green pastures; He leads me beside the still waters.", "He restores my soul; He leads me in the paths of righteousness For His name’s sake.", "Yea, though I walk through the valley of the shadow of death, I will fear no evil; For You are with me; Your rod and Your staff, they comfort me.", "You prepare a table before me in the presence of my enemies; You anoint my head with oil; My cup runs over.", "Surely goodness and mercy shall follow me All the days of my life; And I will dwell in the house of the LORD Forever."], "esv": ["The LORD is my shepherd; I shall not want.", "He makes me lie down in green pastures. He leads me beside still waters.", "He restores my soul. He leads me in paths of righteousness for his name’s sake.", "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me; your rod and your staff, they comfort me.", "You prepare a table before me in the presence of my enemies; you anoint my head with oil; my cup overflows.", "Surely goodness and mercy shall follow me all the days of my life, and I shall dwell in the house of the LORD forever."]}, "ps121": {"nkjv": ["I will lift up my eyes to the hills: From whence comes my help?", "My help comes from the LORD, Who made heaven and earth.", "He will not allow your foot to be moved; He who keeps you will not slumber.", "Behold, He who keeps Israel Shall neither slumber nor sleep.", "The LORD is your keeper; The LORD is your shade at your right hand.", "The sun shall not strike you by day, Nor the moon by night.", "The LORD shall preserve you from all evil; He shall preserve your soul.", "The LORD shall preserve your going out and your coming in From this time forth, and even forevermore."], "esv": ["I lift up my eyes to the hills. From where does my help come?", "My help comes from the LORD, who made heaven and earth.", "He will not let your foot be moved; he who keeps you will not slumber.", "Behold, he who keeps Israel will neither slumber nor sleep.", "The LORD is your keeper; the LORD is your shade on your right hand.", "The sun shall not strike you by day, nor the moon by night.", "The LORD will keep you from all evil; he will keep your life.", "The LORD will keep your going out and your coming in from this time forth and forevermore."]}, "ps46": {"nkjv": ["God is our refuge and strength, A very present help in trouble.", "Therefore we will not fear, Even though the earth be removed, And though the mountains be carried into the midst of the sea;", "Be still, and know that I am God; I will be exalted among the nations, I will be exalted in the earth!"], "esv": ["God is our refuge and strength, a very present help in trouble.", "Therefore we will not fear though the earth gives way, though the mountains be moved into the heart of the sea,", "“Be still, and know that I am God. I will be exalted among the nations, I will be exalted in the earth!”"]}, "ps139": {"nkjv": ["Where can I go from Your Spirit? Or where can I flee from Your presence?", "If I ascend into heaven, You are there; If I make my bed in hell, behold, You are there.", "If I take the wings of the morning, And dwell in the uttermost parts of the sea,", "Even there Your hand shall lead me, And Your right hand shall hold me."], "esv": ["Where shall I go from your Spirit? Or where shall I flee from your presence?", "If I ascend to heaven, you are there! If I make my bed in Sheol, you are there!", "If I take the wings of the morning and dwell in the uttermost parts of the sea,", "even there your hand shall lead me, and your right hand shall hold me."]}, "eccl3": {"nkjv": ["To everything there is a season, A time for every purpose under heaven:", "A time to be born, And a time to die; A time to plant, And a time to pluck what is planted;", "A time to weep, And a time to laugh; A time to mourn, And a time to dance;"], "esv": ["For everything there is a season, and a time for every matter under heaven:", "a time to be born, and a time to die; a time to plant, and a time to pluck up what is planted;", "a time to weep, and a time to laugh; a time to mourn, and a time to dance;"]}, "isa43": {"nkjv": ["But now, thus says the LORD, who created you, O Jacob, And He who formed you, O Israel: “Fear not, for I have redeemed you; I have called you by your name; You are Mine.", "When you pass through the waters, I will be with you; And through the rivers, they shall not overflow you. When you walk through the fire, you shall not be burned, Nor shall the flame scorch you."], "esv": ["But now thus says the LORD, he who created you, O Jacob, he who formed you, O Israel: “Fear not, for I have redeemed you; I have called you by name, you are mine.", "When you pass through the waters, I will be with you; and through the rivers, they shall not overwhelm you; when you walk through fire you shall not be burned, and the flame shall not consume you."]}, "lam3": {"nkjv": ["Through the LORD’s mercies we are not consumed, Because His compassions fail not. They are new every morning; Great is Your faithfulness."], "esv": ["The steadfast love of the LORD never ceases; his mercies never come to an end; they are new every morning; great is your faithfulness."]}, "mt11": {"nkjv": ["Come to Me, all you who labor and are heavy laden, and I will give you rest."], "esv": ["Come to me, all who labor and are heavy laden, and I will give you rest."]}, "jn14": {"nkjv": ["“Let not your heart be troubled; you believe in God, believe also in Me.", "In My Father’s house are many mansions; if it were not so, I would have told you. I go to prepare a place for you.", "And if I go and prepare a place for you, I will come again and receive you to Myself; that where I am, there you may be also.", "Peace I leave with you, My peace I give to you; not as the world gives do I give to you. Let not your heart be troubled, neither let it be afraid."], "esv": ["“Let not your hearts be troubled. Believe in God; believe also in me.", "In my Father’s house are many rooms. If it were not so, would I have told you that I go to prepare a place for you?", "And if I go and prepare a place for you, I will come again and will take you to myself, that where I am you may be also.", "Peace I leave with you; my peace I give to you. Not as the world gives do I give to you. Let not your hearts be troubled, neither let them be afraid."]}, "rom8": {"nkjv": ["For I am persuaded that neither death nor life, nor angels nor principalities nor powers, nor things present nor things to come,", "nor height nor depth, nor any other created thing, shall be able to separate us from the love of God which is in Christ Jesus our Lord."], "esv": ["For I am sure that neither death nor life, nor angels nor rulers, nor things present nor things to come, nor powers,", "nor height nor depth, nor anything else in all creation, will be able to separate us from the love of God in Christ Jesus our Lord."]}, "rev21": {"nkjv": ["And God will wipe away every tear from their eyes; there shall be no more death, nor sorrow, nor crying. There shall be no more pain, for the former things have passed away.”"], "esv": ["He will wipe away every tear from their eyes, and death shall be no more, neither shall there be mourning nor crying nor pain anymore, for the former things have passed away.”"]}};
const BIBLE = {"kjv": {"name": "King James Version", "short": "KJV", "notice": ""}, "nkjv": {"name": "New King James Version", "short": "NKJV", "notice": "Scripture taken from the New King James Version®. Copyright © 1982 by Thomas Nelson. Used by permission. All rights reserved."}, "esv": {"name": "English Standard Version", "short": "ESV", "notice": "Scripture quotations are from the ESV® Bible (The Holy Bible, English Standard Version®), © 2001 by Crossway, a publishing ministry of Good News Publishers. ESV Text Edition: 2025. The ESV text may not be quoted in any publication made available to the public by a Creative Commons license. The ESV may not be translated in whole or in part into any other language. Used by permission. All rights reserved."}};

window.WILLOW_READINGS = { readings: R, linked: LINKED, songs: SONGS, rites: RITES, kept: KEPT, versionsOn: GG_VERSIONS_ON, versions: VERSIONS, bible: BIBLE };
})();
