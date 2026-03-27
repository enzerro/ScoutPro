import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"

/**
 * Triggers a full browser reload whenever the pathname changes.
 * Skipped on the very first mount so the initial page load is not double-reloaded.
 *
 * Usage: call once inside AppShell (inside BrowserRouter context).
 */
export function usePageReload() {
  const location = useLocation()
  const prevPathname = useRef<string | null>(null)
  const isMounted = useRef(false)

  useEffect(() => {
    // Skip the very first render — no previous route to compare against.
    if (!isMounted.current) {
      isMounted.current = true
      prevPathname.current = location.pathname
      return
    }

    // Only reload when the pathname actually changes (ignore query/hash-only changes).
    if (prevPathname.current !== location.pathname) {
      // Use window.location.assign so the browser performs a true HTTP reload,
      // giving each page a completely clean JS/DOM state.
      window.location.assign(location.pathname + location.search + location.hash)
    }
  }, [location.pathname, location.search, location.hash])
}
