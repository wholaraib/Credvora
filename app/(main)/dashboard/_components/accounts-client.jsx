"use client";

import { useState } from "react";
import AccountCard from "@/components/AccountCard/account-card";

const AccountsClient = ({ initialAccounts }) => {
  const [accounts, setAccounts] = useState(initialAccounts);
  const setDefaultOptimistically = (id) => {
    setAccounts((prev) =>
      prev.map((acc) => ({
        ...acc,
        isDefault: acc.id === id,
      }))
    );
  };

  return (
    <>
      {accounts.map((account) => (
        <AccountCard
          key={account.id}
          account={account}
          onSetDefault={setDefaultOptimistically}
        />
      ))}
    </>
  );
};

export default AccountsClient;
