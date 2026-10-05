export type ExperimentFamily =
    | "BASS-II"
    | "SAFFIRE-I"
    | "SAFFIRE-II"
    | "SAFFIRE-III"
    | "FLEX"
    | "FLEX-2"
    | "SPICE"
    | "SAME"
    | "SAME-R"
    | "SoFIE";

export type NASAInvestigation = {
    id: string;
    psiId?: string;
    family: ExperimentFamily;
    title: string;
    shortDescription: string;
    category: string;
    materials: string[];
    environment: string;
    sourceName: string;
    sourceUrl: string;
    capabilities: string[];
};

export type ExperimentDataStatus =
    | "REAL_NASA_DATA"
    | "DEMO"
    | "DERIVED"
    | "UNKNOWN";

export type ExperimentParameters = {
    oxygenPercent?: number;
    airflowCmS?: number;
    pressureKPa?: number;
    geometry?: string;
    thicknessMm?: number;
    gravityG?: number;
    [key: string]: string | number | boolean | null | undefined;
};

export type ExperimentObservations = {
    flameSpreadRateMmS?: number;
    burnTimeS?: number;
    extinctionObserved?: boolean;
    sustainedCombustion?: boolean;
    notes?: string;
    [key: string]: string | number | boolean | undefined;
};

export type NASAExperimentEvidenceAsset = {
    id: string;
    investigationId: string;
    sourceExperimentId?: string;
    sourceSampleId?: string;
    assetType: "RAW_VIDEO" | "RAW_IMAGE" | "RAW_DATA" | "DOCUMENT" | "UNKNOWN";
    fileName: string;
    localPath: string;
    mediaType: string;
    sourceUrl: string;
    sha256: string;
    sizeBytes: number;
    dataStatus: "REAL_NASA_DATA";
    matchMethod: "TEST_AND_SAMPLE" | "TEST_ONLY" | "UNMATCHED";
    matchConfidence: "EXACT_IDENTIFIERS" | "PARTIAL_IDENTIFIERS" | "UNMATCHED";
    provenance: {
        sourceFile: string;
        relativePath: string;
        investigationId: string;
        investigationUrl: string;
        ingestionTimestamp: string;
        rawGmt?: string;
        parsedTestId?: string;
        parsedSampleId?: string;
    };
};

export type ExperimentSource = {
    repositoryName: string;
    investigationId: string;
    url: string;
};

export type ExperimentProvenance = {
    investigationId?: string;
    sourceRepository?: string;
    sourceUrl?: string;
    sourceFile?: string;
    sourceSha256?: string;
    sourceRow?: number;
    rawExperimentId?: string;
    parserVersion?: string;
    normalizerVersion?: string;
    ingestionTimestamp?: string;
    originalFields: string[];
    ingestionNote: string;
    fieldTransformations?: Record<string, {
        originalValue: string | number | boolean;
        originalUnit?: string;
        normalizedValue?: string | number | boolean;
        normalizationRule?: string;
    }>;
};

export type MissingDataStatus =
    | "NOT_REPORTED"
    | "NOT_MEASURED"
    | "NOT_APPLICABLE"
    | "UNKNOWN";

export type BASSIIMeasurementStatus =
    | "EXACT"
    | "ABOVE_RANGE"
    | "NOT_REPORTED"
    | "TEXT_STATUS"
    | "UNKNOWN";

export type BASSIIGasMeasurement = {
    rawValue: string;
    parsedValue: number | null;
    unit: "%" | "ppm";
    status: BASSIIMeasurementStatus;
    comparator?: ">";
};

export type BASSIIDimension = {
    raw: string;
    normalizedMm: number;
    normalizationRule: string;
};

export type BASSIISourceMetadata = {
    investigationId: string;
    principalInvestigator: string;
    sourceSampleId: string;
    rawMaterialDescription: string;
    testDateRaw: string;
    testDateIso?: string;
    gmtRaw: string;
    normalizedMaterial: "PMMA" | "NOMEX" | "JAPAN_WAX" | "SIBAL" | null;
    materialNormalizationStatus: "NORMALIZED" | "REVIEW_REQUIRED";
    thicknessRaw?: string;
    thicknessMm?: number;
    widthRaw?: string;
    widthMm?: number;
    dimensionProvenance?: BASSIIDimension[];
};

