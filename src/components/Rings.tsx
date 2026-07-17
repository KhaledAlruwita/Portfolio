import { useGSAP } from "@gsap/react";
import { Center } from "@react-three/drei";
import gsap from "gsap";
import { useCallback, useRef } from "react";
import type * as THREE from "three";

interface RingsProps {
  position: [number, number, number];
}

export const Rings = ({ position }: RingsProps) => {
  const refList = useRef<THREE.Mesh[]>([]);
  const getRef = useCallback((mesh: THREE.Mesh) => {
    if (mesh && !refList.current.includes(mesh)) {
      refList.current.push(mesh);
    }
  }, []);

  useGSAP(
    () => {
      if (refList.current.length === 0) return;

      refList.current.forEach((r) => {
        r.position.set(position[0], position[1], position[2]);
      });

      gsap
        .timeline({
          repeat: -1,
          repeatDelay: 0.5,
        })
        .to(
          refList.current.map((r) => r.rotation),
          {
            y: `+=${Math.PI * 2}`,
            x: `-=${Math.PI * 2}`,
            duration: 2.5,
            stagger: {
              each: 0.15,
            },
          }
        );
    },
    {
      dependencies: position,
    }
  );

  return (
    <Center>
      <group scale={0.5}>
        {Array.from({ length: 4 }, (_, index) => (
          <mesh key={index} ref={getRef}>
            <torusGeometry args={[(index + 1) * 0.5, 0.1]} />

            <meshStandardMaterial
              color="#67e8f9"
              emissive="#0891b2"
              emissiveIntensity={0.3}
              metalness={0.45}
              roughness={0.28}
            />
          </mesh>
        ))}
      </group>
    </Center>
  );
};
