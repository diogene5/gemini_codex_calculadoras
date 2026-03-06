export const formatNumber = (value, digits = 0) =>
  new Intl.NumberFormat('pt-BR', {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(Number.isFinite(value) ? value : 0);

export const clampWeight = (value, min = 0.5, max = 80) => {
  if (!Number.isFinite(value)) {
    return min;
  }

  return Math.min(max, Math.max(min, value));
};

export const airwayAgePresets = [
  { id: '1m', label: '1 mes', ageYears: 0.08, weight: 4, rr: '30-55', cuffedTube: 3.5, lipDepth: 10, lma: '1' },
  { id: '3m', label: '3 meses', ageYears: 0.25, weight: 6, rr: '30-45', cuffedTube: 3.5, lipDepth: 11, lma: '1.5' },
  { id: '6m', label: '6 meses', ageYears: 0.5, weight: 8, rr: '30-45', cuffedTube: 3.5, lipDepth: 12, lma: '1.5' },
  { id: '12m', label: '12 meses', ageYears: 1, weight: 10, rr: '30-45', cuffedTube: 3.5, lipDepth: 13, lma: '2' },
  { id: '2y', label: '2 anos', ageYears: 2, weight: 12, rr: '20-40', cuffedTube: 4, lipDepth: 14, lma: '2' },
  { id: '4y', label: '4 anos', ageYears: 4, weight: 16, rr: '20-40', cuffedTube: 4.5, lipDepth: 15, lma: '2' },
  { id: '6y', label: '6 anos', ageYears: 6, weight: 20, rr: '20-30', cuffedTube: 5, lipDepth: 16, lma: '2.5' },
  { id: '8y', label: '8 anos', ageYears: 8, weight: 26, rr: '20-30', cuffedTube: 5.5, lipDepth: 17, lma: '2.5' },
  { id: '10y', label: '10 anos', ageYears: 10, weight: 32, rr: '20-30', cuffedTube: 6, lipDepth: 18, lma: '3' },
  { id: '12y', label: '12 anos', ageYears: 12, weight: 40, rr: '15-20', cuffedTube: 6.5, lipDepth: 19, lma: '3' },
];

export const getAirwayPreset = (id) =>
  airwayAgePresets.find((preset) => preset.id === id) ?? airwayAgePresets[4];

export const parseRange = (value) => {
  const parts = `${value}`
    .split('-')
    .map((part) => Number(part.trim()))
    .filter((part) => Number.isFinite(part));

  if (parts.length === 2) {
    return { low: parts[0], high: parts[1], mid: (parts[0] + parts[1]) / 2 };
  }

  const fallback = Number(value);
  return { low: fallback, high: fallback, mid: fallback };
};

export const sourceLinks = {
  pediatricCardiacArrest:
    'https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Algorithms/Algorithm-PALS-CA-250123.pdf',
  pediatricShock:
    'https://cpr.heart.org/-/media/cpr2-files/course-materials/2020-pals/2020-course-materials/managing-shock-flowchart_ucm_506723.pdf?la=en',
  pediatricShockGuideline:
    'https://www.sccm.org/survivingsepsiscampaign/guidelines-and-resources/surviving-sepsis-campaign-pediatric-guidelines',
  pediatricTachycardia:
    'https://cpr.heart.org/-/media/CPR-Files/CPR-Guidelines-Files/2025-Accessible/Algorithm-PALS-Tachyarrhythmia-LngDscrp-250729-Ed.pdf?sc_lang=en',
  bronchiolitisFlowTrial: 'https://pubmed.ncbi.nlm.nih.gov/34342375/',
  bronchiolitisHFNCReview: 'https://pubmed.ncbi.nlm.nih.gov/38506440/',
  anaphylaxisGuideline:
    'https://allergy.org.au/images/ASCIA_HP_Guidelines_Acute_Management_Anaphylaxis_2024.pdf',
  anaphylaxisCps:
    'https://cps.ca/documents/position/stinging-insect-hypersensitivity',
  acuteAsthmaCpsFigure:
    'https://cps.ca/uploads/documents/All_algorithms_and_additional_documents.pdf',
  seizureAlgorithm: 'https://cps.ca/uploads/documents/Status_epilepticus_algorithm.pdf',
  seizureMedicationTable:
    'https://cps.ca/uploads/documents/TABLE_2._Anticonvulsant_drug_therapies_for_convulsive_status_epilepticus_%28CSE%29_.pdf',
  dkaGuideline: 'https://www.ispad.org/static/6dd62eae-c8cb-4b4a-84e1efc768505746/Ch11PediatricDiabetes.pdf',
  sedationGuideline:
    'https://cps.ca/documents/position/recommendations-for-procedural-sedation-in-infants-children-and-adolescents',
  sepsisGuideline:
    'https://cps.ca/documents/position/diagnosis-and-management-of-sepsis-in-the-paediatric-patient',
  sepsisResuscitation:
    'https://sccm.org/Admin/getmedia/cde6bdbd-cd1f-4ca9-a394-0673bdaba71b/Initial-Resuscitation-Algorithm-for-Children.pdf',
  aplsFormula: 'https://aci.health.nsw.gov.au/ecat/appendices/apls-formula',
  emergencyCueCard:
    'https://aci.health.nsw.gov.au/__data/assets/pdf_file/0010/495757/Emergency-Resuscitation-Cue-Lanyard-Card.pdf',
  emergencyAirway:
    'https://www.rch.org.au/clinicalguide/guideline_index/Emergency_airway_management/',
  traumaAirway: 'https://www.rch.org.au/trauma-service/manual/airway-management/',
  asthmaVentilation:
    'https://aci.health.nsw.gov.au/networks/eci/clinical/tools/respiratory/asthma/the-crashing-patient-life-threatening-asthma/ventilation-in-the-crashing-asthmatic',
  advancedAnaphylaxisRch: 'https://www.rch.org.au/anaphylaxis/clinical_resources/',
  advancedAnaphylaxisQld:
    'https://www.childrens.health.qld.gov.au/health-a-to-z/anaphylaxis/medication-flowchart',
  anaphylaxisEcat: 'https://aci.health.nsw.gov.au/ecat/paediatric/anaphylaxis',
  qldEmergencyDrugs:
    'https://www.childrens.health.qld.gov.au/__data/assets/pdf_file/0034/296647/childrens-resuscitation-emergency-drug-dosage.pdf',
};
