// Small helper to announce messages to an ARIA live region for screen readers.
export function announce(message: string) {
  const id = 'pomodoron-aria-live'
  let el = document.getElementById(id) as HTMLElement | null
  if (!el) {
    el = document.createElement('div')
    el.id = id
    el.setAttribute('aria-live', 'polite')
    el.setAttribute('role', 'status')
    el.style.position = 'absolute'
    el.style.width = '1px'
    el.style.height = '1px'
    el.style.overflow = 'hidden'
    el.style.clip = 'rect(1px, 1px, 1px, 1px)'
    document.body.appendChild(el)
  }
  // Clear then set to ensure assistive tech notices changes
  el.textContent = ''
  setTimeout(() => {
    el!.textContent = message
  }, 50)
}
