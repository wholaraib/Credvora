import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, ArrowDownRight } from "lucide-react";
import Link from "next/link";
import useFetch from "@/hooks/use-fetch";
import { updateDefaultAccount } from "@/actions/accounts";
import { toast } from "sonner";

const AccountCard = ({ account, onSetDefault }) => {
  const { name, type, balance, id } = account;

  const {
    data: updateAccount,
    error,
    func: updateDefaultAccFunc,
    loading: updateDefaultAccLoading,
  } = useFetch(updateDefaultAccount);

  const handleDefaultChange = async (e) => {
    e.preventDefault();
    if (account.isDefault) {
      toast.warning("You need at least 1 default account.");
      return;
    }

    onSetDefault(account.id);
    toast.success("Default account updated successfully.");

    try {
      await updateDefaultAccFunc(account.id);
    } catch {
      toast.error(error.message || "Failed to update default account.");
    }
  };

  return (
    <Card className="relative overflow-hidden bg-white dark:bg-slate-900 hover:shadow-lg transition-all duration-200 border border-slate-200 dark:border-slate-800">
      <Link href={`/account/${id}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-800/50 dark:to-slate-900/50 opacity-50"></div>
        <CardHeader className="flex flex-row justify-between pb-2 space-y-0 relative">
          <CardTitle className="font-semibold text-slate-900 dark:text-slate-100">
            {name}
          </CardTitle>
          <Switch
            className="cursor-pointer"
            checked={account.isDefault}
            onClick={handleDefaultChange}
            disabled={updateDefaultAccLoading}
          />
        </CardHeader>
        <CardContent className="relative">
          <div className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            ${parseFloat(balance).toFixed(2)}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 capitalize mt-1">
            {type.charAt(0).toUpperCase() + type.slice(1).toLowerCase()} Account
          </p>
        </CardContent>
        <CardFooter className="flex justify-between text-sm mt-3 relative border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center text-slate-600 dark:text-slate-300">
            <div className="p-1 bg-green-50 dark:bg-green-900/20 rounded-full mr-2">
              <ArrowRight className="h-4 w-4 text-green-600 dark:text-green-400" />
            </div>
            Income
          </div>
          <div className="flex items-center text-slate-600 dark:text-slate-300">
            <div className="p-1 bg-red-50 dark:bg-red-900/20 rounded-full mr-2">
              <ArrowDownRight className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
            Expense
          </div>
        </CardFooter>
      </Link>
    </Card>
  );
};

export default AccountCard;
