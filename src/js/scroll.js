document.addEventListener('DOMContentLoaded', function () {
    const contentContainer = document.getElementById('react-root'); // Your content container's ID
    var allowScroll = true;

    function disableScrolling() {
        allowScroll = false;
        document.dispatchEvent(new CustomEvent('scrollControl', { detail: { allowScroll: false } }));
    }
    
    function enableScrolling() {
        allowScroll = true;
        document.dispatchEvent(new CustomEvent('scrollControl', { detail: { allowScroll: true } }));
    }
    
    contentContainer.addEventListener('mouseenter', disableScrolling);
    contentContainer.addEventListener('mouseleave', enableScrolling);

    
});