export type BASSIIConfiguration = {
    flowRestrictorRaw: string;
    fanDisplayRaw: string;
    airDisplayRaw: string;
    radiometerGainRaw: string;
    totalFramesShotRaw: string;
    totalFramesShotParsed?: number;
};

export type BASSIIMeasurements = {
    initialOxygenPercent: BASSIIGasMeasurement;
    finalOxygenPercent: BASSIIGasMeasurement;
    initialCO2Percent: BASSIIGasMeasurement;
    finalCO2Percent: BASSIIGasMeasurement;
    initialCOPpm: BASSIIGasMeasurement;
    finalCOPpm: BASSIIGasMeasurement;
};

export type SAMEMeasurementStatus = "EXACT" | "NOT_REPORTED" | "TEXT_STATUS" | "UNKNOWN";
export type SAMEMeasurement = { rawValue: string; parsedValue: number | null; unit: "cm/s" | "mg/min" | "minutes"; status: SAMEMeasurementStatus; sourceField: string };
export type SAMEExperimentData = {
    sourceSampleId: string;
    rawSampleMaterial: string;
    normalizedMaterial: "TEFLON" | "KAPTON" | null;
    materialNormalizationStatus: "NORMALIZED" | "REVIEW_REQUIRED";
    airflowCmS: SAMEMeasurement;
    weightLossRateMgMin: SAMEMeasurement;
    agingDurationMinutes: SAMEMeasurement;
};
export type SAMERMeasurementStatus = "EXACT" | "NOT_REPORTED_IN_SOURCE" | "NOT_APPLICABLE";
export type SAMERNumericMeasurement = { rawValue: string; parsedValue: number | null; unit: "cm/s" | "seconds" | null; status: SAMERMeasurementStatus; sourceField: string; sourceLabel?: string; interpretationStatus?: "SOURCE_LABEL_ONLY" };
export type SAMERSourceRelationship = { type: "DERIVED_RELATION_CANDIDATE"; relatedSourceExperimentId: string; note: string };
export type SAMERRunData = {
    sourceRunKey: string;
    rawSampleType: string;
    normalizedMaterial: "KAPTON" | "SILICONE" | "LAMPWICK" | "PYRELL" | "TEFLON" | null;
    description: string;
    rawDate: string;
    datePrecision: "DAY_MONTH_ONLY";
    inletVelocityCmS: SAMERNumericMeasurement;
    rtR0: SAMERNumericMeasurement;
    duration: SAMERNumericMeasurement;
    primaryAgingTime: SAMERNumericMeasurement;
    primaryMixingTime: SAMERNumericMeasurement;
    netAgingTime: SAMERNumericMeasurement;
    descriptiveTags: string[];
    sourceRelationships: SAMERSourceRelationship[];
    dataAvailability: { available: string[]; notReportedInCurrentSource: string[] };
};

export type SAFFIREMeasurementStatus = "EXACT" | "RANGE" | "APPROXIMATE" | "NOT_REPORTED" | "TEXT_STATUS";
export type SAFFIRENumericMeasurement = { rawValue: string; parsedValue: number | null; unit: "cm" | "cm/s" | "W" | "s"; status: SAFFIREMeasurementStatus; minValue?: number; maxValue?: number; approximateValue?: number; sourceField: string };
export type SAFFIREOxygenMeasurement = { rawValue: string; unit: "%"; status: SAFFIREMeasurementStatus; minValue?: number; maxValue?: number; approximateValue?: number; parsedValue?: number; sourceField: string };
export type SAFFIREExperimentData = {
    sourceSampleId: string;
    rawMaterialDescription: string;
    normalizedMaterial: "SIBAL" | null;
    materialNormalizationStatus: "NORMALIZED" | "REVIEW_REQUIRED";
    sampleThicknessCm: SAFFIRENumericMeasurement;
    sampleLengthCm: SAFFIRENumericMeasurement;
    sampleWidthCm: SAFFIRENumericMeasurement;
    airflowCmS: SAFFIRENumericMeasurement;
    oxygenMeasurement: SAFFIREOxygenMeasurement;
    ignitionPowerW: SAFFIRENumericMeasurement;
    ignitionTimeS: SAFFIRENumericMeasurement;
    burnTimeS: SAFFIRENumericMeasurement;
    flowDirection: "Concurrent" | "Opposed" | null;
    flowDirectionRaw: string;
    camera1Identifier: string;
    camera2Identifier: string;
};
export type SAFFIREPretestRecord = { sourceIdentifier: string; description: string; relatedSample?: string; cameraIdentifiers: string[]; sourceFile: string; sourceRow: number; sha256: string; provenance: ExperimentProvenance };

