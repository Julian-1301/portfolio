<template>
  <div style="display: none;"></div>
</template>

<script setup>
import { onMounted, onUnmounted, watch, nextTick } from 'vue'
import {
  addInterval, addTimeout, addListener, removeAllDarkPatterns,
  setScrollJackingActive, setCursorTrailActive, setCursorTrailHandler
} from './DarkPatternsCore.js'

const props = defineProps({
  active: {
    type: Boolean,
    default: false
  }
})

let loadingBarInterval = null
let errorInterval = null
let socialProofInterval = null
let timerInterval = null
let consoleInterval = null
let fakeCaptchaTimeout = null
let sneakyPopupTimeout = null
let cookieBannerTimeout = null
let systemWarningTimeout = null
let scrollHandler = null
let mouseHandler = null

function activateAllPatterns() {
  if (!props.active) return

  // Pattern 1: Fake loading bar
  const bar = document.createElement('div')
  bar.id = 'dp-loading-bar'
  bar.style.cssText = `
    position: fixed; top: 0; left: 0; width: 0%; height: 3px;
    background: #ff0000; z-index: 10001; transition: width 0.05s linear;
  `
  document.body.appendChild(bar)
  let width = 0
  loadingBarInterval = addInterval(() => {
    width += Math.random() * 8
    if (width > 95) width = 95
    if (bar) bar.style.width = width + '%'
  }, 200)

  // Pattern 2: Floating errors
  const errors = ['Connection lost', 'Session expiring', 'Security risk', 'Memory critical', 'Network timeout']
  errorInterval = addInterval(() => {
    const err = document.createElement('div')
    err.className = 'dp-error'
    err.textContent = '⚠ ' + errors[Math.floor(Math.random() * errors.length)]
    err.style.cssText = `
      position: fixed; top: ${Math.random() * 70 + 10}%; right: 20px;
      background: #ff0000; color: white; padding: 6px 12px;
      font-size: 11px; z-index: 10000; font-family: monospace;
      border-radius: 4px;
    `
    document.body.appendChild(err)
    addTimeout(() => err.remove(), 2000)
  }, 4000)

  // Pattern 3: Sneaky popup
  sneakyPopupTimeout = addTimeout(() => {
    const popup = document.createElement('div')
    popup.id = 'dp-sneaky-popup'
    popup.innerHTML = `
      <div style="position: fixed; bottom: 20px; right: 20px; background: #1a1a1a;
                  border: 2px solid #ff0000; padding: 15px; border-radius: 8px; z-index: 10000;
                  box-shadow: 0 4px 20px rgba(0,0,0,0.3);">
        <p style="color: #ff0000; font-weight: bold; margin-bottom: 10px;">WARNING: Dark mode unstable</p>
        <p style="color: gray; font-size: 12px; margin-bottom: 10px;">Subscribe to keep dark mode enabled</p>
        <button id="popup-subscribe" style="background: #ff0000; border: none; padding: 6px 12px; color: white; cursor: pointer; border-radius: 4px;">Subscribe</button>
        <button id="popup-cancel" style="background: transparent; border: 1px solid gray; padding: 6px 12px; color: gray; margin-left: 8px; cursor: pointer; border-radius: 4px;">Later</button>
      </div>
    `
    document.body.appendChild(popup)
    popup.querySelector('#popup-subscribe')?.addEventListener('click', () => {
      alert('You will now receive 47 emails per day')
      popup.remove()
    })
    popup.querySelector('#popup-cancel')?.addEventListener('click', () => popup.remove())
  }, 2000)

  // Pattern 4: Cookie banner
  cookieBannerTimeout = addTimeout(() => {
    const banner = document.createElement('div')
    banner.id = 'dp-cookie-banner'
    banner.innerHTML = `
      <div style="position: fixed; bottom: 0; left: 0; right: 0; background: #1a1a1a;
                  border-top: 2px solid #ff0000; padding: 12px; text-align: center; z-index: 9999;">
        <p style="color: white; font-size: 12px; margin-bottom: 8px;">By using this site, you agree to sell your personal data</p>
        <button id="cookie-accept" style="background: #ff0000; border: none; padding: 6px 20px; color: white; cursor: pointer; border-radius: 4px;">Accept All</button>
      </div>
    `
    document.body.appendChild(banner)
    banner.querySelector('#cookie-accept')?.addEventListener('click', () => {
      alert('Your data has been shared with 847 partners')
      banner.remove()
    })
  }, 1000)

  // Pattern 5: Fake captcha
  fakeCaptchaTimeout = addTimeout(() => {
    const captcha = document.createElement('div')
    captcha.id = 'dp-fake-captcha'
    captcha.innerHTML = `
      <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
                  background: #1a1a1a; border: 2px solid #ff0000; padding: 20px; border-radius: 8px; z-index: 10002;">
        <p style="color: white; margin-bottom: 15px;">Please prove you are human</p>
        <button id="captcha-btn" style="background: #ff0000; border: none; padding: 8px 16px; color: white; cursor: pointer; border-radius: 4px;">I am not a robot</button>
      </div>
    `
    document.body.appendChild(captcha)
    let fails = 0
    const btn = captcha.querySelector('#captcha-btn')
    btn?.addEventListener('click', () => {
      fails++
      if (fails < 3) {
        btn.textContent = 'Verification failed, try again'
        btn.style.background = '#666'
      } else {
        captcha.remove()
      }
    })
  }, 4000)

  // Pattern 6: Scroll jacking
  scrollHandler = (e) => {
    if (Math.random() > 0.6) {
      e.preventDefault()
      window.scrollBy(0, e.deltaY * 0.3)
    }
  }
  window.addEventListener('wheel', scrollHandler, { passive: false })
  addListener(window, 'wheel', scrollHandler)
  setScrollJackingActive(true)

  // Pattern 7: Fake social proof
  const messages = ['5 people viewing now', '3 dark modes remaining', 'Popular right now', 'Limited availability']
  socialProofInterval = addInterval(() => {
    const proof = document.createElement('div')
    proof.className = 'dp-social-proof'
    proof.textContent = ' ' + messages[Math.floor(Math.random() * messages.length)]
    proof.style.cssText = `
      position: fixed; bottom: ${Math.random() * 60 + 10}px; left: 20px;
      background: #1a1a1a; border-left: 3px solid #ff0000; padding: 6px 12px;
      font-size: 11px; z-index: 9998; color: gray;
      font-family: monospace;
    `
    document.body.appendChild(proof)
    addTimeout(() => proof.remove(), 3000)
  }, 6000)

  // Pattern 8: Countdown timer
  let timeLeft = 300
  const timer = document.createElement('div')
  timer.id = 'dp-timer'
  timer.style.cssText = `
    position: fixed; top: 80px; right: 20px; background: #1a1a1a;
    border: 2px solid #ff0000; padding: 8px 12px; border-radius: 4px; z-index: 9999;
    text-align: center; font-family: monospace;
  `
  timer.innerHTML = `
    <div style="font-size: 9px; color: #ff0000;">OFFER EXPIRES IN</div>
    <div id="timer-display" style="font-size: 18px; font-weight: bold; color: white;">05:00</div>
  `
  document.body.appendChild(timer)
  timerInterval = addInterval(() => {
    const mins = Math.floor(timeLeft / 60)
    const secs = timeLeft % 60
    const display = timer.querySelector('#timer-display')
    if (display) display.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    if (timeLeft > 0) {
      timeLeft--
    } else {
      timeLeft = 300
    }
  }, 1000)

  // Pattern 9: System warning
  systemWarningTimeout = addTimeout(() => {
    const warning = document.createElement('div')
    warning.id = 'dp-system-warning'
    warning.innerHTML = `
      <div style="position: fixed; top: 80px; left: 20px; background: #1a1a1a;
                  border: 1px solid #ff0000; padding: 8px; border-radius: 4px; z-index: 9999; font-size: 10px;">
        <span style="color: #ff0000;">SYSTEM WARNING</span>
        <span style="color: gray;"> Dark mode may damage your screen</span>
        <button id="dismiss-warning" style="background: none; border: none; color: gray; margin-left: 8px; cursor: pointer;">x</button>
      </div>
    `
    document.body.appendChild(warning)
    warning.querySelector('#dismiss-warning')?.addEventListener('click', () => warning.remove())
  }, 1000)

  // Pattern 10: Cursor trail
  setCursorTrailActive(true)
  const createDot = (x, y) => {
    const dot = document.createElement('div')
    dot.className = 'dp-cursor-dot'
    dot.style.cssText = `
      position: fixed; width: 4px; height: 4px; background: #ff0000;
      border-radius: 50%; pointer-events: none; z-index: 10000;
      left: ${x - 2}px; top: ${y - 2}px;
    `
    document.body.appendChild(dot)
    addTimeout(() => dot.remove(), 500)
  }
  mouseHandler = (e) => {
    if (true) createDot(e.clientX, e.clientY)
  }
  window.addEventListener('mousemove', mouseHandler)
  addListener(window, 'mousemove', mouseHandler)
  setCursorTrailHandler(mouseHandler)

  // Pattern 11: Confirmation nag on links
  const nagHandler = (e) => {
    const link = e.currentTarget
    if (!link.hasAttribute('data-nagged')) {
      e.preventDefault()
      link.setAttribute('data-nagged', 'true')
      if (confirm('WARNING: Leaving this page may disable dark mode features. Continue anyway?')) {
        window.location.href = link.href
      } else {
        link.removeAttribute('data-nagged')
      }
    }
  }
  document.querySelectorAll('a[href^="#"], a[href^="http"]').forEach(link => {
    link.addEventListener('click', nagHandler)
    addListener(link, 'click', nagHandler)
  })

  // Pattern 12: Fake console activity
  const consoleMessages = ['Analyzing user behavior...', 'Collecting session data...', 'Selling data to advertisers...', 'Installing tracking pixels...']
  let msgIndex = 0
  consoleInterval = addInterval(() => {
    console.log('%c ' + consoleMessages[msgIndex % consoleMessages.length], 'color: #ff6b6b; font-style: italic')
    msgIndex++
  }, 4000)
}

