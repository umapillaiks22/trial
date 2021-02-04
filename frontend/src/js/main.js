"use strict";

// Change Eyes closed threshold value for future use.

let eyesClosedThreshold = 0.65; // For 65% open eyes.
let timeThreshold = 500; // For 0.5 seconds;

let lastClosedTime,
  continuous = false;
let alarm = document.getElementById("alarm");
let content = document.getElementById("content");
let body = document.querySelector("body");

(function($) {

	"use strict";

	var fullHeight = function() {

		$('.js-fullheight').css('height', $(window).height());
		$(window).resize(function(){
			$('.js-fullheight').css('height', $(window).height());
		});

	};
	fullHeight();

	$('#sidebarCollapse').on('click', function () {
      $('#sidebar').toggleClass('active');
  });

})(jQuery);

//entry point :
function main() {
  document.getElementById("wrapper").style.setProperty("display", "none", "important");
  JEEFACETRANSFERAPI.init({
    canvasId: "canvas",
    NNCpath: "src/model/",
    callbackReady: function(errCode) {
      if (errCode) {
        console.log(
          "ERROR - cannot init JEEFACETRANSFERAPI. errCode =",
          errCode
        );
        errorCallback(errCode);
        return;
      }
      console.log("INFO : JEEFACETRANSFERAPI is ready !!!");
      successCallback();
    } //end callbackReady()
  });
} //end main()

function successCallback() {
  // Call next frame
  document.getElementById("full-page-loader").style.display = "none";
  document.getElementById("wrapper").style.setProperty("display", "flex", "important");
  nextFrame();
  // Add code after API is ready.
}

function errorCallback(errorCode) {
  // Add code to handle the error
  alert("Cannot work without camera. Check if the camera is attached.");
}

function nextFrame() {
  let deltaTime = Date.now() - lastClosedTime;
  if (deltaTime > timeThreshold && continuous) {
    start_alarm();
    body.style.background = "#f00";
    content.id = "content-warn"
  } else {
    stop_alarm();
    body.style.background = "#fff";
    content.id = "content"
  }

  if (JEEFACETRANSFERAPI.is_detected()) {
    let expressions = JEEFACETRANSFERAPI.get_morphTargetInfluences();
    if (
      expressions[8] >= eyesClosedThreshold && // For left and right eye
      expressions[9] >= eyesClosedThreshold
    ) {
      if (lastClosedTime === undefined || !continuous)
        lastClosedTime = Date.now(); // Now is the new time
      continuous = true;
    } else {
      continuous = false;
    }

  } else {
    continuous = false;
  }
  requestAnimationFrame(nextFrame);
}

let input = document.getElementById("hrs");
let submit = document.getElementById("sub");
input.oninput = function(e) {
  let hr = 2
  hr = parseInt(e.target.value)
  console.log(hr)

  if (hr > 2 ) {
    submit.disabled = false
  } else {
    submit.disabled = true
  }
}