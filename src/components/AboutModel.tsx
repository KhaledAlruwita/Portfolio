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

export type AboutModelKind =
  "mailbox" | "paper-airplane" | "develop" | "certificate";

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
  "paper-airplane": {
    fallback: "/models/about/paper-airplane/pp_paper_airplane_diff.png",
    rotation: [0.2, -0.55, -0.12],
    scale: 3.1,
  },
  develop: {
    fallback: "/models/develop/MenuIcons.png",
    rotation: [0.3, -0.4, 0.08],
    scale: 3.1,
  },
  certificate: {
    fallback: "/models/certificate/t01r01_award_bg1.png",
    rotation: [-0.12, 0.18, 0.02],
    scale: 3.35,
  },
};

interface TexturedObjSourceProps {
  kind: AboutModelKind;
  modelPath: string;
  texturePath: string;
  transparent?: boolean;
}

const TexturedObjSource = ({
  kind,
  modelPath,
  texturePath,
  transparent = false,
}: TexturedObjSourceProps) => {
  const source = useLoader(OBJLoader, modelPath);
  const sourceTexture = useLoader(THREE.TextureLoader, texturePath);

  const model = useMemo(() => {
    const clone = source.clone(true);
    const texture = sourceTexture.clone();
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.magFilter = THREE.NearestFilter;
    texture.needsUpdate = true;

    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
          toneMapped: false,
          transparent,
          alphaTest: transparent ? 0.08 : 0,
        });
      }
    });

    return clone;
  }, [source, sourceTexture, transparent]);

  return <NormalizedModel kind={kind} model={model} />;
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
    const elapsed = clock.getElapsedTime();
    const scrollOffset =
      typeof window === "undefined" ? 0 : window.scrollY * 0.0025;

    animatedGroup.current.rotation.y = elapsed * 0.38 + scrollOffset;
    animatedGroup.current.rotation.x =
      Math.sin(elapsed * 0.55 + scrollOffset) * 0.12;
    animatedGroup.current.rotation.z =
      Math.cos(elapsed * 0.4 + scrollOffset) * 0.06;
    animatedGroup.current.position.y =
      Math.sin(elapsed * 0.9 + scrollOffset) * 0.1;
    animatedGroup.current.position.x = Math.sin(scrollOffset * 1.4) * 0.08;
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
              <TexturedObjSource
                kind="mailbox"
                modelPath="/models/about/mailbox/model.obj"
                texturePath="/models/about/mailbox/3dptmailbox.png"
              />
            ) : kind === "paper-airplane" ? (
              <PaperAirplaneSource />
            ) : kind === "develop" ? (
              <TexturedObjSource
                kind="develop"
                modelPath="/models/develop/model.obj"
                texturePath="/models/develop/MenuIcons.png"
              />
            ) : (
              <TexturedObjSource
                kind="certificate"
                modelPath="/models/certificate/model.obj"
                texturePath="/models/certificate/t01r01_award_bg1.png"
                transparent
              />
            )}
          </Suspense>
        </Canvas>
      </WebGLGuard>
    </div>
  );
};
