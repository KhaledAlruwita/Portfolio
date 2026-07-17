import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import {
  type Collada,
  ColladaLoader,
} from "three/examples/jsm/loaders/ColladaLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";

import { CanvasLoader } from "./CanvasLoader";
import { WebGLGuard } from "./WebGLGuard";

export type AboutModelKind = "mailbox" | "paper" | "paper-airplane";

interface AboutModelProps {
  kind: AboutModelKind;
  label: string;
}

const modelConfig: Record<
  AboutModelKind,
  {
    fallback: string;
    rotation: [number, number, number];
    scale: number;
  }
> = {
  mailbox: {
    fallback: "/models/about/mailbox/3dptmailbox.png",
    rotation: [0, -0.45, 0],
    scale: 2.1,
  },
  paper: {
    fallback: "/models/about/paper/obj_paper01_01.png",
    rotation: [0.18, 0.12, -0.08],
    scale: 3.25,
  },
  "paper-airplane": {
    fallback: "/models/about/paper-airplane/pp_paper_airplane_diff.png",
    rotation: [0.2, -0.55, -0.12],
    scale: 3.1,
  },
};

const MailboxSource = () => {
  const mailbox = useLoader(OBJLoader, "/models/about/mailbox/model.obj");
  const mailboxTexture = useLoader(
    THREE.TextureLoader,
    "/models/about/mailbox/3dptmailbox.png"
  );

  const model = useMemo(() => {
    const clone = mailbox.clone(true);
    const texture = mailboxTexture.clone();
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;

    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
          toneMapped: false,
        });
      }
    });

    return clone;
  }, [mailbox, mailboxTexture]);

  return <NormalizedModel kind="mailbox" model={model} />;
};

const PaperSource = () => {
  const paperTexture = useLoader(
    THREE.TextureLoader,
    "/models/about/paper/obj_paper01_01.png"
  );
  const model = useMemo(() => {
    const stack = new THREE.Group();
    const texture = paperTexture.clone();
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;

    const sheets = [
      { position: [-0.32, 0.16, 0], rotation: -0.12, map: texture },
      { position: [0.36, 0.12, -0.04], rotation: 0.1 },
      { position: [-0.46, -0.2, -0.08], rotation: 0.08 },
      { position: [0.18, -0.25, -0.12], rotation: -0.06 },
    ];

    sheets.forEach(({ position, rotation, map }, index) => {
      const sheet = new THREE.Mesh(
        new THREE.BoxGeometry(1.3, 1.65, 0.035),
        new THREE.MeshStandardMaterial({
          color: index === 0 ? "#ffffff" : "#e8e7e2",
          map,
          roughness: 0.92,
          metalness: 0,
        })
      );
      sheet.position.set(position[0], position[1], position[2]);
      sheet.rotation.z = rotation;
      stack.add(sheet);
    });

    return stack;
  }, [paperTexture]);

  return <NormalizedModel kind="paper" model={model} />;
};

const PaperAirplaneSource = () => {
  const airplane = useLoader(
    ColladaLoader,
    "/models/about/paper-airplane/model.dae"
  ) as Collada;
  const model = useMemo(() => cloneSkeleton(airplane.scene), [airplane.scene]);

  return <NormalizedModel kind="paper-airplane" model={model} />;
};

const NormalizedModel = ({
  kind,
  model,
}: {
  kind: AboutModelKind;
  model: THREE.Object3D;
}) => {
  const animatedGroup = useRef<THREE.Group>(null);

  const normalizedModel = useMemo(() => {
    model.traverse((child) => {
      if (child instanceof THREE.Mesh || child instanceof THREE.SkinnedMesh) {
        const mesh = child as THREE.Mesh<
          THREE.BufferGeometry,
          THREE.Material | THREE.Material[]
        >;
        const cloneMaterial = (material: THREE.Material) => {
          const clone = material.clone();
          clone.side = THREE.DoubleSide;
          clone.needsUpdate = true;
          return clone;
        };

        mesh.material = Array.isArray(mesh.material)
          ? mesh.material.map(cloneMaterial)
          : cloneMaterial(mesh.material);
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });

    model.updateMatrixWorld(true);
    const bounds = new THREE.Box3().makeEmpty();

    model.traverse((child) => {
      if (!(child instanceof THREE.Mesh) || !child.geometry) return;
      const mesh = child as THREE.Mesh<THREE.BufferGeometry>;
      mesh.geometry.computeBoundingBox();
      if (!mesh.geometry.boundingBox) return;

      bounds.union(
        mesh.geometry.boundingBox.clone().applyMatrix4(mesh.matrixWorld)
      );
    });

    const size = bounds.getSize(new THREE.Vector3());
    const center = bounds.getCenter(new THREE.Vector3());
    const largestDimension = Math.max(size.x, size.y, size.z) || 1;
    const wrapper = new THREE.Group();

    model.position.sub(center);
    wrapper.add(model);
    wrapper.scale.setScalar(modelConfig[kind].scale / largestDimension);
    wrapper.rotation.set(...modelConfig[kind].rotation);

    return wrapper;
  }, [kind, model]);

  useFrame(({ clock }) => {
    if (!animatedGroup.current) return;
    animatedGroup.current.rotation.y =
      Math.sin(clock.getElapsedTime() * 0.55) * 0.32;
    animatedGroup.current.position.y =
      Math.sin(clock.getElapsedTime() * 0.9) * 0.08;
  });

  return (
    <group ref={animatedGroup}>
      <primitive object={normalizedModel} />
    </group>
  );
};

export const AboutModel = ({ kind, label }: AboutModelProps) => {
  const config = modelConfig[kind];

  return (
    <div className={`about-model about-model--${kind}`} aria-label={label}>
      <WebGLGuard
        fallback={<img src={config.fallback} alt="" aria-hidden="true" />}
      >
        <Canvas
          camera={{ position: [0, 0.2, 4.6], fov: 34 }}
          dpr={[1, 1.5]}
          shadows
        >
          <ambientLight intensity={2.4} />
          <directionalLight position={[4, 5, 5]} intensity={3.2} castShadow />
          <pointLight position={[-4, 1, 2]} intensity={2} color="#38bdf8" />

          <Suspense fallback={<CanvasLoader />}>
            {kind === "mailbox" ? (
              <MailboxSource />
            ) : kind === "paper" ? (
              <PaperSource />
            ) : (
              <PaperAirplaneSource />
            )}
          </Suspense>
        </Canvas>
      </WebGLGuard>
    </div>
  );
};
