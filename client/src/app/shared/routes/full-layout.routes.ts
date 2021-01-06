import { Routes } from "@angular/router";
import { AuthGuard } from "../auth/auth-guard.service";

//Route for content layout with sidebar, navbar and footer
export const Full_ROUTES: Routes = [
  {
    path: "settings",
    loadChildren: () =>
      import("../../settings/settings.module").then((m) => m.SettingsModule),
    canActivate: [AuthGuard],
  },
  {
    path: "full-layout",
    loadChildren: () =>
      import("../../pages/full-layout-page/full-pages.module").then(
        (m) => m.FullPagesModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "dashboard",
    loadChildren: () =>
      import("../../dashboard/dashboard.module").then((m) => m.DashboardModule),
    canActivate: [AuthGuard],
  },
  {
    path: "products",
    loadChildren: () =>
      import("../../products/products.module").then((m) => m.ProductModule),
    canActivate: [AuthGuard],
  },
  {
    path: "sub-category",
    loadChildren: () =>
      import("../../sub-category/sub-category.module").then(
        (module) => module.SubCategoryModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "out-of-stock",
    loadChildren: () =>
      import("../../out-of-stock/out-of-stock.module").then(
        (module) => module.OutOfStockModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "notifications",
    loadChildren: () =>
      import("../../Notifications/notifications.module").then(
        (m) => m.NotificationsModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "categories",
    loadChildren: () =>
      import("../../categories/categories.module").then(
        (m) => m.CategoriesModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "sub-category",
    loadChildren: () =>
      import("../../sub-category/sub-category.module").then(
        (m) => m.SubCategoryModule
      ),
  },
  {
    path: "banner",
    loadChildren: () =>
      import("../../banner/banner.module").then(
        (module) => module.BannerModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "notification-list",
    loadChildren: () =>
      import("../../notification-list/notification-list.module").then(
        (module) => module.NotificationListModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "delivery-boy",
    loadChildren: () =>
      import("../../delivery-boy/delivery-boy.module").then(
        (m) => m.DeliveryBoyModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: "deals",
    loadChildren: () =>
      import("../../deals/deals.module").then((m) => m.DealsModule),
    canActivate: [AuthGuard],
  },
  {
    path: "coupons",
    loadChildren: () =>
      import("../../coupons/coupons.module").then((m) => m.CouponsModule),
    canActivate: [AuthGuard],
  },
  {
    path: "orders",
    loadChildren: () =>
      import("../../orders/orders.module").then((m) => m.OrdersModule),
    canActivate: [AuthGuard],
  },
  {
    path: "users",
    loadChildren: () =>
      import("../../users/users.module").then((m) => m.UsersModule),
    canActivate: [AuthGuard],
  },
  {
    path: "chat",
    loadChildren: () =>
      import("../../settings/settings.module").then((m) => m.SettingsModule),
    canActivate: [AuthGuard],
  },
];
