var socket = io("https://d-watchonline.herokuapp.com", {
    transports: ["websocket"],
});
const vid = document.getElementById("player");

$("#start").click(function () {
    $("#start").hide();
    $("#player").show();
});

socket.on('connect', (io) => {
    socket.emit("new-user");
});


socket.on("new-user-connected", (d) => {
    Toastify({
        text: "Wahd zaml dkhl a chabab",
        duration: 1000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "left", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
    }).showToast();
});


document.body.onkeyup = function (e) {
    if (e.key == " " || e.code == "Space" || e.keyCode == 32) {
        if (vid.paused) {
            socket.emit("pause");
        } else {
            socket.emit("play", { time: vid.currentTime });
        }
    }
}

socket.on('paused', () => {
    vid.pause();
});

socket.on('played', ({ time }) => {
    console.log("tiime", vid.currentTime);
    vid.currentTime = time;
    vid.play();
});
