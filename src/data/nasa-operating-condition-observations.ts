import observations from "../../data/nasa/normalized/spice/observations.json";
import { SPICEOperatingConditionObservation } from "@/types/spice";
export const nasaOperatingConditionObservations: SPICEOperatingConditionObservation[] = observations as SPICEOperatingConditionObservation[];
