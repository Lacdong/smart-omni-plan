import React from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import { UnauthorizedPage } from '@/pages/public/UnauthorizedPage'

export function ProtectedRoute({ children }) {
  const location = useLocation()
  const { canAccessRoute } = useAuth()

  const isAllowed = canAccessRoute(location.pathname)

  if (!isAllowed) {
    return <UnauthorizedPage />
  }

  return children
}
