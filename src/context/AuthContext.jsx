import React, { createContext, useContext, useState, useEffect } from 'react'

/* Simulated Accounts Based on ROLE.md */
export const SIMULATED_ACCOUNTS = {
  CUSTOMER: {
    id: 'usr-customer-01',
    name: 'Nguyễn Văn An (Khách hàng)',
    email: 'customer@gmail.com',
    role: 'CUSTOMER',
    roleLabel: 'Khách hàng',
    roleBadgeColor: 'bg-emerald-500',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    tenantId: 'public',
    planTier: 'FREE',
    defaultRoute: '/storefront',
  },
  MANAGER: {
    id: 'usr-mgr-02',
    name: 'Trần Thu Hà (Manager Ops)',
    email: 'manager@hxvf123.vn',
    role: 'MANAGER',
    roleLabel: 'Manager Vận hành',
    roleBadgeColor: 'bg-indigo-600',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    tenantId: 't-hxvf123',
    planTier: 'PRO',
    defaultRoute: '/admin/orders',
  },
  TENANT_ADMIN: {
    id: 'usr-admin-03',
    name: 'Lê Hoàng Nam (Tenant Admin)',
    email: 'tenantadmin@hxvf123.vn',
    role: 'TENANT_ADMIN',
    roleLabel: 'Tenant Admin',
    roleBadgeColor: 'bg-purple-600',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    tenantId: 't-hxvf123',
    planTier: 'PRO',
    defaultRoute: '/admin/dashboard',
  },
  SUPER_ADMIN: {
    id: 'usr-super-04',
    name: 'Phạm Quốc Bảo (Super Admin)',
    email: 'superadmin@smartomni.vn',
    role: 'SUPER_ADMIN',
    roleLabel: 'Super Admin',
    roleBadgeColor: 'bg-rose-600',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    tenantId: 'SYSTEM',
    planTier: 'ENTERPRISE',
    defaultRoute: '/superadmin/dashboard',
  },
}

/* RBAC Permission Matrix according to ROLE.md */
const ROLE_PERMISSIONS = {
  CUSTOMER: {
    allowedRoutes: ['/', '/login', '/storefront', '/storefront/*'],
    allowedScreens: ['SCR-20', 'SCR-21', 'SCR-22', 'SCR-23'],
  },
  MANAGER: {
    allowedRoutes: [
      '/',
      '/login',
      '/storefront',
      '/storefront/*',
      '/admin/dashboard',
      '/admin/orders',
      '/admin/orders/*',
      '/admin/inventory',
      '/admin/inventory/*',
      '/admin/products',
      '/admin/products/*',
      '/admin/ai/forecast',
      '/admin/ai/forecast/*',
    ],
    forbiddenRoutes: ['/admin/settings/staff', '/superadmin/*'],
    allowedScreens: ['SCR-10', 'SCR-20', 'SCR-21', 'SCR-23', 'SCR-30', 'SCR-31', 'SCR-40', 'SCR-41', 'SCR-50', 'SCR-51', 'SCR-52', 'SCR-60', 'SCR-61'],
  },
  TENANT_ADMIN: {
    allowedRoutes: [
      '/',
      '/login',
      '/onboarding/*',
      '/storefront',
      '/storefront/*',
      '/admin/*',
    ],
    forbiddenRoutes: ['/superadmin/*'],
    allowedScreens: ['SCR-00', 'SCR-01', 'SCR-02', 'SCR-03', 'SCR-04', 'SCR-05', 'SCR-10', 'SCR-19', 'SCR-20', 'SCR-21', 'SCR-23', 'SCR-30', 'SCR-31', 'SCR-40', 'SCR-41', 'SCR-50', 'SCR-51', 'SCR-52', 'SCR-60', 'SCR-61', 'SCR-62'],
  },
  SUPER_ADMIN: {
    allowedRoutes: [
      '/',
      '/login',
      '/storefront',
      '/storefront/*',
      '/superadmin/*',
    ],
    forbiddenRoutes: ['/admin/*', '/onboarding/*'],
    allowedScreens: ['SCR-20', 'SCR-21', 'SCR-70', 'SCR-71', 'SCR-72', 'SCR-73'],
  },
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('smartomni_user')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (parsed !== undefined) return parsed
      } catch (e) {
        // fallback
      }
    }
    return null
  })

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('smartomni_user', JSON.stringify(currentUser))
    } else {
      localStorage.removeItem('smartomni_user')
    }
  }, [currentUser])

  // Login as a role or account key
  const loginAsRole = (roleKey) => {
    const targetUser = SIMULATED_ACCOUNTS[roleKey] || SIMULATED_ACCOUNTS.TENANT_ADMIN
    setCurrentUser(targetUser)
    return targetUser.defaultRoute
  }

  // Logout
  const logout = () => {
    setCurrentUser(null)
  }

  // Check route permission for current user
  const canAccessRoute = (pathname) => {
    if (!currentUser) {
      const publicRoutes = ['/', '/login', '/onboarding/*', '/storefront', '/storefront/*']
      for (const pattern of publicRoutes) {
        if (matchPattern(pattern, pathname)) return true
      }
      return false
    }
    const role = currentUser.role
    const permissions = ROLE_PERMISSIONS[role]
    if (!permissions) return false

    // Check explicit forbidden routes first
    if (permissions.forbiddenRoutes) {
      for (const pattern of permissions.forbiddenRoutes) {
        if (matchPattern(pattern, pathname)) return false
      }
    }

    // Check allowed routes
    if (permissions.allowedRoutes) {
      for (const pattern of permissions.allowedRoutes) {
        if (matchPattern(pattern, pathname)) return true
      }
    }

    return false
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        SIMULATED_ACCOUNTS,
        loginAsRole,
        logout,
        canAccessRoute,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}

function matchPattern(pattern, pathname) {
  if (pattern === pathname) return true
  if (pattern.endsWith('/*')) {
    const prefix = pattern.slice(0, -2)
    return pathname.startsWith(prefix)
  }
  return false
}
