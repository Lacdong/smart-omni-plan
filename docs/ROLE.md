# IV. BẢNG MA TRẬN MÀN HÌNH, TÁC NHÂN & QUYỀN TRUY CẬP

## 4.1. Mục đích

Bảng dưới đây tổng hợp quyền truy cập của từng **Tác nhân (Actor)** đối với các **Phân hệ Màn hình (Screen Modules)** trong kiến trúc phân quyền **RBAC (Role-Based Access Control)** của hệ thống SmartOmni.

Các tác nhân được phân quyền gồm:

- **Khách hàng (Customer)**
- **Manager**
- **Tenant Admin**
- **Super Admin**

Quyền truy cập được xác định theo từng nhóm màn hình và vai trò của tác nhân trong hệ thống.

---

## 4.2. Ma trận phân quyền

| **Mã & Tên Màn hình** | **Khách hàng** | **Manager** | **Tenant Admin** | **Super Admin** |
|---|---|---|---|---|
| **SCR-00 đến SCR-05 — Onboarding Portal** | Không | Không | **Toàn quyền** | Không |
| **SCR-20 & SCR-21 — Storefront & Product Detail** | **Toàn quyền** | Xem | Xem | Xem |
| **SCR-23 — Tra cứu Đơn hàng** | **Toàn quyền** | Xem | Xem | Không |
| **SCR-10 — BI Dashboard** | Không | Xem | **Toàn quyền** | Không |
| **SCR-30 & SCR-31 — Quản lý Đơn hàng** | Không | **Toàn quyền** | **Toàn quyền** | Không |
| **SCR-40 & SCR-41 — Quản lý Tồn kho** | Không | **Toàn quyền** | **Toàn quyền** | Không |
| **SCR-50 & SCR-51 — Quản lý Sản phẩm** | Không | **Toàn quyền** | **Toàn quyền** | Không |
| **SCR-60 & SCR-61 — AI Insights & Forecasting** | Không | Xem | **Toàn quyền (Gói Pro)** | Không |
| **SCR-19 — Cấu hình Staff & Subscription** | Không | Không | **Toàn quyền** | Không |
| **SCR-70 đến SCR-73 — Super Admin Console** | Không | Không | Không | **Toàn quyền** |

---

## 4.3. Quy ước quyền truy cập

| **Mức quyền** | **Ý nghĩa** |
|---|---|
| **Toàn quyền** | Có thể truy cập màn hình và thực hiện đầy đủ các thao tác được hệ thống hỗ trợ trên màn hình đó. |
| **Xem** | Có thể truy cập và xem thông tin nhưng không có quyền thực hiện các thao tác quản trị/chỉnh sửa bị giới hạn. |
| **Không** | Không được phép truy cập màn hình hoặc chức năng tương ứng. |

---

## 4.4. Phân quyền theo Tác nhân

### 4.4.1. Khách hàng (Customer)

Khách hàng tập trung vào các chức năng phục vụ **trải nghiệm mua sắm và tra cứu đơn hàng**.

| Nhóm chức năng | Quyền |
|---|---|
| Onboarding Portal | Không |
| Storefront & Product Detail | **Toàn quyền** |
| Tra cứu Đơn hàng | **Toàn quyền** |
| BI Dashboard | Không |
| Quản lý Đơn hàng | Không |
| Quản lý Tồn kho | Không |
| Quản lý Sản phẩm | Không |
| AI Insights & Forecasting | Không |
| Staff & Subscription | Không |
| Super Admin Console | Không |

**Luồng chính:**

```text
Storefront
    ↓
Product Detail
    ↓
Marketplace Redirect
    ↓
Shopee / TikTok Shop
````

Hoặc:

```text
Storefront
    ↓
Tra cứu Đơn hàng
    ↓
Nhập Order ID
    ↓
Xem trạng thái đơn hàng
```

---

### 4.4.2. Manager

Manager tập trung vào việc **vận hành và quản lý nghiệp vụ hằng ngày**.

| Nhóm chức năng              | Quyền          |
| --------------------------- | -------------- |
| Onboarding Portal           | Không          |
| Storefront & Product Detail | Xem            |
| Tra cứu Đơn hàng            | Xem            |
| BI Dashboard                | Xem            |
| Quản lý Đơn hàng            | **Toàn quyền** |
| Quản lý Tồn kho             | **Toàn quyền** |
| Quản lý Sản phẩm            | **Toàn quyền** |
| AI Insights & Forecasting   | Xem            |
| Staff & Subscription        | Không          |
| Super Admin Console         | Không          |

Manager có quyền thao tác đầy đủ đối với các nghiệp vụ:

```text
Quản lý Đơn hàng
        +
Quản lý Tồn kho
        +
