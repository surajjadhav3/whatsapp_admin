import { useState, useEffect } from "react";
import { Plan } from "../types";
import PlansService from "../../../services/PlansService";

export const usePlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        setLoading(true);
        const data = await PlansService.getAll();
        setPlans(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch plans");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  return { plans, loading, error };
}; 