export async function playBell(url?: string): Promise<boolean> {
  try {
    if (!url) return false
    const audio = new Audio(url)
    await audio.play()
    return true
  } catch {
    return false
  }
}