Quản lý Sản phẩm
```

Đối với **BI Dashboard** và **AI Insights & Forecasting**, Manager chỉ có quyền **Xem**.

---

### 4.4.3. Tenant Admin

Tenant Admin là tác nhân có quyền quản trị đầy đủ trong phạm vi **Tenant**.

| Nhóm chức năng              | Quyền                    |
| --------------------------- | ------------------------ |
| Onboarding Portal           | **Toàn quyền**           |
| Storefront & Product Detail | Xem                      |
| Tra cứu Đơn hàng            | Xem                      |
| BI Dashboard                | **Toàn quyền**           |
| Quản lý Đơn hàng            | **Toàn quyền**           |
| Quản lý Tồn kho             | **Toàn quyền**           |
| Quản lý Sản phẩm            | **Toàn quyền**           |
| AI Insights & Forecasting   | **Toàn quyền (Gói Pro)** |
| Staff & Subscription        | **Toàn quyền**           |
| Super Admin Console         | Không                    |

Tenant Admin có quyền quản trị các chức năng chính của Tenant:

```text
Onboarding
    ↓
BI Dashboard
    ↓
Orders
    ↓
Inventory
    ↓
Products
    ↓
AI Insights & Forecasting
    ↓
Staff & Subscription
```

> **Lưu ý:** SCR-60 & SCR-61 yêu cầu **Gói Pro** để Tenant Admin có Toàn quyền.

---

### 4.4.4. Super Admin

Super Admin chịu trách nhiệm quản trị ở cấp độ **toàn hệ thống**.

| Nhóm chức năng              | Quyền          |
| --------------------------- | -------------- |
| Onboarding Portal           | Không          |
| Storefront & Product Detail | Xem            |
| Tra cứu Đơn hàng            | Không          |
| BI Dashboard                | Không          |
| Quản lý Đơn hàng            | Không          |
| Quản lý Tồn kho             | Không          |
| Quản lý Sản phẩm            | Không          |
| AI Insights & Forecasting   | Không          |
| Staff & Subscription        | Không          |
| Super Admin Console         | **Toàn quyền** |

Các màn hình thuộc quyền quản trị của Super Admin:

```text
SCR-70 — Super Admin Dashboard
SCR-71 — Tenant Management
SCR-72 — Pricing / Feature Flags
SCR-73 — APM / Security
```

Super Admin **không sử dụng các màn hình nghiệp vụ nội bộ của Tenant** theo ma trận phân quyền này.

---

## 4.5. Tổng quan quyền theo nhóm màn hình

Có thể nhìn tổng thể kiến trúc RBAC của SmartOmni theo 4 lớp:

```text
                         SMARTOMNI
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
        ▼                    ▼                    ▼
   CUSTOMER              TENANT                SYSTEM
        │              OPERATIONS              ADMIN
        │                    │                    │
        ▼                    ▼                    ▼
 Storefront            Manager /             Super Admin
 Product Detail        Tenant Admin          Console
 Order Lookup
```

### Customer

```text
SCR-20 → SCR-21 → SCR-22
SCR-23
```

### Manager

```text
SCR-10       → Xem
SCR-30/31    → Toàn quyền
SCR-40/41    → Toàn quyền
SCR-50/51    → Toàn quyền
SCR-60/61    → Xem
```

### Tenant Admin

```text
SCR-00–05    → Toàn quyền
SCR-10       → Toàn quyền
SCR-30/31    → Toàn quyền
SCR-40/41    → Toàn quyền
SCR-50/51    → Toàn quyền
SCR-60/61    → Toàn quyền (Pro)
SCR-19       → Toàn quyền
```

### Super Admin

```text
SCR-70–73    → Toàn quyền
```

---

## 4.6. Nguyên tắc RBAC

Hệ thống SmartOmni áp dụng các nguyên tắc sau:

1. **Least Privilege**
   Mỗi tác nhân chỉ được cấp quyền cần thiết cho vai trò của mình.

2. **Role-Based Access**
   Quyền được xác định dựa trên Role thay vì cấp trực tiếp cho từng người dùng.

3. **Tenant Isolation**
   Manager và Tenant Admin thực hiện các nghiệp vụ trong phạm vi Tenant được phân quyền.

4. **Administrative Separation**
   Super Admin quản trị ở cấp hệ thống và được tách biệt khỏi các nghiệp vụ vận hành của Tenant.

5. **Feature-based Access**
   Một số chức năng có thể phụ thuộc vào gói dịch vụ. Ví dụ: **SCR-60 & SCR-61 yêu cầu Gói Pro đối với Tenant Admin**.

---

## 4.7. Tóm tắt

Ma trận phân quyền được thiết kế để phân tách rõ ba nhóm trách nhiệm chính:

```text
Customer
   │
   └── Mua sắm & Tra cứu đơn hàng

Manager
   │
   └── Vận hành nghiệp vụ

Tenant Admin
   │
   └── Quản trị Tenant

Super Admin
   │
   └── Quản trị toàn hệ thống
```
