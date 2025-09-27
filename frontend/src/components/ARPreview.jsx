import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { ARButton } from "three/examples/jsm/webxr/ARButton.js";

export default function ARPreview() {
  const containerRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, controller;

    const container = containerRef.current;
    if (!container) return;

    // Scene
    scene = new THREE.Scene();

    // Camera
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);

    // Renderer
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;
    container.appendChild(renderer.domElement);

    // Lights
    const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
    light.position.set(0.5, 1, 0.25);
    scene.add(light);

    // AR Button
    document.body.appendChild(ARButton.createButton(renderer));

    // Controller (for placing objects on tap)
    controller = renderer.xr.getController(0);
    controller.addEventListener("select", onSelect);
    scene.add(controller);

    let model = null;
    const loader = new GLTFLoader();
    loader.load("/models/chair.glb", (gltf) => {
      model = gltf.scene;
      model.scale.set(0.5, 0.5, 0.5);
    });

    function onSelect() {
      if (model) {
        const newObj = model.clone();
        newObj.position.set(0, 0, -1).applyMatrix4(controller.matrixWorld);
        scene.add(newObj);
      }
    }

    // Animate
    const animate = () => {
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
    };
    animate();

    return () => {
      if (renderer) renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "100vh" }} />;
}
