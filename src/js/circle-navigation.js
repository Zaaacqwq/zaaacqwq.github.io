document.addEventListener('DOMContentLoaded', function () {
    var links = [
        { label: 'About', changeImg: about, num: 0 },
        { label: 'Projects', changeImg: projects, num: 1 },
        { label: 'Blogs', changeImg: blogs, num: 2 },
        { label: 'Media', changeImg: media, num: 3 },
        { label: 'Home', changeImg: home, num: 4 },
    ];


    var circle = document.createElement('div');
    document.body.appendChild(circle);

    links.forEach((link, index) => {
        var linkElem = document.createElement('a');
        linkElem.href = '#';
        linkElem.innerText = link.label;
        linkElem.style.position = 'fixed';
        linkElem.style.right = '50px';
        linkElem.style.backgroundColor = link.bg;
        linkElem.style.padding = '5px 10px';
        linkElem.style.borderRadius = '20px';
        linkElem.style.whiteSpace = 'nowrap';
        linkElem.style.transition = 'transform 0.5s';
        linkElem.style.transition = 'right 0.5s, bottom 0.5s, font-size 1.5s, opacity 1.5s';
        document.body.appendChild(linkElem);
        links[index].elem = linkElem;
    });

    var startAngle = -90; // Starting angle in degrees

    var imageIndex = 0;
    var currentStep = Math.floor(links.length / 2);

    function positionLinksRight() {
        startAngle = -90;

        var windowHeight = window.innerHeight;
        var windowWidth = window.innerWidth;
        var offsetX = windowWidth - 100; // Adjust if needed to position closer or farther from the right edge
        var offsetY = windowHeight / 2; // Center vertically

        var ellipseRadiusX = 250; // Horizontal radius of the ellipse
        var ellipseRadiusY = 250; // Vertical radius of the ellipse, making it elongated

        var maxFontSize = 48; // Maximum font size for the center link
        var minFontSize = 12; // Minimum font size for the top/bottom links
        var maxOpacity = 1.0; // Full opacity
        var minOpacity = 0.5; // Dimmed opacity for top/bottom

        links.forEach((link, index) => {
            // Calculate the new index based on the current step
            var newIndex = (index + currentStep) % links.length;
            var angleDeg = startAngle + (newIndex * (180 / (links.length - 1)));
            var angleRad = angleDeg * (Math.PI / 180);

            // Calculate x and y using the ellipse radii
            var x = offsetX - ellipseRadiusX * Math.cos(angleRad); // Subtract from offsetX to move leftward for right alignment
            var y = offsetY + ellipseRadiusY * Math.sin(angleRad); // Add to offsetY to position vertically

            // Adjust the style to use calculated x and y
            link.elem.style.right = `${windowWidth - x}px`;
            link.elem.style.bottom = `${windowHeight - y}px`;
            link.elem.style.transition = 'right 1.0s, bottom 1.0s'; // Ensure smooth transition

            // Calculate dynamic font size and opacity
            var distanceFromVerticalCenter = Math.abs(y - offsetY);
            var fontSizeRange = maxFontSize - minFontSize;
            var opacityRange = maxOpacity - minOpacity;
            var fontSize = maxFontSize - (distanceFromVerticalCenter / ellipseRadiusY) * fontSizeRange;
            var opacity = maxOpacity - (distanceFromVerticalCenter / ellipseRadiusY) * opacityRange;

            link.elem.style.fontSize = `${fontSize}px`;
            link.elem.style.opacity = opacity.toString();
        });

        window.updateCameraPosition(600);
        window.updatePosition('right');
        document.getElementById('particlesjs-container').style.transform = 'translateX(100%)';
        document.getElementById('content-container').style.transform = 'translateX(100%)';
        document.getElementById('home-container').style.transform = 'translateX(0%)';

    }

    positionLinksRight();
    links[imageIndex].changeImg();

    function positionLinksLeft() {
        startAngle = 90;

        var windowHeight = window.innerHeight;
        var windowWidth = window.innerWidth;
        var offsetX = 100; // Adjust if needed to position closer or farther from the right edge
        var offsetY = windowHeight / 2; // Center vertically

        var ellipseRadiusX = 250; // Horizontal radius of the ellipse
        var ellipseRadiusY = 250; // Vertical radius of the ellipse, making it elongated

        var maxFontSize = 48; // Maximum font size for the center link
        var minFontSize = 12; // Minimum font size for the top/bottom links
        var maxOpacity = 1.0; // Full opacity
        var minOpacity = 0.5; // Dimmed opacity for top/bottom

        links.forEach((link, index) => {
            // Calculate the new index based on the current step
            var newIndex = (index + currentStep) % links.length;
            var angleDeg = startAngle + (newIndex * (180 / (links.length - 1)));
            var angleRad = angleDeg * (Math.PI / 180);

            // Calculate x and y using the ellipse radii
            var x = offsetX - ellipseRadiusX * Math.cos(angleRad); // Subtract from offsetX to move leftward for right alignment
            var y = offsetY + ellipseRadiusY * Math.sin(angleRad); // Add to offsetY to position vertically

            // Adjust the style to use calculated x and y
            link.elem.style.right = `${windowWidth - x}px`;
            link.elem.style.bottom = `${windowHeight - y}px`;
            link.elem.style.transition = 'right 1.0s, bottom 1.0s'; // Ensure smooth transition

            // Calculate dynamic font size and opacity
            var distanceFromVerticalCenter = Math.abs(y - offsetY);
            var fontSizeRange = maxFontSize - minFontSize;
            var opacityRange = maxOpacity - minOpacity;
            var fontSize = maxFontSize - (distanceFromVerticalCenter / ellipseRadiusY) * fontSizeRange;
            var opacity = maxOpacity - (distanceFromVerticalCenter / ellipseRadiusY) * opacityRange;

            link.elem.style.fontSize = `${fontSize}px`;
            link.elem.style.opacity = opacity.toString();
        });

        window.updateCameraPosition(2000);
        window.updatePosition('left');
        document.getElementById('particlesjs-container').style.transform = 'translateX(0%)';
        document.getElementById('content-container').style.transform = 'translateX(0%)';
        document.getElementById('home-container').style.transform = 'translateX(-100%)';
    }


    let allowScroll = true; // Local variable to track the scroll state

    // Listen for scrollControl events
    document.addEventListener('scrollControl', function (e) {
        allowScroll = e.detail.allowScroll;
    });

    
    document.addEventListener('wheel', function (e) {

        if (!allowScroll) {
            e.preventDefault(); // Prevent scrolling
            return; // Exit the function
        }

        e.preventDefault();

        currentStep += (e.deltaY < 0) ? -1 : 1;
        currentStep = (currentStep + links.length) % links.length;

        imageIndex += (e.deltaY < 0) ? 1 : -1;
        imageIndex = (imageIndex + links.length) % links.length;

        links[imageIndex].changeImg();

        // Assuming each link corresponds to a page and has a 'label' property.
        const navigateLabel = links[imageIndex].label;

        // Dispatch a custom navigate event with the label of the current page.
        const navigateEvent = new CustomEvent('navigate', { detail: { label: navigateLabel } });
        document.dispatchEvent(navigateEvent);

        if (startAngle === -90) {
            positionLinksRight();
        }
        else {
            positionLinksLeft();
        }


    }, { passive: false });


    links.forEach((link) => {
        link.elem.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Clicked on ' + link.label);

            const navigateEvent = new CustomEvent('navigate', { detail: { label: link.label } });
            document.dispatchEvent(navigateEvent);

            if (startAngle === -90) {
                positionLinksLeft();
            }
            else {
                positionLinksRight();
            }
        });
    });

    // window.addEventListener('click', function () {
    //     console.log('Clicked');
    // });

    window.addEventListener('resize', function () {
        windowHeight = window.innerHeight;
        if (startAngle === -90) {
            positionLinksRight();
        }
        else {
            positionLinksLeft();
        }
    });
});