export type SAFFIREIIMeasurementStatus = "EXACT" | "APPROXIMATE" | "RANGE" | "TEXT_STATUS" | "NOT_APPLICABLE" | "NOT_REPORTED" | "REFERENCE_NOTE" | "REVIEW_REQUIRED";
export type SAFFIREIINumericMeasurement = { rawValue: string; parsedValue: number | null; unit: "mm" | "cm" | "cm/s" | "W" | "s" | "mm/s"; status: SAFFIREIIMeasurementStatus; sourceField: string; minValue?: number; maxValue?: number; approximateValue?: number; sourceHeader?: string };
export type SAFFIREIIOxygenMeasurement = { rawValue: string; unit: "%"; status: "APPROXIMATE" | "RANGE" | "EXACT" | "NOT_REPORTED" | "TEXT_STATUS"; measurementMethod: "DERIVED_SOURCE_MEASUREMENT"; sourceField: string; minValue?: number; maxValue?: number; approximateValue?: number; parsedValue?: number; originalOrder?: number[] };
export type SAFFIREIIMaterialConfiguration = { type: "SINGLE_MATERIAL" | "MULTI_MATERIAL" | "NOT_REPORTED"; components?: Array<{ material: string; thicknessRaw: string; thicknessMm?: number; lengthRaw: string; lengthCm?: number }>; parsingNote?: string };
export type SAFFIREIISourceNote = { noteId: string; rawText: string; referencedByRunIds: string[]; referencedFields: string[]; sourceRow: number; provenance: ExperimentProvenance };
export type SAFFIREIIExperimentData = {
    sourceSampleId: string; rawMaterialDescription: string | null; normalizedMaterial: "SILICONE" | "SIBAL" | "PMMA" | null; materialStatus: "NORMALIZED" | "NOT_REPORTED" | "REVIEW_REQUIRED"; materialConfiguration: SAFFIREIIMaterialConfiguration;
    sampleThickness: SAFFIREIINumericMeasurement; sampleLength: SAFFIREIINumericMeasurement; sampleWidth: SAFFIREIINumericMeasurement; airflowCmS: SAFFIREIINumericMeasurement; oxygenMeasurement: SAFFIREIIOxygenMeasurement; ignitionPowerW: SAFFIREIINumericMeasurement; ignitionTimeS: SAFFIREIINumericMeasurement; burnTime: SAFFIREIINumericMeasurement;
    flowDirection: "Concurrent" | "Opposed" | null; flowDirectionRaw: string; microgravityBurnLength: SAFFIREIINumericMeasurement; microgravitySpreadMeasurement: SAFFIREIINumericMeasurement; normalGravityReference: { burnLength: SAFFIREIINumericMeasurement; spreadRate: SAFFIREIINumericMeasurement }; camera1Identifier: string; camera2Identifier: string; sourceNotes: SAFFIREIISourceNote[]; componentObservations: Array<{ component: string; observation: string; noteId: string }>;
};
export type SAFFIREIIISourceConflict = {
    field: "thickness" | "airflow" | "sampleLength";
    type: "SOURCE_VALUE_CONFLICT" | "SOURCE_UNIT_CONFLICT" | "SOURCE_CONTEXT_CONFLICT";
    primarySource: "PSI-100 Experimental Table";
    primaryValue: string;
    externalSource: "EXTERNAL NASA CONTEXT";
    externalValue: string;
    status: "UNRESOLVED_SOURCE_CONFLICT";
    note: string;
};
export type SAFFIREIIIStatus = "EXACT_IN_SOURCE" | "NOT_REPORTED_IN_CURRENT_SOURCE";
export type SAFFIREIIIMeasurement = {
    rawValue: string;
    parsedValue: number | null;
    sourceUnit: "cm" | "cm/s";
    normalizedMm?: number;
    status: SAFFIREIIIStatus;
    sourceField: string;
    normalizationRule?: string;
    sourceConflictStatus?: "EXTERNAL_SOURCE_UNIT_CONFLICT";
};
export type SAFFIREIIIDataAvailability = {
    available: string[];
    notReportedInCurrentSource: string[];
};
export type SAFFIREIIIExperimentData = {
    sourceSampleId: string;
    rawMaterialDescription: string;
    normalizedMaterial: "SIBAL" | null;
    materialNormalizationStatus: "NORMALIZED" | "REVIEW_REQUIRED";
    sampleThickness: SAFFIREIIIMeasurement;
    sampleLength: SAFFIREIIIMeasurement;
    sampleWidth: SAFFIREIIIMeasurement;
    airflow: SAFFIREIIIMeasurement;
    flowDirection: "Concurrent" | "Opposed" | null;
    flowDirectionRaw: string;
    camera1Identifier: string;
    camera2Identifier: string;
    sourceConflicts: SAFFIREIIISourceConflict[];
    dataAvailability: SAFFIREIIIDataAvailability;
};

