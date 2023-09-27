import { useEffect, useState } from "react";
import { User } from "../types";

export function useUser() {
  const [user, setUser] = useState<User>()

  useEffect(() => {
    // Replace this with a call to /api/user
    setUser({
      name: 'John Doe',
      email: 'a@example.com',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      id: '1',
    })
  }, [])

  return user
}