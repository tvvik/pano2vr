window.addEventListener('load', function() {
	console.log('load');
	var vr = new VRViewer();
	vr.initialise('webGL');
	window.addEventListener('click', function(){
		//fullscreen();
	});
});

function fullscreen(divId) {
	var container = document.getElementById(divId); 

    if (container.requestFullscreen) {
        container.requestFullscreen();
    } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
    } else if (container.mozRequestFullScreen) {
        container.mozRequestFullScreen();
    } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
    }

    window.moveTo(0, 0);
	window.resizeTo(screen.availWidth, screen.availHeight);
}