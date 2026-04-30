// ─── VOCABULARY POOL (50 words) ───────────────────────────────────────────────

const WORD_POOL = [

  // Core carbon accounting concepts
  { word: "Additionality", definition: "The principle that carbon reductions must be beyond what would have occurred without the project.", context: "The project must prove additionality by demonstrating that deforestation would have continued under a business-as-usual scenario." },
  { word: "Leakage", definition: "Displacement of emissions outside the project boundary due to project activities.", context: "Leakage occurred when displaced logging activities moved into adjacent forest areas outside the project boundary." },
  { word: "Permanence", definition: "The long-term durability of carbon sequestration to ensure stored carbon is not released.", context: "A buffer pool was established to insure against permanence risks such as wildfire or pest outbreaks." },
  { word: "Baseline Scenario", definition: "The projected emissions trajectory in the absence of the carbon project.", context: "Historical deforestation rates were used to establish the baseline scenario for the ARR project." },
  { word: "Carbon Stock Change", definition: "The difference in stored carbon between two points in time, used to quantify project outcomes.", context: "Carbon stock change was calculated by comparing biomass estimates from the baseline and monitoring periods." },
  { word: "Net Emissions Reduction", definition: "The total greenhouse gas reductions attributable to a project after accounting for leakage and baseline emissions.", context: "Net emissions reductions are calculated by subtracting baseline emissions and project emissions from monitored carbon stock changes." },
  { word: "Uncertainty", definition: "The range of possible values around an estimate, typically expressed as a percentage confidence interval.", context: "The project applied a conservative discount to its credit issuance to account for measurement uncertainty exceeding 15%." },
  { word: "Emissions Factor", definition: "A coefficient that quantifies the amount of a greenhouse gas emitted per unit of activity.", context: "Country-specific emissions factors for grid electricity were used to estimate project emissions from monitoring equipment." },

  // MRV and monitoring
  { word: "MRV", definition: "Measurement, Reporting, and Verification — the process of quantifying and confirming carbon outcomes.", context: "A robust MRV system using satellite imagery ensured accurate carbon accounting across the project area." },
  { word: "Stratification", definition: "Dividing a project area into homogenous sub-units to improve accuracy of carbon estimates.", context: "Stratification by forest type reduced sampling error and improved the reliability of stock change calculations." },
  { word: "Ground-truthing", definition: "Field verification of remotely sensed data to confirm accuracy of spatial analysis.", context: "Ground-truthing plots were established across all strata to validate the land cover classification map." },
  { word: "Accuracy Assessment", definition: "A statistical evaluation of how well a classification or spatial dataset represents ground conditions.", context: "The accuracy assessment achieved an overall classification accuracy of 89%, exceeding the minimum threshold required by the methodology." },

  // Carbon pools and biomass
  { word: "Carbon Pool", definition: "A reservoir that stores carbon, such as above-ground biomass, soil, or deadwood.", context: "The project elected to include soil organic carbon as an eligible carbon pool under the methodology." },
  { word: "Above-ground Biomass", definition: "The total living plant material above the soil surface, including trunks, branches, and leaves.", context: "Above-ground biomass was estimated from DBH measurements using species-specific allometric equations." },
  { word: "Below-ground Biomass", definition: "Carbon stored in root systems, typically estimated as a ratio of above-ground biomass.", context: "Below-ground biomass was included in the carbon accounting using a root-to-shoot ratio from IPCC default values." },
  { word: "Soil Organic Carbon", definition: "Carbon stored in the soil from decomposed plant and animal matter, typically measured to one metre depth.", context: "Soil organic carbon was excluded from the accounting after measurements showed it was not affected by project activities." },
  { word: "Carbon Density", definition: "The amount of carbon stored per unit area, typically expressed in tonnes of CO₂e per hectare.", context: "Forest carbon density varied significantly between strata, from 120 tCO₂e/ha in degraded zones to 380 tCO₂e/ha in primary forest." },
  { word: "Biomass Expansion Factor", definition: "A multiplier used to estimate total tree biomass from measured stem volume.", context: "A biomass expansion factor of 1.74 was applied to convert merchantable timber volume into total above-ground biomass." },

  // Field measurement
  { word: "Allometric Equation", definition: "A mathematical formula relating tree measurements to biomass or carbon stock estimates.", context: "Species-specific allometric equations were applied to convert field-measured DBH data into above-ground biomass estimates." },
  { word: "DBH", definition: "Diameter at Breast Height — the standard measurement of tree trunk diameter taken at 1.3 metres above ground.", context: "Field crews measured DBH for all trees above 10 cm at 1.3 metres height within each sampling plot." },
  { word: "Wood Density", definition: "The mass of dry wood per unit volume, a key variable in estimating biomass from tree measurements.", context: "Wood density values were sourced from a regional database when species-specific data were unavailable." },

  // GIS and remote sensing
  { word: "Spatial Resolution", definition: "The level of detail in a geographic dataset, typically expressed as pixel size on the ground.", context: "A 10-metre spatial resolution from Sentinel-2 imagery was sufficient to delineate project boundaries accurately." },
  { word: "NDVI", definition: "Normalized Difference Vegetation Index — a satellite-derived index measuring vegetation density and health.", context: "NDVI time-series data was used to detect early signs of forest degradation before canopy loss became visible." },
  { word: "Land Cover Classification", definition: "The process of assigning satellite image pixels to categories such as forest, grassland, or agriculture.", context: "A supervised land cover classification was trained on 500 reference points to map forest extent across the project area." },
  { word: "LiDAR", definition: "Light Detection and Ranging — a remote sensing method using laser pulses to measure three-dimensional structure.", context: "Airborne LiDAR provided canopy height data used to calibrate the allometric equations applied to field plot data." },
  { word: "Mosaic", definition: "A composite image created by combining multiple satellite scenes to cover a large area or reduce cloud cover.", context: "A cloud-free mosaic was assembled from 14 Sentinel-2 scenes captured over a three-month acquisition window." },
  { word: "Forest Degradation", definition: "A reduction in forest quality, biomass, or carbon stocks without complete removal of tree cover.", context: "Selective logging caused measurable forest degradation that was captured in the monitoring system using NDVI analysis." },
  { word: "Deforestation Frontier", definition: "An area where forest loss is actively expanding, indicating high pressure from agriculture or infrastructure.", context: "The project area sat directly on a deforestation frontier, making additionality straightforward to demonstrate." },

  // Standards and market infrastructure
  { word: "Methodology", definition: "A standardised set of rules and procedures approved by a certifying body for quantifying carbon outcomes.", context: "The project used the VM0015 methodology for avoided unplanned deforestation under the VCS standard." },
  { word: "Project Design Document", definition: "A formal document describing a carbon project's methodology, baseline, monitoring plan, and expected emissions reductions.", context: "The Project Design Document underwent public stakeholder consultation before being submitted for validation." },
  { word: "Validation", definition: "Independent third-party assessment confirming that a project's design and methodology are sound before implementation.", context: "Validation confirmed that the project's baseline methodology was consistent with the applicable VCS standard." },
  { word: "Verification", definition: "Independent third-party assessment confirming that reported carbon reductions have actually occurred.", context: "Annual verification by an accredited auditor is required before the project can issue new credits." },
  { word: "Registry", definition: "A database system that tracks the issuance, transfer, and retirement of carbon credits to prevent double-counting.", context: "The project registered its credits on Verra's registry, where each serial number is publicly visible and traceable." },
  { word: "Buffer Pool", definition: "A reserve of credits set aside to compensate for potential reversals of carbon sequestration.", context: "The project contributed 18% of its credits to the buffer pool to cover wildfire and pest risk." },
  { word: "Crediting Period", definition: "The defined timeframe during which a project can generate and issue carbon credits.", context: "The project's 30-year crediting period begins from the date of first verification." },
  { word: "Reference Region", definition: "A geographic area used to derive historical deforestation rates for establishing a project baseline.", context: "The reference region was defined as the jurisdiction surrounding the project, excluding protected areas." },

  // Carbon credit mechanics
  { word: "Carbon Credit", definition: "A tradeable certificate representing one tonne of CO₂ equivalent reduced or removed from the atmosphere.", context: "Each verified carbon credit issued by the project corresponds to one tonne of CO₂e avoided through reduced deforestation." },
  { word: "Vintage", definition: "The year in which the carbon reductions or removals represented by a credit took place.", context: "Buyers often specify a vintage year preference, as older credits may attract additional scrutiny under newer standards." },
  { word: "Carbon Offset", definition: "A reduction or removal of greenhouse gas emissions used to compensate for emissions made elsewhere.", context: "The airline purchased carbon offsets to neutralise the residual emissions from its long-haul fleet." },
  { word: "Retirement", definition: "The permanent removal of a carbon credit from circulation to represent a claim of offset.", context: "Upon retirement, the credit's serial number is cancelled in the registry and cannot be transferred or resold." },
  { word: "Double Counting", definition: "The erroneous claiming of the same emissions reduction or removal by more than one party.", context: "The registry's serial number system prevents double counting by ensuring each credit is retired only once." },

  // Project types
  { word: "REDD+", definition: "A UN framework for reducing emissions from deforestation and forest degradation, including conservation and sustainable management of forests.", context: "The project qualified for REDD+ finance because it demonstrated measurable reductions in deforestation within a developing country." },
  { word: "ARR", definition: "Afforestation, Reforestation, and Revegetation — project activities that establish new tree cover on previously unforested land.", context: "The ARR project planted native species across 8,000 hectares of degraded grassland, sequestering carbon over a 30-year crediting period." },
  { word: "AUDD", definition: "Avoided Unplanned Deforestation and Degradation — a project type that protects forest threatened by unorganised clearing.", context: "Under the AUDD methodology, the project developer must demonstrate that the forest would have been cleared without intervention." },
  { word: "Improved Forest Management", definition: "A project type that changes timber harvesting or land management practices to increase carbon stocks in working forests.", context: "By extending rotation cycles and reducing harvest intensity, the IFM project increased above-ground carbon stocks by 22%." },

  // Social and environmental integrity
  { word: "Co-benefits", definition: "Non-carbon benefits generated by a project, such as biodiversity conservation, water security, or community livelihoods.", context: "The project's co-benefits included habitat protection for endangered species and employment for local communities." },
  { word: "Safeguards", definition: "Social and environmental standards a carbon project must meet to avoid harming communities or ecosystems.", context: "The REDD+ safeguards required free, prior, and informed consent from indigenous communities within the project area." },
];


