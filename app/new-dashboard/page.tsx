"use client";

import { useEffect, useState } from "react";
import posthog from "@/posthog.config";
import { useDashboardVariantRedirect } from "../hooks/useDashboardVariantRedirect";

export default function NewHomepageExperience() {
  const { dashboardUrl, isNewDashboard, isPending } =
    useDashboardVariantRedirect();
  const [surveySubmitted, setSurveySubmitted] = useState(false);
  const [surveyRendered, setSurveyRendered] = useState(false);

  const surveyID = "0196163c-78b0-0000-a672-c59d0262276a";
  const surveyKey = `survey_submitted_${surveyID}`;

  useEffect(() => {
    const alreadySubmitted = localStorage.getItem(surveyKey) === "true";
    setSurveySubmitted(alreadySubmitted);
  }, [surveyKey]);

  useEffect(() => {
    // Redirect to the old dashboard if the new dashboard is not enabled
    if (isNewDashboard === false) {
      window.location.href = dashboardUrl;
    }
  }, [isNewDashboard]);

  const handleFeedbackClick = () => {
    if (!surveySubmitted && !surveyRendered) {
      posthog.renderSurvey(surveyID, "#survey-container");
      setSurveyRendered(true);

      // Simulate auto-submission
      setTimeout(() => {
        localStorage.setItem(surveyKey, "true");
        setSurveySubmitted(true);
      }, 5000);
    }
  };

  if (isNewDashboard === undefined || isPending) {
    return (
      <div className="p-10 text-center text-gray-500">
        Loading your dashboard experience...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex flex-col items-center justify-center px-6 py-20">
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-xl p-12 relative">
        <h1 className="text-5xl font-extrabold text-blue-700 mb-6 text-center">
          🧪 Welcome to the Experimental Experience
        </h1>
        <p className="text-lg text-gray-600 text-center mb-10">
          You are viewing a new version of our homepage as part of an A/B test
          powered by <strong>PostHog Feature Flags</strong>.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <button
            onClick={() => (window.location.href = "/dashboard")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-gray-800 transition"
          >
            ↩️ Go Back to Old Dashboard
          </button>

          {surveySubmitted ? (
            <div className="px-6 py-3 text-gray-500 text-center">
              ✅ Feedback Submitted
            </div>
          ) : (
            <button
              onClick={handleFeedbackClick}
              className="bg-white border border-gray-400 hover:bg-gray-50 text-gray-800 px-6 py-3 rounded-xl transition text-lg"
            >
              💬 Share Feedback
            </button>
          )}
        </div>

        <p className="mt-10 text-sm text-center text-gray-400">
          This is <code>/homepage-v2</code> — switch back anytime via feature
          flags.
        </p>

        <div
          id="survey-container"
          className="fixed bottom-4 right-4 z-50 bg-white p-4 rounded-xl shadow-lg max-w-sm w-full"
        ></div>
      </div>
    </main>
  );
}
