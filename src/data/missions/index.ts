import { grayboxMission } from "@/data/missions/graybox";
import { m0Mission } from "@/data/missions/m0-two-seconds-of-smoke";
import { m1Mission } from "@/data/missions/m1-sibal";
import { m4Mission } from "@/data/missions/m4-silicone";
import { m6Mission } from "@/data/missions/m6-locked-door";

export const campaignMissions = [m0Mission, m1Mission, m4Mission, m6Mission];
export const allMissionDefinitions = [grayboxMission, ...campaignMissions];
export const campaignMission = (missionId: string) => campaignMissions.find((mission) => mission.id === missionId);

