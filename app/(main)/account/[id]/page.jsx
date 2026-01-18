import Link from "next/link";
import { getAccountWithTransactions } from "@/actions/accounts";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { PulseLoader } from "react-spinners";
import TransactionTable from "../_components/transaction-table";
import { ArrowLeft } from "lucide-react";
import AccountChart from "../_components/account-chart";

export default async function AccountsPage({ params }) {
  console.log("Rendering account page");
  const { id } = await params;
  const accountsData = await getAccountWithTransactions(id);
  if (!accountsData) {
    notFound();
  }
  const { transactions, ...account } = accountsData;

  const formattedType =
    account.type.charAt(0).toUpperCase() + account.type.slice(1).toLowerCase();

  return (
    <div className="space-y-8 px-5 pb-8">
      {/* Back Button */}
      <Link
        href="/dashboard"
        className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Dashboard
      </Link>

      {/* Header Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 border border-blue-100 dark:border-slate-700 rounded-xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white">
                {account.name}
              </h1>
              {account.isDefault && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#120e40c8] text-white">
                  Default
                </span>
              )}
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              {formattedType} Account
            </p>
          </div>

          {/* Balance Card */}
          <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-4 md:p-6 min-w-[240px] shadow-sm">
            <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 font-semibold mb-2">
              Account Balance
            </p>
            <div className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
              ₹{parseFloat(account.balance).toFixed(2)}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">
              {account._count?.transactions ?? 0} Total Transactions
            </p>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <Suspense
        fallback={
          <PulseLoader className="mt-4" width={"100%"} color="#120e40c8" />
        }
      >
        <AccountChart transactions={transactions} />
      </Suspense>

      {/* Transactions Table */}
      <Suspense
        fallback={
          <PulseLoader className="mt-4" width={"100%"} color="#120e40c8" />
        }
      >
        <TransactionTable transactions={transactions} />
      </Suspense>
    </div>
  );
}
