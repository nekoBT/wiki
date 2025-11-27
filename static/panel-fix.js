function initializePanelFix() {
    // Disconnect existing observer if it exists
    if (window.panelFixObserver) {
        window.panelFixObserver.disconnect();
    }

    window.panelFixObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                const element = mutation.target;
                const height = element.style.height;
                
                if (height === '0px') {
                    element.classList.remove('height-override');
                } else if (height && height !== '0px') {
                    element.classList.add('height-override');
                }
            }
        });
    });

    const elements = document.querySelectorAll('.collapse-content.overflow-hidden.transition-all.duration-200.ease-out');

    console.log('Observing', elements.length, 'elements for style changes.');
    console.log(elements)

    elements.forEach((element) => {
        element.dataset.panelFixObserved = 'true';
        
        window.panelFixObserver.observe(element, {
            attributes: true,
            attributeFilter: ['style']
        });
        
        // Initial check
        const height = element.style.height;
        if (height === '0px') {
            element.classList.remove('height-override');
        } else if (height && height !== '0px') {
            element.classList.add('height-override');
        }
    });
}

// Run on initial load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializePanelFix);
} else {
    initializePanelFix();
}

// Use interval to check for new elements
function startPageWatcher() {
    // Clear existing interval if it exists
    if (window.pageWatcherInterval) {
        clearInterval(window.pageWatcherInterval);
    }
    
    window.pageWatcherInterval = setInterval(() => {
        const elements = document.querySelectorAll('.collapse-content.overflow-hidden.transition-all.duration-200.ease-out:not([data-panel-fix-observed])');
        if (elements.length > 0) {
            console.log('Detected new elements, reinitializing panel fix');
            initializePanelFix();
        }
    }, 1000); // Check every second
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startPageWatcher);
} else {
    startPageWatcher();
}

// Listen for navigation events (for SPAs)
window.addEventListener('popstate', initializePanelFix);
window.addEventListener('hashchange', initializePanelFix);
