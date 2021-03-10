/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useRef, useState } from "react";
import { useGLTF } from "@react-three/drei/useGLTF";
import * as THREE from "three";

export default function Model(props) {
  const createMaterial = (color) => {
    return new THREE.MeshPhongMaterial({
      color: color,
      side: THREE.DoubleSide,
    });
  };
  let interactive_material = createMaterial("white");
  const selected = props.selected;
  if (selected.length > 0) {
    const firstSelected = selected[0];
    const eventLocation = firstSelected.location.split("-")[0].trim();
    // eventLocation === "016" ? setActive(true) : setActive(false);
    const flat_16_selected = eventLocation === "016";
    console.log(flat_16_selected);
    interactive_material = createMaterial(
      flat_16_selected ? "#e41b14" : "white"
    );
  }

  // const mesh = useRef();
  // const [active, setActive] = useState(false);

  ////
  const group = useRef();
  const { nodes, materials } = useGLTF("/tower_texture.glb");
  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[1.12, 0.39, -1.15]}>
        <mesh
          material={materials.Material}
          geometry={nodes.Sphere.geometry}
          position={[0, 1912.88, 0]}
        />
      </group>
      <mesh material={materials.Base} geometry={nodes.Plane000.geometry} />
      <mesh material={materials.Floor} geometry={nodes.Plane000_1.geometry} />
      <mesh material={materials.Column} geometry={nodes.Plane000_2.geometry} />
      <mesh
        material={materials["Ground Cladding Accent"]}
        geometry={nodes.Plane103.geometry}
      />
      <mesh
        material={materials["Ground Cladding"]}
        geometry={nodes.Plane103_1.geometry}
      />
      <mesh
        material={materials["Ground Accent"]}
        geometry={nodes.Plane103_2.geometry}
      />
      <mesh
        material={materials["Ground Column"]}
        geometry={nodes.Plane103_3.geometry}
      />
      <mesh
        material={materials["Ground Base"]}
        geometry={nodes.Plane103_4.geometry}
      />
      <mesh
        material={materials["Ground Window Frame"]}
        geometry={nodes.Plane103_5.geometry}
      />
      <mesh
        material={materials["Ground Colour"]}
        geometry={nodes.Plane103_6.geometry}
      />
      <mesh
        material={materials["Ground Dry Riser"]}
        geometry={nodes.Plane103_7.geometry}
      />
      <mesh
        material={materials["Ground Floor"]}
        geometry={nodes.Plane103_8.geometry}
      />
      <mesh
        material={materials["Mezzanine Cladding"]}
        geometry={nodes.Plane014.geometry}
      />
      <mesh
        material={materials["Mezzanine Colour"]}
        geometry={nodes.Plane014_1.geometry}
      />
      <mesh
        material={materials["Residential Window Frame"]}
        geometry={nodes.Plane014_2.geometry}
      />
      <mesh
        material={materials["Mezzanine Base"]}
        geometry={nodes.Plane014_3.geometry}
      />
      <mesh
        material={materials["Mezzanine Floor"]}
        geometry={nodes.Plane014_4.geometry}
      />
      <mesh
        material={materials["Mezzanine Column"]}
        geometry={nodes.Plane014_5.geometry}
      />
      <mesh
        material={nodes.Plane014_6.material}
        geometry={nodes.Plane014_6.geometry}
      />
      {/* <mesh
        material={materials["Residential Column"]}
        geometry={nodes.Mesh015.geometry}
      />
      <mesh
        material={materials["Residential Floor"]}
        geometry={nodes.Mesh015_1.geometry}
      />
      <mesh
        material={materials["Residential Window Frame.001"]}
        geometry={nodes.Mesh015_2.geometry}
      />
      <mesh
        material={materials["Residential Sandwich Cladding"]}
        geometry={nodes.Mesh015_3.geometry}
      />
      <mesh
        material={materials["Residential Base"]}
        geometry={nodes.Mesh015_4.geometry}
      />
      <mesh
        material={nodes.Mesh015_5.material}
        geometry={nodes.Mesh015_5.geometry}
      /> */}
      <mesh
        material={materials["Residential Column"]}
        geometry={nodes.Mesh000.geometry}
      />
      <mesh
        material={materials["Residential Floor"]}
        geometry={nodes.Mesh000_1.geometry}
      />
      <mesh
        material={materials["Residential Window Frame.001"]}
        geometry={nodes.Mesh000_2.geometry}
      />
      <mesh
        material={materials["Residential Sandwich Cladding"]}
        geometry={nodes.Mesh000_3.geometry}
      />
      <mesh
        material={materials["Residential Base"]}
        geometry={nodes.Mesh000_4.geometry}
      />
      <mesh
        material={nodes.Mesh000_5.material}
        geometry={nodes.Mesh000_5.geometry}
      />
      <mesh
        material={materials["Residential Column"]}
        geometry={nodes.Mesh001.geometry}
      />
      <mesh
        material={materials["Residential Floor"]}
        geometry={nodes.Mesh001_1.geometry}
        material-color={"white"}
      />
      <mesh
        material={materials["Residential Window Frame.001"]}
        geometry={nodes.Mesh001_2.geometry}
      />
      <mesh
        material={materials["Residential Sandwich Cladding"]}
        geometry={nodes.Mesh001_3.geometry}
      />
      <mesh
        material={materials["Residential Base"]}
        geometry={nodes.Mesh001_4.geometry}
      />
      <mesh
        material={nodes.Mesh001_5.material}
        geometry={nodes.Mesh001_5.geometry}
      />
      <mesh
        material={materials["Residential Column"]}
        geometry={nodes.Mesh002.geometry}
      />
      <mesh
        material={materials["Residential Floor"]}
        geometry={nodes.Mesh002_1.geometry}
      />
      <mesh
        material={materials["Residential Window Frame.001"]}
        geometry={nodes.Mesh002_2.geometry}
      />
      <mesh
        material={materials["Residential Sandwich Cladding"]}
        geometry={nodes.Mesh002_3.geometry}
      />
      <mesh
        material={materials["Residential Base"]}
        geometry={nodes.Mesh002_4.geometry}
      />
      <mesh
        material={nodes.Mesh002_5.material}
        geometry={nodes.Mesh002_5.geometry}
      />
      <mesh
        material={materials["Residential Column"]}
        geometry={nodes.Mesh003.geometry}
      />
      <mesh
        material={materials["Residential Floor"]}
        geometry={nodes.Mesh003_1.geometry}
      />
      <mesh
        material={materials["Residential Window Frame.001"]}
        geometry={nodes.Mesh003_2.geometry}
      />
      <mesh
        material={materials["Residential Sandwich Cladding"]}
        geometry={nodes.Mesh003_3.geometry}
      />
      <mesh
        material={materials["Residential Base"]}
        geometry={nodes.Mesh003_4.geometry}
      />
      <mesh
        material={nodes.Mesh003_5.material}
        geometry={nodes.Mesh003_5.geometry}
      />
      <mesh
        material={materials["Residential Column"]}
        geometry={nodes.Mesh004.geometry}
      />
      <mesh
        material={materials["Residential Floor"]}
        geometry={nodes.Mesh004_1.geometry}
      />
      <mesh
        material={materials["Residential Window Frame.001"]}
        geometry={nodes.Mesh004_2.geometry}
      />
      <mesh
        material={materials["Residential Sandwich Cladding"]}
        geometry={nodes.Mesh004_3.geometry}
      />
      <mesh
        material={materials["Residential Base"]}
        geometry={nodes.Mesh004_4.geometry}
      />
      <mesh
        material={nodes.Mesh004_5.material}
        geometry={nodes.Mesh004_5.geometry}
      />
      <mesh
        material={materials["Residential Column"]}
        geometry={nodes.Mesh005.geometry}
      />
      <mesh
        material={materials["Residential Floor"]}
        geometry={nodes.Mesh005_1.geometry}
      />
      <mesh
        material={materials["Residential Window Frame.001"]}
        geometry={nodes.Mesh005_2.geometry}
      />
      <mesh
        material={materials["Residential Sandwich Cladding"]}
        geometry={nodes.Mesh005_3.geometry}
      />
      <mesh
        material={materials["Residential Base"]}
        geometry={nodes.Mesh005_4.geometry}
      />
      <mesh
        material={nodes.Mesh005_5.material}
        geometry={nodes.Mesh005_5.geometry}
      />
      <mesh
        material={materials["Residential Column"]}
        geometry={nodes.Mesh006.geometry}
      />
      <mesh
        material={materials["Residential Floor"]}
        geometry={nodes.Mesh006_1.geometry}
      />
      <mesh
        material={materials["Residential Window Frame.001"]}
        geometry={nodes.Mesh006_2.geometry}
      />
      <mesh
        material={materials["Residential Sandwich Cladding"]}
        geometry={nodes.Mesh006_3.geometry}
      />
      <mesh
        material={materials["Residential Base"]}
        geometry={nodes.Mesh006_4.geometry}
      />
      <mesh
        material={nodes.Mesh006_5.material}
        geometry={nodes.Mesh006_5.geometry}
      />
      <mesh
        material={materials["Residential Column"]}
        geometry={nodes.Mesh007.geometry}
      />
      <mesh
        material={materials["Residential Floor"]}
        geometry={nodes.Mesh007_1.geometry}
      />
      <mesh
        material={materials["Residential Window Frame.001"]}
        geometry={nodes.Mesh007_2.geometry}
      />
      <mesh
        material={materials["Residential Sandwich Cladding"]}
        geometry={nodes.Mesh007_3.geometry}
      />
      <mesh
        material={materials["Residential Base"]}
        geometry={nodes.Mesh007_4.geometry}
      />
      <mesh
        material={nodes.Mesh007_5.material}
        geometry={nodes.Mesh007_5.geometry}
      />
      <mesh
        material={materials["Residential Column"]}
        geometry={nodes.Mesh008.geometry}
      />
      <mesh
        material={materials["Residential Floor"]}
        geometry={nodes.Mesh008_1.geometry}
      />
      <mesh
        material={materials["Residential Window Frame.001"]}
        geometry={nodes.Mesh008_2.geometry}
      />
      <mesh
        material={materials["Residential Sandwich Cladding"]}
        geometry={nodes.Mesh008_3.geometry}
      />
      <mesh
        material={materials["Residential Base"]}
        geometry={nodes.Mesh008_4.geometry}
      />
      <mesh
        material={nodes.Mesh008_5.material}
        geometry={nodes.Mesh008_5.geometry}
      />
      <mesh
        material={materials["Residential Column"]}
        geometry={nodes.Mesh009.geometry}
      />
      <mesh
        material={materials["Residential Floor"]}
        geometry={nodes.Mesh009_1.geometry}
      />
      <mesh
        material={materials["Residential Window Frame.001"]}
        geometry={nodes.Mesh009_2.geometry}
      />
      <mesh
        material={materials["Residential Sandwich Cladding"]}
        geometry={nodes.Mesh009_3.geometry}
      />
      <mesh
        material={materials["Residential Base"]}
        geometry={nodes.Mesh009_4.geometry}
      />
      <mesh
        material={nodes.Mesh009_5.material}
        geometry={nodes.Mesh009_5.geometry}
      />

      <mesh
        material={materials["Residential Column"]}
        geometry={nodes.Mesh010.geometry}
      />
      <mesh
        material={materials["Residential Floor"]}
        geometry={nodes.Mesh010_1.geometry}
        // material-color={"blue"}
        castShadow
        receiveShadow
      />

      <mesh
        material={interactive_material}
        geometry={nodes.Mesh010_2.geometry}
        castShadow
        receiveShadow
      />

      <mesh
        material={materials["Residential Sandwich Cladding"]}
        geometry={nodes.Mesh010_3.geometry}
      />
      <mesh
        material={materials["Residential Base"]}
        geometry={nodes.Mesh010_4.geometry}
        material-color={"silver"}
      />
      <mesh
        material={nodes.Mesh010_5.material}
        geometry={nodes.Mesh010_5.geometry}
      />

      {/* <mesh
        material={materials["Residential Column"]}
        geometry={nodes.Mesh011.geometry}
      />
      <mesh
        material={materials["Residential Floor"]}
        geometry={nodes.Mesh011_1.geometry}
      />
      <mesh
        material={materials["Residential Window Frame.001"]}
        geometry={nodes.Mesh011_2.geometry}
      />
      <mesh
        material={materials["Residential Sandwich Cladding"]}
        geometry={nodes.Mesh011_3.geometry}
      />
      <mesh
        material={materials["Residential Base"]}
        geometry={nodes.Mesh011_4.geometry}
      />
      <mesh
        material={nodes.Mesh011_5.material}
        geometry={nodes.Mesh011_5.geometry}
      /> */}

      {/* <mesh
        material={materials["Residential Column"]}
        geometry={nodes.Mesh012.geometry}
      />
      <mesh
        material={materials["Residential Floor"]}
        geometry={nodes.Mesh012_1.geometry}
      />
      <mesh
        material={materials["Residential Window Frame.001"]}
        geometry={nodes.Mesh012_2.geometry}
      />
      <mesh
        material={materials["Residential Sandwich Cladding"]}
        geometry={nodes.Mesh012_3.geometry}
      />
      <mesh
        material={materials["Residential Base"]}
        geometry={nodes.Mesh012_4.geometry}
      />
      <mesh
        material={nodes.Mesh012_5.material}
        geometry={nodes.Mesh012_5.geometry}
      /> */}

      {/* <mesh
        material={materials["Residential Column"]}
        geometry={nodes.Mesh013.geometry}
      />
      <mesh
        material={materials["Residential Floor"]}
        geometry={nodes.Mesh013_1.geometry}
      />
      <mesh
        material={materials["Residential Window Frame.001"]}
        geometry={nodes.Mesh013_2.geometry}
      />
      <mesh
        material={materials["Residential Sandwich Cladding"]}
        geometry={nodes.Mesh013_3.geometry}
      />
      <mesh
        material={materials["Residential Base"]}
        geometry={nodes.Mesh013_4.geometry}
      />
      <mesh
        material={nodes.Mesh013_5.material}
        geometry={nodes.Mesh013_5.geometry}
      /> */}

      {/* <mesh
        material={materials["Residential Column"]}
        geometry={nodes.Mesh014.geometry}
      />
      <mesh
        material={materials["Residential Floor"]}
        geometry={nodes.Mesh014_1.geometry}
      />
      <mesh
        material={materials["Residential Window Frame.001"]}
        geometry={nodes.Mesh014_2.geometry}
      />
      <mesh
        material={materials["Residential Sandwich Cladding"]}
        geometry={nodes.Mesh014_3.geometry}
      />
      <mesh
        material={materials["Residential Base"]}
        geometry={nodes.Mesh014_4.geometry}
      />
      <mesh
        material={nodes.Mesh014_5.material}
        geometry={nodes.Mesh014_5.geometry}
      /> */}
      {/* 
      <mesh
        material={materials["Residential Column"]}
        geometry={nodes.Mesh016.geometry}
      />
      <mesh
        material={materials["Residential Floor"]}
        geometry={nodes.Mesh016_1.geometry}
      />
      <mesh
        material={materials["Residential Window Frame.001"]}
        geometry={nodes.Mesh016_2.geometry}
      />
      <mesh
        material={materials["Residential Sandwich Cladding"]}
        geometry={nodes.Mesh016_3.geometry}
      />
      <mesh
        material={materials["Residential Base"]}
        geometry={nodes.Mesh016_4.geometry}
      />
      <mesh
        material={nodes.Mesh016_5.material}
        geometry={nodes.Mesh016_5.geometry}
      /> */}
      {/* <mesh
        material={materials["Residential Column"]}
        geometry={nodes.Mesh017.geometry}
      />
      <mesh
        material={materials["Residential Floor"]}
        geometry={nodes.Mesh017_1.geometry}
      />
      <mesh
        material={materials["Residential Window Frame.001"]}
        geometry={nodes.Mesh017_2.geometry}
      />
      <mesh
        material={materials["Residential Sandwich Cladding"]}
        geometry={nodes.Mesh017_3.geometry}
      />
      <mesh
        material={materials["Residential Base"]}
        geometry={nodes.Mesh017_4.geometry}
      />
      <mesh
        material={nodes.Mesh017_5.material}
        geometry={nodes.Mesh017_5.geometry}
      /> */}
      {/* <mesh
        material={materials["Residential Column"]}
        geometry={nodes.Mesh018.geometry}
      />
      <mesh
        material={materials["Residential Floor"]}
        geometry={nodes.Mesh018_1.geometry}
      />
      <mesh
        material={materials["Residential Window Frame.001"]}
        geometry={nodes.Mesh018_2.geometry}
      />
      <mesh
        material={materials["Residential Sandwich Cladding"]}
        geometry={nodes.Mesh018_3.geometry}
      />
      <mesh
        material={materials["Residential Base"]}
        geometry={nodes.Mesh018_4.geometry}
      />
      <mesh
        material={nodes.Mesh018_5.material}
        geometry={nodes.Mesh018_5.geometry}
      /> */}
      {/* <mesh
        material={materials["Residential Column"]}
        geometry={nodes.Mesh019.geometry}
      />
      <mesh
        material={materials["Residential Floor"]}
        geometry={nodes.Mesh019_1.geometry}
      />
      <mesh
        material={materials["Residential Window Frame.001"]}
        geometry={nodes.Mesh019_2.geometry}
      />
      <mesh
        material={materials["Residential Sandwich Cladding"]}
        geometry={nodes.Mesh019_3.geometry}
      />
      <mesh
        material={materials["Residential Base"]}
        geometry={nodes.Mesh019_4.geometry}
      />
      <mesh
        material={nodes.Mesh019_5.material}
        geometry={nodes.Mesh019_5.geometry}
      /> */}
      <mesh
        material={materials["Roof Cladding"]}
        geometry={nodes.POLYFACE004.geometry}
      />
      <mesh
        material={materials["Roof Column"]}
        geometry={nodes.POLYFACE004_1.geometry}
      />
      <mesh
        material={materials["Roof Floor"]}
        geometry={nodes.POLYFACE004_2.geometry}
      />
      <mesh
        material={materials["Roof Ironmongery"]}
        geometry={nodes.POLYFACE004_3.geometry}
      />
      <mesh
        material={materials["Roof Base"]}
        geometry={nodes.POLYFACE004_4.geometry}
      />
      <mesh
        material={materials["Roof Cocrete"]}
        geometry={nodes.POLYFACE004_5.geometry}
      />
      <mesh
        material={materials["Walkway Base"]}
        geometry={nodes.Plane001.geometry}
      />
      <mesh
        material={materials["Walkway Cladding"]}
        geometry={nodes.Plane001_1.geometry}
      />
      <mesh
        material={materials["Walkway Column"]}
        geometry={nodes.Plane001_2.geometry}
      />
      <mesh
        material={materials["Walkway Floor"]}
        geometry={nodes.Plane001_3.geometry}
      />
      <mesh
        material={materials["Walkway Window Frame"]}
        geometry={nodes.Plane001_4.geometry}
      />
      <mesh
        material={materials["Walkway Colour"]}
        geometry={nodes.Plane001_5.geometry}
      />
      <mesh
        material={nodes.Plane001_6.material}
        geometry={nodes.Plane001_6.geometry}
      />
      <mesh
        material={materials["Walkway Plus Base"]}
        geometry={nodes.Plane007.geometry}
      />
      <mesh
        material={materials["Walway Plus Cladding"]}
        geometry={nodes.Plane007_1.geometry}
      />
      <mesh
        material={materials["Walkway Plus Column"]}
        geometry={nodes.Plane007_2.geometry}
      />
      <mesh
        material={materials["Walkway Plus Floor"]}
        geometry={nodes.Plane007_3.geometry}
      />
      <mesh
        material={materials["Walkway Plus Window Frames"]}
        geometry={nodes.Plane007_4.geometry}
      />
    </group>
  );
}

useGLTF.preload("/tower.glb");
