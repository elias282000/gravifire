"use client";

import { Text } from "@react-three/drei";
import { useMemo } from "react";

const colors = {
  light: "#d7dce0",
  panel: "#aeb8bd",
  graphite: "#202a31",
  black: "#10171c",
  metal: "#5b6870",
  cyan: "#55d7e8",
  amber: "#f4aa48",
  red: "#d95850",
  floor: "#20282d"
};

export const spacecraftMaterialPresets = {
  paintedMetalLight: { color: colors.light, roughness: 0.72, metalness: 0.22 },
  paintedMetalDark: { color: colors.graphite, roughness: 0.66, metalness: 0.38 },
  brushedMetal: { color: colors.metal, roughness: 0.3, metalness: 0.82 },
  blackComposite: { color: colors.black, roughness: 0.88, metalness: 0.08 },
  paintedFloor: { color: colors.floor, roughness: 0.9, metalness: 0.16 },
  screenGlass: { color: colors.black, roughness: 0.2, metalness: 0.35 }
} as const;

function Panel({ position, size, color = colors.light, emissive, intensity = 0 }: { position: [number, number, number]; size: [number, number, number]; color?: string; emissive?: string; intensity?: number }) {
  return <mesh position={position} castShadow receiveShadow><boxGeometry args={size} /><meshStandardMaterial color={color} emissive={emissive} emissiveIntensity={intensity} roughness={0.72} metalness={color === colors.metal ? 0.8 : 0.22} /></mesh>;
}

function Label({ children, position, color = colors.cyan, size = 0.085 }: { children: string; position: [number, number, number]; color?: string; size?: number }) {
  return <Text position={position} fontSize={size} color={color} anchorX="center" anchorY="middle" letterSpacing={0.04}>{children}</Text>;
}

function PhysicalStation({ id, label, position, accent = colors.cyan }: { id: string; label: string; position: [number, number, number]; accent?: string }) {
  return <group position={position} userData={{ interaction: { id, label, distance: 3 } }}><Panel position={[0, 1.15, 0]} size={[1.25, 1.45, 0.42]} color={colors.graphite} /><Panel position={[0, 1.66, -0.25]} size={[0.82, 0.35, 0.04]} color={colors.black} emissive={accent} intensity={0.3} /><Panel position={[0, 0.56, -0.25]} size={[0.7, 0.04, 0.03]} color={accent} emissive={accent} intensity={2} /><Label position={[0, 1.35, -0.28]} color={accent} size={0.065}>{label}</Label></group>;
}

