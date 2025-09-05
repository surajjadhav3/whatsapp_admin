import React, { useState, useEffect } from "react";
import { User } from "../types/user";

import { getActivePlans } from "../../plans/services/planService";
import { userService } from "../services/userService";
import { Plan } from "../../plans/types";
import { Batch } from "../../batches/types";

interface UserProfileProps {
  user: User | null;
  plan: Plan | null;
  batch: Batch | null;
  loading: boolean;
  error: string | null;
  onExtendPlan: (planId: string, expiryDate: string) => Promise<any>;
  onSaveNotes: (notes: string) => Promise<any>;
  onClose: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({
  user,
  plan,
  batch,
  loading,
  error,
  onExtendPlan,
  onSaveNotes,
  onClose,
}) => {
  const [notes, setNotes] = useState(user?.notes || "");
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [extendPlanData, setExtendPlanData] = useState({
    planId: "",
    months: "1",
  });
  const [isExtendingPlan, setIsExtendingPlan] = useState(false);
  const [availablePlans, setAvailablePlans] = useState<Plan[]>([]);
  const [whatsappMessage, setWhatsappMessage] = useState("");
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  useEffect(() => {
    if (user) {
      setNotes(user.notes || "");
      setExtendPlanData((prev) => ({
        ...prev,
        planId: user.planId,
      }));
    }
  }, [user]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const plans = await getActivePlans();
        setAvailablePlans(plans);
      } catch (err) {
        console.error("Error fetching plans:", err);
      }
    };

    fetchPlans();
  }, []);

  const handleSaveNotes = async () => {
    if (!user) return;

    setIsSavingNotes(true);
    try {
      await onSaveNotes(notes);
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleExtendPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsExtendingPlan(true);
    try {
      // Calculate new expiry date
      const currentExpiryDate = new Date(user.expiryDate);
      const monthsToAdd = parseInt(extendPlanData.months, 10);
      const newExpiryDate = new Date(currentExpiryDate);
      newExpiryDate.setMonth(newExpiryDate.getMonth() + monthsToAdd);

      await onExtendPlan(
        extendPlanData.planId,
        newExpiryDate.toISOString().split("T")[0]
      );
    } finally {
      setIsExtendingPlan(false);
    }
  };

  const handleSendWhatsApp = async () => {
    if (!user || !whatsappMessage.trim()) return;

    setIsSendingMessage(true);
    try {
      console.log("Sending WhatsApp message:", {
        to: user.whatsapp,
        message: whatsappMessage,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("WhatsApp message sent successfully");
      setWhatsappMessage("");
    } catch (err) {
      console.error("Error sending WhatsApp message:", err);
    } finally {
      setIsSendingMessage(false);
    }
  };

  const handleSendReminder = async () => {
    if (!user) return;

    setIsSendingMessage(true);
    try {
      console.log("Sending reminder to user:", user.id);
      const result = await userService.sendReminder(user.id);
      console.log("Reminder result:", result);
    } catch (err) {
      console.error("Error sending reminder:", err);
    } finally {
      setIsSendingMessage(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-6"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-full"></div>
            </div>
            <div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="text-red-500 mb-4">{error}</div>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="text-gray-500 mb-4">User not found</div>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-start mb-6">
        <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-medium">
          {user.name.charAt(0)}
        </div>
        <div className="ml-4">
          <h2 className="text-2xl font-medium">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <p className="text-gray-600">{user.whatsapp}</p>
          <div className="mt-2">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                user.isActive
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {user.isActive ? "Active" : "Inactive"}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Plan Details</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="mb-2">
              <span className="text-gray-600">Plan:</span>
              <span className="ml-2 font-medium">
                {plan?.name || user.planId}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-gray-600">Start Date:</span>
              <span className="ml-2 font-medium">
                {new Date(user.joinedDate).toLocaleDateString()}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-gray-600">Expiry Date:</span>
              <span className="ml-2 font-medium">
                {new Date(user.expiryDate).toLocaleDateString()}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-gray-600">Status:</span>
              <span
                className={`ml-2 font-medium ${
                  user.isActive ? "text-green-600" : "text-red-600"
                }`}
              >
                {user.isActive ? "Active" : "Expired"}
              </span>
            </div>

            <div className="mt-4">
              <button
                onClick={handleSendReminder}
                disabled={isSendingMessage}
                className="px-4 py-2 bg-amber-600 text-white rounded text-sm font-medium hover:bg-amber-700 disabled:bg-amber-300"
              >
                {isSendingMessage ? "Sending..." : "Send Renewal Reminder"}
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Batch Details</h3>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="mb-2">
              <span className="text-gray-600">Batch:</span>
              <span className="ml-2 font-medium">
                {batch?.name || user.batchId}
              </span>
            </div>
            {/* <div className="mb-2">
              <span className="text-gray-600">Schedule:</span>
              <span className="ml-2 font-medium">
                {batch?.schedule || "N/A"}
              </span>
            </div>
            <div className="mb-2">
              <span className="text-gray-600">Instructor:</span>
              <span className="ml-2 font-medium">
                {batch?.instructor || "N/A"}
              </span>
            </div> */}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Extend Plan</h3>
        <form onSubmit={handleExtendPlan} className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Plan
              </label>
              <select
                value={extendPlanData.planId}
                onChange={(e) =>
                  setExtendPlanData((prev) => ({
                    ...prev,
                    planId: e.target.value,
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select a plan</option>
                {availablePlans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration
              </label>
              <select
                value={extendPlanData.months}
                onChange={(e) =>
                  setExtendPlanData((prev) => ({
                    ...prev,
                    months: e.target.value,
                  }))
                }
                className="w-full p-2 border border-gray-300 rounded"
              >
                <option value="1">1 month</option>
                <option value="3">3 months</option>
                <option value="6">6 months</option>
                <option value="12">12 months</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isExtendingPlan}
              className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 disabled:bg-blue-300"
            >
              {isExtendingPlan ? "Extending..." : "Extend Plan"}
            </button>
          </div>
        </form>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-4">Send WhatsApp Message</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex">
            <input
              type="text"
              value={whatsappMessage}
              onChange={(e) => setWhatsappMessage(e.target.value)}
              placeholder="Type your message here..."
              className="flex-1 p-2 border border-gray-300 rounded-l"
            />
            <button
              onClick={handleSendWhatsApp}
              disabled={isSendingMessage || !whatsappMessage.trim()}
              className="px-4 bg-green-600 text-white rounded-r text-sm font-medium hover:bg-green-700 disabled:bg-green-300 flex items-center"
            >
              {isSendingMessage ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Admin Notes</h3>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          rows={4}
        />
        <div className="mt-2 flex justify-end">
          <button
            onClick={handleSaveNotes}
            disabled={isSavingNotes}
            className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 disabled:bg-blue-300"
          >
            {isSavingNotes ? "Saving..." : "Save Notes"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
