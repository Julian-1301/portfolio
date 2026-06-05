// Store all active patterns for cleanup
let activeIntervals = []
let activeTimeouts = []
let activeListeners = []
let scrollJackingActive = false
let cursorTrailActive = false
let cursorTrailHandler = null

export function addInterval(fn, ms) {
    const id = setInterval(fn, ms)
    activeIntervals.push(id)
    return id
}

export function addTimeout(fn, ms) {
    const id = setTimeout(fn, ms)
    activeTimeouts.push(id)
    return id
}

export function addListener(element, type, handler) {
    element.addEventListener(type, handler)
    activeListeners.push({ element, type, handler })
}

export function setScrollJackingActive(value) {
    scrollJackingActive = value
}

export function isScrollJackingActive() {
    return scrollJackingActive
}

export function setCursorTrailActive(value) {
    cursorTrailActive = value
}

export function isCursorTrailActive() {
    return cursorTrailActive
}

export function setCursorTrailHandler(handler) {
    cursorTrailHandler = handler
}

export function getCursorTrailHandler() {
    return cursorTrailHandler
}

export function removeAllDarkPatterns() {
    // Clear intervals
    activeIntervals.forEach(id => clearInterval(id))
    activeIntervals = []

    // Clear timeouts
    activeTimeouts.forEach(id => clearTimeout(id))
    activeTimeouts = []

    // Remove event listeners
    activeListeners.forEach(({ element, type, handler }) => {
        element.removeEventListener(type, handler)
    })
    activeListeners = []

    // Reset flags
    scrollJackingActive = false
    cursorTrailActive = false
    cursorTrailHandler = null

    // Remove DOM elements by ID
    const ids = [
        'dp-loading-bar', 'dp-sneaky-popup', 'dp-cookie-banner',
        'dp-fake-captcha', 'dp-timer', 'dp-system-warning'
    ]
    ids.forEach(id => {
        const el = document.getElementById(id)
        if (el) el.remove()
    })

    // Remove by class
    document.querySelectorAll('.dp-error, .dp-social-proof, .dp-low-stock, .dp-cursor-dot').forEach(el => el.remove())

    // Reset body
    document.body.style.backdropFilter = ''

    // Reset any modified buttons
    document.querySelectorAll('[data-original-text]').forEach(el => {
        el.textContent = el.getAttribute('data-original-text')
        el.removeAttribute('data-original-text')
        el.removeAttribute('data-fee-added')
    })

    // Reset links
    document.querySelectorAll('[data-nagged]').forEach(el => {
        el.removeAttribute('data-nagged')
    })
}