function MissionPhysicalStations({ mission }: { mission: string }) {
  if (mission === "m0") return <group><PhysicalStation id="inspect-heater" label="INSPECT HEATER FAULT" position={[-2.3, 0, -4.8]} accent={colors.red} /><PhysicalStation id="inspect-garment" label="SCAN GARMENT STATE" position={[0, 0, -5.1]} accent={colors.amber} /><PhysicalStation id="inspect-vent" label="CHECK VENT OUTLET" position={[2.3, 0, -5.4]} /><PhysicalStation id="vent-cut" label="CUT SECTION VENT" position={[-2.3, 0, -7.2]} /><PhysicalStation id="vent-increase" label="INCREASE AIRFLOW" position={[0, 0, -7.2]} accent={colors.amber} /><PhysicalStation id="suppression" label="SUPPRESSION CABINET" position={[2.3, 0, -7.2]} accent="#b48cff" /><PhysicalStation id="archive" label="ARCHIVE TERMINAL" position={[0, 0, -9.0]} /></group>;
  if (mission === "m1") return <group><PhysicalStation id="sibal-sample" label="SCAN SIBAL SAMPLE" position={[0, 0, -2.2]} /><PhysicalStation id="concurrent-control" label="CONCURRENT FLOW" position={[-2.7, 0, -6.4]} /><PhysicalStation id="opposed-control" label="OPPOSED FLOW" position={[2.7, 0, -6.4]} accent={colors.amber} /><PhysicalStation id="ignition-console" label="START SOURCE REPLAY" position={[0, 0, -8.0]} accent={colors.amber} /><PhysicalStation id="analysis-wall" label="OPEN COMPARISON ROOM" position={[0, 0, -9.5]} /></group>;
  if (mission === "m4") return <group><PhysicalStation id="silicone-sample-2-1" label="LOCATE SILICONE 2-1" position={[0, 0, -2.2]} /><PhysicalStation id="ground-reference" label="START 1-g REFERENCE" position={[-2.8, 0, -6.3]} accent={colors.amber} /><PhysicalStation id="flight-record" label="START LOW-g RECORD" position={[2.8, 0, -6.3]} /><PhysicalStation id="sample-2-2" label="REVIEW 2-2" position={[-3.0, 0, -9.2]} /><PhysicalStation id="sample-2-3" label="REVIEW 2-3" position={[-1.0, 0, -9.2]} /><PhysicalStation id="sample-2-4" label="REVIEW 2-4 / SOURCE WARNING" position={[1.0, 0, -9.2]} accent={colors.amber} /><PhysicalStation id="m4-decision" label="MATERIAL REVIEW TERMINAL" position={[3.0, 0, -9.2]} /></group>;
  if (mission === "m6") return <group><PhysicalStation id="run" label="MANIFEST / LINER" position={[-3.1, 0, 2.2]} /><PhysicalStation id="run" label="MANIFEST / HOUSINGS" position={[0, 0, 2.2]} /><PhysicalStation id="run" label="MANIFEST / SEALS" position={[3.1, 0, 2.2]} accent={colors.amber} /><PhysicalStation id="run" label="REVIEW EVIDENCE STATE" position={[0, 0, -3.3]} /><PhysicalStation id="run" label="OPEN TRANSITION AIRLOCK" position={[0, 0, -6.0]} /><PhysicalStation id="run" label="SCAN MARS BOUNDARY" position={[0, 0, -8.8]} accent={colors.amber} /><PhysicalStation id="run" label="UPLOAD RESEARCH MEMO" position={[3.0, 0, -7.0]} /></group>;
  return null;
}

function WallArchitecture() {
  const seams = useMemo(() => [-8.1, -6.2, -4.3, -2.4, -0.5, 1.4, 3.3, 5.2, 7.1], []);
  return <>
    <Panel position={[-7.82, 2, 0]} size={[0.18, 3.7, 21.5]} color={colors.light} />
    <Panel position={[7.82, 2, 0]} size={[0.18, 3.7, 21.5]} color={colors.light} />
    {seams.map((z) => <group key={z}><Panel position={[-7.68, 2, z]} size={[0.12, 3.1, 0.025]} color={colors.metal} /><Panel position={[7.68, 2, z]} size={[0.12, 3.1, 0.025]} color={colors.metal} /></group>)}
    <Panel position={[-7.55, 2.65, -1.4]} size={[0.08, 1.25, 2.8]} color={colors.graphite} /><Panel position={[7.55, 2.65, 1.8]} size={[0.08, 1.25, 2.8]} color={colors.graphite} />
    <Panel position={[-7.42, 2.64, -1.4]} size={[0.04, 0.06, 2.2]} color={colors.cyan} emissive={colors.cyan} intensity={1.8} /><Panel position={[7.42, 2.64, 1.8]} size={[0.04, 0.06, 2.2]} color={colors.amber} emissive={colors.amber} intensity={1.6} />
    <Panel position={[-7.48, 3.65, 0]} size={[0.12, 0.12, 21.5]} color={colors.graphite} /><Panel position={[7.48, 3.65, 0]} size={[0.12, 0.12, 21.5]} color={colors.graphite} />
    <Label position={[-7.48, 3.2, -2.5]}>DECK B / FIRE RESEARCH BAY</Label><Label position={[7.48, 3.2, 2.2]} color={colors.amber}>AUTHORIZED TEST AREA</Label>
  </>;
}

