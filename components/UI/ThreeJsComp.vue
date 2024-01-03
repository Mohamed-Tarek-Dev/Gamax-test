<script setup>
	import * as THREE from 'three';
	import { Sky } from 'three/examples/jsm/objects/Sky.js';

	import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
	import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

	const myCan = ref();
	let scene, camera, renderer, sky, sun, controls, pointer, raycaster;
	const CurrentSphere = ref();
	let INTERSECTED = {};

	const initScene = () => {
		scene = new THREE.Scene();
		scene.background = new THREE.Color('black');
		raycaster = new THREE.Raycaster();
		pointer = new THREE.Vector2();

		// scene.fog = new THREE.Fog( 0xcccccc, 5000, 10000 );
		sky = new Sky();
		sky.scale.setScalar(450000);
		scene.add(sky);
		sun = new THREE.Vector3();
		const uniforms = sky.material.uniforms;
		uniforms['turbidity'].value = 10;
		uniforms['rayleigh'].value = 1.2;
		uniforms['mieCoefficient'].value = 0.005;
		uniforms['mieDirectionalG'].value = 0.7;
		const phi = THREE.MathUtils.degToRad(90 - 12);
		const theta = THREE.MathUtils.degToRad(0);
		sun.setFromSphericalCoords(1, phi, theta);

		uniforms['sunPosition'].value.copy(sun);

		camera = new THREE.PerspectiveCamera(
			60,
			window.innerWidth / window.innerHeight,
			0.1,
			8000
		);
		camera.rotation.y = (45 / 180) * Math.PI;
		camera.position.x = -600;
		camera.position.y = 2000;
		camera.position.z = 6000;

		renderer = new THREE.WebGLRenderer({
			antialias: true,
			canvas: myCan.value,
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		document.body.appendChild(renderer.domElement);
		controls = new OrbitControls(camera, renderer.domElement);
		controls.enabled = false;
		myCan.value.classList.add('fade-in');

		let loader = new GLTFLoader();
		loader.load('/scene.gltf', function (gltf) {
			let mapActions = gltf.scene.children[0];
			mapActions.scale.set(2, 2, 2);
			scene.add(gltf.scene);
			myCan.value.classList.add('fade-in-active');
			AnimateScene();
		});
	};

	const AnimateScene = () => {
		renderer.render(scene, camera);

		// update the picking ray with the camera and pointer position
		raycaster.setFromCamera(pointer, camera);

		// calculate objects intersecting the picking ray
		const intersects = raycaster.intersectObjects(
			scene.children.filter(
				(obj) =>
					obj.name == 'first sphere' || obj.name == 'second sphere'
			)
		);
		if (intersects.length > 0) {
			if (
				INTERSECTED &&
				INTERSECTED.object &&
				INTERSECTED.object != intersects[0].object
			) {
				INTERSECTED.object.material.color.set(
					new THREE.Color(`#${INTERSECTED.currentHex}`)
				);
				INTERSECTED.object.scale.set(1, 1, 1);
			}
			if (!INTERSECTED || INTERSECTED.object != intersects[0].object) {
				INTERSECTED.object = intersects[0].object;
				INTERSECTED.currentHex =
					INTERSECTED.object.material.color.getHexString();
				INTERSECTED.object.scale.set(1.1, 1.1, 1.1);
				INTERSECTED.object.material.color.set(0xffffff);
			}
			CurrentSphere.value = intersects[0].object.name;
			document.body.style.cursor = 'pointer';
		} else {
			if (INTERSECTED && INTERSECTED.object) {
				INTERSECTED.object.material.color.set(
					new THREE.Color(`#${INTERSECTED.currentHex}`)
				);
				INTERSECTED.object.scale.set(1, 1, 1);
				INTERSECTED = {};
				document.body.style.cursor = 'auto';
				CurrentSphere.value = undefined;
			}
		}

		if (camera.position.z > 2000) {
			if (camera.rotation.x > -1.0) {
				camera.rotation.x = camera.rotation.x - 0.002;
			}
			camera.position.z = camera.position.z - 20;
		} else {
			if (camera.fov > 40) {
				camera.fov = camera.fov - 0.1;
				camera.updateProjectionMatrix();
			}
		}
		requestAnimationFrame(AnimateScene);
	};

	const initGeometry = () => {
		// ...

		// Create interactive spots
		const spotGeometry = new THREE.SphereGeometry(150, 32, 16);
		const spotMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
		const spotMesh = new THREE.Mesh(spotGeometry, spotMaterial);
		spotMesh.position.set(-190, 200, 290); //first param is left/right second is height third is up and down
		scene.add(spotMesh);
		spotMesh.name = 'first sphere';
		const spotGeometryTwo = new THREE.SphereGeometry(150, 32, 16);
		const spotMaterialTwo = new THREE.MeshBasicMaterial({ color: 'blue' });
		const spotMeshTwo = new THREE.Mesh(spotGeometryTwo, spotMaterialTwo);
		spotMeshTwo.position.set(-850, 450, -80); //first param is left/right second is height third is up and down
		scene.add(spotMeshTwo);
		spotMeshTwo.name = 'second sphere';
		spotMesh.addEventListener('mouseover', function () {
			// Change the cursor style to "pointer"
			document.body.style.cursor = 'pointer';
		});

		spotMeshTwo.addEventListener('mouseover', function () {
			// Change the cursor style to "pointer"
			document.body.style.cursor = 'pointer';
		});
		// ...
	};
	const onWindowResize = () => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight);
	};

	const onPointerMove = (event) => {
		// calculate pointer position in normalized device coordinates
		// (-1 to +1) for both components

		pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
		pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
	};
	const HandleClicks = (e) => {
		console.log(CurrentSphere.value);
	};

	/*
    const worldWidth = 256, worldDepth = 256;
    const clock = new THREE.Clock();

    const initScene = () => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
        camera.position.set( 100, 800, - 800 );
        camera.lookAt( - 100, 810, - 800 );


        const light = new THREE.AmbientLight( 0x000000 ); // soft white light
        scene.add( light );

        sky = new Sky();
        sky.scale.setScalar( 450000 );
        scene.add( sky );
        sun = new THREE.Vector3();
        const uniforms = sky.material.uniforms;
        uniforms[ 'turbidity' ].value = 10;
        uniforms[ 'rayleigh' ].value = 1.2;
        uniforms[ 'mieCoefficient' ].value = 0.005;
        uniforms[ 'mieDirectionalG' ].value = 0.7;
        const phi = THREE.MathUtils.degToRad( 90 - 12 );
        const theta = THREE.MathUtils.degToRad( 0 );
        sun.setFromSphericalCoords( 1, phi, theta );

        uniforms[ 'sunPosition' ].value.copy( sun );

        const data = generateHeight( worldWidth, worldDepth );
        const geometry = new THREE.PlaneGeometry( 7500, 7500, worldWidth - 1, worldDepth - 1 );
        geometry.rotateX( - Math.PI / 2 );

        const vertices = geometry.attributes.position.array;

        for ( let i = 0, j = 0, l = vertices.length; i < l; i ++, j += 3 ) {

            vertices[ j + 1 ] = data[ i ] * 10;

        }

        texture = new THREE.CanvasTexture( generateTexture( data, worldWidth, worldDepth ) );
        texture.wrapS = THREE.ClampToEdgeWrapping;
        texture.wrapT = THREE.ClampToEdgeWrapping;
        texture.colorSpace = THREE.SRGBColorSpace;

        const mesh = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide } ) );
        scene.add( mesh );
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 0.5;
        controls = new FirstPersonControls(camera, renderer.domElement);
        // controls.addEventListener( 'change', animate );
        // controls.enableZoom = false;
        // controls.enablePan = false;
        controls.movementSpeed = 300;
        controls.lookSpeed = 0.2;
    }

    const generateHeight = ( width, height ) => {

        let seed = Math.PI / 4;
        window.Math.random = function () {

            const x = Math.sin( seed ++ ) * 10000;
            return x - Math.floor( x );

        };

        const size = width * height, data = new Uint8Array( size );
        const perlin = new ImprovedNoise(), z = Math.random() * 100;

        let quality = 1;

        for ( let j = 0; j < 4; j ++ ) {

            for ( let i = 0; i < size; i ++ ) {

                const x = i % width, y = ~ ~ ( i / width );
                data[ i ] += Math.abs( perlin.noise( x / quality, y / quality, z ) * quality * 1.75 );

            }

            quality *= 5;

        }

        return data;

    }

    const generateTexture = ( data, width, height ) => {

        let context, image, imageData, shade;

        const vector3 = new THREE.Vector3( 0, 0, 0 );

        const sun = new THREE.Vector3( 1, 1, 1 );
        sun.normalize();

        const canvas = document.createElement( 'canvas' );
        canvas.width = width;
        canvas.height = height;

        context = canvas.getContext( '2d' );
        context.fillStyle = '#000';
        context.fillRect( 0, 0, width, height );

        image = context.getImageData( 0, 0, canvas.width, canvas.height );
        imageData = image.data;

        for ( let i = 0, j = 0, l = imageData.length; i < l; i += 4, j ++ ) {

            vector3.x = data[ j - 2 ] - data[ j + 2 ];
            vector3.y = 2;
            vector3.z = data[ j - width * 2 ] - data[ j + width * 2 ];
            vector3.normalize();

            shade = vector3.dot( sun );

            imageData[ i ] = ( 96 + shade * 128 ) * ( 0.5 + data[ j ] * 0.007 );
            imageData[ i + 1 ] = ( 32 + shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );
            imageData[ i + 2 ] = ( shade * 96 ) * ( 0.5 + data[ j ] * 0.007 );

        }

        context.putImageData( image, 0, 0 );

        // Scaled 4x

        const canvasScaled = document.createElement( 'canvas' );
        canvasScaled.width = width * 4;
        canvasScaled.height = height * 4;

        context = canvasScaled.getContext( '2d' );
        context.scale( 4, 4 );
        context.drawImage( canvas, 0, 0 );

        image = context.getImageData( 0, 0, canvasScaled.width, canvasScaled.height );
        imageData = image.data;

        for ( let i = 0, l = imageData.length; i < l; i += 4 ) {

            const v = ~ ~ ( Math.random() * 5 );

            imageData[ i ] += v;
            imageData[ i + 1 ] += v;
            imageData[ i + 2 ] += v;

        }

        context.putImageData( image, 0, 0 );

        return canvasScaled;

    }


    const animate = () => {
        requestAnimationFrame(animate);

        renderer.render(scene, camera);
        controls.update( clock.getDelta() );

    }

    const onWindowResize = () => {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

        controls.handleResize();
    }

    const onMouseMove = (event) => {
        // Calculate normalized mouse coordinates (-1 to +1)
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

        // Set the normalized mouse coordinates as the camera's target
        controls.target.x = mouseX;
        controls.target.y = mouseY;
        controls.update();
    }
    */
	onMounted(() => {
		initScene();
		initGeometry();
		window.addEventListener('click', HandleClicks);
		window.addEventListener('resize', onWindowResize);
		window.addEventListener('pointermove', onPointerMove);

		// window.addEventListener('mousemove', onMouseMove, false);
	});
</script>

<template>
	<div>
		<canvas ref="myCan"></canvas>
	</div>
</template>

<style scoped>
	.fade-in {
		opacity: 0;
		transition: opacity 0.5s ease-in;
	}

	.fade-in.fade-in-active {
		opacity: 1;
	}
</style>