// ─── WRITING SCENARIO TEMPLATES (15 scenarios) ───────────────────────────────
// Use {WORD1} and {WORD2} as placeholders — filled at runtime.

const SCENARIO_TEMPLATES = [
  "You are a carbon project validator reviewing an ARR methodology submission for a 15,000-hectare reforestation project in Southeast Asia. The project developer has submitted their first verification report, but your technical team has flagged concerns about how they have handled {WORD1} and {WORD2} in their carbon accounting. Draft a professional memo to the project developer explaining the issues and the corrective actions required before the report can be approved.",

  "A prospective carbon credit buyer has asked your organisation to conduct due diligence on a REDD+ project in the Congo Basin. During your desktop review, you identified potential weaknesses in the project's treatment of {WORD1} and {WORD2}. Write a briefing note to your investment committee summarising the risks and recommending whether to proceed with credit procurement.",

  "Your team is preparing a methodology deviation request for an ongoing ARR project after updated satellite data revealed significant landscape changes. Two key parameters — {WORD1} and {WORD2} — need to be re-addressed in the project design document. Draft a technical justification memo to the certifying standard body explaining how the project will address these parameters under the revised methodology.",

  "As a GIS analyst at a carbon consultancy, you have been asked to prepare a summary for a client who is new to carbon markets. The client's project proposal has gaps in how they plan to address {WORD1} and {WORD2}. Write a professional email explaining why each concept matters for their project's credibility and what steps they should take to address these gaps before submitting their Project Design Document.",

  "You are presenting to an internal steering committee on the risks facing a portfolio of three forest carbon projects currently in development. Two systemic issues — {WORD1} and {WORD2} — have been identified across multiple projects. Write a concise executive briefing that explains both risks and proposes a portfolio-level response.",

  "A government regulator has requested clarification from your organisation on how {WORD1} and {WORD2} are treated in your national forest carbon programme. You have been asked to draft a technical response that explains both concepts in plain language and demonstrates that current practice meets international standards.",

  "Your organisation is onboarding a new project developer who is unfamiliar with voluntary carbon markets. During the project scoping call, the developer showed confusion about {WORD1} and {WORD2}. Write a clear and professional onboarding memo explaining both concepts and how they affect the project's design and credit potential.",

  "A corporate buyer is questioning the credibility of a batch of credits your team is offering for sale. Their concern centres on how the originating project handled {WORD1} and {WORD2} during the last verification cycle. Write a client-facing response that addresses their concerns and explains the safeguards in place.",

  "You are reviewing a REDD+ project's monitoring report prior to verification. Your desk review has flagged potential non-conformances related to {WORD1} and {WORD2}. Write a formal non-conformance notice to the project developer, specifying what evidence is required to close each finding before the site audit proceeds.",

  "A journalist is writing a feature on the integrity of voluntary carbon markets and has submitted a list of technical questions to your organisation. Two of the questions relate directly to {WORD1} and {WORD2}. Draft a factual, professional response that accurately explains both concepts and addresses common misconceptions without being dismissive.",

  "Your team has been asked to peer-review a Project Design Document submitted by a partner organisation. The PDD's treatment of {WORD1} and {WORD2} appears inadequate for the methodology being used. Write a structured review comment addressing both issues, citing the relevant methodology requirements and recommending specific improvements.",

  "As a senior analyst at a carbon ratings agency, you are preparing a risk assessment for a new AUDD project. Two risk factors in your framework — {WORD1} and {WORD2} — have been rated as high. Write a section of the risk report explaining why each factor warrants a high rating and what the project developer could do to mitigate them.",

  "Your organisation is preparing a response to a public consultation on proposed updates to a carbon standard's methodology requirements. The consultation specifically asks for feedback on how {WORD1} and {WORD2} should be treated under the revised rules. Write a substantive submission from your organisation's technical perspective.",

  "A carbon project developer has approached your consultancy to assess whether their forestry operation in Borneo qualifies for REDD+ finance. After a preliminary review, you have concerns about how their planned approach would handle {WORD1} and {WORD2}. Write a scoping memo outlining your concerns and the conditions that would need to be satisfied for the project to proceed.",

  "Your research team is presenting findings from a field audit of five REDD+ projects to an international working group. Across all five sites, weaknesses in {WORD1} and {WORD2} were the most common non-conformances observed. Write the executive summary of the audit report, summarising the findings and recommending sector-wide improvements.",
];