function FloorAndCeiling() {
  const tiles = useMemo(() => Array.from({ length: 9 }, (_, index) => -8 + index * 2), []);
  return <>
    <Panel position={[0, 0.015, 0]} size={[15.4, 0.06, 21.5]} color={colors.floor} />
    {tiles.map((z) => <group key={z}><Panel position={[0, 0.052, z]} size={[15.2, 0.012, 0.025]} color="#536168" /><Panel position={[-5.2, 0.06, z + 0.8]} size={[2.1, 0.016, 0.7]} color={colors.graphite} /></group>)}
    <Panel position={[0, 3.92, 0]} size={[15.4, 0.08, 21.5]} color={colors.graphite} />
    {[-5.2, 0, 5.2].map((x) => <group key={x}><Panel position={[x, 3.84, 0]} size={[0.16, 0.12, 21]} color={colors.metal} /><Panel position={[x, 3.76, -2]} size={[1.8, 0.04, 0.1]} color={colors.cyan} emissive={colors.cyan} intensity={2} /></group>)}
  </>;
}

function ServiceRack({ position, accent = colors.cyan, label = "EQUIPMENT" }: { position: [number, number, number]; accent?: string; label?: string }) {
  return <group position={position}><Panel position={[0, 1.35, 0]} size={[1.15, 2.6, 0.42]} color={colors.graphite} /><Panel position={[0, 2.05, -0.24]} size={[0.78, 0.35, 0.03]} color={colors.black} emissive={accent} intensity={0.35} /><Panel position={[0, 1.35, -0.25]} size={[0.82, 0.06, 0.03]} color={accent} emissive={accent} intensity={2} /><Panel position={[-0.4, 0.7, -0.24]} size={[0.06, 0.6, 0.03]} color={colors.metal} /><Panel position={[0.4, 0.7, -0.24]} size={[0.06, 0.6, 0.03]} color={colors.metal} /><Label position={[0, 1.78, -0.28]} color={accent} size={0.06}>{label}</Label></group>;
}

function Console({ position, label, accent = colors.cyan }: { position: [number, number, number]; label: string; accent?: string }) {
  return <group position={position}><Panel position={[0, 0.95, 0]} size={[1.8, 1.6, 0.7]} color={colors.graphite} /><Panel position={[0, 1.58, -0.38]} size={[1.28, 0.62, 0.06]} color={colors.black} emissive={accent} intensity={0.25} /><Panel position={[0, 1.56, -0.42]} size={[1.08, 0.045, 0.025]} color={accent} emissive={accent} intensity={2} /><Panel position={[-0.48, 0.82, -0.4]} size={[0.14, 0.12, 0.05]} color={accent} emissive={accent} intensity={2} /><Panel position={[0, 0.48, -0.42]} size={[1.15, 0.04, 0.03]} color={colors.metal} /><Label position={[0, 1.22, -0.43]} color={accent} size={0.065}>{label}</Label></group>;
}

function DoorFrame({ position = [0, 2, -10.55] as [number, number, number], boundary = false }: { position?: [number, number, number]; boundary?: boolean }) {
  const accent = boundary ? colors.amber : colors.cyan;
  return <group position={position}><Panel position={[0, 2, 0]} size={[5.4, 4.2, 0.35]} color={colors.graphite} /><Panel position={[-2.72, 2, -0.22]} size={[0.3, 4.7, 0.55]} color={colors.metal} /><Panel position={[2.72, 2, -0.22]} size={[0.3, 4.7, 0.55]} color={colors.metal} /><Panel position={[0, 4.26, -0.22]} size={[5.75, 0.3, 0.55]} color={colors.metal} /><Panel position={[0, 2, -0.24]} size={[4.85, 3.5, 0.08]} color={colors.black} /><Panel position={[0, 2, -0.3]} size={[0.08, 3.2, 0.06]} color={accent} emissive={accent} intensity={2} /><Panel position={[-2.25, 1.0, -0.32]} size={[0.06, 0.08, 0.3]} color={accent} emissive={accent} intensity={2} /><Panel position={[2.25, 1.0, -0.32]} size={[0.06, 0.08, 0.3]} color={accent} emissive={accent} intensity={2} /></group>;
}

