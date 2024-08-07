let logText = '';
let cachedIndex = [];
// Function to log the content of the child nodes based on the data-list-index attribute
function logChildContent() {
    const divs = document.querySelectorAll('div.ms-List-page div[role="presentation"].ms-List-cell[data-list-index]');
    divs.forEach(div => {
        const index = div.getAttribute('data-list-index');
        if (index in cachedIndex) { return; }
        cachedIndex.push(index);
        const timestampSpan = document.querySelector(`span#timestampSpeakerAriaLabel-${index}`);
        const subEntryDiv = document.querySelector(`div#sub-entry-${index}`);
        if (timestampSpan && subEntryDiv) {
            const timestampText = timestampSpan.textContent;
            const subEntryText = subEntryDiv.textContent;
            logText += `index: ${index} ${timestampText}: ${subEntryText}\n\n`;
        }
    });
}

// Run the function initially to log existing divs
logChildContent();

// Create a MutationObserver to watch for new ms-List-page divs being added
const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
                // Check if the added node or any of its descendants match the ms-List-page class
                if (node.classList.contains('ms-List-page') || node.querySelector('.ms-List-page')) {
                    // Log child content for all matching divs within the new ms-List-page
                    logChildContent();
                }
            }
        });
    });
});

// Start observing the document for changes in the DOM
observer.observe(document.body, {
    childList: true,
    subtree: true
});


function continuouslyScrollElement(element, scrollAmount, interval) {
    let scrollInterval = setInterval(() => {
        element.scrollBy(0, scrollAmount);
    }, interval);

    // Store the interval ID in the element's dataset for later access
    element.dataset.scrollInterval = scrollInterval;
}

// Function to stop scrolling the element
function stopScrollingElement(element) {
    if (element.dataset.scrollInterval) {
        clearInterval(element.dataset.scrollInterval);
        delete element.dataset.scrollInterval;
    }
}

// Select the div with id "scrollToTargetTargetedFocusZone"
let scrollableElement = document.querySelector('#scrollToTargetTargetedFocusZone');


if (scrollableElement) {
    continuouslyScrollElement(scrollableElement, 100, 20);

    // Stop scrolling after 100 seconds
    setTimeout(() => {
        stopScrollingElement(scrollableElement);
    }, 100000);
} else {
    console.log('Element with id "scrollToTargetedFocusZone" not found');
}