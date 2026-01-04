// Heart Formula
function getHeartPoint(t) {
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = 13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t);
    return new THREE.Vector3(x * 0.1, y * 0.1, 0);
}

// Saturn Formula
function getSaturnPoint(i, count) {
    if (i < count * 0.4) { // Central Sphere
        const phi = Math.acos(-1 + (2 * i) / (count * 0.4));
        const theta = Math.sqrt(count * 0.4 * Math.PI) * phi;
        return new THREE.Vector3(Math.cos(theta) * Math.sin(phi), Math.sin(theta) * Math.sin(phi), Math.cos(phi));
    } else { // Outer Ring
        const angle = Math.random() * Math.PI * 2;
        const radius = 1.5 + Math.random() * 0.5;
        return new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, (Math.random()-0.5) * 0.1);
    }
}
const hands = new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
});

hands.onResults((results) => {
    if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const landmarks = results.multiHandLandmarks[0];
        
        // Pinch Logic (Index Tip to Thumb Tip distance)
        const dx = landmarks[8].x - landmarks[4].x;
        const dy = landmarks[8].y - landmarks[4].y;
        const distance = Math.sqrt(dx*dx + dy*dy);
        
        // Global variables for Three.js to use
        particleExpansion = distance * 10; 
        targetX = (landmarks[9].x - 0.5) * 10; // Palm move
        targetY = -(landmarks[9].y - 0.5) * 10;
    }
});