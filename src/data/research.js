export const researchInterests = [
  'Satellite-based flood and drought monitoring',
  'Water security and hydrology',
  'Agriculture and food systems',
  'Spatial modelling and machine learning',
]

export const researchProjects = [
  {
    id: 'agri-nowcast',
    status: 'Analysis complete · write-up in progress',
    soon: true,
    title: "Can satellites nowcast Pakistan's agricultural growth?",
    question: "How much of year-to-year variation in Pakistan's agricultural growth can a simple satellite vegetation signal over cropland explain, and what does it say about the latest fiscal year?",
    note: 'Reported as predictive skill with out-of-sample validation against a naive baseline. The skill is modest, and the write-up says so; it is not presented as a replacement for official statistics. Public data only.',
    tags: ['MODIS NDVI', 'Google Earth Engine', 'Agriculture', 'Cross-validation'],
    phases: [
      { label: 'Inputs', nodes: [
        { text: 'MODIS NDVI, 250 m, 16-day (2000 onward)', kind: 'input' },
        { text: 'Cropland mask', kind: 'input' },
        { text: 'World Bank agricultural value-added growth', kind: 'input' },
      ] },
      { label: 'Signal', nodes: [
        { text: 'Cropland-masked NDVI by fiscal year (July to June)' },
        { text: 'Kharif and Rabi greenness; anomaly from the long-run mean' },
      ] },
      { label: 'Model', nodes: [
        { text: 'Simple regression of official growth on the satellite anomaly' },
        { text: 'Leave-one-year-out cross-validation against a naive baseline' },
      ] },
      { label: 'Checks', nodes: [
        { text: 'Drop flood years; second cropland mask; Punjab and Sindh only' },
      ] },
      { label: 'Output', nodes: [
        { text: 'Latest-year nowcast with an uncertainty range, and an honest skill figure', kind: 'output' },
      ] },
    ],
  },
  {
    id: 'dasymetric',
    status: 'Manuscript in preparation',
    soon: true,
    title: 'Lahore dasymetric population mapping, 2000 to 2050',
    question: 'Where do people live inside each union council, and how will that change as the city grows? A land-cover-controlled 100 m population series with projections.',
    note: 'With Dr. Adeel Ahmad and Hammad Gillani at the GeoScape Analytics Lab. Weights were chosen from validation against LandScan and the 1998 census; where the two references disagree, the paper reports that.',
    tags: ['Dasymetric mapping', 'Landsat LULC', 'CA-Markov', 'GHS-POP'],
    image: './assets/research/Dasymetric_Methodology.jpg',
    imageAlt: 'Methodology flowchart: Landsat, GHS-POP, union council boundaries and reference data are harmonised on a 100 m grid, size-bias corrected, allocated dasymetrically for 2000 to 2025, then projected with CA-Markov to 2030, 2040 and 2050 in capped and uncapped versions, with pressure analysis and accuracy assessment',
  },
  {
    id: 'jurassic',
    status: 'Analysis complete · manuscript in preparation',
    soon: true,
    title: 'Late Jurassic dinosaur dispersal corridors',
    question: 'Could large dinosaurs have moved between landmasses around the opening North Atlantic, and by which routes? A least-cost path analysis on a 150 Ma paleo-elevation model.',
    note: 'With Dr. Adeel Ahmad. The corridors are graded hypotheses, not findings: validation uses held-out sauropod and theropod cells, and the faunal-similarity test and the Morrison viewshed case study are still being completed.',
    tags: ['Least-cost paths', 'PALEOMAP', 'MaxEnt', 'Paleobiology Database'],
    image: './assets/research/Jurassic_Methodology.jpg',
    imageAlt: 'Methodology flowchart: fossil, plate-model, paleoclimate, movement and paleo-elevation data are preprocessed, turned into friction surfaces, run through least-cost paths, classified into links, and evaluated by validation, faunal similarity and a viewshed case study',
  },
]

