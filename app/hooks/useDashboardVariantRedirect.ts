"use client";

import { useEffect, useState, useTransition } from "react";
import posthog from "@/posthog.config";

export function useDashboardVariantRedirect(
    defaultUrl = "/dashboard",
    newDashboardUrl = "/dashboard-v2"
) {
    const [dashboardUrl, setDashboardUrl] = useState(defaultUrl);
    const [isNewDashboard, setIsNewDashboard] = useState<boolean | undefined>(undefined);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        // Set up feature flag listener
        const handleFeatureFlags = () => {
            const isEnabled = posthog.isFeatureEnabled("new_dashboard_enabled", {
                send_event: false,
            });

            console.log("Feature Flag isEnabled:", isEnabled);

            startTransition(() => {
                setIsNewDashboard(isEnabled);
                setDashboardUrl(isEnabled ? newDashboardUrl : defaultUrl);
            });
        };

        posthog.onFeatureFlags(handleFeatureFlags);

        // Cleanup on unmount or when the component rerenders
        return () => {
            posthog.featureFlags.removeFeatureFlagsHandler(handleFeatureFlags);
        };
    }, [defaultUrl, newDashboardUrl]);

    return { dashboardUrl, isNewDashboard, isPending };
}