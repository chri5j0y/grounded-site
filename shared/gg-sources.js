/* =====================================================================
   SOURCES AND CREDITS (shared/gg-sources.js)   Sources and Credits build, GWG BLD 713, October 2026
   One quiet line at the end of every video (under the closing scene, above the copyright line),
   every written guide, and every practice. The narration never names a source; this line does.

   The rules (decided in BLD 712 and 713):
   - Credit only what is certain. Anything traceable to a named person, program, or study, every
     "research shows" line, and every one of Chris's stories.
   - Where a reader would expect a source and none can be confirmed, the line says "Source unknown."
   - Common practices with no clear originator (5-4-3-2-1, slow breathing, box breathing) get no line.
   - Practices say "Adapted from" for the method they come from. Research behind a "why" line is "Sources".
   - Books on Chris's shelf link to their card in the Library (the card carries the Amazon link).
     Off-shelf books and studies link to their own home page or DOI.
   - Stories: published, "Story: Chris Joy, <title> · Read it on Grounded" (the Substack link).
     Unpublished, "Story: Chris Joy, from my notebook. Names and details changed."

   For tools
     GGSources.html(key)              the line for one item, e.g. 'willow:forgive', 'oak:anxiety'
     GGSources.practice(name, app, b) the line for a practice by its name (b: bedside story, optional)
     GGSources.lesson(app, lesson)    the line for a video: lesson.sources, or this file's list for its
                                      id, plus a Story line for every story scene in it
     GGSources.line(list, opts)       draw any list of source ids or {label, href} objects
   Sealed lessons (Field library) carry their own sources: ['id', ...] or [{label, href}].
   Edit sources here. Proofreading lines are in the Founder library (p9k-sources).
   W1 and W2 (Willow Guide For Guides) added the credits marked below; sealed lessons carry their ids in sources.
   W4 (Willow Support for Right Now, BLD 717): public lessons carry their own sources list in shared/learn-lessons.js.
   ===================================================================== */