function EvidenceMonitor({ position, source, condition, value, accent = colors.cyan }: { position: [number, number, number]; source: string; condition: string; value: string; accent?: string }) {
  return <group position={position}><Panel position={[0, 1.45, 0]} size={[2.2, 1.55, 0.18]} color={colors.graphite} /><Panel position={[0, 1.47, -0.12]} size={[1.85, 1.17, 0.04]} color={colors.black} emissive={accent} intensity={0.18} /><Panel position={[0, 1.98, -0.16]} size={[1.55, 0.025, 0.02]} color={accent} emissive={accent} intensity={2} /><Label position={[0, 1.82, -0.18]} color={accent} size={0.075}>{source}</Label><Label position={[0, 1.55, -0.18]} color="#cbd5e1" size={0.06}>{condition}</Label><Label position={[0, 1.18, -0.18]} color="#f8fafc" size={0.18}>{value}</Label></group>;
}

function M1EvidenceStation() {
  return <group><EvidenceMonitor position={[-2.8, 0, -7.1]} source="SAFFIRE-I / S1" condition="CONCURRENT · 20 cm/s" value="420 s" /><EvidenceMonitor position={[2.8, 0, -7.1]} source="SAFFIRE-I / S2" condition="OPPOSED · 20 cm/s" value="70 s" accent={colors.amber} /><Panel position={[0, 1.55, -7.05]} size={[2.6, 2.15, 0.5]} color={colors.graphite} /><Panel position={[0, 1.55, -6.76]} size={[1.6, 1.25, 0.06]} color="#263740" emissive={colors.cyan} intensity={0.45} /><Panel position={[-1.5, 1.95, -6.7]} size={[0.7, 0.025, 0.025]} color={colors.cyan} emissive={colors.cyan} intensity={2} /><Panel position={[1.5, 1.95, -6.7]} size={[0.7, 0.025, 0.025]} color={colors.amber} emissive={colors.amber} intensity={2} /><Label position={[0, 2.72, -6.76]} color={colors.cyan} size={0.1}>SIBAL / SOURCE COMPARISON</Label><Label position={[-1.45, 2.28, -6.76]} color={colors.cyan} size={0.06}>FLOW →</Label><Label position={[1.45, 2.28, -6.76]} color={colors.amber} size={0.06}>← FLOW</Label></group>;
}

