import { useGSAP } from "@gsap/react";
import { useFrame, type GroupProps } from "@react-three/fiber";
import gsap from "gsap";
import { useRef } from "react";
import * as THREE from "three";

export const Target = (props: GroupProps) => {
  const targetRef = useRef<THREE.Group>(null);
  const smoothedScroll = useRef(0);

  useGSAP(() => {
    if (!targetRef.current) return;

    gsap.to(targetRef.current.position, {
      y: targetRef.current.position.y + 0.5,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
    });
  });

  useFrame(({ clock }, delta) => {
    if (!targetRef.current) return;
    const targetScroll = typeof window === "undefined" ? 0 : window.scrollY;
    smoothedScroll.current = THREE.MathUtils.damp(
      smoothedScroll.current,
      targetScroll,
      2,
      delta
    );
    const scroll = smoothedScroll.current;
    targetRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.45) * 0.18;
    targetRef.current.rotation.y =
      Math.PI / 5 + clock.elapsedTime * 0.38 + scroll * 0.00035;
    targetRef.current.rotation.z = scroll * 0.00015;
  });

  return (
    <group
      {...props}
      ref={targetRef}
      rotation={[0, Math.PI / 5, 0]}
      scale={1.5}
    >
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh>
          <cylinderGeometry args={[1.2, 1.2, 0.18, 32]} />
          <meshStandardMaterial color="#e5e7eb" roughness={0.52} />
        </mesh>
        <mesh position={[0, 0.11, 0]}>
          <cylinderGeometry args={[0.72, 0.72, 0.04, 32]} />
          <meshStandardMaterial color="#e11d48" roughness={0.45} />
        </mesh>
        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.28, 0.28, 0.04, 32]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.45} />
        </mesh>
      </group>
      <mesh position={[-0.48, -1.45, 0]} rotation={[0, 0, -0.16]}>
        <boxGeometry args={[0.2, 1.8, 0.22]} />
        <meshStandardMaterial color="#78350f" roughness={0.75} />
      </mesh>
      <mesh position={[0.48, -1.45, 0]} rotation={[0, 0, 0.16]}>
        <boxGeometry args={[0.2, 1.8, 0.22]} />
        <meshStandardMaterial color="#78350f" roughness={0.75} />
      </mesh>
    </group>
  );
};
