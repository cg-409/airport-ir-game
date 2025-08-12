import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

// ✅ Import models using ?url for Vite GitHub Pages compatibility
import terminalModel from "./assets/terminal.glb?url";
import securityModel from "./assets/security.glb?url";
import gatesModel from "./assets/gates.glb?url";

// Map of model names to URLs
const MODEL_PATHS = {
  terminal: terminalModel,
  security: securityModel,
  gates: gatesModel,
};

// Load a GLTF model with a placeholder fallback
function SceneObject({ modelPath, position }) {
  try {
    const { scene } = useGLTF(modelPath);
    return <primitive object={scene} position={position} />;
  } catch (e) {
    console.warn(`Model failed to load: ${modelPath}, using placeholder`, e);
    return (
      <mesh position={position}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    );
  }
}

export default function AirportIRGame() {
  const [timeLeft, setTimeLeft] = useState(1800); // 30 min
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time as mm:ss
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div style={{ width: "100vw", height: "100vh", background: "#111" }}>
      <div style={{ position: "absolute", top: 20, left: 20, color: "white", zIndex: 1 }}>
        <div>⏳ Time Left: {formatTime(timeLeft)}</div>
        <div>✅ Questions Answered: {questionsAnswered} / 8</div>
      </div>
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <Suspense fallback={null}>
          <SceneObject modelPath={MODEL_PATHS.terminal} position={[0, 0, 0]} />
          <SceneObject modelPath={MODEL_PATHS.security} position={[5, 0, 0]} />
          <SceneObject modelPath={MODEL_PATHS.gates} position={[-5, 0, 0]} />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}

// Preload models for performance
useGLTF.preload(terminalModel);
useGLTF.preload(securityModel);
useGLTF.preload(gatesModel);