function M4EvidenceStation() {
  const samples = ["2-1", "2-2", "2-3", "2-4"];
  return <group><Panel position={[-3.1, 1.65, -7.3]} size={[3.7, 2.6, 0.28]} color={colors.graphite} /><Panel position={[3.1, 1.65, -7.3]} size={[3.7, 2.6, 0.28]} color={colors.graphite} /><Panel position={[-3.1, 1.65, -7.47]} size={[3.15, 2.08, 0.04]} color={colors.black} emissive="#a87842" intensity={0.18} /><Panel position={[3.1, 1.65, -7.47]} size={[3.15, 2.08, 0.04]} color={colors.black} emissive={colors.cyan} intensity={0.18} /><Label position={[-3.1, 2.75, -7.52]} color={colors.amber} size={0.095}>1-g SOURCE REFERENCE</Label><Label position={[3.1, 2.75, -7.52]} color={colors.cyan} size={0.095}>LOW-g FLIGHT RECORD</Label><Label position={[-3.1, 1.85, -7.54]} color="#f8fafc" size={0.26}>COMPLETE</Label><Label position={[3.1, 1.95, -7.54]} color="#f8fafc" size={0.23}>INSIGNIFICANT</Label><Label position={[3.1, 1.45, -7.54]} color={colors.cyan} size={0.2}>~0</Label><Label position={[0, 3.05, -7.5]} color={colors.amber} size={0.1}>SILICONE 2-1 / CONDITION CONTRAST</Label><group position={[0, 0, -1.15]}>{samples.map((sample, index) => <group key={sample} position={[(index - 1.5) * 0.88, 0, 0]}><Panel position={[0, 1.15, 0]} size={[0.68, 1.9, 0.12]} color={colors.graphite} /><Panel position={[0, 1.18, -0.08]} size={[0.48, 1.35, 0.025]} color={index === 3 ? "#3a2924" : "#283840"} emissive={index === 3 ? colors.amber : colors.cyan} intensity={0.25} /><Label position={[0, 1.85, -0.1]} color={index === 3 ? colors.amber : colors.cyan} size={0.09}>{sample}</Label><Label position={[0, 0.78, -0.1]} color="#dbe5e8" size={0.055}>{index === 3 ? "037 mm" : "SILICONE"}</Label>{index === 3 && <Label position={[0, 0.48, -0.1]} color="#fca5a5" size={0.045}>SOURCE REVIEW REQUIRED</Label>}</group>)}</group></group>;
}

export default function SpacecraftEnvironment() {
  const route = typeof window === "undefined" ? "" : window.location.pathname;
  const mission = route.endsWith("/m0") ? "m0" : route.endsWith("/m4") ? "m4" : route.endsWith("/m6") ? "m6" : route.endsWith("/m1") ? "m1" : "graybox";
  return <group>
    <WallArchitecture /><FloorAndCeiling />
    <ServiceRack position={[-6.7, 0, 3.4]} label={mission === "m1" ? "SOURCE ARCHIVE" : "UTILITY RACK"} />
    <ServiceRack position={[6.7, 0, -0.8]} accent={colors.amber} label={mission === "m0" ? "EMERGENCY ISOLATION" : "VENT LOOP B"} />
    <Console position={[-3.1, 0, -2.5]} label={mission === "m0" ? "VENTILATION" : mission === "m4" ? "GROUND REFERENCE" : "FLOW CONTROL"} accent={mission === "m0" ? colors.amber : colors.cyan} />
    <Console position={[3.1, 0, -4.8]} label={mission === "m4" ? "FLIGHT RECORD" : "EVIDENCE TERMINAL 04"} accent={mission === "m4" ? colors.cyan : colors.amber} />
    <DoorFrame boundary={mission === "m6"} />
    <Label position={[0, 3.55, -10.2]} color={mission === "m6" ? colors.amber : colors.cyan} size={0.1}>{mission === "m6" ? "EXPLORATION ENVIRONMENT" : "PRESSURE DOOR / DECK B"}</Label>
    <Label position={[0, 3.42, -8.3]} color={colors.amber} size={0.065}>{mission === "m4" ? "MATERIAL ANALYSIS LAB" : mission === "m1" ? "SAFFIRE REPLAY BAY" : mission === "m0" ? "CREW SERVICE CORRIDOR" : "MISSION CONTROL TEST DECK"}</Label>
    <Panel position={[-4.9, 2.85, 1.5]} size={[0.16, 0.16, 2.2]} color={colors.metal} /><Panel position={[-4.8, 2.7, 1.5]} size={[0.08, 0.08, 1.8]} color={colors.black} />
    <Panel position={[4.9, 2.85, 4.2]} size={[0.16, 0.16, 2.2]} color={colors.metal} /><Panel position={[4.8, 2.7, 4.2]} size={[0.08, 0.08, 1.8]} color={colors.black} />
    {mission === "m1" && <M1EvidenceStation />}{mission === "m4" && <M4EvidenceStation />}<MissionPhysicalStations mission={mission} />
  </group>;
}

export { Console, DoorFrame, Panel, ServiceRack };
