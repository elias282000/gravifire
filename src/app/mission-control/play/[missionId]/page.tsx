import MissionGameLoader from "@/components/mission-control/MissionGameLoader";

export default async function MissionPlayPage({ params }: { params: Promise<{ missionId: string }> }) { const { missionId } = await params; return <MissionGameLoader missionId={missionId} />; }
