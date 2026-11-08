const droneContainer = document.getElementById("drone-sky");

// Do not create decorative animations when the container is absent or the
// visitor has requested reduced motion in their operating-system settings.
const prefersReducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!droneContainer || prefersReducedMotion) {
    // The rest of the website remains fully usable without this decoration.
} else {
    const droneColors = [
        "#00E5FF",
        "#A020F0",
        "#FF3CAC",
        "#4DFFFF",
        "#FFD700",
        "#00FF88",
        "#FF6B35",
        "#FFFFFF"
    ];

    // Use fewer animated elements on small screens to reduce mobile workload.
    const isSmallScreen = window.matchMedia("(max-width: 768px)").matches;
    const TOTAL_DRONES = isSmallScreen ? 35 : 100;

    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    function createDrone() {
        const drone = document.createElement("div");
        drone.classList.add("drone-fly");
        drone.textContent = "✦";
        droneContainer.appendChild(drone);
        animateDrone(drone);
    }

    function animateDrone(drone) {
        if (!drone.isConnected || document.hidden) return;

        const startX = random(0, window.innerWidth);
        const startY = random(0, window.innerHeight);
        const moveX = random(-400, 400);
        const moveY = random(-300, 300);
        const duration = random(10, 25);

        drone.style.left = startX + "px";
        drone.style.top = startY + "px";
        drone.style.color = droneColors[
            Math.floor(Math.random() * droneColors.length)
        ];
        drone.style.fontSize = random(4, 10) + "px";
        drone.style.opacity = "0";

        drone.animate(
            [
                { transform: "translate(0px,0px)", opacity: 0 },
                { opacity: 1, offset: 0.2 },
                {
                    transform: `translate(${moveX}px,${moveY}px)`,
                    opacity: 1,
                    offset: 0.8
                },
                { opacity: 0 }
            ],
            {
                duration: duration * 1000,
                easing: "linear"
            }
        );

        window.setTimeout(function () {
            animateDrone(drone);
        }, (duration + 3) * 1000);
    }

    for (let i = 0; i < TOTAL_DRONES; i++) {
        createDrone();
    }
}
