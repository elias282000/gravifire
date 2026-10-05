"use client";

import { Text, useKeyboardControls } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { movementState, playerMovementConfig, type MovementState } from "@/lib/fps-state";
import { parseCameraMode, type CameraMode } from "@/lib/camera-state";

type ToolMode = "IDLE" | "FOCUS" | "INSPECT";

/** Lightweight camera and scientific-tool feel layer. It deliberately stays cosmetic. */
export default function FirstPersonFeel() {
  const getState = useThree((state) => state.get);
  const [, getKeys] = useKeyboardControls();
  const tool = useRef<THREE.Group>(null);
  const flashlight = useRef<THREE.SpotLight>(null);
  const [mode, setMode] = useState<ToolMode>("IDLE");
  const [flashlightOn, setFlashlightOn] = useState(false);
  const [crouched, setCrouched] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [cameraMode, setCameraMode] = useState<CameraMode>("THIRD_PERSON");
  const clock = useRef(0);
  const bob = useRef(0);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener?.("change", sync);
    const onKey = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "f") setFlashlightOn((value) => !value);
      if (event.key.toLowerCase() === "r") setMode("INSPECT");
      if (event.key === "Control" || event.key.toLowerCase() === "c") setCrouched(true);
    };
    const onUp = (event: KeyboardEvent) => {
      if (event.key === "Control" || event.key.toLowerCase() === "c") setCrouched(false);
    };
    const onPointer = (event: PointerEvent) => {
      if (event.button === 2) setMode("FOCUS");
    };
    const onPointerUp = (event: PointerEvent) => {
      if (event.button === 2) setMode("IDLE");
    };
    const onMode = (event: Event) => setCameraMode((event as CustomEvent<CameraMode>).detail);
    const modeTimer = window.setTimeout(() => setCameraMode(parseCameraMode(localStorage.getItem("gravifire-camera-mode"))), 0);
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onUp);
    window.addEventListener("pointerdown", onPointer);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("camera-mode-changed", onMode);
    return () => {
      media.removeEventListener?.("change", sync);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onUp);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("camera-mode-changed", onMode);
      window.clearTimeout(modeTimer);
    };
  }, []);

  useFrame((_, delta) => {
    const camera = getState().camera as THREE.PerspectiveCamera;
    const keys = getKeys() as Record<string, boolean>;
    const moving = Boolean(keys.forward || keys.backward || keys.left || keys.right);
    const state: MovementState = movementState({ moving, sprint: Boolean(keys.sprint), crouch: crouched });
    const speedFactor = state === "SPRINT" ? 1.35 : state === "CROUCH" ? 0.65 : 1;
    clock.current += delta * speedFactor;
    const bobAmount = reducedMotion || !moving ? 0 : state === "SPRINT" ? playerMovementConfig.headBobSprint : state === "CROUCH" ? playerMovementConfig.headBobCrouch : playerMovementConfig.headBobWalk;
    bob.current = THREE.MathUtils.damp(bob.current, bobAmount, 12, delta);
    const bobY = Math.sin(clock.current * 9) * bob.current;
    const standingY = camera.position.y;
    const targetY = standingY + (crouched ? -0.6 : 0) + bobY;
    camera.position.y += (targetY - camera.position.y) * Math.min(1, delta * 14);
    const targetFov = state === "SPRINT" && !reducedMotion ? playerMovementConfig.baseFov + playerMovementConfig.sprintFovDelta : playerMovementConfig.baseFov;
    camera.fov = THREE.MathUtils.damp(camera.fov, targetFov, 7, delta);
    camera.updateProjectionMatrix();

    if (tool.current) {
      tool.current.visible = cameraMode === "FIRST_PERSON";
      const sprintLower = state === "SPRINT" ? 0.2 : 0;
      const focusRaise = mode === "FOCUS" ? -0.2 : 0;
      const inspectTurn = mode === "INSPECT" ? 0.35 : 0;
      tool.current.position.x = THREE.MathUtils.damp(tool.current.position.x, 0.52, 10, delta);
      tool.current.position.y = THREE.MathUtils.damp(tool.current.position.y, -0.42 - sprintLower + focusRaise, 10, delta);
      tool.current.position.z = THREE.MathUtils.damp(tool.current.position.z, -0.72 + (mode === "FOCUS" ? 0.18 : 0), 10, delta);
      tool.current.rotation.z = THREE.MathUtils.damp(tool.current.rotation.z, inspectTurn + Math.sin(clock.current * 4) * bob.current * 4, 10, delta);
      tool.current.rotation.x = THREE.MathUtils.damp(tool.current.rotation.x, mode === "INSPECT" ? -0.18 : 0.05, 10, delta);
    }
    if (flashlight.current) flashlight.current.intensity = flashlightOn ? 2.5 : 0;
  });

  useEffect(() => {
    const onContext = (event: MouseEvent) => event.preventDefault();
    window.addEventListener("contextmenu", onContext);
    return () => window.removeEventListener("contextmenu", onContext);
  }, []);

  return (
    <group ref={tool} position={[0.52, -0.42, -0.72]}>
      <mesh castShadow>
        <boxGeometry args={[0.16, 0.34, 0.08]} />
        <meshStandardMaterial color="#172b3b" emissive="#0e7490" emissiveIntensity={0.6} metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.04, -0.07]}>
        <boxGeometry args={[0.1, 0.12, 0.015]} />
        <meshStandardMaterial color="#67e8f9" emissive="#22d3ee" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0, -0.22, 0]}>
        <cylinderGeometry args={[0.06, 0.08, 0.28, 8]} />
        <meshStandardMaterial color="#263746" metalness={0.65} roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.08, -0.13]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.12, 12]} />
        <meshStandardMaterial color="#70808a" metalness={0.85} roughness={0.22} />
      </mesh>
      <mesh position={[0.12, -0.08, 0]} rotation={[0, 0, -0.35]}>
        <boxGeometry args={[0.045, 0.2, 0.045]} />
        <meshStandardMaterial color="#0b1116" roughness={0.88} />
      </mesh>
      <mesh position={[-0.09, -0.08, 0.02]} rotation={[0, 0, 0.35]}>
        <boxGeometry args={[0.035, 0.17, 0.035]} />
        <meshStandardMaterial color="#b0bcc0" metalness={0.7} roughness={0.3} />
      </mesh>
      <Text position={[0, 0.045, -0.15]} rotation={[0, 0, 0]} fontSize={0.018} color="#bffaff" anchorX="center" anchorY="middle">GRAVIFIRE</Text>
      <spotLight ref={flashlight} position={[0, 0.02, -0.18]} target-position={[0, 0, -5]} angle={0.28} penumbra={0.75} distance={8} color="#d9f7ff" castShadow={false} />
    </group>
  );
}