// ─── READING PASSAGES (8 passages) ───────────────────────────────────────────
// Each passage has numbered sentences and planted grammar + logic errors.
// planted_errors are NOT shown to the user until Claude reveals them.

const READING_POOL = [
  {
    title: "Ground-truthing & Biomass Validation",
    sentences: [
      "The project team conducted ground-truthing surveys across all five strata to validate the remote sensing land cover classification.",
      "In stratum 3, which cover dense dipterocarp forest, field crews recorded an average canopy height of 28 metres.",
      "This figure confirm the satellite-derived estimates within an acceptable margin of error.",
      "However, the validation team did not disclose that the allometric equations used were calibrated on plantation species rather than old-growth dipterocarp, meaning above-ground biomass values may be significantly overstated.",
      "The project proponent therefore concluded that, since ground-truthing had been completed successfully, the carbon stock estimates are reliable and require no further scrutiny.",
    ],
    planted_errors: [
      { type: "grammar", location: "S2", error: "'which cover' — singular antecedent 'stratum 3' requires 'which covers'", correction: "which covers dense dipterocarp forest" },
      { type: "grammar", location: "S3", error: "'This figure confirm' — singular subject requires 'confirms'", correction: "This figure confirms" },
      { type: "logic",   location: "S5", error: "Non-sequitur: completing ground-truthing does not validate carbon stock estimates if the underlying allometric equations are miscalibrated. The conclusion does not follow from the evidence." },
      { type: "logic",   location: "S4 → S5", error: "Self-contradiction: S4 acknowledges biomass values 'may be significantly overstated', yet S5 concludes the estimates are reliable — the report accepts a known flaw and dismisses it without justification." },
    ],
  },

  {
    title: "Permanence Risk & Buffer Pool",
    sentences: [
      "A permanence risk assessment was completed for the project area in Q3 2023.",
      "The assessment identified wildfire as a high-probability threat, as historical records show that adjacent forest areas has burned on three separate occasions in the past decade.",
      "Despite this elevated risk, the project developer set the buffer pool contribution at 3%, the minimum threshold permitted under the methodology.",
      "Their justification was that the project area itself had not experienced any fires during the reference period, and that absence of fire in recent years indicate a low future risk.",
      "This reasoning demonstrates sound scientific practice, as fire behaviour is highly localised and historical events outside the project boundary have no bearing on conditions within it.",
    ],
    planted_errors: [
      { type: "grammar", location: "S2", error: "'adjacent forest areas has burned' — plural subject requires 'have burned'", correction: "adjacent forest areas have burned" },
      { type: "grammar", location: "S4", error: "'absence of fire in recent years indicate' — singular subject 'absence' requires 'indicates'", correction: "absence of fire in recent years indicates" },
      { type: "logic",   location: "S4", error: "Absence of evidence fallacy: the project area not having burned recently does not mean fire risk is low, especially when adjacent land burned three times in the same period. Past absence is not proof of future safety." },
      { type: "logic",   location: "S5", error: "False dismissal: calling the flawed reasoning 'sound scientific practice' and claiming fire events on adjacent land have 'no bearing' ignores landscape-level fire spread dynamics. This is not scientifically defensible." },
    ],
  },

  {
    title: "Additionality & Deforestation Baseline",
    sentences: [
      "The project developer established additionality by comparing deforestation rates within the project area against the national average during the baseline period.",
      "The project area experienced 2.1% annual forest loss, while the national average was 1.8%, confirming that the site was under above-average deforestation pressure.",
      "Since the project area showed higher-than-average deforestation, the developer argue that additionality is clearly demonstrated.",
      "Furthermore, satellite analysis confirmed that deforestation declined significantly after the project was registered in 2020, which proves the project intervention was the sole cause of this improvement.",
      "The certifying body accepted these findings and conclude that all methodology requirements had been satisfied.",
    ],
    planted_errors: [
      { type: "grammar", location: "S3", error: "'the developer argue' — singular subject 'developer' requires 'argues'", correction: "the developer argues" },
      { type: "grammar", location: "S5", error: "'conclude' — the rest of the passage is past tense; should be 'concluded'", correction: "concluded" },
      { type: "logic",   location: "S1 – S3", error: "Invalid counterfactual: comparing against the national average does not prove additionality. The required counterfactual is what would have happened specifically in this project area without intervention — a national average is not a valid substitute." },
      { type: "logic",   location: "S4", error: "Post hoc ergo propter hoc: deforestation declining after project registration does not prove the project caused the decline. Other factors — policy changes, commodity price shifts, enforcement — could explain the trend. Calling the project 'the sole cause' is unsupported." },
    ],
  },

  {
    title: "MRV System & Carbon Pool Accounting",
    sentences: [
      "The project's MRV system uses a combination of satellite imagery and periodic field measurements to track carbon stock changes across the project area.",
      "Carbon pools included in the accounting are limited to above-ground biomass and deadwood, as the project developer determined that soil organic carbon was negligible and excluded it without measurement.",
      "The MRV report states that measurement uncertainty was low, citing the use of high-resolution satellite data at 30-metre spatial resolution, which is considered sufficient for individual tree-level analysis.",
      "All MRV activities were conducted exclusively by the project developer's in-house team.",
      "Since the team followed the approved methodology, the results is assumed to be unbiased and accurate.",
    ],
    planted_errors: [
      { type: "grammar", location: "S5", error: "'the results is assumed' — plural subject 'results' requires 'are assumed'", correction: "the results are assumed" },
      { type: "logic",   location: "S3", error: "Factual-logical error: 30-metre spatial resolution cannot resolve individual trees, which typically have crown diameters of 5–20 metres. Claiming 30m imagery is sufficient for tree-level analysis is technically incorrect." },
      { type: "logic",   location: "S2", error: "Circular exclusion: declaring soil organic carbon 'negligible' without measurement defeats the purpose of MRV. A carbon pool must be measured or its exclusion justified with a validated proxy — not assumed." },
      { type: "logic",   location: "S4 → S5", error: "Conflict of interest ignored: self-assessment by the developer's in-house team cannot establish that results are unbiased. Methodological compliance is not equivalent to independence; third-party verification is required for an unbiased result." },
    ],
  },

  {
    title: "Carbon Credit Registry & Double Counting",
    sentences: [
      "The project developer registered its credits on a voluntary carbon registry in March 2022 and began selling them to corporate buyers shortly afterwards.",
      "Each credit's unique serial number allow buyers to verify that it has not been previously retired or transferred to another party.",
      "A corporate buyer retired 50,000 credits to offset its subsidiaries' 2023 emissions and publicly declared those operations to be carbon neutral.",
      "However, the host country government had simultaneously counted the same emissions reductions in its national greenhouse gas inventory submitted to the UNFCCC.",
      "Since both parties had reported the reductions in their respective accounts, no double counting had occurred, and both claims were considered valid.",
    ],
    planted_errors: [
      { type: "grammar", location: "S2", error: "'Each credit's unique serial number allow' — singular subject 'serial number' requires 'allows'", correction: "Each credit's unique serial number allows" },
      { type: "logic",   location: "S5", error: "Logical inversion: the scenario described in S3 and S4 is the definition of double counting — the same tonne of CO₂ claimed by both a private buyer and a national government. The sentence's conclusion is exactly backwards." },
      { type: "logic",   location: "S3 → S4", error: "Scope mismatch: the corporate buyer claims carbon neutrality for its operations based on 50,000 retirements, but no evidence is given that this covers the full emissions of those subsidiaries — the claim of neutrality may be unsupported by the volume retired." },
    ],
  },

  {
    title: "Safeguards & Community Consent",
    sentences: [
      "The project's validation report confirmed that all applicable safeguards requirements had been met, including consultation with communities living within the project boundary.",
      "Community consultation consisted of a single public meeting held at the developer's regional office, located four hours by road from the nearest affected village.",
      "Because attendance at the meeting was recorded, the validator accepted that free, prior, and informed consent had been obtained from all affected communities.",
      "The project was subsequently awarded a co-benefits label recognising its contributions to biodiversity, watershed protection, and local employment, all of which were extensively documented.",
      "The co-benefits certification was accepted as evidence that the project's social safeguards was satisfactory, and no further community engagement was required.",
    ],
    planted_errors: [
      { type: "grammar", location: "S5", error: "'the project's social safeguards was satisfactory' — plural subject 'safeguards' requires 'were satisfactory'", correction: "social safeguards were satisfactory" },
      { type: "logic",   location: "S2 → S3", error: "Process-outcome conflation: recording attendance at a single remote meeting does not constitute free, prior, and informed consent. FPIC requires communities to be informed in advance, given adequate time to deliberate, and free from coercion — none of which is evidenced here." },
      { type: "logic",   location: "S4 → S5", error: "Category error: a co-benefits label certifies environmental and social outcomes, not the adequacy of a consent process. Using it as a proxy for safeguards compliance conflates two separate and distinct standards." },
    ],
  },

  {
    title: "Crediting Period & Vintage",
    sentences: [
      "The project's 30-year crediting period began in 2015 and covers emissions reductions achieved through to 2045.",
      "In the 2023 verification cycle, the project issued 95,000 credits carrying a 2023 vintage, reflecting reductions achieved during that calendar year.",
      "A logistics company purchased 60,000 of these credits to compensate for its transport emissions incurred during 2019, arguing that the vintage year of a credit has no bearing on its environmental value.",
      "Market analysts described the transaction as standard practice and note that temporal alignment between vintage and offset claim is merely a buyer preference, not a methodological requirement.",
      "Following the sale, the project developer announced that the crediting period would be extended automatically beyond 2045 without further validation, since the project's forest carbon stocks remain stable.",
    ],
    planted_errors: [
      { type: "grammar", location: "S4", error: "'analysts described … and note' — tense inconsistency; 'note' should be 'noted' to match 'described'", correction: "Market analysts described the transaction as standard practice and noted" },
      { type: "logic",   location: "S3", error: "Temporal integrity flaw: using 2023-vintage credits to offset 2019 emissions means the compensating reductions occurred four years after the emissions — the emissions were not offset at the time they happened. Vintage year is directly relevant to the integrity of the claim." },
      { type: "logic",   location: "S5", error: "Factual error: crediting period extension is not automatic under any major voluntary standard. VCS and Gold Standard both require re-validation to confirm that the project continues to meet methodology requirements, including that additionality still holds." },
    ],
  },

  {
    title: "Forest Degradation & NDVI Monitoring",
    sentences: [
      "The monitoring team use annual NDVI composites derived from Landsat-8 imagery to detect forest degradation across the project area.",
      "Any pixel recording an NDVI decline of more than 0.1 between consecutive annual composites was flagged as potentially degraded.",
      "During the 2023 monitoring cycle, 3,100 hectares were classified as degraded based entirely on satellite analysis, without any subsequent field verification.",
      "The monitoring report concluded that NDVI provides a definitive measure of carbon stock change, and that field verification are therefore redundant when high-quality satellite data is available.",
      "On this basis, the project reduced the degraded area's carbon contribution by 8% and considered the monitoring obligation for those hectares to be fully satisfied.",
    ],
    planted_errors: [
      { type: "grammar", location: "S1", error: "'The monitoring team use' — singular collective noun requires 'uses'", correction: "The monitoring team uses" },
      { type: "grammar", location: "S4", error: "'field verification are therefore redundant' — uncountable noun 'verification' requires 'is'", correction: "field verification is therefore redundant" },
      { type: "logic",   location: "S4", error: "Overclaiming proxy data: NDVI measures vegetation greenness, not carbon stocks directly. It is a proxy indicator that requires calibration against field data. Describing it as a 'definitive measure of carbon stock change' overstates its capability." },
      { type: "logic",   location: "S5", error: "Arbitrary discount: applying an 8% reduction without field verification or a methodology-sanctioned calculation is unsupported. The appropriate discount cannot be determined without knowing the actual nature and magnitude of the degradation." },
    ],
  },
];
