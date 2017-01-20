var VRViewer = function(container) {
	this.container = null;//document.getElementById(container);
	this.sceneView = null;
	return this;
} 

VRViewer.prototype = {
	initialise : function(container) {
		this.container = document.getElementById(container);

		this.sceneView = new ViewerScene();
		this.sceneView.initialise(this.container);
		this.sceneView.addMainEvents();
		this.sceneView.animate();
		//console.log('started: ', this.sceneView);
	}	
}

