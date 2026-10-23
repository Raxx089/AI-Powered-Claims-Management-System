import { createBrowserRouter } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { WorkspacePage } from "./pages/WorkspacePage";
import { OnboardingPage } from "./pages/OnboardingPage";
import { MainLayout } from "./components/layout/MainLayout";
import { DashboardPage } from "./pages/DashboardPage";
import { ClaimsListPage } from "./pages/ClaimsListPage";
import { ClaimDetailPage } from "./pages/ClaimDetailPage";
import { FraudDetectionPage } from "./pages/FraudDetectionPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { ReportsPage } from "./pages/ReportsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ClaimIntakePage } from "./pages/ClaimIntakePage";
import { WorkflowPage } from "./pages/WorkflowPage";
import { DesignSystemPage } from "./pages/DesignSystemPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/workspace",
    Component: WorkspacePage,
  },
  {
    path: "/onboarding",
    Component: OnboardingPage,
  },
  {
    path: "/app",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: DashboardPage,
      },
      {
        path: "dashboard",
        Component: DashboardPage,
      },
      {
        path: "claims",
        Component: ClaimsListPage,
      },
      {
        path: "claims/:id",
        Component: ClaimDetailPage,
      },
      {
        path: "fraud",
        Component: FraudDetectionPage,
      },
      {
        path: "analytics",
        Component: AnalyticsPage,
      },
      {
        path: "reports",
        Component: ReportsPage,
      },
      {
        path: "settings",
        Component: SettingsPage,
      },
      {
        path: "intake",
        Component: ClaimIntakePage,
      },
      {
        path: "workflow",
        Component: WorkflowPage,
      },
      {
        path: "design-system",
        Component: DesignSystemPage,
      },
    ],
  },
]);