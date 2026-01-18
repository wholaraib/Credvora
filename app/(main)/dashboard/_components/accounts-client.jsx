"use client";

import { useState, useEffect } from "react";
import AccountCard from "@/components/AccountCard/account-card";

const AccountsClientCard = ({ initialAccounts }) => {
  const [accounts, setAccounts] = useState(initialAccounts);

  useEffect(() => {
    setAccounts(initialAccounts);
  }, [initialAccounts]);

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

export default AccountsClientCard;
