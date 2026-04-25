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
  }
];

module.exports = CLINICAL_CASES;
