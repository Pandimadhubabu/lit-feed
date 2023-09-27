import { useEffect, useState } from "react"
import { Feed } from "../types"

export function useFeeds({ userId }: { userId?: string }) {
  const [sources, setSources] = useState<Feed[]>([])

  useEffect(() => {
    // Replace this with a call to /api/feed
    setSources([
      { id: '1', name: 'Stackoverflow Blog', link: '#' },
      { id: '2', name: 'Hacker News', link: '#' },
      { id: '3', name: 'Martin Fowler', link: '#' },
    ])
  }, [])

  return sources
}