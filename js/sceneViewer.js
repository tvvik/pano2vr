var ViewerScene = function() {
	this.container = null;
	this.scene = null;
	this.renderer = null;
	this.effect= null;
	this.light = null;
	this.controls = null;
	this.plane1 = null;
	this.plane2 = null;
    this.sphere = null;
	this.width = 0;
	this.height = 0;
	this.frameId = null;
	this.camFOV = 70;
	this.camNear = 1;
	this.camFar = 2000;

	this.materialLeft = null;
	this.materialRight = null;

	this.vrActive = false;
	this.isMobile = false;
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) this.isMobile = true;

	window.vrActive = this.vrActive;

	this.initialise = function(container)
	{
		this.container = container;
		this.scene = new THREE.Scene();
		this.width = this.container.clientWidth;
        this.height = this.container.clientHeight;

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false }) 
        this.renderer.sortElements = true;
        this.renderer.setSize( this.width, this.height );        
        this.renderer.domElement.id = 'webGLcanvas';
        this.renderer.setClearColor( 0xf3f3f3 );
        this.container.appendChild( this.renderer.domElement );
        //this.renderer.alpha = true;
        
        this.camera = new THREE.PerspectiveCamera( this.camFOV, this.width / this.height, this.camNear, this.camFar );
        this.camera.position.set(0,0,0);
        //this.camera.up = new THREE.Vector3(0,0,1);
        //this.camera.lookAt(new THREE.Vector3(0,0,10));
        if (this.isMobile)
        	this.controls = new THREE.DeviceOrientationControls( this.camera );
        else {
        	this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        	this.controls.enablePan = true;
            this.controls.enableRotate = true;
            this.controls.enableZoom = true;
            this.controls.target = new THREE.Vector3(0, 0, 1);
        }

        this.light = new THREE.AmbientLight( 0xFFFFFF, 1);
        this.light.position.set(0,-100,0);

        this.loadTextures();

        var sphGeom = new THREE.SphereGeometry(1000, 60, 40);
        sphGeom.scale(-1,1,1);
        this.sphere = new THREE.Mesh(sphGeom, this.materialLeft);

        this.effect = new THREE.StereoEffect(this.renderer, this.plane1, this.plane2);
        var axis = new THREE.AxisHelper(100);
        this.scene.add(axis);

        this.scene.add(this.camera);
        this.scene.add(this.light);
        this.scene.add(this.sphere);
        //this.scene.add(this.plane1);        
        //this.scene.add(this.plane2);

		//console.log('started 2: ', this);
	};

	this.loadTextures = function() {
		this.materialLeft = new THREE.MeshStandardMaterial({
                //color:color_negru,
                color:"#FFFFFF",
                roughness : 0.2,
                metalness : 0.2//,
                //envMap: simItalia.cubeCamera.renderTarget.texture
            });

		this.materialRight = new THREE.MeshStandardMaterial({
                //color:color_negru,
                color:"#FFFFFF",
                roughness : 0.2,
                metalness : 0.2//,
                //envMap: simItalia.cubeCamera.renderTarget.texture
            });

		var loaderTex = new THREE.TextureLoader();
        loaderTex.load('images/stereo/003/left.jpg',
            function (txx){
                txx.wrapS = THREE.RepeatWrapping;
                txx.wrapT = THREE.RepeatWrapping;

                txx.repeat.set(1,1);
                //console.log('this: ', this);
                this.materialLeft.map = txx;
                this.materialLeft.needsUpdate = true;
            }.bind(this),
            function ( xhr ) {
                //console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            },
                // Function called when download errors
            function ( xhr ) {
                //console.log( 'An error happened:',xhr );
            });

        var loaderTexR = new THREE.TextureLoader();
        loaderTexR.load('images/stereo/002/right.JPG',
            function (txx){
                txx.wrapS = THREE.RepeatWrapping;
                txx.wrapT = THREE.RepeatWrapping;

                txx.repeat.set(1,1);
                this.materialRight.map = txx;
                this.materialRight.needsUpdate = true;
            }.bind(this),
            function ( xhr ) {
                //console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
            },
                // Function called when download errors
            function ( xhr ) {
                //console.log( 'An error happened:',xhr );
            });
	};
	this.fullScreen = false;
	this.addMainEvents = function() {
		
		document.getElementById('vrIco').addEventListener('mousedown', function (event) 
		{
			if (!this.fullScreen) {
				this.fullScreen = true;
				fullscreen('webGL');
			}

			if (window.vrActive) window.vrActive = false;
			else window.vrActive = true;
			//console.log('VR is now: ', window.vrActive);
		});

		window.addEventListener('resize', function() {
			this.camera.aspect = window.innerWidth / window.innerHeight;
			this.camera.updateProjectionMatrix();
			this.renderer.setSize( window.innerWidth, window.innerHeight );

		}.bind(this), false);
	}

	this.animate = function() {
		//console.log('now in animate: ', this);
		if (this!==window) {
			//this.plane1.rotation.y += 0.1;

			this.controls.update();
			//console.log('controls? ', this.controls);
			if (window.vrActive) {
				 //console.log('trying with plan1: ', this.plane1)
				 this.effect.render(this.scene, this.camera, this.plane1, this.plane2);
				 //console.log('rendering in VR mode');
			}
			else {
				this.renderer.render(this.scene, this.camera);	
			} 

			//console.log('animating...');
			this.frameId = window.requestAnimationFrame(this.animate.bind(this));
			
		}
	};

	this.getVRActive = function(){
		//console.log('vr active: ', mainScope.vrActive);
		return mainScope.vrActive;
	}



	return this;
} 


/*
ViewerScene.prototype = {
	initialise : function(container) {
		
	},
	animate : function() {
		
	}
}
*/
