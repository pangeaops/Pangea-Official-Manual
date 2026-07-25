export type CrewRole = 'ALL' | 'RECEPTION' | 'CAPTAIN' | 'MATE';
export type LanguageMode = 'BOTH' | 'EN' | 'ES';

export interface ManualSection {
  id: string;
  titleEn: string;
  titleEs: string;
  category: 'FOUNDATION' | 'PROTOCOLS' | 'PROVISIONING' | 'SAFETY' | 'POST_TOUR';
  targetRoles: CrewRole[];
  iconName: string;
  summaryEn: string;
  summaryEs: string;
  contentEn: string[];
  contentEs: string[];
  keyTakeawaysEn?: string[];
  keyTakeawaysEs?: string[];
  warningNoteEn?: string;
  warningNoteEs?: string;
}

export interface CoolerProvisioning {
  pax: number;
  cocaColaCans: number;
  frescaCans: number;
  gingerAleCans: number;
  waterBottles: number;
  sparklingWaterCans: number;
  beerCans: number;
  fruitPortions: {
    pineappleEn: string;
    pineappleEs: string;
    papayaEn: string;
    papayaEs: string;
    watermelonEn: string;
    watermelonEs: string;
  };
  warmSnackUnits: number;
  foilSheets: number;
  iceBagsKg: number;
  essentialsListEn: string[];
  essentialsListEs: string[];
}

export interface BoatCheckCategory {
  id: string;
  titleEn: string;
  titleEs: string;
  icon: string;
  items: {
    id: string;
    labelEn: string;
    labelEs: string;
    descriptionEn: string;
    descriptionEs: string;
    critical: boolean;
  }[];
}

export interface AreaKnowledge {
  id: string;
  nameEn: string;
  nameEs: string;
  distanceKmTimeEn: string;
  distanceKmTimeEs: string;
  geographyForestEn: string;
  geographyForestEs: string;
  bestTimeToVisitEn: string;
  bestTimeToVisitEs: string;
  historicalFactsEn: string;
  historicalFactsEs: string;
  activitiesEn: string[];
  activitiesEs: string[];
  mainSpeciesEn: { flora: string[]; fauna: string[] };
  mainSpeciesEs: { flora: string[]; fauna: string[] };
  regulationsEn: string[];
  regulationsEs: string[];
  oceanBookNotesEn: string;
  oceanBookNotesEs: string;
  guideSpeechScriptEn: string;
  guideSpeechScriptEs: string;
  insiderSecretsEn: string;
  insiderSecretsEs: string;
  image: string;
}

export interface PartnerOrganization {
  id: string;
  name: string;
  locationEn: string;
  locationEs: string;
  generalInfoEn: string;
  generalInfoEs: string;
  historyEn: string;
  historyEs: string;
  founderStoryEn: string;
  founderStoryEs: string;
  collaborativeImpactEn: string;
  collaborativeImpactEs: string;
  guideSpeechScriptEn: string;
  guideSpeechScriptEs: string;
  activitiesEn: string[];
  activitiesEs: string[];
  image: string;
}

export interface WildlifeHallOfFameItem {
  id: string;
  commonNameEn: string;
  commonNameEs: string;
  scientificName: string;
  family: string;
  dietEn: string;
  dietEs: string;
  lifespanEn: string;
  lifespanEs: string;
  locationInBocasEn: string;
  locationInBocasEs: string;
  conservationStatusEn: string;
  conservationStatusEs: string;
  basicFactsEn: string[];
  basicFactsEs: string[];
  image: string;
}

export interface EmergencyProtocol {
  id: string;
  titleEn: string;
  titleEs: string;
  severity: 'CRITICAL' | 'HIGH' | 'MODERATE';
  icon: string;
  triggersEn: string[];
  triggersEs: string[];
  immediateActionEn: string[];
  immediateActionEs: string[];
  firstAidStepsEn: string[];
  firstAidStepsEs: string[];
  radioProtocolEn?: string;
  radioProtocolEs?: string;
}

export interface HistoryEpoch {
  id: string;
  period: string;
  titleEn: string;
  titleEs: string;
  descriptionEn: string;
  descriptionEs: string;
  highlightsEn: string[];
  highlightsEs: string[];
  guideSpeechScriptEn: string;
  guideSpeechScriptEs: string;
  image: string;
}

export interface NgabeCommunityInfo {
  id: string;
  name: string;
  locationEn: string;
  locationEs: string;
  cultureEn: string;
  cultureEs: string;
  sustainableTourismEn: string;
  sustainableTourismEs: string;
}

export interface ConservationAreaInfo {
  id: string;
  nameEn: string;
  nameEs: string;
  typeEn: string;
  typeEs: string;
  keyProtectionsEn: string[];
  keyProtectionsEs: string[];
}

export interface QuizQuestion {
  id: number;
  questionEn: string;
  questionEs: string;
  optionsEn: string[];
  optionsEs: string[];
  correctIndex: number;
  explanationEn: string;
  explanationEs: string;
  relevantRole: CrewRole;
}
