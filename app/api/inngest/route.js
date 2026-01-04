import { inngest } from "@/lib/innjest/client";
import { serve } from "inngest/next";
import { checkBudgetAlerts } from "@/lib/innjest/functions";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [checkBudgetAlerts],
});
