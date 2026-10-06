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
    desrosiers: ["Desrosiers and Miller, relational spirituality and depression in adolescent girls (Journal of Clinical Psychology, 2007)", ""],
    froh09: ["Froh, Kashdan, Ozimkowski, and Miller, who benefits the most from a gratitude intervention in children and adolescents (2009)", "https://greatergood.berkeley.edu/images/uploads/Who_benefits_the_most_from_a_gratitude_intervention_in_children_and_adolescents.pdf"],
    gollwitzer: ["Peter M. Gollwitzer, implementation intentions: strong effects of simple plans (1999)", "https://doi.org/10.1037/0003-066X.54.7.493", "a"],
    gould05: ["Gould and colleagues, evaluating iatrogenic risk of youth suicide screening (JAMA, 2005)", "https://pubmed.ncbi.nlm.nih.gov/15811983/"],
    horowitz12: ["Horowitz and colleagues, the Ask Suicide-Screening Questions for youth (2012)", "https://jamanetwork.com/journals/jamapediatrics/fullarticle/1363508"],
    mcii: ["Duckworth, Grant, Loew, Oettingen, and Gollwitzer, mental contrasting and implementation intentions in adolescents (2011)", "", "a"],
    mnconsent: ["Minnesota Statutes 144.3431, minors 16 and older consenting to outpatient mental health services", "https://www.revisor.mn.gov/statutes/2024/cite/144.3431/pdf"],
    monahan: ["Monahan, Lee, and Steinberg, part-time work and adolescent adjustment (2011)", "https://onlinelibrary.wiley.com/doi/abs/10.1111/j.1467-8624.2010.01543.x"],
    mtf24: ["NIDA, Monitoring the Future survey, 2024 results", "https://nida.nih.gov/news-events/news-releases/2024/12/reported-use-of-most-drugs-among-adolescents-remained-low-in-2024"],
    odgers: ["Odgers and Jensen, adolescent mental health in the digital age (Journal of Child Psychology and Psychiatry, 2020)", "https://acamh.onlinelibrary.wiley.com/doi/10.1111/jcpp.13190"],
    phqa: ["Johnson and colleagues, the Patient Health Questionnaire for Adolescents (PHQ-A) (2002)", "https://www.researchgate.net/publication/11492256_The_patient_health_questionnaire_for_adolescents_-_Validation_of_an_instrument_for_the_assessment_of_mental_disorders_among_adolescent_primary_care_patients"],
    recchia23: ["Recchia and colleagues, physical activity and depressive symptoms in children and adolescents (JAMA Pediatrics, 2023)", "https://jamanetwork.com/journals/jamapediatrics/fullarticle/2799811"],
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
  };

  // Written guides, videos, and lessons. 'unknown' adds "Source unknown" for a line that needs one.
  var C = {
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