export type FLEXMeasurementStatus = "EXACT_SOURCE_VALUE" | "SOURCE_DASH" | "NOT_REPORTED" | "NOT_APPLICABLE" | "APPROXIMATE";
export type FLEXMeasurement = {
    rawValue: string;
    parsedValue: number | null;
    unit: "mmHg" | "mole fraction" | "mm" | "mm²/s" | "s" | null;
    status: FLEXMeasurementStatus;
    sourceField: string;
    sourceHeader: string;
    minValue?: number;
    maxValue?: number;
    approximateValue?: number;
};
export type FLEXCompositionMeasurement = FLEXMeasurement & { semanticMeaning: "O2" | "N2" | "CO2" | "He"; semanticSource: "NASA/TP-2015-216046" };
export type FLEXSourceWarning = {
    code: "SOURCE_HEADER_UNIT_LOSS" | "SOURCE_GAS_LABEL_SEMANTIC_MAPPING" | "SOURCE_VALUE_ANOMALY" | "SOURCE_SCOPE_DISCREPANCY" | "ENGINEERING_IDENTIFIER_AMBIGUITY" | "AMBIENT_COMPOSITION_SUM_WARNING";
    field?: string;
    message: string;
};
export type FLEXExperimentData = {
    flexIdentifier: string;
    rawDate: string;
    rawGMT: string;
    fuel: "METHANOL" | "HEPTANE" | null;
    rawFuel: string;
    ambientPressure: FLEXMeasurement;
    ambientComposition: { oxygen: FLEXCompositionMeasurement; nitrogen: FLEXCompositionMeasurement; carbonDioxide: FLEXCompositionMeasurement; helium: FLEXCompositionMeasurement; compositionSum: number | null };
    dropletInitialDiameter: FLEXMeasurement;
    visibleFlameExtinctionDiameter: FLEXMeasurement;
    burningRateConstant: FLEXMeasurement;
    burnTime: FLEXMeasurement;
    testEndStatus: "EXTINCTION" | "DISRUPTION" | "COMPLETION" | null;
    rawTestEndStatus: string;
    sourceWarnings: FLEXSourceWarning[];
    dataAvailability: { available: string[]; notReportedInCurrentSource: string[] };
};

export type NASAExperimentRun = {
    id: string;
    investigationId: string;
    sourceExperimentId: string;
    title: string;
    family: ExperimentFamily;
    material: string;
    environment: string;
    parameters: ExperimentParameters;
    observations: ExperimentObservations;
    outcome: string;
    evidenceAssets: NASAExperimentEvidenceAsset[];
    source: ExperimentSource;
    provenance: ExperimentProvenance;
    dataStatus: ExperimentDataStatus;
    fieldStatuses?: Record<string, MissingDataStatus>;
    normalizationWarnings?: string[];
    sourceMetadata?: BASSIISourceMetadata;
    bassIIConfiguration?: BASSIIConfiguration;
    measurements?: BASSIIMeasurements;
    rawRecord?: Record<string, string>;
    sameData?: SAMEExperimentData;
    sameRData?: SAMERRunData;
    saffireData?: SAFFIREExperimentData;
    saffireIIData?: SAFFIREIIExperimentData;
    saffireIIIData?: SAFFIREIIIExperimentData;
    flexData?: FLEXExperimentData;
};
