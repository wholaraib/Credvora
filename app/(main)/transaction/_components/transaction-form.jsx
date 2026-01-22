"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CalendarIcon,
  Loader2,
  IndianRupee,
  Tag,
  FileText,
  Wallet,
} from "lucide-react";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import CreateAccountDrawer from "@/components/CreateAccountDrawer/create-account-drawer";
import { cn } from "@/lib/utils";
import { createTransaction } from "@/actions/transaction";
import { transactionSchema } from "@/app/lib/schema";
import ReceiptScanner from "./receipt-scanner";
import { ScanText } from "lucide-react";
export default function AddTransactionForm({
  accounts,
  categories,
  editMode = false,
  initialData = null,
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
  } = useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: initialData
      ? {
          type: initialData.type,
          amount: initialData.amount.toString(),
          description: initialData.description,
          accountId: initialData.accountId,
          category: initialData.category,
          date: new Date(initialData.date),
          isRecurring: initialData.isRecurring,
          ...(initialData.recurringInterval && {
            recurringInterval: initialData.recurringInterval,
          }),
        }
      : {
          type: "EXPENSE",
          amount: "",
          description: "",
          accountId: accounts.find((ac) => ac.isDefault)?.id,
          date: new Date(),
          isRecurring: false,
        },
  });

  const {
    loading: transactionLoading,
    fn: transactionFn,
    data: transactionResult,
  } = useFetch(createTransaction);

  const onSubmit = async (data) => {
    const formData = {
      ...data,
      amount: parseFloat(data.amount),
    };
    console.log("Submitting form data:", formData);
    transactionFn(formData);
  };

  const handleScanComplete = (scannedData) => {
    console.log("Scanned Data:", scannedData);
    if (scannedData) {
      setValue("amount", scannedData.amount.toString());
      setValue("date", new Date(scannedData.date));
      if (scannedData.description) {
        setValue("description", scannedData.description);
      }
      if (scannedData.category) {
        setValue("category", scannedData.category);
      }
      toast.success("Receipt scanned successfully");
    }
  };

  useEffect(() => {
    if (transactionResult?.success && !transactionLoading) {
      toast.success(
        editMode
          ? "Transaction updated successfully"
          : "Transaction created successfully"
      );
      reset();
      router.push(`/account/${transactionResult.data.accountId}`);
    }
  }, [transactionResult, transactionLoading, editMode]);

  const type = watch("type");
  const isRecurring = watch("isRecurring");
  const date = watch("date");

  const filteredCategories = categories.filter(
    (category) => category.type === type
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* AI Receipt Scanner */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 justify-center">
          <ScanText className="h-4 w-4 text-slate-500" />
          <label className="text-sm font-semibold text-slate-900 dark:text-white">
            Scan Receipt
          </label>
        </div>
        <div className="flex flex-row justify-center">
          <ReceiptScanner onScanComplete={handleScanComplete} />
        </div>
      </div>

      {/* Type Selection */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Tag className="h-4 w-4 text-slate-500" />
          <label className="text-sm font-semibold text-slate-900 dark:text-white">
            Transaction Type
          </label>
        </div>
        <Select
          onValueChange={(value) => setValue("type", value)}
          defaultValue={type}
        >
          <SelectTrigger className="h-11 border-slate-200 dark:border-slate-700">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="EXPENSE">
              <span className="flex items-center gap-2">
                <span className="text-red-500">●</span> Expense
              </span>
            </SelectItem>
            <SelectItem value="INCOME">
              <span className="flex items-center gap-2">
                <span className="text-green-500">●</span> Income
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
        {errors.type && (
          <p className="text-xs font-medium text-red-500 mt-1">
            {errors.type.message}
          </p>
        )}
      </div>

      {/* Amount and Account Row */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Amount */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <IndianRupee className="h-4 w-4 text-slate-500" />
            <label className="text-sm font-semibold text-slate-900 dark:text-white">
              Amount
            </label>
          </div>
          <div className="relative">
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              className="h-11 pl-8 border-slate-200 dark:border-slate-700"
              {...register("amount")}
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">
              ₹
            </span>
          </div>
          {errors.amount && (
            <p className="text-xs font-medium text-red-500">
              {errors.amount.message}
            </p>
          )}
        </div>

        {/* Account - FIXED */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-slate-500" />
            <label className="text-sm font-semibold text-slate-900 dark:text-white">
              Account
            </label>
          </div>
          <Select
            onValueChange={(value) => setValue("accountId", value)}
            defaultValue={getValues("accountId")}
          >
            <SelectTrigger className="w-full h-11 border-slate-200 dark:border-slate-700">
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {accounts.map((account) => (
                <SelectItem key={account.id} value={account.id}>
                  <span>{account.name}</span>
                  <span className="text-xs text-slate-500 ml-2">
                    ₹{parseFloat(account.balance).toFixed(2)}
                  </span>
                </SelectItem>
              ))}
              <CreateAccountDrawer>
                <Button
                  type="button"
                  variant="ghost"
                  className="relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground"
                >
                  + Create Account
                </Button>
              </CreateAccountDrawer>
            </SelectContent>
          </Select>
          {errors.accountId && (
            <p className="text-xs font-medium text-red-500">
              {errors.accountId.message}
            </p>
          )}
        </div>
      </div>

      {/* Category */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-slate-900 dark:text-white">
          Category
        </label>
        <Select
          onValueChange={(value) => setValue("category", value)}
          value={getValues("category")}
        >
          <SelectTrigger className="h-11 w-full border-slate-200 dark:border-slate-700">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {filteredCategories.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-xs font-medium text-red-500">
            {errors.category.message}
          </p>
        )}
      </div>

      {/* Date */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-slate-500" />
          <label className="text-sm font-semibold text-slate-900 dark:text-white">
            Date
          </label>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className={cn(
                "h-11 w-full pl-3 text-left font-normal border-slate-200 dark:border-slate-700",
                !date && "text-muted-foreground"
              )}
            >
              {date ? format(date, "PPP") : <span>Pick a date</span>}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => setValue("date", date)}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {errors.date && (
          <p className="text-xs font-medium text-red-500">
            {errors.date.message}
          </p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-slate-500" />
          <label className="text-sm font-semibold text-slate-900 dark:text-white">
            Description
          </label>
          <span className="text-xs text-slate-500">(Optional)</span>
        </div>
        <Input
          placeholder="Add notes or details about this transaction"
          className="h-11 border-slate-200 dark:border-slate-700"
          {...register("description")}
        />
        {errors.description && (
          <p className="text-xs font-medium text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Divider */}
      <div className="border-t border-slate-200 dark:border-slate-700" />

      {/* Recurring Section */}
      <div className="rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-4 space-y-4">
        <div className="flex flex-row items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
              Recurring Transaction
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Automatically repeat this transaction on a schedule
            </p>
          </div>
          <Switch
            checked={isRecurring}
            onCheckedChange={(checked) => setValue("isRecurring", checked)}
            className="cursor-pointer"
          />
        </div>

        {/* Recurring Interval */}
        {isRecurring && (
          <div className="space-y-3 pt-2">
            <label className="text-sm font-semibold text-slate-900 dark:text-white">
              Repeat Every
            </label>
            <Select
              onValueChange={(value) => setValue("recurringInterval", value)}
              defaultValue={getValues("recurringInterval")}
            >
              <SelectTrigger className="h-10 text-sm border-slate-200 dark:border-slate-700">
                <SelectValue placeholder="Select interval" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DAILY">Daily</SelectItem>
                <SelectItem value="WEEKLY">Weekly</SelectItem>
                <SelectItem value="MONTHLY">Monthly</SelectItem>
                <SelectItem value="YEARLY">Yearly</SelectItem>
              </SelectContent>
            </Select>
            {errors.recurringInterval && (
              <p className="text-xs font-medium text-red-500">
                {errors.recurringInterval.message}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Action Buttons - FIXED */}
      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
        <Button
          type="button"
          variant="outline"
          className="flex-1 h-11 border-slate-200 dark:border-slate-700"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="flex-1 h-11 btn-primary text-white"
          disabled={transactionLoading}
        >
          {transactionLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {editMode ? "Updating..." : "Creating..."}
            </>
          ) : editMode ? (
            "Update Transaction"
          ) : (
            "Create Transaction"
          )}
        </Button>
      </div>
    </form>
  );
}
