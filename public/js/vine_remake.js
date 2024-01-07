function changeHeaderText(tagName) {
	var h3 = document.getElementsByClassName('channel-module-name')[0];
	h3.textContent = tagName;
}
function resetHeaderText(resetText) {
	var h3 = document.getElementsByClassName('channel-module-name')[0];
	h3.textContent = resetText || "Placeholder";
}

var channels = document.querySelectorAll('.channel-badge');
channels.forEach(function(channel) {
  channel.addEventListener("mouseover", function() {
    changeHeaderText(channel.getAttribute('alt'));
  });
  channel.addEventListener("mouseout", function() {
    resetHeaderText("Channels");
  });
});

try {var upload_btn = document.getElementById("upload_btn");
upload_btn.addEventListener("click", function() {
	location.href='/upload';
})} catch (e){};
if(location.pathname=='/upload') {
	document.getElementById("explore-sidebar").style['display'] = 'none';
}