function deactivateAllPatterns() {
  // Clear intervals
  if (loadingBarInterval) clearInterval(loadingBarInterval)
  if (errorInterval) clearInterval(errorInterval)
  if (socialProofInterval) clearInterval(socialProofInterval)
  if (timerInterval) clearInterval(timerInterval)
  if (consoleInterval) clearInterval(consoleInterval)

  // Clear timeouts
  if (fakeCaptchaTimeout) clearTimeout(fakeCaptchaTimeout)
  if (sneakyPopupTimeout) clearTimeout(sneakyPopupTimeout)
  if (cookieBannerTimeout) clearTimeout(cookieBannerTimeout)
  if (systemWarningTimeout) clearTimeout(systemWarningTimeout)

  // Remove scroll handler
  if (scrollHandler) {
    window.removeEventListener('wheel', scrollHandler)
  }

  // Remove mouse handler
  if (mouseHandler) {
    window.removeEventListener('mousemove', mouseHandler)
  }

  // Reset flags
  setScrollJackingActive(false)
  setCursorTrailActive(false)
  setCursorTrailHandler(null)

  removeAllDarkPatterns()
}

watch(() => props.active, (isActive) => {
  if (isActive) {
    // Small delay to ensure DOM is ready
    setTimeout(() => activateAllPatterns(), 100)
  } else {
    deactivateAllPatterns()
  }
}, { immediate: true })

onUnmounted(() => {
  deactivateAllPatterns()
})
</script>