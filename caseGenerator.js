const CORE_CONDITIONS = [
  { title: "Acute Superficial Bursitis of the Elbow", modality: "UHF Therapy", fMin: 70, fMax: null },
  { title: "Superficial Wrist Tendonitis", modality: "UHF Therapy", fMin: 60, fMax: null },
  { title: "Carpal Tunnel Syndrome", modality: "UHF Therapy", fMin: 60, fMax: null },
  { title: "Achilles Tendon Inflammation", modality: "UHF Therapy", fMin: 50, fMax: null },
  { title: "Superficial Muscle Sprain", modality: "UHF Therapy", fMin: 60, fMax: null },
  { title: "Subcutaneous Micro-Tears", modality: "UHF Therapy", fMin: 80, fMax: null },
  
  { title: "Deep Lumbar Muscle Spasm", modality: "Microwave Therapy", fMin: null, fMax: 40 },
  { title: "Chronic Hip Osteoarthritis", modality: "Microwave Therapy", fMin: null, fMax: 35 },
  { title: "Deep Quadriceps Hematoma", modality: "Microwave Therapy", fMin: null, fMax: 45 },
  { title: "Chronic Pelvic Pain Syndrome", modality: "Microwave Therapy", fMin: null, fMax: 30 },
  { title: "Spinal Osteochondrosis", modality: "Microwave Therapy", fMin: null, fMax: 45 },
  { title: "Deep Acetabular Degeneration", modality: "Microwave Therapy", fMin: null, fMax: 20 },
  
  { title: "Acute Rheumatoid Arthritis Flare", modality: "Magnetotherapy", fMin: null, fMax: null },
  { title: "Post-Traumatic Edema", modality: "Magnetotherapy", fMin: null, fMax: null },
  { title: "Delayed Tibial Fracture Healing", modality: "Magnetotherapy", fMin: null, fMax: null },
  { title: "Complex Regional Pain Syndrome", modality: "Magnetotherapy", fMin: null, fMax: null },
  { title: "Acute Radicular Syndrome", modality: "Magnetotherapy", fMin: null, fMax: null },
  
  { title: "Post-Stroke Flaccid Paralysis", modality: "Electrotherapy", fMin: null, fMax: null },
  { title: "Diabetic Peripheral Neuropathy", modality: "Electrotherapy", fMin: null, fMax: null },
  { title: "Post-Ischemic Muscle Atrophy", modality: "Electrotherapy", fMin: null, fMax: null },
  { title: "Phantom Limb Pain", modality: "Electrotherapy", fMin: null, fMax: null },
  { title: "Refractory Sciatica", modality: "Electrotherapy", fMin: null, fMax: null }
];

const PROFILES = [
  { text: "Patient is a 32-year-old software engineer complaining of localized pain.", trap: false },
  { text: "Patient is a 55-year-old construction worker with chronic pain history.", trap: false },
  { text: "45-year-old teacher reporting worsening symptoms over the past 3 weeks.", trap: false },
  { text: "21-year-old professional athlete injured during recent competition.", trap: false },
  { text: "68-year-old retiree seeking conservative treatment.", trap: false },
  { text: "39-year-old marathon runner presenting with severe acute discomfort.", trap: false },
  { text: "Patient is 28 weeks pregnant and requesting pain relief.", trap: true, trapReason: "Pregnancy is an absolute contraindication for localized EMF." },
  { text: "Patient has a history of bleeding disorders and is currently experiencing acute hemarthrosis in the target joint.", trap: true, trapReason: "Active bleeding/Hemophilia." },
  { text: "Patient presents with severe chills and a core body temperature of 39.5°C.", trap: true, trapReason: "Systemic fever." },
  { text: "Patient reveals they are undergoing chemotherapy for an undiagnosed growing mass in the region.", trap: true, trapReason: "Malignant neoplasm." },
  { text: "Patient has active pulmonary tuberculosis and is on strict isolation protocol.", trap: true, trapReason: "Active Tuberculosis." }
];

const LABS = [
  { text: "CBC is within normal limits. WBC 6.5 x10^9/L.", trap: false },
  { text: "Mildly elevated CRP (6 mg/L), consistent with localized inflammation.", trap: false },
  { text: "Blood glucose 5.5 mmol/L. Coagulation profile normal.", trap: false },
  { text: "ESR 12 mm/hr, Hemoglobin 140 g/L. No acute systemic distress.", trap: false },
  { text: "All routine blood parameters are physiologically normal.", trap: false },
  { text: "WBC 19.8 x10^9/L with severe left shift. High CRP (120 mg/L) indicates massive purulent infection.", trap: true, trapReason: "Purulent (pus-forming) infection risks systemic sepsis if stimulated." },
  { text: "INR 4.5 and PTT 90s, indicating dangerously high bleeding risk.", trap: true, trapReason: "High hemorrhagic risk." }
];

const INSTRUMENTALS = [
  { text: "X-ray shows no osseous abnormalities. Soft tissue swelling noted.", trap: false },
  { text: "MRI reveals mild effusion but intact ligaments and cartilage.", trap: false },
  { text: "Ultrasound indicates standard inflammatory fluid collection without abscess.", trap: false },
  { text: "CT scan confirms degenerative changes consistent with age.", trap: false },
  { text: "Fluoroscopy shows correct joint alignment without hardware.", trap: false },
  { text: "X-ray clearly shows a massive titanium surgical plate fixed directly in the target zone.", trap: true, trapReason: "Large metal implants absorb and concentrate EMF massively causing burns." },
  { text: "EKG and chest X-ray reveal an implanted synthetic cardiac pacemaker.", trap: true, trapReason: "Pacemakers can short circuit under EMF interference." }
];

export function generateCases(count = 100) {
  const generated = [];
  let idCounter = 1;
  const historySet = new Set(); // To ensure unique cases
  
  while (generated.length < count) {
    const cond = CORE_CONDITIONS[Math.floor(Math.random() * CORE_CONDITIONS.length)];
    const prof = PROFILES[Math.floor(Math.random() * PROFILES.length)];
    const lab = LABS[Math.floor(Math.random() * LABS.length)];
    const instr = INSTRUMENTALS[Math.floor(Math.random() * INSTRUMENTALS.length)];
    
    // Create unique signature to avoid exact identical duplicates
    const signature = `${cond.title}-${prof.text}-${lab.text}-${instr.text}`;
    if (historySet.has(signature)) continue;
    historySet.add(signature);
    
    // Determine lockout
    const requiresLock = prof.trap || lab.trap || instr.trap;
    let targetModality = requiresLock ? "Any" : cond.modality;
    
    const caseObj = {
      id: `case-${idCounter.toString().padStart(3, '0')}`,
      title: cond.title,
      text: prof.text,
      labs: lab.text,
      instrumental: instr.text,
      targetModality: targetModality,
      requiresLock: requiresLock
    };
    
    if (!requiresLock) {
      if (cond.fMin !== null) caseObj.targetFrequencyMin = cond.fMin;
      if (cond.fMax !== null) caseObj.targetFrequencyMax = cond.fMax;
    }
    
    generated.push(caseObj);
    idCounter++;
  }
  return generated;
}
