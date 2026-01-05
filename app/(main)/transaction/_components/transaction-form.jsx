"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { transactionSchema } from "@/lib/schema";
import useFetch from "@/hooks/use-fetch";
import { createTransaction } from "@/actions/transaction";

const AddTransactionForm = ({ accounts, categories }) => {
  useForm({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
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
    fn: transactionFunc,
    data: transactionResult,
  } = useFetch(createTransaction);

  return <div>AddTransactionForm</div>;
};

export default AddTransactionForm;
