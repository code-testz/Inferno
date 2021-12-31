function go() {
var search = document.getElementById("search")
if (search.value !== "") {
window.location.href = "/go/gateway?url=" + search.value
search.value = ""
}
}

window.onload = function() {
search = document.getElementById("search");
search.addEventListener('keyup', function onEvent(e) {
    if (e.keyCode === 13) {
        go(search.value)
    }
});
}