"use client";
import { useState, useEffect } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import * as reactHookForm from "react-hook-form";
import { accountSchema } from "@/app/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useFetch from "@/hooks/use-fetch";
import { createAccount } from "@/actions/dashboard";
import { useRouter } from "next/navigation";

const CreateAccountDrawer = ({ children }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = reactHookForm.useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      name: "",
      type: "CURRENT",
      balance: "",
      isDefault: false,
    },
  });

  const {
    data: newAccount,
    error,
    func: createAccountFunc,
    loading: createAccountLoading,
  } = useFetch(createAccount);

  useEffect(() => {
    if (newAccount && !createAccountLoading) {
      toast.success("Account created successfully");
      reset();
      setOpenDrawer(false);
      router.refresh();
    }
  }, [createAccountLoading, newAccount, router]);

  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to create account");
    }
  }, [error]);

  const onSubmit = async (data) => {
    await createAccountFunc(data);
  };

  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <Drawer open={openDrawer} onOpenChange={setOpenDrawer} direction="right">
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent className="max-w-md h-full">
        <div className="flex flex-col h-full">
          <DrawerHeader className="border-b flex items-center">
            <DrawerTitle className="text-lg font-semibold">
              Create New Account
            </DrawerTitle>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto">
            <div className="overflow-hidden">
              <form
                id="create-account-form"
                className="space-y-6 p-6"
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* Account Name input field */}
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-slate-700 dark:text-slate-200 block mb-2"
                  >
                    Account Name
                  </label>
                  <Input
                    id="name"
                    placeholder="e.g., Main Checking"
                    {...register("name")}
                    className="bg-slate-50 dark:bg-slate-800"
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Acc Type + Initial Balance */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="type"
                      className="text-sm font-medium text-slate-700 dark:text-slate-200 block mb-2"
                    >
                      Account Type
                    </label>
                    <Select
                      onValueChange={(value) => setValue("type", value)}
                      defaultValue={watch("type")}
                    >
                      <SelectTrigger
                        id="type"
                        className="w-full bg-slate-50 dark:bg-slate-800"
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CURRENT">Current</SelectItem>
                        <SelectItem value="SAVINGS">Savings</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.type && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.type.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="balance"
                      className="text-sm font-medium text-slate-700 dark:text-slate-200 block mb-2"
                    >
                      Initial Balance
                    </label>
                    <Input
                      id="balance"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      {...register("balance")}
                      className="bg-slate-50 dark:bg-slate-800"
                    />
                    {errors.balance && (
                      <p className="text-sm text-red-500 mt-1">
                        {errors.balance.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Is Default field */}
                <div className="flex items-center justify-between rounded-lg border p-3 bg-slate-50 dark:bg-slate-800">
                  <div>
                    <label
                      htmlFor="isDefault"
                      className="text-sm font-medium cursor-pointer text-slate-700 dark:text-slate-200"
                    >
                      Set as Default
                    </label>
                    <p className="text-sm text-muted-foreground">
                      This account will be selected by default for transactions
                    </p>
                  </div>
                  <Switch
                    id="isDefault"
                    onCheckedChange={(checked) =>
                      setValue("isDefault", checked)
                    }
                    checked={watch("isDefault")}
                    className="cursor-pointer"
                  />
                </div>

                {/* keep form inputs only — buttons moved to drawer footer */}
              </form>
            </div>
          </div>

          {/* footer: buttons stick to bottom */}
          <div className="p-4 border-t bg-white dark:bg-slate-900">
            <div className="flex gap-3">
              <DrawerClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1 cursor-pointer"
                  onClick={reset}
                >
                  Cancel
                </Button>
              </DrawerClose>

              {/* submit targets the form by id */}
              <Button
                type="submit"
                form="create-account-form"
                className="flex-1 btn-primary cursor-pointer"
                disabled={createAccountLoading}
              >
                {createAccountLoading ? (
                  <>
                    <Loader2 className="animate-spin" /> Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CreateAccountDrawer;
