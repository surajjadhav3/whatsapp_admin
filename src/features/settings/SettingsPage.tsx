import React, { useState } from "react";
import BusinessInfoForm from "./components/BusinessInfoForm";
import WhatsAppConfig from "./components/WhatsAppConfig";
import StripeConfig from "./components/StripeConfig";
import { useSettings } from "./hooks/useSettings";

const SettingsPage: React.FC = () => {
  const {
    settings,
    loading,
    error,
    updateBusinessInfo,
    updateWhatsAppConfig,
    updateStripeConfig,
  } = useSettings();
  const [activeTab, setActiveTab] = useState("business");

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
        Error loading settings: {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        {settings && (
          <div className="text-sm bg-gray-100 dark:bg-secondary-700 px-3 py-1 rounded">
            Seller ID: <span className="font-medium">{settings.sellerId}</span>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-secondary-800 shadow-lg rounded-lg overflow-hidden">
        <div className="border-b border-gray-200 dark:border-secondary-700">
          <div className="flex flex-wrap -mb-px">
            <button
              onClick={() => setActiveTab("business")}
              className={`py-4 px-6 text-center text-sm font-medium border-b-2 ${
                activeTab === "business"
                  ? "border-primary-500 text-primary-600 dark:text-primary-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              } flex-1 sm:flex-none`}
            >
              <div className="flex items-center justify-center sm:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
                Business Information
              </div>
            </button>
            <button
              onClick={() => setActiveTab("whatsapp")}
              className={`py-4 px-6 text-center text-sm font-medium border-b-2 ${
                activeTab === "whatsapp"
                  ? "border-primary-500 text-primary-600 dark:text-primary-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              } flex-1 sm:flex-none`}
            >
              <div className="flex items-center justify-center sm:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                WhatsApp Configuration
              </div>
            </button>
            <button
              onClick={() => setActiveTab("stripe")}
              className={`py-4 px-6 text-center text-sm font-medium border-b-2 ${
                activeTab === "stripe"
                  ? "border-primary-500 text-primary-600 dark:text-primary-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              } flex-1 sm:flex-none`}
            >
              <div className="flex items-center justify-center sm:justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
                Payment Settings
              </div>
            </button>
          </div>
        </div>

        <div className="p-6 md:p-8">
          {activeTab === "business" && (
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                Business Information
              </h2>
              <BusinessInfoForm
                businessInfo={settings?.businessInfo}
                onSave={updateBusinessInfo}
              />
            </div>
          )}

          {activeTab === "whatsapp" && (
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                WhatsApp Configuration
              </h2>
              <WhatsAppConfig
                whatsappConfig={settings?.whatsappConfig}
                onSave={updateWhatsAppConfig}
              />
            </div>
          )}

          {activeTab === "stripe" && (
            <div className="max-w-3xl mx-auto">
              <h2 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
                Payment Settings
              </h2>
              <StripeConfig
                stripeConfig={settings?.stripeConfig}
                onSave={updateStripeConfig}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