(function () {
  if (window.GGSources) return;
  var SHELF = '/library/#book=';

  // id: [label, link, kind]. kind 'a' = a method or tradition (Adapted from, on a practice); otherwise research or a book.
  var SRC = {
    // BLD 750 Before the Vows (worker Q). Reused: stanley06, rcope.
    larson94: ["Larson and Holman, premarital predictors of marital quality and stability (Family Relations, 1994)", "https://doi.org/10.2307/585327"],
    halford03: ["Halford, Markman, Kline, and Stanley, best practices in couple relationship education (Journal of Marital and Family Therapy, 2003)", "https://scholarsarchive.byu.edu/facpub/4257"],
    gottman98: ["Gottman, Coan, Carrere, and Swanson, predicting marital happiness and stability from newlywed interactions (Journal of Marriage and the Family, 1998)", "https://doi.org/10.2307/353438"],
    markman10: ["Markman, Stanley, and Blumberg, Fighting for Your Marriage, third edition (the PREP approach, 2010)", "https://books.wiley.com/titles/9780470485910"],
    dew12: ["Dew, Britt, and Huston, examining the relationship between financial issues and divorce (Family Relations, 2012)", "https://doi.org/10.1111/j.1741-3729.2012.00715.x"],
    karney95: ["Karney and Bradbury, the longitudinal course of marital quality and stability: a review of theory, method, and research (Psychological Bulletin, 1995)", "https://doi.org/10.1037/0033-2909.118.1.3"],
    mahoney10: ["Mahoney, religion in families, 1999 to 2009: a relational spirituality framework (Journal of Marriage and Family, 2010)", "https://doi.org/10.1111/j.1741-3737.2010.00732.x"],
    stanley06sd: ["Stanley, Rhoades, and Markman, sliding versus deciding: inertia and the premarital cohabitation effect (Family Relations, 2006)", "https://doi.org/10.1111/j.1741-3729.2006.00418.x"],
    gottman99: ["Gottman and Silver, The Seven Principles for Making Marriage Work (Harmony, 1999): softened start-up, repair attempts, and turning toward", "https://www.gottman.com", "a"],
    hawkins08: ["Hawkins, Blanchard, Baldwin, and Fawcett, does marriage and relationship education work? A meta-analytic study (Journal of Consulting and Clinical Psychology, 2008)", "https://pubmed.ncbi.nlm.nih.gov/18837590/"],
    // end BLD 750 Before the Vows
    /* GWG BLD 748 (CER 2): the obituary safety tips (Willow lesson wl-h-farewell, and the Obituary Helper). */
    "obit-bankrate": ["Bankrate, how to protect a loved one who has died from identity theft", "https://www.bankrate.com/personal-finance/smart-money/protect-dead-relatives-from-identity-theft"],
    "obit-msu": ["Michigan State University Extension, The ultimate identity theft", "https://www.canr.msu.edu/news/the_ultimate_identity_theft"],
    byock4: ['Ira Byock, The Four Things That Matter Most', SHELF + 'DY-002'],
    rogers: ['Fred Rogers, "Look for the helpers"', 'https://www.fredrogers.org'], // BLD 731, Maple guides that use the line
    hansen: ['Hansen, Enright, Baskin, and Klatt, a forgiveness program for terminally ill elders (2009)', 'https://doi.org/10.1177/082585970902500106'],
    blundon: ['Blundon, Gallagher, and Ward, preserved hearing at the end of life (2020)', 'https://doi.org/10.1038/s41598-020-67234-9'],
    amen: ['Cooper, Ferguson, Bodurtha, and Smith, AMEN in Challenging Conversations (Johns Hopkins, 2014)', 'https://doi.org/10.1200/JOP.2014.001375', 'a'],
    chochinov: ['Chochinov and colleagues, Burden to Others and the Terminally Ill (2007)', 'https://doi.org/10.1016/j.jpainsymman.2006.12.012'],
    tang: ['Tang and colleagues, self-perceived burden as death approaches (2017)', 'https://doi.org/10.1002/pon.4107'],
    kerr: ['Kerr and colleagues, end-of-life dreams and visions (2014)', 'https://researchconnect.buffalo.edu/en/publications/end-of-life-dreams-and-visions-a-longitudinal-study-of-hospice-pa/'],
    dazzi: ['Dazzi, Gribble, Wessely, and Fear, does asking about suicide induce suicidal ideation? (2014)', 'https://doi.org/10.1017/S0033291714001299'],
    borkovec: ['Borkovec and colleagues, scheduled worry time (1983)', 'https://doi.org/10.1016/0005-7967(83)90206-1', 'a'],
    lieberman: ['Lieberman and colleagues, putting feelings into words (2007)', 'https://doi.org/10.1111/j.1467-9280.2007.01916.x'],
    siegel: ['Daniel J. Siegel and Tina Payne Bryson, The Whole-Brain Child ("name it to tame it")', 'https://drdansiegel.com/', 'a'],
    holt: ['Holt-Lunstad, Smith, and Layton, social relationships and mortality risk (2010)', 'https://doi.org/10.1371/journal.pmed.1000316'],
    koenig: ['Harold G. Koenig, religion, spirituality, and health (2012)', 'https://doi.org/10.5402/2012/278730'],
    snyder: ['C. R. Snyder, hope theory (2002)', 'https://doi.org/10.1207/S15327965PLI1304_01', 'a'],
    seligman: ['Seligman and colleagues, the gratitude visit and three good things (2005)', 'https://doi.org/10.1037/0003-066X.60.5.410', 'a'],
    froh: ['Froh, Sefick, and Emmons, counting blessings in early adolescents (2008)', 'https://pubmed.ncbi.nlm.nih.gov/?term=Counting+blessings+in+early+adolescents+Froh', 'a'],
    king: ['Laura A. King, the health benefits of writing about life goals (2001)', 'https://doi.org/10.1177/0146167201277003', 'a'],
    pennebaker: ['Pennebaker and Beall, expressive writing (1986)', 'https://doi.org/10.1037/0021-843X.95.3.274', 'a'],
    white: ['White and colleagues, two hours a week in nature (2019)', 'https://www.nature.com/articles/s41598-019-44097-3'],
    sturm: ['Sturm and colleagues, awe walks (2020)', 'https://pubmed.ncbi.nlm.nih.gov/?term=Big+smile+small+self+awe+walks+Sturm'],
    ggsc: ['Greater Good Science Center, Awe Walk', 'https://ggia.berkeley.edu/practice/awe_walk', 'a'],
    noetel: ['Noetel and colleagues, exercise for depression (BMJ, 2024)', 'https://bmj.com/content/384/bmj-2023-075847'],
    fredrickson: ['Fredrickson and colleagues, loving-kindness meditation and positive emotions (2008)', 'https://doi.org/10.1037/a0013262'],
    neff: ['Kristin Neff, Self-Compassion', SHELF + 'CM-001', 'a'],
    act: ['Hayes, Strosahl, and Wilson, Acceptance and Commitment Therapy', 'https://contextualscience.org/', 'a'],
    examen: ['Ignatius of Loyola, the Daily Examen', 'https://www.jesuits.org/spirituality/the-ignatian-examen/', 'a'],
    centering: ['Thomas Keating and Contemplative Outreach, Centering Prayer', 'https://www.contemplativeoutreach.org/centering-prayer-method/', 'a'],
    lectio: ['lectio divina, the monastic practice of sacred reading', 'https://www.contemplativeoutreach.org/lectio-divina-contemplation/', 'a'],
    metta: ['metta, the Buddhist practice of loving-kindness', '', 'a'],
    mbsr: ['Jon Kabat-Zinn, Mindfulness-Based Stress Reduction (the body scan)', '', 'a'], // W4 (BLD 717); link to come
    quaker: ['the Quaker practice of holding someone in the Light', '', 'a'],
    wrz: ['Wrzesniewski and Dutton, job crafting (2001)', 'https://doi.org/10.5465/amr.2001.4378011', 'a'],
    litz: ['Litz and colleagues, moral injury and moral repair (2009)', 'https://doi.org/10.1016/j.cpr.2009.07.003'],
    boss: ['Pauline Boss, Ambiguous Loss', 'https://www.ambiguousloss.com', 'a'],
    exline: ['Exline, Pargament, Grubbs, and Yali, religious and spiritual struggles (2014)', 'https://doi.org/10.1037/a0036465'],
    hope: ['Anandarajah and Hight, the HOPE questions for a spiritual history (2001)', 'https://www.aafp.org/pubs/afp/issues/2001/0101/p81.html', 'a'],
    fica: ['Puchalski and Romer, the FICA spiritual history (2000)', 'https://doi.org/10.1089/jpm.2000.3.129', 'a'],
    sicg: ['Ariadne Labs, Serious Illness Conversation Guide', 'https://www.ariadnelabs.org/serious-illness-care/', 'a'],
    // W1 (GWG BLD 714): Willow Guide For Guides
    pargament: ['Pargament, Koenig, Tarakeshwar, and Hahn, religious struggle and mortality among medically ill elderly patients (2001)', 'https://jamanetwork.com/journals/jamainternalmedicine/fullarticle/751558'],
    fitchett: ['Fitchett and Risk, screening for spiritual struggle (2009)', 'https://pubmed.ncbi.nlm.nih.gov/?term=Fitchett+Risk+Screening+for+spiritual+struggle'],
    chochinovdt: ['Chochinov and colleagues, dignity therapy (2005)', 'https://doi.org/10.1200/JCO.2005.08.391', 'a'],
    singh: ['Kathleen Dowling Singh, The Grace in Dying', SHELF + 'DY-004'],
    tangney: ['June Price Tangney and Ronda L. Dearing, Shame and Guilt (2002)', ''],
    // W2 (GWG BLD 715): Willow For Guides, The Last Days and After
    hui: ['Hui and colleagues, clinical signs of impending death in cancer patients (2014)', 'https://doi.org/10.1634/theoncologist.2013-0457'],
    mccann: ['McCann, Hall, and Groth-Juncker, comfort care and the appropriate use of nutrition and hydration (JAMA, 1994)', 'https://jamanetwork.com/journals/jama/article-abstract/381346'],
    nahm: ['Nahm, Greyson, Kelly, and Haraldsson, terminal lucidity (2012)', 'https://doi.org/10.1016/j.archger.2011.06.031'],
    schulz: ['Schulz and colleagues, end-of-life care and bereavement in family caregivers of persons with dementia (NEJM, 2003)', 'https://pubmed.ncbi.nlm.nih.gov/?term=Schulz+End-of-life+care+and+the+effects+of+bereavement+on+family+caregivers+of+persons+with+dementia'],
    dougy: ['The Dougy Center for Grieving Children and Families', 'https://www.dougy.org/', 'a'],
    honoring: ['Honoring Choices Minnesota', 'https://www.honoringchoices.org/', 'a'],
    convo: ['The Conversation Project', 'https://theconversationproject.org/', 'a'],
    // W3 (GWG BLD 716): Support for Guides
    figley: ['Charles R. Figley, Compassion Fatigue (1995)', ''],
    maslach: ['Maslach and Jackson, the measurement of experienced burnout (1981)', 'https://doi.org/10.1002/job.4030020205'],
    jameton: ['Andrew Jameton, Nursing Practice: The Ethical Issues (1984)', ''],
    doka: ['Kenneth J. Doka, Disenfranchised Grief (1989)', ''],
    lipsky: ['Laura van Dernoot Lipsky, Trauma Stewardship', SHELF + 'CP-014'],
    rts: ['Resolve Through Sharing, Gundersen Health System (bereavement training)', '', 'a'],
    // Sequoia (GWG BLD 733): research base in grounded-workshop docs/sequoia-research.md. Links still to confirm are left blank.
    rcope: ["Pargament, Feuille, and Burdzy, the Brief RCOPE: positive and negative religious coping (2011)", "https://doi.org/10.3390/rel2010051"],
    facitsp: ["Peterman, Fitchett, Brady, Hernandez, and Cella, the FACIT-Sp spiritual well-being scale (2002)", "https://link.springer.com/article/10.1207/S15324796ABM2401_06"],
    krause: ["Krause and Ellison, religious doubt in older adults over time (2009)", "https://doi.org/10.1111/j.1468-5906.2009.01448.x"],
    vanderweele: ["Tyler J. VanderWeele, religious communities and human flourishing (2017)", "https://doi.org/10.1177/0963721417721526"],
    tornstam: ["Lars Tornstam, gerotranscendence: the contemplative dimension of aging (1997)", ""],
    ryff: ["Carol D. Ryff, the meaning of psychological well-being, including purpose in life (1989)", "https://doi.org/10.1037/0022-3514.57.6.1069"],
    boyle: ["Boyle, Barnes, Buchman, and Bennett, purpose in life and mortality in older persons (2009)", "https://doi.org/10.1097/PSY.0b013e3181a5a7c0"],
    alimujiang: ["Alimujiang and colleagues, life purpose and mortality in US adults over 50 (2019)", "https://jamanetwork.com/journals/jamanetworkopen/fullarticle/2734064"],
    erikson: ["Erik H. Erikson, integrity and despair in the last stage of life", ""],
    mcadams: ["McAdams and de St. Aubin, a theory of generativity (1992)", ""],
    anderson: ["Anderson and colleagues, the benefits of volunteering among seniors (2014)", "https://pubmed.ncbi.nlm.nih.gov/?term=benefits+associated+with+volunteering+among+seniors+Anderson"],
    fried: ["Fried and colleagues, Experience Corps: older volunteers tutoring children (2004)", "https://pubmed.ncbi.nlm.nih.gov/?term=Fried+Experience+Corps+social+model+health+promotion"],
    americorps: ["AmeriCorps Seniors (Foster Grandparents, Senior Companions, RSVP)", ""],
    gds: ["Sheikh and Yesavage, the Geriatric Depression Scale short form (1986)", "https://hign.org/consultgeri/try-this-series/geriatric-depression-scale-gds"],
    phq2: ["Kroenke, Spitzer, and Williams, the PHQ-2 depression screener (2003)", "https://pubmed.ncbi.nlm.nih.gov/14583691/"],
    gad2: ["Kroenke and colleagues, anxiety in primary care and the GAD-2 (2007)", "https://doi.org/10.7326/0003-4819-146-5-200703060-00004"],
    wolitzky: ["Wolitzky-Taylor and colleagues, anxiety disorders in older adults (2010)", "https://doi.org/10.1002/da.20653"],
    unutzer: ["Unutzer and colleagues, the IMPACT trial for late-life depression (2002)", "https://pubmed.ncbi.nlm.nih.gov/12472325/"],
    scd: ["CDC, subjective cognitive decline (memory worries) in adults 45 and older", "https://www.cdc.gov/healthy-aging-data/media/pdfs/subjective-cognitive-decline-508.pdf"],
    park: ["Park and colleagues, the Synapse Project: learning new skills in later life (2014)", "https://doi.org/10.1177/0956797613499592"],
    creswell: ["Creswell and colleagues, mindfulness training and loneliness in older adults (2012)", "https://www.uclahealth.org/sites/default/files/documents/45/creswell-2012-mindfulness-based-st.pdf"],
    ucla3: ["Hughes, Waite, Hawkley, and Cacioppo, a three-item loneliness scale (2004)", ""],
    nasem: ["National Academies, Social Isolation and Loneliness in Older Adults (2020)", "https://www.nationalacademies.org/read/25663"],
    murthy: ["US Surgeon General, Our Epidemic of Loneliness and Isolation (2023)", "https://www.hhs.gov/sites/default/files/surgeon-general-social-connection-advisory.pdf"],
    masi: ["Masi, Chen, Hawkley, and Cacioppo, interventions to reduce loneliness (2011)", "https://pubmed.ncbi.nlm.nih.gov/?term=Masi+meta-analysis+of+interventions+to+reduce+loneliness"],
    moon: ["Moon and colleagues, widowhood and mortality (2011)", "https://doi.org/10.1371/journal.pone.0023465"],
    shear: ["M. Katherine Shear, complicated grief (2015)", "https://doi.org/10.1056/NEJMcp1315618"],
    yon: ["Yon, Mikton, Gassoumis, and Wilber, elder abuse prevalence (2017)", "https://www.thelancet.com/journals/langlo/article/PIIS2214-109X(17)30006-2/fulltext"],
    ftcfraud: ["Federal Trade Commission, scams and older adults", "https://reportfraud.ftc.gov"],
    ic3: ["FBI Internet Crime Complaint Center, 2024 report (elder fraud)", "https://www.ic3.gov/AnnualReport/Reports/2024_IC3Report.pdf"],
    aarpcg: ["AARP and National Alliance for Caregiving, Caregiving in the US 2025", "https://www.aarp.org/pri/topics/ltss/family-caregiving/caregiving-in-the-us-2025/"],
    grandfam: ["Generations United, grandfamilies fact sheet (2022)", "https://www.gu.org/app/uploads/2022/05/General-Grandfamilies-Fact-Sheet-2022.pdf"],
    pillemer: ["Karl Pillemer, Fault Lines: family estrangement (Cornell, 2020)", "https://news.cornell.edu/stories/2020/09/pillemer-family-estrangement-problem-hiding-plain-sight"],
    brownlin: ["Brown and Lin, the gray divorce revolution (2012)", "https://www.bgsu.edu/arts-and-sciences/sociology/Research/Gray-Divorce.html"],
    carstensen: ["Carstensen, Isaacowitz, and Charles, socioemotional selectivity theory (1999)", ""],
    steadi: ["CDC STEADI, Stay Independent fall risk check", "https://www.cdc.gov/steadi/patient-resources/"],
    cdcfalls: ["CDC, facts about older adult falls", "https://www.cdc.gov/falls/data-research/facts-stats/index.html"],
    sherrington: ["Sherrington and colleagues, exercise for preventing falls (Cochrane, 2019)", "https://doi.org/10.1002/14651858.CD012424.pub2"],
    litaichi: ["Li and colleagues, Tai Chi and fall reductions in older adults (2005)", "https://doi.org/10.1093/gerona/60.2.187", "a"],
    otago: ["Campbell and Robertson, the Otago Exercise Programme (University of Otago)", "https://www.med.unc.edu/aging/cgwep/wp-content/uploads/sites/865/2023/03/2023-Otago-Exercise-Program-Guidance-Statement.pdf", "a"],
    mob: ["A Matter of Balance (Tennstedt and colleagues, 1998)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC4410326/", "a"],
    pag: ["US Department of Health and Human Services, Physical Activity Guidelines for Americans, 2nd edition (2018)", "https://odphp.health.gov/sites/default/files/2019-09/Physical_Activity_Guidelines_2nd_edition.pdf"],
    paluch: ["Paluch and colleagues, daily steps and mortality (2022)", "https://doi.org/10.1016/S2468-2667(21)00302-9"],
    seated: ["Sexton and colleagues, seated exercise for older adults (2019)", "https://onlinelibrary.wiley.com/doi/10.1111/ajag.12603"],
    trauer: ["Trauer and colleagues, cognitive behavioral therapy for insomnia (2015)", "https://doi.org/10.7326/M14-2841"],
    niasleep: ["National Institute on Aging, sleep and older adults", "https://www.nia.nih.gov/health/sleep/getting-good-nights-sleep"],
    dga: ["Dietary Guidelines for Americans and older adults (ACL summary)", "https://acl.gov/sites/default/files/nutrition/Nutrition%20Guidelines/DGA%20Policy%20&%20Practice%20Implications%201-17-23%20update_508.pdf"],
    nidcd: ["NIDCD, age-related hearing loss", "https://www.nidcd.nih.gov/health/age-related-hearing-loss"],
    achieve: ["Lin and colleagues, the ACHIEVE hearing trial (2023)", "https://pubmed.ncbi.nlm.nih.gov/?term=Hearing+intervention+and+cognitive+decline+ACHIEVE+randomised+controlled+trial"],
    lancetdem: ["Livingston and colleagues, Lancet Commission on dementia prevention (2024)", "https://www.thelancet.com/commissions-do/dementia-prevention-intervention-and-care"],
    nei: ["National Eye Institute, low vision", "https://www.nei.nih.gov/eye-health-information/eye-conditions-and-diseases/low-vision"],
    chihuri: ["Chihuri and colleagues, driving cessation and health in older adults (2016)", "https://doi.org/10.1111/jgs.13931"],
    green: ["Green space exposure and older adult health, systematic review (2025)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC12882215/"],
    singing: ["Coulton and colleagues, community singing and older people (2015)", "https://www.cambridge.org/core/journals/the-british-journal-of-psychiatry/article/effectiveness-and-costeffectiveness-of-community-singing-on-mental-healthrelated-quality-of-life-of-older-people-randomised-controlled-trial/516558F0DDD7D4DD0197FDDEAD30ED85"],
    swls: ["Diener, Emmons, Larsen, and Griffin, the Satisfaction With Life Scale (1985)", "https://doi.org/10.1207/s15327752jpa4901_13"],
    herth: ["Kaye Herth, the Herth Hope Index (1992)", "https://pubmed.ncbi.nlm.nih.gov/?term=Herth+abbreviated+instrument+to+measure+hope"],
    lee19: ["Lee and colleagues, optimism and exceptional longevity (2019)", "https://doi.org/10.1073/pnas.1900712116"],
    killen: ["Killen and Macaskill, a gratitude intervention for older adults (2015)", "https://doi.org/10.1007/s10902-014-9542-3"],
    savoring: ["Smith and Bryant, the benefits of savoring life in older adults (2016)", "https://journals.sagepub.com/doi/abs/10.1177/0091415016669146"],
    butler: ["Robert N. Butler, the life review (1963)", "https://doi.org/10.1080/00332747.1963.11023339"],
    pinquart: ["Pinquart and Forstmeier, reminiscence interventions meta-analysis (2012)", "https://www.ncbi.nlm.nih.gov/books/NBK100209/"],
    bohlmeijer: ["Bohlmeijer and colleagues, reminiscence and well-being in older adults (2007)", "https://research.vu.nl/en/publications/the-effects-of-reminiscence-on-psychological-well-being-in-older--2/"],
    westerhof: ["Westerhof and Slatman, life review therapy for depressive symptoms (2019)", ""],
    woodsrt: ["Woods and colleagues, reminiscence therapy for dementia (Cochrane, 2018)", "https://doi.org/10.1002/14651858.CD001120.pub3"],
    chochinov11: ["Chochinov and colleagues, dignity therapy randomised trial (2011)", "https://pubmed.ncbi.nlm.nih.gov/21741308/"],
    allen: ["Allen and colleagues, legacy activities near the end of life (2008)", "https://doi.org/10.1089/jpm.2007.0294"],
    ethicalwill: ["the ethical will, a Jewish tradition of passing on values in writing", "", "a"],
    sudore: ["Sudore and colleagues, PREPARE for Your Care", "https://prepareforyourcare.org", "a"],
    niaacp: ["National Institute on Aging, advance care planning", "https://www.nia.nih.gov/health/advance-care-planning/advance-care-planning-advance-directives-health-care"],
    conwell: ["Conwell, Van Orden, and Caine, suicide in older adults (2011)", "https://pubmed.ncbi.nlm.nih.gov/?term=Conwell+Suicide+in+older+adults+Psychiatric+Clinics+2011"],
    cdcsuicide55: ["CDC NCHS, suicide among adults 55 and older (2021 data)", "https://www.cdc.gov/nchs/products/databriefs/db483.htm"],
    asq: ["NIMH, Ask Suicide-Screening Questions toolkit", "https://www.nimh.nih.gov/research/research-conducted-at-nimh/asq-toolkit-materials", "a"],
    davison: ["Davison and colleagues, late-onset stress in aging combat veterans (2006)", "https://health.oregonstate.edu/sites/health.oregonstate.edu/files/char/military-life-course/publications/davison_pless_gugliucci_king_salgado_spiro_bachrach_2006_late-life_emergence_of_early_life_trauma.pdf"],
    elderindex: ["Elder Index, Gerontology Institute, UMass Boston (via NCOA)", "https://www.ncoa.org/article/80-percent-of-older-adults-face-financial-insecurity/"],
    alzff: ["Alzheimer's Association, 2025 Alzheimer's Disease Facts and Figures", "https://www.alz.org/news/2025/facts-figures-report-alzheimers-treatment"],
    relocation: ["Psychological interventions to reduce relocation stress, scoping review (2024)", "https://pubmed.ncbi.nlm.nih.gov/38634443/"],
    retire: ["Does retirement trigger depressive symptoms? systematic review (2021)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC8679838/"],
    // Sequoia When Life Changes E to H (GWG BLD 735)
    acierno: ["Acierno and colleagues, the National Elder Mistreatment Study (2010)", "https://www.ojp.gov/ncjrs/virtual-library/abstracts/prevalence-and-correlates-emotional-physical-sexual-and-financial"],
    benson: ["Benson and Coleman, older adults developing a preference for living apart together (2016)", "https://profiles.wustl.edu/en/publications/older-adults-developing-a-preference-for-living-apart-together/"],
    bierman23: ["Bierman, Upenieks, Lee, and Harmon, financial strain and psychological distress among older adults (2023)", "https://journals.sagepub.com/doi/10.1177/23780231231197034"],
    bjsfraud: ["Bureau of Justice Statistics, Financial Fraud in the United States, 2017 (2021)", "https://bjs.ojp.gov/library/publications/financial-fraud-united-states-2017"],
    chopik: ["Chopik, associations among relational values, support, health, and well-being across the adult lifespan (Personal Relationships, 2017)", "https://msutoday.msu.edu/news/2017/06/are-friends-better-for-us-than-family"],
    cotton: ["Cassandra Cotton, the specter of kin: family in later-life dating and repartnering (2025)", "https://link.springer.com/article/10.1007/s42650-025-00089-5"],
    detering: ["Detering, Hancock, Reade, and Silvester, advance care planning for older inpatients, randomised trial (BMJ, 2010)", "https://doi.org/10.1136/bmj.c1345"],
    ekerdt: ["David Ekerdt, Downsizing: Confronting Our Possessions in Later Life (Columbia University Press, 2020)", "https://news.ku.edu/news/article/2020/05/18/downsizing-book-encourages-older-people-confront-their-possessions"],
    fingerman12: ["Fingerman, Cheng, Birditt, and Zarit, Only as happy as the least happy child: grown children's problems and successes and parents' well-being (Journals of Gerontology, Series B, 2012)", "https://doi.org/10.1093/geronb/gbr086"],
    gilligan: ["Gilligan, Suitor, and Pillemer, Patterns and processes of intergenerational estrangement: mother and adult child relationships across time (Research on Aging, 2022)", "https://doi.org/10.1177/01640275211036966"],
    gilovich: ["Gilovich and Medvec, the experience of regret: what, when, and why (1995)", "https://doi.org/10.1037/0033-295X.102.2.379"],
    hayworry: ["Hay, Fingerman, and Lefkowitz, The worries adult children and their parents experience for one another (International Journal of Aging and Human Development, 2008)", "https://doi.org/10.2190/AG.67.2.a"],
    huxhold: ["Huxhold, Miche, and Schüz, benefits of having friends in older ages: informal social activities and well-being (Journals of Gerontology, Series B, 2014)", "https://www.researchgate.net/publication/236916634_Benefits_of_Having_Friends_in_Older_Ages_Differential_Effects_of_Informal_Social_Activities_on_Well-Being_in_Middle-Aged_and_Older_Adults"],
    levy02: ["Levy, Slade, Kunkel, and Kasl, longevity increased by positive self-perceptions of aging (2002)", "https://doi.org/10.1037/0022-3514.83.2.261"],
    levy14: ["Levy, Pilver, Chung, and Slade, subliminal strengthening: improving physical function with a positive age-belief intervention (2014)", "https://journals.sagepub.com/doi/abs/10.1177/0956797614551970"],
    linpc: ["Lin, Brown, and Mellencamp, gray divorce and parent-child disconnectedness (2024)", "https://doi.org/10.1111/jomf.12936"],
    liu22: ["Liu, Rim, Min, and Min, the surprise of reaching out: appreciated more than we think (Journal of Personality and Social Psychology, 2022)", "https://www.apa.org/pubs/journals/releases/psp-pspi0000402.pdf"],
    menkin: ["Menkin, Robles, Gruenewald, Tanner, and Seeman, positive expectations regarding aging linked to more new friends in later life (Journals of Gerontology, Series B, 2017)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC5926985/"],
    moorman: ["Moorman and Stokes, Solidarity in the grandparent and adult grandchild relationship and trajectories of depressive symptoms (The Gerontologist, 2016)", "https://doi.org/10.1093/geront/gnu056"],
    musil: ["Musil, Warner, Zauszniewski, Wykle, and Standing, Grandmother caregiving, family stress and strain, and depressive symptoms (Western Journal of Nursing Research, 2009)", "https://doi.org/10.1177/0193945908328262"],
    niaaffairs: ["National Institute on Aging, Getting Your Affairs in Order Checklist: Documents to Prepare for the Future", "https://www.nia.nih.gov/health/advance-care-planning/getting-your-affairs-order-checklist-documents-prepare-future"],
    npha: ["University of Michigan National Poll on Healthy Aging, Everyday Ageism and Health (2020)", "https://ihpi.umich.edu/national-poll-healthy-aging/national-findings/everyday-ageism-and-health"],
    schulzbeach: ["Schulz and Beach, Caregiving as a risk factor for mortality: the Caregiver Health Effects Study (JAMA, 1999)", "https://pubmed.ncbi.nlm.nih.gov/10605972/"],
    toussaint: ["Toussaint, Williams, Musick, and Everson, forgiveness and health: age differences in a US probability sample (2001)", "https://doi.org/10.1023/A:1011394629736"],
    whoageism: ["World Health Organization and partners, Global Report on Ageism (2021)", "https://www.who.int/news/item/18-03-2021-ageism-is-a-global-challenge-un"],
    wrosch05: ["Wrosch, Bauer, and Scheier, regret and quality of life across the adult life span (2005)", "https://pubmed.ncbi.nlm.nih.gov/16420140/"],
    // end BLD 735
    // Sequoia Guide For Guides (GWG BLD 736)
    herman09: ["Herman and Williams, elderspeak's influence on resistiveness to care: focus on behavioral events (2009)", "https://doi.org/10.1177/1533317509341949"],
    vanorden10: ["Van Orden, Witte, Cukrowicz, Braithwaite, Selby, and Joiner, the interpersonal theory of suicide (2010)", "https://eric.ed.gov/?id=EJ884797"],
    zelaya: ["Zelaya, Dahlhamer, and colleagues, chronic pain and high-impact chronic pain among US adults, 2019 (NCHS Data Brief 390, 2020)", "https://www.cdc.gov/nchs/data/databriefs/db390-H.pdf"],
    // end BLD 736
    // Pine (GWG BLD 739)
    aapsleep14: ["American Academy of Pediatrics, school start times for adolescents (2014)", "https://publications.aap.org/pediatrics/article/134/3/642/74175/School-Start-Times-for-Adolescents"],
    aasm16: ["Paruthi and colleagues, American Academy of Sleep Medicine consensus on sleep for children and teens (2016)", "https://aasm.org/resources/pdf/pediatricsleepdurationconsensus.pdf"],
    bluth16: ["Bluth and colleagues, Making Friends with Yourself, a self-compassion program for teens (Mindfulness, 2016)", ""],
    bmmrsteen: ["Religiousness, spirituality, and depressive symptoms in adolescent psychiatric patients, using the BMMRS (2009)", "https://www.sciencedirect.com/science/article/abs/pii/S0165032709001827"],
    brenner: ["Brenner and the AAP Council on Sports Medicine and Fitness, sports specialization and intensive training in young athletes (2016)", "https://publications.aap.org/pediatrics/article-pdf/138/3/e20162148/1344770/peds_20162148.pdf"],
    bronk18: ["Bronk and colleagues, the Claremont Purpose Scale (2018)", "https://www.semanticscholar.org/paper/Claremont-Purpose-Scale:-A-Measure-that-Assesses-of-Bronk-Riches/9287143c5c62b59944347762f757b4147f2dfa09"],
    cdcbully23: ["CDC MMWR, social media use and bullying among high school students (2023 YRBS)", "https://www.cdc.gov/mmwr/volumes/73/su/su7304a3.htm"],
    cdcconnect23: ["CDC MMWR, school connectedness and protective factors among high school students (2023 YRBS)", "https://www.cdc.gov/mmwr/volumes/73/su/su7304a9.htm"],
    cdcpa: ["CDC, physical activity guidelines for children and adolescents", "https://www.cdc.gov/physical-activity-education/guidelines/index.html"],
    cdcteendrivers: ["CDC, risk factors for teen drivers", "https://cdc.gov/teen-drivers/risk-factors/index.html"],
    chs97: ["Snyder and colleagues, the Children's Hope Scale (1997)", "https://www.semanticscholar.org/paper/The-development-and-validation-of-the-Children's-Snyder-Hoza/f3f5b685538a60361f2a51d9be3a497e01ef94fa"],
    damon03: ["Damon, Menon, and Bronk, the development of purpose during adolescence (2003)", "https://www.semanticscholar.org/paper/The-Development-of-Purpose-During-Adolescence-Damon-Menon/691e52b9ae789d27c4ae40fdcd9476d971037737"],
    delosreyes15: ["De Los Reyes and colleagues, informant discrepancies in youth mental health (2015)", "https://psycnet.apa.org/manuscript/2015-18640-001.pdf"],
    desrosiers: ["Desrosiers and Miller, relational spirituality and depression in adolescent girls (Journal of Clinical Psychology, 2007)", ""],
    froh09: ["Froh, Kashdan, Ozimkowski, and Miller, who benefits the most from a gratitude intervention in children and adolescents (2009)", "https://greatergood.berkeley.edu/images/uploads/Who_benefits_the_most_from_a_gratitude_intervention_in_children_and_adolescents.pdf"],
    gollwitzer: ["Peter M. Gollwitzer, implementation intentions: strong effects of simple plans (1999)", "https://doi.org/10.1037/0003-066X.54.7.493", "a"],
    gould05: ["Gould and colleagues, evaluating iatrogenic risk of youth suicide screening (JAMA, 2005)", "https://pubmed.ncbi.nlm.nih.gov/15811983/"],
    grossman05: ["Grossman and colleagues, gun storage practices and youth suicide and injury risk (JAMA, 2005)", "https://jamanetwork.com/journals/jama/fullarticle/200330"],
    horowitz12: ["Horowitz and colleagues, the Ask Suicide-Screening Questions for youth (2012)", "https://jamanetwork.com/journals/jamapediatrics/fullarticle/1363508"],
    kerrstattin: ["Kerr and Stattin, parental monitoring: a reinterpretation (Developmental Psychology, 2000)", "https://www.researchgate.net/publication/12306310_Parental_Monitoring_A_Reinterpretation"],
    mcii: ["Duckworth, Grant, Loew, Oettingen, and Gollwitzer, mental contrasting and implementation intentions in adolescents (2011)", "", "a"],
    mnconsent: ["Minnesota Statutes 144.3431, minors 16 and older consenting to outpatient mental health services", "https://www.revisor.mn.gov/statutes/2024/cite/144.3431/pdf"],
    monahan: ["Monahan, Lee, and Steinberg, part-time work and adolescent adjustment (2011)", "https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1467-8624.2010.01543.x"],
    mtf24: ["NIDA, Monitoring the Future survey, 2024 results", "https://nida.nih.gov/news-events/news-releases/2024/12/reported-use-of-most-drugs-among-adolescents-remained-low-in-2024"],
    odgers: ["Odgers and Jensen, adolescent mental health in the digital age (Journal of Child Psychology and Psychiatry, 2020)", "https://acamh.onlinelibrary.wiley.com/doi/10.1111/jcpp.13190"],
    phqa: ["Johnson and colleagues, the Patient Health Questionnaire for Adolescents (PHQ-A) (2002)", "https://www.researchgate.net/publication/11492256_The_patient_health_questionnaire_for_adolescents_-_Validation_of_an_instrument_for_the_assessment_of_mental_disorders_among_adolescent_primary_care_patients"],
    recchia23: ["Recchia and colleagues, physical activity and depressive symptoms in children and adolescents (JAMA Pediatrics, 2023)", "https://jamanetwork.com/journals/jamapediatrics/fullarticle/2799811"],
    sam04: ["Society for Adolescent Medicine, confidential health care for adolescents (position paper, 2004)", "https://www.jahonline.org/article/S1054-139X(04)00086-2/fulltext"],
    schleider22: ["Schleider and colleagues, a randomized trial of single-session online interventions for adolescent depression (Nature Human Behaviour, 2022)", "https://www.nature.com/articles/s41562-021-01235-0"],
    schreier13: ["Schreier, Schonert-Reichl, and Chen, volunteering and cardiovascular risk in adolescents (JAMA Pediatrics, 2013)", "https://jamanetwork.com/journals/jamapediatrics/fullarticle/1655500"],
    selfcompteen: ["Self-compassion and distress in adolescents, meta-analysis", "https://pmc.ncbi.nlm.nih.gov/articles/PMC6061226/"],
    sgsocial23: ["US Surgeon General, Social Media and Youth Mental Health (2023)", "https://www.hhs.gov/sites/default/files/sg-youth-mental-health-social-media-advisory.pdf"],
    smithdenton: ["Christian Smith and Melinda Lundquist Denton, Soul Searching: the National Study of Youth and Religion (2005)", "https://youthandreligion.nd.edu/announcements/book-announcements/paperback-publication-of-soul-searching/"],
    stanley: ["Stanley, Brown, and colleagues, the Safety Planning Intervention with follow-up (JAMA Psychiatry, 2018)", "https://www.rcpsych.ac.uk/docs/default-source/improving-care/nccmh/suicide-prevention/monthly-clinic/comparison-of-safety-planning_stanley_2018.pdf", "a"],
    steinberg89: ["Steinberg and colleagues, authoritative parenting and adolescents (1989)", "https://pubmed.ncbi.nlm.nih.gov/2612251/"],
    uspstfanx: ["US Preventive Services Task Force, screening for anxiety in children and adolescents (2022)", "https://www.uspreventiveservicestaskforce.org/uspstf/recommendation/screening-anxiety-children-adolescents"],
    wyman10: ["Wyman and colleagues, an outcome evaluation of the Sources of Strength suicide prevention program (2010)", "https://ojp.gov/ncjrs/virtual-library/abstracts/outcome-evaluation-sources-strength-suicide-prevention-program"],
    yeager18: ["Yeager, Dahl, and Dweck, why interventions to influence adolescent behavior often fail but could succeed (2018)", "https://pubmed.ncbi.nlm.nih.gov/29232535/"],
    yeager19: ["Yeager and colleagues, a national experiment reveals where a growth mindset improves achievement (Nature, 2019)", "https://www.nature.com/articles/s41586-019-1466-y"],
    yrbs23: ["CDC, Youth Risk Behavior Survey Data Summary and Trends Report, 2023", "https://www.cdc.gov/yrbs/dstr/pdf/YRBS-2023-Data-Summary-Trend-Report.pdf"],
    // end BLD 739
    // Pine When Life Changes (GWG BLD 740)
    aapeating21: ["Hornberger, Lane, and the AAP Committee on Adolescence, identification and management of eating disorders in children and adolescents (Pediatrics, 2021)", "https://doi.org/10.1542/peds.2020-040279"],
    aecf16: ["Annie E. Casey Foundation, A Shared Sentence: the devastating toll of parental incarceration on kids, families and communities (2016)", "https://www.aecf.org/resources/a-shared-sentence"],
    amato01: ["Amato, children of divorce in the 1990s: an update of the Amato and Keith meta-analysis (Journal of Family Psychology, 2001)", "https://doi.org/10.1037/0893-3200.15.3.355"],
    cdcheadsup: ["CDC, HEADS UP: concussion in youth and school sports", "https://www.cdc.gov/heads-up/"],
    cornellsirr: ["Cornell Research Program on Self-Injury and Recovery, self-injury information and resources", "https://selfinjury.bctr.cornell.edu"],
    csmai25: ["Common Sense Media, Talk, Trust, and Trade-Offs: How and Why Teens Use AI Companions (2025)", "https://www.commonsensemedia.org/press-releases/nearly-3-in-4-teens-have-used-ai-companions-new-national-survey-finds"],
    csmporn22: ["Common Sense Media, Teens and Pornography (2022)", "https://www.commonsensemedia.org/press-releases/new-report-reveals-truths-about-how-teens-engage-with-pornography"],
    curranhill19: ["Curran and Hill, perfectionism is increasing over time: a meta-analysis of birth cohort differences from 1989 to 2016 (Psychological Bulletin, 2019)", "https://doi.org/10.1037/bul0000138"],
    curry17: ["Curry and colleagues, motor vehicle crash risk among adolescents and young adults with ADHD (JAMA Pediatrics, 2017)", "https://pubmed.ncbi.nlm.nih.gov/28604931/"],
    deaonepill: ["DEA, One Pill Can Kill: counterfeit pills and fentanyl", "https://www.dea.gov/onepill"],
    fbisext: ["FBI, warning about the increase of financial sextortion schemes targeting minors", "https://www.fbi.gov/contact-us/field-offices/losangeles/news/fbi-issues-warning-about-the-increase-of-financial-sextortion-schemes-targeting-minors"],
    ferpa18: ["US Department of Education, Student Privacy: the eligible student under FERPA", "https://studentprivacy.ed.gov/content/eligible-student"],
    ford97: ["Ford, Millstein, Halpern-Felsher, and Irwin, influence of physician confidentiality assurances on adolescents' willingness to disclose information (JAMA, 1997)", ""],
    gottransition: ["Got Transition, Six Core Elements of Health Care Transition", "https://gottransition.org/six-core-elements"],
    holman13: ["Holman, Garfin, and Silver, media's role in broadcasting acute stress following the Boston Marathon bombings (PNAS, 2014)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC3890785/"],
    judishouse: ["Judi's House and JAG Institute, Childhood Bereavement Estimation Model (2025)", "https://judishouse.org/childhood-grief-in-america/"],
    lock10: ["Lock, Le Grange, Agras, Moye, Bryson, and Jo, family-based treatment versus adolescent-focused individual therapy for adolescents with anorexia nervosa (Archives of General Psychiatry, 2010)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC3038846/"],
    mccabe25: ["McCabe, Schepis, McCabe, and colleagues, US children living with a parent with a substance use disorder, 2023 (JAMA Pediatrics, 2025), via NIH Research Matters", "https://www.nih.gov/news-events/nih-research-matters/millions-us-kids-live-parents-substance-use-disorders"],
    mdhminor: ["Minnesota Department of Health, minor consent to health services summary", "https://www.health.state.mn.us/people/adolescent/youth/minorconsent.pdf"],
    mnconcussion: ["Minnesota Statutes 121A.37, concussion procedures for youth athletic activities", "https://www.revisor.mn.gov/statutes/cite/121A.37"],
    mndliteen: ["Minnesota Department of Labor and Industry, age and hours restrictions for working teens", "https://www.dli.mn.gov/business/employment-practices/age-restrictions-working-teens"],
    mnr3525: ["Minnesota Rules 3525.2900, transition planning in the IEP, beginning by grade 9", "https://www.revisor.mn.gov/rules/3525.2900/"],
    moller17: ["Möller, Söndergaard, and Helström, tonic immobility during sexual assault, a common reaction (Acta Obstetricia et Gynecologica Scandinavica, 2017)", "https://doi.org/10.1111/aogs.13174"],
    monroe99: ["Monroe, Rohde, Seeley, and Lewinsohn, relationship loss as a risk factor for first onset of major depression in adolescence (Journal of Abnormal Psychology 108, 1999)", ""],
    mosteens: ["Military OneSource, Helping Teens Deal With Deployment (MilLife Guide)", "https://www.militaryonesource.mil/resources/millife-guides/military-deployment-support-for-teens/"],
    nciteenparent: ["National Cancer Institute, When Your Parent Has Cancer: A Guide for Teens", "https://www.cancer.gov/publications/patient-education/when-your-parent-has-cancer"],
    ncmecsext25: ["National Center for Missing and Exploited Children, new sextortion data for 2025 (2026)", "https://www.missingkids.org/blog/2026/ncmec-releases-new-sextortion-data-2025"],
    nioshteen: ["NIOSH, keeping teens safe and healthy at work (2019)", "https://www.cdc.gov/niosh/bulletin/2019/working-teens.html"],
    ntac21: ["US Secret Service National Threat Assessment Center, Averting Targeted School Violence: an analysis of plots against schools (2021)", "https://www.secretservice.gov/sites/default/files/reports/2021-03/USSS%20Averting%20Targeted%20School%20Violence.2021.03.pdf"],
    papernow13: ["Patricia L. Papernow, Surviving and Thriving in Stepfamily Relationships: What Works and What Doesn't (2013)", "https://www.stepfamilyrelationships.com/"],
    pew24: ["Pew Research Center, Teens, Social Media and Technology 2024", "https://www.pewresearch.org/internet/2024/12/12/teens-social-media-and-technology-2024/"],
    sevencs: ["Jerry Moe, the Seven Cs, National Association for Children of Addiction (NACoA)", "https://nacoa.org/the-seven-cs/"],
    yrbssleep23: ["CDC, Youth Risk Behavior Survey Data Summary and Trends: dietary, physical activity, and sleep behaviors, 2013 to 2023", "https://www.cdc.gov/yrbs/dstr/dietary-physical-sleep-behaviors.html"],
    // end BLD 740
    // Pine Guide For Guides (GWG BLD 741)
    aftersuicide18: ["American Foundation for Suicide Prevention and Suicide Prevention Resource Center, After a Suicide: A Toolkit for Schools, second edition (2018)", "https://sprc.org/online-library/after-suicide-toolkit-schools"],
    // end BLD 741
    // Birch (GWG BLD 742)
    aca26: ["HealthCare.gov, young adults staying on a parent's plan until 26 (Affordable Care Act)", "https://www.healthcare.gov/young-adults/children-under-26/"],
    arnett: ["Jeffrey Jensen Arnett, emerging adulthood, a theory of development from the late teens through the twenties (American Psychologist, 2000)", "https://jeffreyarnett.com/emerging-adulthood"],
    cfpbfwb: ["Consumer Financial Protection Bureau, Measuring Financial Well-Being: the CFPB Financial Well-Being Scale (2015)", "https://files.consumerfinance.gov/f/201512_cfpb_financial-well-being-user-guide-scale.pdf"],
    damon08: ["William Damon, The Path to Purpose (2008)", "https://www.edweek.org/leadership/majority-of-youths-found-to-lack-a-direction-in-life/2008/06"],
    fdupoll: ["Fairleigh Dickinson University Poll, online betting and young men (2024)", "https://www.fdu.edu/news/fdu-poll-finds-online-betting-leads-to-problems-for-young-men/"],
    healthyminds25: ["Healthy Minds Study, college student mental health improves for a third year, 2024 to 2025 (University of Michigan School of Public Health, 2025)", "https://sph.umich.edu/news/2025posts/college-student-mental-health-third-consecutive-year-improvement.html"],
    kessler05: ["Kessler and colleagues, lifetime prevalence and age of onset of mental health conditions in the National Comorbidity Survey Replication (Archives of General Psychiatry, 2005)", "https://hcp.hms.harvard.edu/publication/lifetime-prevalence-and-age-onset-distributions-dsm-iv-disorders-national-comorbidity"],
    mcc21: ["Making Caring Common, Harvard Graduate School of Education, Loneliness in America (2021)", "https://mcc.gse.harvard.edu/reports/loneliness-in-america"],
    mlq: ["Steger, Frazier, Oishi, and Kaler, the Meaning in Life Questionnaire (Journal of Counseling Psychology, 2006)", "https://singteach.nie.edu.sg/wp-content/uploads/2021/12/Steger-et-al-2006_The-meaning-in-life-questionnaire.pdf"],
    mtfpanel24: ["Monitoring the Future Panel Study, substance use among adults 19 to 30 (University of Michigan, 2024)", "https://src.isr.umich.edu/?p=1114"],
    nisvs: ["CDC, National Intimate Partner and Sexual Violence Survey, summary via VAWnet", "https://www.vawnet.org/sc/national-intimate-partner-and-sexual-violence-survey-nisvs"],
    nsduh24: ["SAMHSA, 2024 National Survey on Drug Use and Health: adult mental illness and suicide (2025)", "https://www.samhsa.gov/data/sites/default/files/reports/rpt56769/2024-nsduh-psr5-adult-ami-suicide.pdf"],
    nsfsleep: ["Hirshkowitz and colleagues, National Sleep Foundation's sleep duration recommendations (Sleep Health, 2015)", "https://profiles.wustl.edu/en/publications/national-sleep-foundations-updated-sleep-duration-recommendations/"],
    pewparents: ["Pew Research Center, parents, young adult children, and the transition to adulthood (2024)", "https://www.pewresearch.org/wp-content/uploads/sites/20/2024/01/ST_2024.01.25_Parents-Young-Adults_Report.pdf"],
    pewrls: ["Pew Research Center, Religious Landscape Study 2023 to 24 (2025)", "https://www.pewresearch.org/religious-landscape-study/age-distribution/18-29/"],
    shed24: ["Federal Reserve Board, Economic Well-Being of U.S. Households in 2024 (2025)", "https://www.federalreserve.gov/publications/2025-economic-well-being-of-us-households-in-2024-executive-summary.htm"],
    smithsnell: ["Christian Smith with Patricia Snell, Souls in Transition: The Religious and Spiritual Lives of Emerging Adults (2009)", "https://youthandreligion.nd.edu/announcements/book-announcements/souls-in-transition/"],
    sumner: ["Purpose in life across education levels (Applied Research in Quality of Life, 2017)", "https://ideas.repec.org/a/spr/ariqol/v12y2017i1d10.1007_s11482-016-9448-9.html"],
    // end BLD 742
    // Birch When Life Changes (GWG BLD 743)
    blsjobs24: ["U.S. Bureau of Labor Statistics, number of jobs held by people born 1980 to 1984, National Longitudinal Survey of Youth 1997 (2024)", "https://www.bls.gov/news.release/archives/nlsyth_04022024.pdf"],
    diforti: ["Di Forti and colleagues, the contribution of cannabis use to variation in the incidence of psychotic disorder across Europe (Lancet Psychiatry, 2019), summary via Neuroscience News", "https://neurosciencenews.com/psychosis-thc-10921/"],
    ftcrental: ["Federal Trade Commission, rental listing scams (consumer advice)", "https://consumer.ftc.gov/articles/rental-listing-scams"],
    gallupeng24: ["Gallup, younger workers and engagement by generation, via Fortune (2024)", "https://www.fortune.com/2024/03/05/gen-z-elder-millennials-disengaged-gallup-poll-genx-boomers"],
    hall18: ["Jeffrey A. Hall, how many hours does it take to make a friend? (Journal of Social and Personal Relationships, 2019), via the University of Kansas", "https://news.ku.edu/news/article/2018/03/06/study-reveals-number-hours-it-takes-make-friend"],
    hudson07: ["Hudson, Hiripi, Pope, and Kessler, the prevalence and correlates of eating disorders in the National Comorbidity Survey Replication (Biological Psychiatry, 2007)", "https://pmc.ncbi.nlm.nih.gov/articles/PMC1892232/"],
    icd11csbd: ["World Health Organization, ICD-11, compulsive sexual behaviour disorder (6C72)", ""],
    mcc24: ["Making Caring Common, Harvard Graduate School of Education, Loneliness in America 2024", "https://mcc.gse.harvard.edu/reports/loneliness-in-america-2024"],
    meansmatter: ["Harvard T.H. Chan School of Public Health, Means Matter: safe storage and suicide risk, research bibliography", "https://hsph.harvard.edu/research/means-matter/resources/safe-storage-bibliography"],
    mnagtenant: ["Minnesota Attorney General's Office, Landlords and Tenants: Rights and Responsibilities (updated 2025)", "https://ag.state.mn.us/Brochures/pubLandlordTenants.pdf"],
    monew: ["Military OneSource, New to the Military", "https://www.militaryonesource.mil/military-life-cycle/new-to-the-military/"],
    narcanotc: ["US Food and Drug Administration approves the first over-the-counter naloxone nasal spray (2023), via PharmTech", "https://www.pharmtech.com/view/fda-approves-first-over-the-counter-naloxone-nasal-spray"],
    nces18majors: ["National Center for Education Statistics, Data Point: beginning college students who change their majors within 3 years of enrollment (NCES 2018-434, 2017)", "https://nces.ed.gov/pubs2018/2018434/"],
    ncmectid25: ["National Center for Missing and Exploited Children, can you remove nudes from the internet? Take It Down (2025)", "https://www.missingkids.org/blog/2025/can-you-remove-nudes-from-the-internet"],
    nichdloss: ["NICHD (National Institutes of Health), about pregnancy loss before 20 weeks of pregnancy", "https://www.nichd.nih.gov/health/topics/pregnancyloss/conditioninfo/default"],
    nimhpsych: ["National Institute of Mental Health, Understanding Psychosis (2023)", "https://www.nimh.nih.gov/sites/default/files/documents/health/publications/understanding-psychosis/23-MH-8110-Understanding-Psychosis.pdf"],
    nscscnc25: ["National Student Clearinghouse Research Center, Some College, No Credential (2025)", "https://nscresearchcenter.org/some-college-no-credential/"],
    ocrpse: ["U.S. Department of Education, Office for Civil Rights, Students with Disabilities Preparing for Postsecondary Education: Know Your Rights and Responsibilities", "https://www.ed.gov/higher-education/students-disabilities-preparing-postsecondary-education"],
    paulmoser09: ["Paul and Moser, unemployment impairs mental health: meta-analyses (Journal of Vocational Behavior, 2009)", "https://cris.fau.de/publications/117729304"],
    paulson10: ["Paulson and Bazemore, prenatal and postpartum depression in fathers and its association with maternal depression: a meta-analysis (JAMA, 2010)", "https://doi.org/10.1001/jama.2010.605"],
    pewvets11: ["Pew Research Center, The Difficult Transition from Military to Civilian Life (2011)", "https://www.pewresearch.org/social-trends/2011/12/08/the-difficult-transition-from-military-to-civilian-life/"],
    prams18: ["Bauman and colleagues, Vital Signs: postpartum depressive symptoms and provider discussions about perinatal depression, United States, 2018 (CDC, MMWR, 2020)", "https://www.cdc.gov/mmwr/volumes/69/wr/mm6919a2.htm"],
    rhoades11: ["Rhoades and colleagues, breaking up is hard to do: the impact of unmarried relationship dissolution on mental health and life satisfaction (Journal of Family Psychology, 2011)", "https://pubmed.ncbi.nlm.nih.gov/21517174/"],
    stanley06: ["Stanley, Amato, Johnson, and Markman, premarital education, marital quality, and marital stability: findings from a large, random household survey (Journal of Family Psychology, 2006)", "https://doi.org/10.1037/0893-3200.20.1.117"],
    stopncii: ["StopNCII.org, preventing non-consensual intimate image sharing (UK Safer Internet Centre)", "https://saferinternet.org.uk/blog/stopncii-org-preventing-non-consensual-intimate-image-sharing"],
    voyc17: ["Chapin Hall at the University of Chicago, Voices of Youth Count: one in 10 young adults 18 to 25 experience some form of homelessness during one year (Morton and colleagues, 2017)", "https://www.chapinhall.org/news/one-in-10-young-adults-experience-homelessness-during-one-year/"],
    whoburnout19: ["World Health Organization, burn-out an occupational phenomenon: International Classification of Diseases (2019)", "https://www.who.int/news/item/28-05-2019-burn-out-an-occupational-phenomenon-international-classification-of-diseases"],
    // end BLD 743
  };

  // Written guides, videos, and lessons. 'unknown' adds "Source unknown" for a line that needs one.
  var C = {
    // Birch When Life Changes (GWG BLD 743)
    "birch:adhd": ["ocrpse", "curry17"],
    "birch:after-baby": ["prams18", "paulson10"],
    "birch:anxiety": ["healthyminds25", "borkovec"],
    "birch:breakup": ["rhoades11"],
    "birch:career-change": ["blsjobs24"],
    "birch:changing-plans": ["nces18majors", "nscscnc25"],
    "birch:coming-home": ["pewvets11", "litz"],
    "birch:controlling": ["nisvs"],
    "birch:dating": ["arnett", "nisvs"],
    "birch:depression": ["healthyminds25", "noetel", "nsduh24"],
    "birch:eating": ["hudson07"],
    "birch:engaged": ["stanley06"],
    "birch:estrangement": ["pillemer"],
    "birch:faith-hurt": ["exline"],
    "birch:faith-own": ["smithsnell"],
    "birch:first-apartment": ["mnagtenant", "ftcrental"],
    "birch:first-job": ["nsfsleep", "gallupeng24"],
    "birch:first-signs": ["kessler05", "nimhpsych", "diforti"],
    "birch:first-year": ["healthyminds25", "nsfsleep", "ferpa18"],
    "birch:friend-suicide": ["dazzi", "nsduh24"],
    "birch:friends": ["hall18", "murthy", "mcc24"],
    "birch:gambling": ["fdupoll"],
    "birch:grief-young": ["dougy", "dazzi"],
    "birch:health-26": ["aca26", "gottransition"],
    "birch:housing": ["voyc17"],
    "birch:images": ["stopncii", "ncmectid25"],
    "birch:job-loss": ["paulmoser09"],
    "birch:loneliness": ["mcc21", "mcc24", "murthy"],
    "birch:military": ["monew"],
    "birch:money-basics": ["shed24", "cfpbfwb"],
    "birch:moving-back": ["pewparents"],
    "birch:moving-out": ["pewparents", "mcc21"],
    "birch:new-city": ["mcc21", "hall18", "murthy"],
    "birch:not-college": ["sumner"],
    "birch:parents-adult": ["pewparents"],
    "birch:porn": ["icd11csbd"],
    "birch:pregnancy-loss": ["nichdloss"],
    "birch:pressure-burnout": ["curranhill19", "whoburnout19", "nsfsleep"],
    "birch:purpose": ["bronk18", "damon03", "mlq"],
    "birch:selfharm": ["cornellsirr", "dazzi"],
    "birch:sexual-assault": ["moller17", "nisvs"],
    "birch:substances": ["mtfpanel24", "diforti", "deaonepill", "narcanotc"],
    "birch:suicide-thoughts": ["nsduh24", "stanley", "dazzi", "meansmatter"],
    "birch:what-now": ["damon08", "mlq"],
    "birch:young-parent": ["prams18", "paulson10"],
    // end BLD 743
    // Birch (GWG BLD 742)
    "birch:groundwork": ["damon03", "bronk18", "mlq", "arnett", "yeager18", "snyder", "king", "stanley", "cfpbfwb"],
    // end BLD 742
    // Pine When Life Changes (GWG BLD 740)
    "pine:adhd": ["mnr3525", "curry17"],
    "pine:ai-companions": ["csmai25"],
    "pine:anxiety": ["uspstfanx", "borkovec"],
    "pine:blowup": ["yeager18"],
    "pine:body-image": ["sgsocial23", "selfcompteen", "bluth16"],
    "pine:breakup": ["monroe99"],
    "pine:bullying": ["yrbs23", "cdcbully23"],
    "pine:car-crash": ["cdcteendrivers", "cdcheadsup"],
    "pine:chronic-illness": ["gottransition", "mnconsent"],
    "pine:concussion": ["cdcheadsup", "mnconcussion"],
    "pine:counseling": ["mnconsent", "mdhminor", "sam04", "ford97"],
    "pine:dating-abuse": ["yrbs23"],
    "pine:deployed": ["mosteens"],
    "pine:depression": ["yrbs23", "phqa", "recchia23", "gould05", "grossman05"],
    "pine:divorce": ["amato01"],
    "pine:eating": ["aapeating21", "lock10"],
    "pine:faith-doubt": ["smithdenton", "bmmrsteen"],
    "pine:faith-hurt": ["bmmrsteen"],
    "pine:family-substance": ["sevencs", "mccabe25"],
    "pine:first-job": ["monahan", "aasm16", "nioshteen", "mndliteen"],
    "pine:first-relationship": ["kerrstattin", "steinberg89"],
    "pine:friend-changes": ["cdcconnect23", "kerrstattin"],
    "pine:friend-death": ["dougy", "unknown", "gould05", "dazzi"],
    "pine:grades-pressure": ["curranhill19", "aasm16", "selfcompteen", "yeager19", "steinberg89"],
    "pine:graduation": ["ferpa18"],
    "pine:left-out": ["murthy", "cdcconnect23", "wyman10"],
    "pine:loved-one-ill": ["nciteenparent"],
    "pine:lying": ["kerrstattin", "steinberg89"],
    "pine:moving": ["cdcconnect23"],
    "pine:parent-death": ["judishouse", "dougy"],
    "pine:parent-jail": ["aecf16"],
    "pine:path-after": ["damon03", "bronk18", "monahan", "yeager18"],
    "pine:porn": ["csmporn22"],
    "pine:purpose-service": ["damon03", "bronk18", "schreier13", "yeager18"],
    "pine:school-threats": ["ntac21", "holman13"],
    "pine:selfharm": ["cornellsirr", "gould05"],
    "pine:sextortion": ["ncmecsext25", "fbisext"],
    "pine:sexual-assault": ["moller17"],
    "pine:sleep": ["aasm16", "aapsleep14", "yrbssleep23"],
    "pine:social-media": ["pew24", "sgsocial23", "odgers", "kerrstattin"],
    "pine:sports-cut": ["brenner", "cdcheadsup", "recchia23"],
    "pine:start-hs": ["yeager19", "cdcconnect23", "wyman10", "aasm16", "kerrstattin", "yeager18"],
    "pine:stepfamily": ["papernow13"],
    "pine:substances": ["mtf24", "deaonepill", "kerrstattin"],
    "pine:suicide-thoughts": ["stanley", "gould05", "grossman05", "asq"],
    // end BLD 740
    'willow:miracle': ['amen'],
    'willow:forgive': ['byock4', 'hansen'],
    'willow:burden': ['chochinov', 'tang'],
    'willow:end': ['dazzi'],
    'willow:hear': ['blundon'],
    'willow:visions': ['kerr'],
    'willow:hanging': ['byock4'],
    'willow:parent': ['tangney'],
    'oak:anxiety': ['borkovec'],
    'oak:ambiguous-loss': ['boss'],
    'oak:moral-injury': ['litz'],
    'oak:bedside': ['blundon'],
    'maple:sadness': ['dazzi'],
    'maple:wanting-die': ['dazzi'],
    'aspen:drinking': ['unknown'],
    // When Life Changes videos (Willow)
    'video:wl-g-forgive-you': ['byock4'],
    'video:wl-g-forgive-helper': ['byock4', 'hansen'],
    'video:wl-g-end-helper': ['dazzi'],
    'video:wl-g-signs-helper': ['blundon'],
    'video:wl-g-hear-you': ['blundon'],
    'video:wl-g-hear-helper': ['blundon'],
    'video:wl-g-visions-you': ['kerr'],
    'video:wl-g-visions-helper': ['kerr'],
    'video:wl-g-hanging-you': ['byock4'],
    'video:wl-g-hanging-helper': ['byock4'],
    // Learn lessons and Support for Right Now
    'video:ok-6-roots': ['koenig'],
    'video:ok-6-trunk': ['unknown'],
    'video:ok-6-bark': ['lieberman', 'siegel'],
    'video:ok-6-branches': ['holt'],
    'video:ok-6-leaves': ['unknown'],
    'video:ok-6-fruit': ['snyder'],
    'video:ok-s-struggle': ['dazzi'],
    'video:wl-s-say': ['byock4', 'blundon'],
    'video:wl-s-hear': ['blundon'],
    'video:wl-h-weeks': ['kerr'],
    'video:wl-h-words': ['blundon'],
    // Pine (GWG BLD 739)
    "pine:nextsteps": ["damon03", "bronk18", "yeager18", "schreier13", "monahan", "snyder", "gollwitzer", "mcii", "king", "wyman10"],
    "pine:journey": ["cdcpa", "brenner", "snyder"]
    // end BLD 739
  };

  // Practices by name, everywhere they appear. P_RE is matched against the name (Aspen names are sentences).
  var P = {
    'examen': ['examen'], 'awe walk': ['ggsc', 'sturm'], 'hold someone in light': ['quaker'], 'slow sacred reading': ['lectio'],
    'scripture': ['lectio'], 'centering prayer': ['centering'], 'values sort': ['act'], 'leaves on a stream': ['act'],
    'worry window': ['borkovec'], 'expressive writing': ['pennebaker'], 'name it': ['lieberman'], 'say it out loud': ['lieberman'],
    'self-compassion break': ['neff'], 'kind voice letter': ['neff'], 'loving-kindness': ['metta'], 'gratitude letter': ['seligman'],
    'three good things': ['seligman'], 'best possible self': ['king'], 'hope map': ['snyder'], 'two hours outdoors': ['white'],
    'job crafting': ['wrz'], 'one of the four things': ['byock4'], 'talk about dying, once': ['dazzi'],
    // Pine (GWG BLD 739)
    "phone outside the bedroom": ["sgsocial23"],
    "look out for a friend": ["dazzi", "gould05"],
    "name your trusted adult": ["wyman10"],
    "driving calm": ["cdcteendrivers"],
    "first job balance": ["monahan"],
    "rest day": ["brenner"],
    "my brain grows": ["yeager19"],
    "purpose reflection": ["bronk18", "damon03"],
    "study sprints": [{"label": "Francesco Cirillo, the Pomodoro Technique", "href": "", "adapted": true}]
    // end BLD 739
  };
  var P_RE = [[/three good things/i, ['seligman']]];
  // Extra credits where one app's own words make a research claim (Oak's "Why it helps").
  var PX = {
    // Birch (GWG BLD 742)
    "birch:a group that lifts you": ["vanderweele"],
    "birch:best possible self": ["king"],
    "birch:call home": ["pewparents"],
    "birch:carry your big questions": ["smithsnell"],
    "birch:carry your questions": ["smithsnell"],
    "birch:centering prayer": ["centering"],
    "birch:examen": ["examen"],
    "birch:expressive writing": ["pennebaker"],
    "birch:faith community": ["vanderweele"],
    "birch:find people who share your values": ["smithsnell"],
    "birch:find your people for faith": ["smithsnell"],
    "birch:gratitude letter": ["seligman"],
    "birch:health basics": ["aca26"],
    "birch:hold someone in light": ["quaker"],
    "birch:hope map": ["snyder"],
    "birch:keep someone in mind": ["quaker"],
    "birch:kind voice letter": ["neff"],
    "birch:leaves on a stream": ["act"],
    "birch:look back on your day": ["examen"],
    "birch:look out for a friend": ["dazzi"],
    "birch:loving-kindness": ["metta", "fredrickson"],
    "birch:make one plan": ["murthy"],
    "birch:money check-in": ["cfpbfwb"],
    "birch:movement": ["pag", "noetel"],
    "birch:my safety plan": ["stanley"],
    "birch:name it": ["lieberman", "siegel"],
    "birch:plan your answer": ["mtfpanel24"],
    "birch:purpose reflection": ["bronk18", "damon03"],
    "birch:scripture": ["lectio"],
    "birch:self-compassion break": ["neff"],
    "birch:silent sitting": ["centering"],
    "birch:sleep": ["nsfsleep"],
    "birch:starter cushion": ["shed24"],
    "birch:steady wake time": [{"label": "Cognitive behavioral therapy for insomnia (CBT-I)", "href": "https://doi.org/10.7326/M14-2841", "adapted": true}, "trauer"],
    "birch:strength training": ["pag"],
    "birch:study sprints": [{"label": "Francesco Cirillo, the Pomodoro Technique", "href": "", "adapted": true}],
    "birch:three good things": ["seligman"],
    "birch:two hours outdoors": ["white"],
    "birch:values sort": ["act"],
    "birch:walk or jog": ["noetel"],
    "birch:words to live by": ["lectio"],
    "birch:worry window": ["borkovec"],
    // end BLD 742
    // Young adult practices in the shared Practice Library (grove/library.js LIB_NEW, GWG BLD 745).
    // Shown in Oak and The Grove as 'lib'; Birch credits the same names above.
    "lib:money check-in": ["cfpbfwb"],
    "lib:starter cushion": ["shed24"],
    "lib:make one plan": ["murthy"],
    "lib:call home": ["pewparents"],
    "lib:plan your answer": ["mtfpanel24"],
    "lib:find your people for faith": ["smithsnell"],
    // end BLD 745
    'oak:awe walk': ['ggsc', 'sturm'], 'oak:loving-kindness': ['metta', 'fredrickson'], 'oak:expressive writing': ['pennebaker', 'unknown'],
    'oak:walk or jog': ['noetel'], 'oak:yoga': ['noetel'], 'oak:purpose statement': ['unknown'], 'oak:moral repair letter': ['litz'],
    'maple:three good things': ['froh'], 'aspen:three good things': ['froh'], 'grove-kid:three good things': ['froh'],
    'sequoia:bring your questions': ['krause'],
    'sequoia:welcome solitude': ['tornstam'],
    'sequoia:music': ['singing'],
    'sequoia:mindfulness': ['creswell'],
    'sequoia:body scan': ['mbsr'],
    'sequoia:worry window': ['wolitzky'],
    'sequoia:savor a moment': ['savoring'],
    'sequoia:grief time': ['shear'],
    'sequoia:memory helpers': ['scd'],
    'sequoia:talk about your mood': ['unutzer'],
    'sequoia:write your story': ['pinquart','bohlmeijer'],
    'sequoia:legacy letter': ['ethicalwill'],
    'sequoia:keep learning': ['park'],
    'sequoia:mentor someone': ['mcadams'],
    'sequoia:volunteer': ['anderson','americorps'],
    'sequoia:life review': ['butler','westerhof'],
    'sequoia:record a story': ['allen'],
    'sequoia:what i want remembered': ['chochinovdt','chochinov11'],
    'sequoia:reason to get up': ['boyle','alimujiang'],
    'sequoia:find your role': ['retire'],
    'sequoia:peace with the past': ['erikson'],
    'sequoia:moral repair letter': ['litz','davison'],
    'sequoia:read with a child': ['fried'],
    'sequoia:pass on a skill': ['mcadams'],
    'sequoia:make peace': ['pillemer'],
    'sequoia:three good things': ['killen'],
    'sequoia:two-week gratitude': ['killen'],
    'sequoia:savoring walk': ['savoring'],
    'sequoia:best possible year': ['king','lee19'],
    'sequoia:hopes big and small': ['herth'],
    'sequoia:make your wishes known': ['sudore','convo','honoring','niaacp'],
    'sequoia:food': ['dga'],
    'sequoia:sleep': ['niasleep'],
    'sequoia:movement': ['pag'],
    'sequoia:two hours outdoors': ['green'],
    'sequoia:walk your way': ['paluch','pag'],
    'sequoia:sit to stand': ['otago','sherrington'],
    'sequoia:balance practice': ['sherrington','otago','seated'],
    'sequoia:tai chi': ['litaichi'],
    'sequoia:chair stretch': ['seated'],
    'sequoia:fall confidence': ['mob','steadi'],
    'sequoia:home safety walk-through': ['cdcfalls','steadi'],
    'sequoia:steady wake time': [{'label':'Cognitive behavioral therapy for insomnia (CBT-I)','href':'https://doi.org/10.7326/M14-2841','adapted':true},'trauer'],
    'sequoia:bed for sleep only': [{'label':'Cognitive behavioral therapy for insomnia (CBT-I)','href':'https://doi.org/10.7326/M14-2841','adapted':true},'trauer'],
    'sequoia:smart nap': ['niasleep'],
    'sequoia:protein at every meal': ['dga'],
    'sequoia:water within reach': ['dga'],
    'sequoia:hearing and vision check': ['nidcd','lancetdem'],
    'sequoia:family': ['holt','carstensen'],
    'sequoia:friends': ['murthy'],
    'sequoia:faith': ['vanderweele'],
    'sequoia:grandchildren': ['grandfam'],
    'sequoia:loving-kindness': ['fredrickson'],
    'sequoia:lonely thoughts check': ['masi'],
    'sequoia:caregiver pause': ['aarpcg'],
    'sequoia:scam pause': ['ic3','ftcfraud'],
    'sequoia:the four things': ['byock4'],
    // Pine (GWG BLD 739)
    "pine:examen": ["examen"],
    "pine:scripture": ["lectio"],
    "pine:carry your questions": ["smithdenton"],
    "pine:hold someone in light": ["quaker"],
    "pine:name it": ["lieberman", "siegel"],
    "pine:self-compassion break": ["bluth16", "selfcompteen"],
    "pine:worry window": ["borkovec"],
    "pine:kind voice letter": ["neff"],
    "pine:phone check": ["sgsocial23", "odgers"],
    "pine:my safety plan": ["stanley"],
    "pine:values sort": ["act"],
    "pine:purpose reflection": ["bronk18", "damon03"],
    "pine:volunteer": ["schreier13"],
    "pine:my brain grows": ["yeager19"],
    "pine:study sprints": [{"label": "Francesco Cirillo, the Pomodoro Technique", "href": "", "adapted": true}],
    "pine:first job balance": ["monahan"],
    "pine:one thing that matters": ["schleider22"],
    "pine:expressive writing": ["pennebaker"],
    "pine:best possible self": ["king"],
    "pine:hope map": ["snyder"],
    "pine:movement": ["recchia23", "cdcpa"],
    "pine:sleep": ["aasm16", "aapsleep14"],
    "pine:two hours outdoors": ["white"],
    "pine:phone outside the bedroom": ["sgsocial23"],
    "pine:walk or jog": ["recchia23"],
    "pine:strength training": ["cdcpa"],
    "pine:steady wake time": [{"label": "Cognitive behavioral therapy for insomnia (CBT-I)", "href": "https://doi.org/10.7326/M14-2841", "adapted": true}, "trauer"],
    "pine:rest day": ["brenner"],
    "pine:driving calm": ["cdcteendrivers"],
    "pine:family": ["holt"],
    "pine:friends": ["murthy"],
    "pine:name your trusted adult": ["wyman10"],
    "pine:gratitude letter": ["froh09"],
    "pine:faith": ["vanderweele"],
    "pine:loving-kindness": ["fredrickson"],
    "pine:easy ways out": ["mtf24", "unknown"],
    "pine:look out for a friend": ["dazzi", "gould05"],
    "pine:three good things": ["froh"],
    "pine:look back on your day": ["examen"],
    "pine:a group that lifts you": ["vanderweele"]
    // end BLD 739
  };

  // Chris's stories. Published: the Substack link ('' while the link is still to come). Anything not listed is from the notebook.
  var PUB = {
    'he was praying too': 'https://chri5j0y.substack.com/p/he-was-praying-too',
    'the atypical atheist': 'https://chri5j0y.substack.com/p/the-atypical-atheist',
    'he came to collect': 'https://chri5j0y.substack.com/p/he-came-to-collect',
    'total bliss': 'https://chri5j0y.substack.com/p/total-bliss',
    'the recovery': 'https://chri5j0y.substack.com/p/the-recovery',
    'drift away': 'https://chri5j0y.substack.com/p/drift-away',
    'welcome home': 'https://chri5j0y.substack.com/p/welcome-home',
    'please help my dad die': 'https://chri5j0y.substack.com/p/please-help-my-dad-die',
    'if she is still here': 'https://chri5j0y.substack.com/p/if-she-is-still-here',
    'grief debt': 'https://chri5j0y.substack.com/p/grief-debt',
    'birth plan': 'https://chri5j0y.substack.com/p/birth-plan',
    'my boundaries have gates': 'https://chri5j0y.substack.com/p/my-boundaries-have-gates',
    'grounded in coffee': 'https://chri5j0y.substack.com/p/grounded-in-coffee',
    'prayer': 'https://chri5j0y.substack.com/p/thank-god-for-sending-you',
    'enlightenment': 'https://chri5j0y.substack.com/p/enlightenment',
    'love': 'https://chri5j0y.substack.com/p/love',
    'the impossible dance of particles': 'https://chri5j0y.substack.com/p/the-impossible-dance-of-particles',
    'he deserves that': 'https://chri5j0y.substack.com/p/he-deserves-that'
    // Drafts on Substack, not yet published (credited as from the notebook until they go live; then add the link here):
    // Why Is God Doing This to Me?, A Presence That Cannot Be Boxed, The Beautiful Hodgepodge, Divine Sign,
    // I Know That One, Silly.
  };
  var NOTEBOOK = 'Story: Chris Joy, from my notebook. Names and details changed.';

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function norm(t) { return String(t || '').replace(/[\u2018\u2019]/g, "'").replace(/\.$/, '').trim().toLowerCase(); }
  function item(x) {
    if (!x) return null;
    if (typeof x === 'string') { if (x === 'unknown') return { unknown: true }; var s = SRC[x]; return s ? { label: s[0], href: s[1], a: s[2] === 'a' } : null; }
    if (Array.isArray(x)) return { label: x[0], href: x[1] || '' };
    if (x.label) return { label: x.label, href: x.href || '', a: !!x.adapted };
    return null;
  }
  function link(x) { return x.href ? '<a href="' + esc(x.href) + '" target="_blank" rel="noopener">' + esc(x.label) + '</a>' : esc(x.label); }
  function storyOf(title) {
    var k = norm(title); if (!k) return null;
    if (Object.prototype.hasOwnProperty.call(PUB, k)) return { title: String(title).replace(/\.$/, ''), href: PUB[k] };
    return { notebook: true };
  }
  // list: source ids or objects. opts: {practice: true, stories: [titles], tag: 'p' or 'small'}
  function line(list, opts) {
    opts = opts || {};
    var seen = {}, adapted = [], src = [], unknown = false;
    (list || []).forEach(function (x) {
      var k = typeof x === 'string' ? x : JSON.stringify(x); if (seen[k]) return; seen[k] = 1;
      var it = item(x); if (!it) return;
      if (it.unknown) { unknown = true; return; }
      (opts.practice && it.a ? adapted : src).push(it);
    });
    var rows = [];
    if (adapted.length) rows.push('<span class="gg-src-k">Adapted from:</span> ' + adapted.map(link).join('; ') + '.');
    if (src.length) rows.push('<span class="gg-src-k">' + (src.length > 1 ? 'Sources:' : 'Source:') + '</span> ' + src.map(link).join('; ') + '.' + (unknown ? ' Other details: source unknown.' : ''));
    else if (unknown) rows.push(adapted.length ? 'Other details: source unknown.' : 'Source unknown.');
    var nb = false, st = {};
    (opts.stories || []).forEach(function (t) {
      var s = storyOf(t); if (!s) return;
      if (s.notebook) { nb = true; return; }
      if (st[s.title]) return; st[s.title] = 1;
      rows.push('<span class="gg-src-k">Story:</span> Chris Joy, ' + esc(s.title) + (s.href ? ' &middot; <a href="' + esc(s.href) + '" target="_blank" rel="noopener">Read it on Grounded</a>' : ''));
    });
    if (nb) rows.push(esc(NOTEBOOK));
    if (!rows.length) return '';
    css();
    if (opts.tag === 'small') return rows.map(function (r) { return '<small class="gg-src-line">' + r + '</small>'; }).join('');
    return '<div class="gg-src">' + rows.map(function (r) { return '<p>' + r + '</p>'; }).join('') + '</div>';
  }
  function html(key, opts) { return line(C[key] || [], opts); }
  function practiceList(name, app) {
    var k = norm(name), out = (P[k] || []).slice();
    if (!out.length) P_RE.forEach(function (r) { if (r[0].test(name)) out = out.concat(r[1]); });
    var x = PX[(app || '') + ':' + k]; if (!x && /three good things/i.test(name)) x = PX[(app || '') + ':three good things'];
    if (x) { out = out.filter(function (id) { return !(x.indexOf('froh') >= 0 && id === 'seligman'); }).concat(x); }
    return out;
  }
  function practice(name, app, bedside) {
    return line(practiceList(name, app), { practice: true, stories: bedside && bedside.story ? [bedside.story] : [] });
  }
  function lesson(app, l, opts) {
    if (!l) return '';
    var list = Array.isArray(l.sources) ? l.sources : (C['video:' + l.id] || []);
    var stories = (l.scenes || []).filter(function (s) { return s && s.k === 'story' && s.title; }).map(function (s) { return s.title; });
    return line(list, Object.assign({ stories: stories }, opts || {}));
  }
  var done = false;
  function css() {
    if (done || typeof document === 'undefined' || !document.head) return; done = true;
    var st = document.createElement('style'); st.id = 'gg-src-css';
    st.textContent = '.gg-src{margin:16px 0 0;font-size:13.5px;line-height:1.45;opacity:.85;}.gg-src p{margin:3px 0;}'
      + '.gg-src a,.gg-src-line a{color:inherit;text-decoration:underline;text-underline-offset:2px;}'
      + '.gg-src-k{font-weight:600;}.gg-src-line{display:block;font-size:13px;line-height:1.4;opacity:.9;margin-top:4px;}'
      + '@media print{.gg-src{opacity:1;font-size:10pt;}.gg-src a{text-decoration:none;}}';
    document.head.appendChild(st);
  }
  window.GGSources = { html: html, practice: practice, practiceList: practiceList, lesson: lesson, line: line, story: storyOf, SRC: SRC, C: C };
})();
