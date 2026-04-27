const CLINICAL_CASES = [
  // --- CASES REQUIRING TREATMENT ---
  // UHF Therapy (Superficial heating, typically > 60 Hz equivalent)
  {
    id: "case-001",
    title: "Superficial Wrist Inflammation",
    text: "Patient presents with acute superficial inflammation of the wrist joint following a minor sprain. No internal metal implants.",
    targetModality: "UHF Therapy",
    targetFrequencyMin: 60,
    requiresLock: false
  },
  {
    id: "case-002",
    title: "Acute Bursitis of the Elbow",
    text: "Severe swelling and pain in the olecranon bursa. The inflammation is close to the skin surface.",
    targetModality: "UHF Therapy",
    targetFrequencyMin: 70,
    requiresLock: false
  },
  {
    id: "case-003",
    title: "Superficial Muscle Strain",
    text: "Patient suffered a mild strain of the superficial calf muscles during a sprint. Requires localized surface warmth to increase blood flow.",
    targetModality: "UHF Therapy",
    targetFrequencyMin: 60,
    requiresLock: false
  },
  {
    id: "case-004",
    title: "Achilles Tendonitis",
    text: "Inflammation of the Achilles tendon. The target tissue lies just beneath the dermal layers.",
    targetModality: "UHF Therapy",
    targetFrequencyMin: 50,
    requiresLock: false
  },
  {
    id: "case-005",
    title: "Carpal Tunnel Syndrome",
    text: "Median nerve compression at the wrist. Superficial anti-inflammatory therapy is indicated.",
    targetModality: "UHF Therapy",
    targetFrequencyMin: 60,
    requiresLock: false
  },

  // Microwave Therapy (Deep tissue penetration, typically < 50 Hz equivalent)
  {
    id: "case-006",
    title: "Deep Lumbar Muscle Spasm",
    text: "Patient presents with chronic deep muscle spasms in the lower back. The target tissue is buried under multiple fascial layers.",
    targetModality: "Microwave Therapy",
    targetFrequencyMax: 40,
    requiresLock: false
  },
  {
    id: "case-007",
    title: "Chronic Osteoarthritis of the Hip",
    text: "Degenerative joint disease in the deep hip socket. Requires deep heat penetration to alleviate chronic joint capsule pain.",
    targetModality: "Microwave Therapy",
    targetFrequencyMax: 35,
    requiresLock: false
  },
  {
    id: "case-008",
    title: "Resolving Deep Tissue Hematoma",
    text: "A large hematoma deep within the quadriceps needs reabsorption stimulation. Must reach depths of 4-5 cm.",
    targetModality: "Microwave Therapy",
    targetFrequencyMax: 45,
    requiresLock: false
  },
  {
    id: "case-009",
    title: "Chronic Pelvic Pain Syndrome",
    text: "Deep pelvic floor muscle tension and chronic inflammation. Superficial heat will not reach the target zone.",
    targetModality: "Microwave Therapy",
    targetFrequencyMax: 30,
    requiresLock: false
  },
  {
    id: "case-010",
    title: "Spinal Osteochondrosis",
    text: "Degeneration of intervertebral discs causing deep paraspinal muscle rigidity.",
    targetModality: "Microwave Therapy",
    targetFrequencyMax: 45,
    requiresLock: false
  },

  // Magnetotherapy (Non-thermal, cell-level bio-stimulation, wide safety margin, frequency agnostic)
  {
    id: "case-011",
    title: "Acute Rheumatoid Arthritis Flare",
    text: "Multiple joint involvement with acute swelling. Thermal therapies (UHF/Microwave) might exacerbate the acute flare. Non-thermal bio-stimulation is required.",
    targetModality: "Magnetotherapy",
    // Frequency min/max omitted purposely - any frequency works for standard magnetotherapy in this sim
    requiresLock: false
  },
  {
    id: "case-012",
    title: "Post-Traumatic Edema",
    text: "Significant swelling in the ankle following a crush injury. Heat is contraindicated immediately post-injury, but magnetic fields will reduce edema.",
    targetModality: "Magnetotherapy",
    requiresLock: false
  },
  {
    id: "case-013",
    title: "Peripheral Neuropathy",
    text: "Diabetic patient with nerve pain in the feet. Impaired thermal sensation makes heating modalities dangerous.",
    targetModality: "Magnetotherapy",
    requiresLock: false
  },
  {
    id: "case-014",
    title: "Delayed Fracture Healing",
    text: "Tibial shaft fracture showing delayed union at 8 weeks. Bone regeneration is stimulated heavily by magnetic flux.",
    targetModality: "Magnetotherapy",
    requiresLock: false
  },
  {
    id: "case-015",
    title: "Complex Regional Pain Syndrome",
    text: "Patient has severe allodynia (pain from normal touch) and vascular instability. Intense heat is poorly tolerated.",
    targetModality: "Magnetotherapy",
    requiresLock: false
  },

  // --- CASES REQUIRING ABSOLUTE LOCKOUT (FATAL ERRORS) ---
  {
    id: "case-016",
    title: "The Pacemaker Trap",
    text: "Patient requires chronic pain management for neck spasms. History notes a synthetic cardiac pacemaker implanted 3 years ago.",
    targetModality: "Any",
    requiresLock: true
  },
  {
    id: "case-017",
    title: "Surgical Metal Plate",
    text: "Severe pain in the right femur. Patient has a massive titanium surgical plate securing a past fracture in the exact treatment zone.",
    targetModality: "Any",
    requiresLock: true
  },
  {
    id: "case-018",
    title: "Active GI Hemorrhage",
    text: "Patient requested back therapy, but is currently experiencing an acute lower gastrointestinal bleed. Vasodilation could be highly dangerous.",
    targetModality: "Any",
    requiresLock: true
  },
  {
    id: "case-019",
    title: "Malignant Neoplasm (Tumor)",
    text: "Patient is seeking relief for shoulder pain, but an undiagnosed rapidly growing mass was found on the clavicle. Physical therapy might risk metastasis.",
    targetModality: "Any",
    requiresLock: true
  },
  {
    id: "case-020",
    title: "Active Tuberculosis",
    text: "Patient has severe chest and back pain associated with active, cavitary pulmonary tuberculosis. Systemic stimulation is contraindicated.",
    targetModality: "Any",
    requiresLock: true
  },

  // --- ELECTROTHERAPY (Neuromuscular & Non-Thermal Pain Block) ---
  {
    id: "case-021",
    title: "Sensory Nerve De-afferentation",
    text: "Diabetic patient suffering from severe neuropathic pain in lower extremities. Heating modalities are contraindicated due to 100% loss of thermal sensation. Requires direct electrical pain gate blocking.",
    targetModality: "Electrotherapy",
    requiresLock: false
  },
  {
    id: "case-022",
    title: "Post-Ischemic Muscle Atrophy",
    text: "Profound muscle wasting in the left triceps post-stroke. Patient needs motor unit recruitment without deep thermal loading.",
    targetModality: "Electrotherapy",
    requiresLock: false
  },

  // --- HIGH COMPLEXITY CATCH-22 TRAPS ---
  {
    id: "case-023",
    title: "Febrile Joint Hydrarthrosis",
    text: "Massive fluid accumulation in the knee capsule (deep target). However, the patient's core body temperature is currently 39.5°C with severe chills.",
    targetModality: "Any",
    requiresLock: true // Systemic fever is a massive contraindication
  },
  {
    id: "case-024",
    title: "Maternal Sciatica Flare",
    text: "Intense sciatic nerve compression pain deep in the gluteal region. The patient is currently 28 weeks pregnant.",
    targetModality: "Any",
    requiresLock: true // Pregnancy is absolute contraindication for torso/pelvic therapies
  },
  {
    id: "case-025",
    title: "Undrained Purulent Osteomyelitis",
    text: "Deep bone pain in the tibia caused by an enclosed, pus-forming infection. Antibiotics started, but no surgical drainage has occurred yet.",
    targetModality: "Any",
    requiresLock: true // Closed purulent infections explode under heat/stimulation
  },
  {
    id: "case-026",
    title: "Acute Hemarthrosis (Hemophilia)",
    text: "Patient complains of deep joint ache in the shoulder. History reveals severe Hemophilia Type A, and the joint is actively filling with blood.",
    targetModality: "Any",
    requiresLock: true // Bleeding disorders + heat = catastrophy
  },

  // --- HIGH PRECISION TARGETING ---
  {
    id: "case-027",
    title: "Subcutaneous Micro-Tears",
    text: "Extremely superficial tendon micro-tears directly below the epidermis layer on the dorsal hand. Deep penetration is entirely unnecessary and wasteful.",
    targetModality: "UHF Therapy",
    targetFrequencyMin: 90, // Max superficiality needed
    requiresLock: false
  },
  {
    id: "case-028",
    title: "Deep Acetabular Degeneration",
    text: "Osteoarthritis occurring at the deepest point of the hip socket (acetabulum). Therapy must bypass massive superficial gluteal fat and muscle layers.",
    targetModality: "Microwave Therapy",
    targetFrequencyMax: 20, // Max depth needed
    requiresLock: false
  },
  {
    id: "case-029",
    title: "Acute Radicular Syndrome",
    text: "Patient has shooting pain from the deep lumbar spine down the leg. Due to the high acuity and hyperesthesia, thermal energy must be strictly avoided. Bio-stimulation required.",
    targetModality: "Magnetotherapy",
    requiresLock: false
  },
  {
    id: "case-030",
    title: "Refractory Phantom Limb Pain",
    text: "Post-amputation patient complains of burning pain in a missing foot. No actual tissue to treat; requires direct neuromodulation at the nerve stump.",
    targetModality: "Electrotherapy",
    requiresLock: false
  }
];

module.exports = CLINICAL_CASES;
