const elements = document.querySelectorAll(".team-card");

window.addEventListener("scroll", () => {
    elements.forEach(el => {
        const position = el.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;

        if (position < screenPosition) {
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
        }
    });
});
let speed = 0;

function increaseSpeed() {
    if (speed < 300) {
        speed += 20;
    }

    let rotation = (speed / 300) * 180 - 90;

    document.getElementById("needle").style.transform =
        "rotate(" + rotation + "deg)";

    document.getElementById("speedText").innerText =
        speed + " km/h";
}
let rpm = 0;
let lap = 1;

function simulateTelemetry() {

    // RPM Simulation
    rpm = Math.floor(Math.random() * 15000);
    let rpmPercent = (rpm / 15000) * 100;

    document.getElementById("rpmFill").style.width =
        rpmPercent + "%";

    document.getElementById("rpmText").innerText =
        "RPM: " + rpm;

    // LED Telemetry Lights
    let leds = document.querySelectorAll(".led");

    leds.forEach((led, index) => {
        if (index < rpmPercent / 20) {
            led.style.background = "red";
            led.style.boxShadow = "0 0 10px red";
        } else {
            led.style.background = "#111";
            led.style.boxShadow = "none";
        }
    });

    // DRS Status
    if (rpm > 10000) {
        document.getElementById("drsStatus").innerText = "ON";
        document.getElementById("drsStatus").style.color = "#00ff00";
    } else {
        document.getElementById("drsStatus").innerText = "OFF";
        document.getElementById("drsStatus").style.color = "red";
    }

    // Sector Time Animation
    let sectorTime = (Math.random() * 30 + 20).toFixed(3);
    document.getElementById("sectorTime").innerText = sectorTime;

    // Lap Counter
    lap++;
    document.getElementById("lapCount").innerText = lap;
}
let RPM = 0;
let direction = 1;
let LAP = 1;

let canvas = document.getElementById("telemetryGraph");
let ctx = canvas.getContext("2d");

let dataPoints = [];

function updateTelemetry() {

    // Reverse RPM logic
    if (rpm >= 15000) direction = -1;
    if (rpm <= 1000) direction = 1;

    rpm += 300 * direction;

    let percent = (rpm / 15000) * 100;
    document.getElementById("rpmBar").style.width = percent + "%";
    document.getElementById("rpmValue").innerText = "RPM: " + rpm;

    // DRS Logic
    if (rpm > 11000) {
        document.getElementById("drsLight").innerText = "ON";
        document.getElementById("drsLight").style.color = "#00ff00";
    } else {
        document.getElementById("drsLight").innerText = "OFF";
        document.getElementById("drsLight").style.color = "red";
    }

    // Lap Counter
    if (rpm >= 14000 && direction === -1) {
        lap++;
        document.getElementById("lapCounter").innerText = lap;
    }

    // Update Graph
    dataPoints.push(rpm);
    if (dataPoints.length > 50) dataPoints.shift();

    drawGraph();
}

function drawGraph() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.strokeStyle = "#00f7ff";
    ctx.lineWidth = 2;

    for (let i = 0; i < dataPoints.length; i++) {
        let x = i * 10;
        let y = canvas.height - (dataPoints[i] / 15000) * canvas.height;

        if (i === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    }

    ctx.stroke();
}

// Real-time loop

setInterval(updateTelemetry, 100);
let aiControl = document.getElementById("aiControl");

if (aiControl) {

    if (rpm > 13000) {
        aiControl.innerText = "AI: PUSH MODE ACTIVATED";
        aiControl.style.color = "#00ffcc";
    }
    else if (rpm < 3000) {
        aiControl.innerText = "AI: LOW POWER MODE";
        aiControl.style.color = "orange";
    }
    else {
        aiControl.innerText = "AI: STABLE TELEMETRY";
        aiControl.style.color = "white";
    }

}
function randomSectorTime(id) {
  let time = (Math.random() * 30).toFixed(3);
  let element = document.getElementById(id);
  element.innerText = id.toUpperCase() + ": " + time;

  element.classList.remove("purple");

  if (Math.random() > 0.7) {
    element.classList.add("purple");
  }
}

setInterval(() => {
  randomSectorTime("sector1");
  randomSectorTime("sector2");
  randomSectorTime("sector3");
}, 3000);

if (rpm > 13500) {
    rpmBar.style.boxShadow = "0 0 25px red";
} else {
    rpmBar.style.boxShadow = "0 0 10px #00ffcc";
}let drsZoneActive = false;
// Simulate DRS Zone between RPM 9000 - 12000
if (rpm > 9000 && rpm < 12000) {
    drsZoneActive = true;
} else {
    drsZoneActive = false;
}// Only allow DRS if zone active
if ((rpm > 11000 && drsZoneActive) || drsManual) {
    drsLight.innerText = "ON";
    drsLight.classList.add("on");
    drsLight.classList.remove("off");
} else {
    drsLight.innerText = "OFF";
    drsLight.classList.add("off");
    drsLight.classList.remove("on");
}let rpmCircle = document.getElementById("rpmCircle");
let rpmText = document.getElementById("rpmText");

let maxRPM = 15000;
let circumference = 502;

let offset = circumference - (rpm / maxRPM) * circumference;
rpmCircle.style.strokeDashoffset = offset;
rpmText.innerText = rpm + " RPM";

if (rpm > 13000) {
  rpmCircle.style.stroke = "red";
} else if (rpm > 9000) {
  rpmCircle.style.stroke = "orange";
} else {
  rpmCircle.style.stroke = "#00f7ff";
}
let selector = document.getElementById("teamSelector");

selector.addEventListener("change", function () {
  if (this.value === "ferrari") {
    document.body.style.color = "red";
  }
  else if (this.value === "mercedes") {
    document.body.style.color = "#00f7ff";
  }
  else if (this.value === "redbull") {
    document.body.style.color = "#1e3cff";
  }
  else {
    document.body.style.color = "white";
  }
});



