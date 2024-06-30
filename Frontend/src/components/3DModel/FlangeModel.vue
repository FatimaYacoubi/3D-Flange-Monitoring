<template>
  <div class="flange-model-container">
    <img src="@/assets/xp.jpg" alt="Background Image" class="background-img">
    <div ref="container"></div>
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { CSG } from 'three-csg-ts';

export default {
  mounted() {
    this.initThreeJS();
  },
  methods: {
    initThreeJS() {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 0.1, 1000);
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      this.$refs.container.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
      directionalLight.position.set(0, 1, 1).normalize();
      scene.add(directionalLight);

      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(require('@/assets/silver.jpg'), () => {
        console.log('Texture loaded successfully');
      }, undefined, (error) => {
        console.error('Error loading texture:', error);
      });

      // Flange Geometry and Material
      const flangeGeometry = new THREE.CylinderGeometry(5, 5, 1, 32);
      const flangeMaterial = new THREE.MeshPhongMaterial({ map: texture });
      const flange = new THREE.Mesh(flangeGeometry, flangeMaterial);

      // Create central and side holes
      const centralHoleGeometry = new THREE.CylinderGeometry(2, 2, 1.2, 32);
      centralHoleGeometry.translate(0, 0, 0.1);
      const centralHole = new THREE.Mesh(centralHoleGeometry, flangeMaterial);

      const firstHoleGeometry = new THREE.CylinderGeometry(0.7, 0.7, 1.2, 32);
      firstHoleGeometry.translate(3.5, 0, 0.1);
      const firstHole = new THREE.Mesh(firstHoleGeometry, flangeMaterial);

      const secondHoleGeometry = new THREE.CylinderGeometry(0.7, 0.7, 1.2, 32);
      secondHoleGeometry.translate(-3.5, 0, 0.1);
      const secondHole = new THREE.Mesh(secondHoleGeometry, flangeMaterial);

    const thirdHoleGeometry = new THREE.CylinderGeometry(0.7, 0.7, 1.2, 32);
      thirdHoleGeometry.translate(0, 3, 0.1);
      const thirdHole = new THREE.Mesh(thirdHoleGeometry, flangeMaterial);

    

      // Perform CSG operations
      let flangeCSG = CSG.fromMesh(flange);
                  flangeCSG = flangeCSG.subtract(CSG.fromMesh(thirdHole));

      flangeCSG = flangeCSG.subtract(CSG.fromMesh(centralHole));
      flangeCSG = flangeCSG.subtract(CSG.fromMesh(firstHole));
      flangeCSG = flangeCSG.subtract(CSG.fromMesh(secondHole));

    
      const result = CSG.toMesh(flangeCSG, new THREE.Matrix4(), flange.material);

      scene.add(result);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.25;
      controls.rotateSpeed = 0.35;

      camera.position.set(10, 30, 20);
      

      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }, false);
    }
  }
};
</script>

<style scoped>
.flange-model-container {
  position: relative;
  width: 100%;
  height: 101.5vh;
  overflow: hidden;
    z-index: 1;

}

.background-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: -3;
}

.flange-model-container > div {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
