/**
 * @author alteredq / http://alteredqualia.com/
 * @authod mrdoob / http://mrdoob.com/
 * @authod arodic / http://aleksandarrodic.com/
 * @authod fonserbc / http://fonserbc.github.io/
*/


	THREE.StereoEffect = function (renderer, plan1, plan2) {

		var _stereo = new THREE.StereoCamera();
		_stereo.aspect = 0.5;
		//console.log('plan in init: ', plan1);
		this.renderer = renderer;
		this.plan1 = plan1;
		this.plan2 = plan2;
		

		this.setEyeSeparation = function ( eyeSep ) {

			_stereo.eyeSep = eyeSep;

		};

		this.setSize = function ( width, height ) {

			this.renderer.setSize( width, height );

		};

		this.render = function ( scene, camera, plane1, plane2) {

			scene.updateMatrixWorld();

			if ( camera.parent === null ) camera.updateMatrixWorld();

			_stereo.update( camera );

			var size = this.renderer.getSize();

			this.renderer.clear();
			this.renderer.setScissorTest( true );

			this.renderer.setScissor( 0, 0, size.width / 2, size.height );
			this.renderer.setViewport( 0, 0, size.width / 2, size.height );
			this.plan1.visible = true;
			this.plan2.visible = false;
			this.renderer.render( scene, _stereo.cameraL );

			this.renderer.setScissor( size.width / 2, 0, size.width / 2, size.height );
			this.renderer.setViewport( size.width / 2, 0, size.width / 2, size.height );
			this.plan1.visible = false;
			this.plan2.visible = true;
			this.renderer.render( scene, _stereo.cameraR );

			this.renderer.setScissorTest( false );

		};
	};