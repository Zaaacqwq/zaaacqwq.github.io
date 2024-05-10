document.addEventListener('DOMContentLoaded', function () {
    // Dynamically calculate center
    function updateCenter() {
        const canvas = document.getElementById('ak-canvas');

        const centerX = window.innerWidth / 2 - 100;
        const centerY = window.innerHeight / 2 - 125;

        // Create a new instance centered on the screen
        window.DameDaneParticleDemo = new DameDaneParticle(canvas, {
            src: './image/zac.png',
            renderX: centerX,
            renderY: centerY,
            w: 400,
            size: 1.2,
            spacing: 1.2,
            validColor: {
                min: 300,
                max: 765,
                invert: false
            },
            effectParticleMode: 'repulsion',
            Thickness: 25,
        });
    }

    // Initial update
    updateCenter();
    
    // window.addEventListener('resize', updateCenter);
    screenRight = window.innerWidth - screenLeft - 300;
    screenTop = window.innerHeight / 2 - 80;
});

// Update on resize
window.addEventListener('resize', function () {
    screenRight = window.innerWidth - screenLeft - 300;
    screenTop = window.innerHeight / 2 - 80;
    DameDaneParticleDemo.updateCenter(screenRight, screenTop);
});

// Function to update position
function updatePosition(position) {
    if (position === 'right') {
        // console.log('right');
        screenRight = window.innerWidth - screenLeft - 300;
        screenTop = window.innerHeight / 2 - 80;
    } else {    
        // console.log('left');
        screenRight = 50;
        screenTop = window.innerHeight / 2 - 80;
    }
    DameDaneParticleDemo.updateCenter(screenRight, screenTop);
}
window.updatePosition = updatePosition;

// Navigation
function about() {
    DameDaneParticleDemo.ChangeImg('./image/about.png', { w: 100, renderY: screenTop, renderX: screenRight })
}

function projects() {
    DameDaneParticleDemo.ChangeImg('./image/projects.png', { w: 100, renderY: screenTop, renderX: screenRight })
}

function blogs() {
    DameDaneParticleDemo.ChangeImg('./image/blogs.png', { w: 100, renderY: screenTop, renderX: screenRight })
}

function media() {
    DameDaneParticleDemo.ChangeImg('./image/media.png', { w: 100, renderY: screenTop, renderX: screenRight })
}

function home() {
    DameDaneParticleDemo.ChangeImg('./image/home.png', { w: 100, renderY: screenTop, renderX: screenRight })
}

function zac() {
    DameDaneParticleDemo.ChangeImg('./image/zac.png', { w: 300, renderY: centerY, renderX: centerX })
}