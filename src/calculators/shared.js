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
};
