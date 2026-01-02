"use client";
import { useState, useEffect } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, X, Pencil } from "lucide-react";
import useFetch from "@/hooks/use-fetch";
import { updateBudget } from "@/actions/budget";
import { toast } from "sonner";

const BudgetProgress = ({ initialBudget, currentExpenses }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newBudget, setNewBudget] = useState(
    initialBudget?.amount?.toString() || ""
  );
  const [optimisticBudget, setOptimisticBudget] = useState(
    initialBudget?.amount
  );
  const displayBudget = optimisticBudget || initialBudget?.amount;

  const {
    loading: isLoading,
    func: updateBudgetFunction,
    data: updatedBudget,
    error,
  } = useFetch(updateBudget);

  const percentageUsed = displayBudget
    ? (currentExpenses / displayBudget) * 100
    : 0;

  const handleUpdateBudget = async () => {
    const amount = parseFloat(newBudget);
    if (isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    const previousBudget = displayBudget;
    setOptimisticBudget(amount);
    setIsEditing(false);
    toast.success("Budget updated successfully");
    try {
      await updateBudgetFunction(amount);
    } catch {
      setOptimisticBudget(previousBudget);
      setIsEditing(true);
      toast.error(error.message || "Failed to update default account.");
    }
  };
  const handleCancel = () => {
    setNewBudget(initialBudget?.amount?.toString() || 0);
    setIsEditing(false);
  };
  useEffect(() => {
    if (updatedBudget?.success) {
      setOptimisticBudget(updatedBudget.data.amount);
    }
  }, [updatedBudget]);
  useEffect(() => {
    if (initialBudget?.amount != null) {
      setOptimisticBudget(initialBudget.amount);
      setNewBudget(initialBudget.amount.toString());
    }
  }, [initialBudget]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex-1">
          <CardTitle>Monthly Budget (Default Account)</CardTitle>
          <div className="flex items-center gap-2 mt-1">
            {isEditing ? (
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  value={newBudget}
                  onChange={(e) => setNewBudget(e.target.value)}
                  className="w-32"
                  placeholder="Enter amount"
                  autoFocus
                  disabled={isLoading}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleUpdateBudget}
                  disabled={isLoading}
                >
                  <Check className="h-4 w-4 text-green-500" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  <X className="h-4 w-4 text-red-500" />
                </Button>
              </div>
            ) : (
              <>
                <CardDescription>
                  {displayBudget
                    ? `₹${currentExpenses.toFixed(
                        2
                      )} of ₹${displayBudget.toFixed(2)} spent`
                    : "No Budget set"}
                </CardDescription>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsEditing(true);
                  }}
                  className="h-6 w-6"
                >
                  <Pencil className="h-3 w-3" />
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {initialBudget && (
          <div className="space-y-2">
            <Progress value={percentageUsed} />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetProgress;