export const course = {
  title: '7 Days of Vibe-Coding Interactive Maps with AI',
  with: 'Udemy · with Zain Ul Abdin',
  when: 'Launching December 2026',
  desc: 'A seven-day course for GIS students and professionals with no coding background, built around one running project: Indus Pulse, an interactive and animated story of the 2022 Pakistan floods.',
  covers: [
    'Data preparation: HydroRIVERS, GADM, NDMA reports, Sentinel-1 flood extent from Earth Engine',
    'Interactive maps with Leaflet and Mapbox GL JS',
    'Animation, dashboards and scrollytelling with D3.js',
    'Publishing, using AI assistants to write the code',
  ],
}

export const publications = [
  {
    status: 'Under review',
    text: 'Sarwar, N., Waseem, H., Ahmad, A., Bukhari, S. S. B., Komal, I., Mehdi, M., Tipu, H. M. B., Shafi, S., Asim, S., Javed, M. A., and Waqar, M. Data-Driven Approaches for GRACE/GRACE-FO Downscaling: A Systematic Review (2021–2026). Manuscript under review, Pure and Applied Geophysics (Springer Nature).',
  },
  {
    status: 'Policy brief, 2024',
    text: 'Asad, S. A., Gondal, O. H., Said, F., Asim, S., and Hayee, S. Vulnerable Markets: Assessing the impact of climate-induced shocks on fresh produce supply chains in Punjab. IGC Project PAK-23156, October 2024.',
  },
  {
    status: 'Working paper, 2024',
    text: 'Asad, S. A., Gondal, O. H., and Said, F. Vulnerable Markets: Impact of Extreme Flooding on Agriculture Supply Networks. Working paper, December 2024. I produced the satellite flood maps and flood-intensity data used in the analysis and am acknowledged as a research assistant.',
  },
  {
    status: 'WWF-Pakistan report',
    text: 'Asif, M. and Asim, S. From Farms to Buildings: Three Decades of Lahore’s Urbanisation. WWF-Pakistan, Richard Garstang Conservation GIS Lab.',
    link: 'https://wwfasia.awsassets.panda.org/downloads/from-farms-to-buildings---three-decades-of-lahore-s-urbanisation.pdf',
  },
]

export const comingSoon = [
  {
    title: "Can satellites nowcast Pakistan's agricultural growth?",
    status: 'Write-up in progress',
    desc: 'MODIS NDVI over cropland tested against official agricultural growth, with honest out-of-sample skill.',
    tags: ['MODIS NDVI', 'Agriculture', 'GEE'],
    color: 'from-green-50 to-emerald-100',
  },
  {
    title: 'Lahore dasymetric population mapping, 2000 to 2050',
    status: 'Manuscript in preparation',
    desc: 'A land-cover-controlled 100 m population series for Lahore District, with projections to 2050.',
    tags: ['Dasymetric', 'Landsat LULC', 'CA-Markov'],
    color: 'from-violet-50 to-purple-100',
  },
  {
    title: 'Late Jurassic dinosaur dispersal corridors',
    status: 'Manuscript in preparation',
    desc: 'Least-cost path analysis on a 150 Ma paleo-elevation model, graded as hypotheses.',
    tags: ['Least-cost paths', 'PALEOMAP', 'MaxEnt'],
    color: 'from-amber-50 to-yellow-100',
  },
]

export const focusAreas = [
  { title: 'Floods', desc: 'Sentinel-1 radar flood extent, hazard indices, and flooded cropland and exposed population (2022 Pakistan floods).' },
  { title: 'Drought', desc: 'Vegetation and water indices (VCI, TCI, VHI, NDWI, DSI) and satellite drought monitoring on MODIS and Landsat.' },
  { title: 'Crops & Agriculture', desc: 'Cropland-masked NDVI, crop-condition signals and satellite nowcasting of agricultural growth.' },
  { title: 'Climate', desc: 'Climate and water-stress data (TerraClimate, CHIRPS, GRACE downscaling) and the Indus-basin climate shocks they track.' },
]
