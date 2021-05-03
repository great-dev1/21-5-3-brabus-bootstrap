var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}var Scene = function () {
    function Scene(options) {_classCallCheck(this, Scene);
        this.$el = options.el;
        this.time = 0;

        this.bindAll();
        this.init();
    }_createClass(Scene, [{ key: 'bindAll', value: function bindAll()

        {
            this.render = this.render.bind(this);
            this.resize = this.resize.bind(this);
        } }, { key: 'init', value: function init()

        {
            this.textureLoader = new THREE.TextureLoader();
            this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 2000);
            this.camera.position.z = 200;
            this.camera.position.y = -70;
            this.camera.lookAt(new THREE.Vector3(0, 0, 0));

            this.scene = new THREE.Scene();

            this.renderer = new THREE.WebGLRenderer({ alpha: true });
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.$el.appendChild(this.renderer.domElement);


            this.createParticles();
            this.bindEvents();
            this.resize();
            this.render();
        } }, { key: 'createParticles', value: function createParticles()

        {
            var plane = new THREE.SphereBufferGeometry(50, 102, 52);

            var textureLoader = new THREE.TextureLoader();
            textureLoader.crossOrigin = '';

            var material = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 1.0 },
                    texture: { value: textureLoader.load("images/spark1.png") },
                    resolution: { value: new THREE.Vector2() } },



                vertexShader: document.getElementById('vertex-shader').textContent,
                fragmentShader: document.getElementById('fragment-shader').textContent,
                blending: THREE.AdditiveBlending,
                transparent: true });



            console.log(material.uniforms.texture);

            //const material = new THREE.PointsMaterial( { size: 1 } );
            this.particles = new THREE.Points(plane, material);
            this.particles.rotation.x = this.degToRad(-0);

            this.scene.add(this.particles);
        } }, { key: 'bindEvents', value: function bindEvents()


        {
            // window.addEventListener('mousemove', this.mousemove);
            window.addEventListener('resize', this.resize);
        } }, { key: 'resize', value: function resize()


        {
            var w = window.innerWidth;
            var h = window.innerHeight;
            this.renderer.setSize(w, h);
            this.camera.aspect = w / h;
            this.camera.updateProjectionMatrix();
        } }, { key: 'moveParticles', value: function moveParticles()

        {
            this.particles.material.uniforms.time.value = this.time;
            // this.particles.material.needsUpdate = true;
        }

        // Animations
    }, { key: 'render', value: function render()
        {
            requestAnimationFrame(this.render);
            this.time += .03;

            this.moveParticles();
            this.renderer.render(this.scene, this.camera);
        }

        // Utils
    }, { key: 'degToRad', value: function degToRad(angle) {
            return angle * Math.PI / 180;
        } }]);return Scene;}();



var scene = new Scene({
    el: document.querySelector('.particles') });