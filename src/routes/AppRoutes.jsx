import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ERPLayout } from '@/layouts/ERPLayout'
import { OnboardingLayout } from '@/layouts/OnboardingLayout'
import { StorefrontLayout } from '@/layouts/StorefrontLayout'
import { SuperAdminLayout } from '@/layouts/SuperAdminLayout'

// Protected Route Guard
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { UnauthorizedPage } from '@/pages/public/UnauthorizedPage'

// Demonstration Pages
import { LandingPage } from '@/pages/public/LandingPage/LandingPage'
import { Login } from '@/pages/public/Login/Login'
import { OnboardingRegisterPage } from '@/pages/onboarding/OnboardingRegisterPage'
import { OnboardingPlanPage } from '@/pages/onboarding/OnboardingPlanPage'
import { OnboardingMarketplacePage } from '@/pages/onboarding/OnboardingMarketplacePage'
import { OnboardingImportPage } from '@/pages/onboarding/OnboardingImportPage'
import { OnboardingOtpPage } from '@/pages/onboarding/OnboardingOtpPage'
import { OnboardingCustomerSuccessPage } from '@/pages/onboarding/OnboardingCustomerSuccessPage'
import { OnboardingCompletePage } from '@/pages/onboarding/OnboardingCompletePage'
import { ErpDashboardPage } from '@/pages/erp/ErpDashboardPage'
import { StorefrontCatalogPage } from '@/pages/storefront/StorefrontCatalogPage'
import { ProductDetailPage } from '@/pages/storefront/ProductDetailPage'
import { OrderLookupPage } from '@/pages/storefront/OrderLookupPage'
import { SuperAdminDashboardPage } from '@/pages/superadmin/SuperAdminDashboardPage'
import { ErpOrdersPage } from '@/pages/erp/ErpOrdersPage'
import { ErpOrderDetailPage } from '@/pages/erp/ErpOrderDetailPage'
import { ErpInventoryPage } from '@/pages/erp/ErpInventoryPage'
import { ErpOutboxLogsPage } from '@/pages/erp/ErpOutboxLogsPage'
import { ErpProductsPage } from '@/pages/erp/ErpProductsPage'
import { ErpProductFormPage } from '@/pages/erp/ErpProductFormPage'
import { ErpAiForecastPage } from '@/pages/erp/ErpAiForecastPage'
import { ErpAiForecastDetailPage } from '@/pages/erp/ErpAiForecastDetailPage'
import { ErpAiMegaSaleFormPage } from '@/pages/erp/ErpAiMegaSaleFormPage'
import { ErpStaffSubscriptionPage } from '@/pages/erp/ErpStaffSubscriptionPage'
import { SuperAdminTenantManagementPage } from '@/pages/superadmin/SuperAdminTenantManagementPage'
import { SuperAdminPricingConfigPage } from '@/pages/superadmin/SuperAdminPricingConfigPage'
import { SuperAdminApmLogsPage } from '@/pages/superadmin/SuperAdminApmLogsPage'

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/unauthorized" element={<UnauthorizedPage />} />

      {/* Domain 1: Tenant Onboarding Portal */}
      <Route element={<ProtectedRoute><OnboardingLayout /></ProtectedRoute>}>
        <Route path="/onboarding/register" element={<OnboardingRegisterPage />} />
        <Route path="/onboarding/plan" element={<OnboardingPlanPage />} />
        <Route path="/onboarding/marketplace" element={<OnboardingMarketplacePage />} />
        <Route path="/onboarding/import" element={<OnboardingImportPage />} />
        <Route path="/onboarding/otp" element={<OnboardingOtpPage />} />
        <Route path="/onboarding/customer-success" element={<OnboardingCustomerSuccessPage />} />
        <Route path="/onboarding/complete" element={<OnboardingCompletePage />} />
      </Route>

      {/* Domain 2: Admin ERP Dashboard */}
      <Route element={<ProtectedRoute><ERPLayout /></ProtectedRoute>}>
        <Route path="/admin/dashboard" element={<ErpDashboardPage />} />
        <Route path="/admin/orders" element={<ErpOrdersPage />} />
        <Route path="/admin/orders/:orderId" element={<ErpOrderDetailPage />} />
        <Route path="/admin/inventory" element={<ErpInventoryPage />} />
        <Route path="/admin/inventory/logs" element={<ErpOutboxLogsPage />} />
        <Route path="/admin/products" element={<ErpProductsPage />} />
        <Route path="/admin/products/new" element={<ErpProductFormPage />} />
        <Route path="/admin/products/edit/:sku" element={<ErpProductFormPage />} />
        <Route path="/admin/ai/forecast" element={<ErpAiForecastPage />} />
        <Route path="/admin/ai/forecast/:sku" element={<ErpAiForecastDetailPage />} />
        <Route path="/admin/ai/mega-sale" element={<ErpAiMegaSaleFormPage />} />
        <Route path="/admin/settings/staff" element={<ErpStaffSubscriptionPage />} />
      </Route>

      {/* Domain 3: Storefront Web (Public + Customer) */}
      <Route element={<StorefrontLayout />}>
        <Route path="/storefront" element={<StorefrontCatalogPage />} />
        <Route path="/storefront/:tenantSlug" element={<StorefrontCatalogPage />} />
        <Route path="/storefront/:tenantSlug/product/:productId" element={<ProductDetailPage />} />
        <Route path="/storefront/product/:productId" element={<ProductDetailPage />} />
        <Route path="/storefront/:tenantSlug/tracking" element={<OrderLookupPage />} />
        <Route path="/storefront/tracking" element={<OrderLookupPage />} />
      </Route>

      {/* Domain 4: Super Admin Console */}
      <Route element={<ProtectedRoute><SuperAdminLayout /></ProtectedRoute>}>
        <Route path="/superadmin/dashboard" element={<SuperAdminDashboardPage />} />
        <Route path="/superadmin/tenants" element={<SuperAdminTenantManagementPage />} />
        <Route path="/superadmin/plans" element={<SuperAdminPricingConfigPage />} />
        <Route path="/superadmin/apm" element={<SuperAdminApmLogsPage />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
