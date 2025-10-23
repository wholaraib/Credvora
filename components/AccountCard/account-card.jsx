import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowRight, ArrowDownRight } from "lucide-react";
import Link from "next/link";

const AccountCard = ({account}) => {
    const { name, type, balance, id, isDefault } = account;
  return (
    <Card className="cursor-pointer bg-[#dad9e4de]"> 
    <Link href={`/account/${id}`}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <Switch className="cursor-pointer" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
            ${parseFloat(balance).toFixed(2)}
        </div>
        <p className="text-xs text-muted-foreground capitalize">
            {type.charAt(0) + type.slice(1).toLowerCase()} Account    
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center">
            <ArrowRight className="mr-1 h-4 w-4 text-green-500"/>
            Income
        </div>
        <div className="flex items-center"> 
            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500"/>
            Expense
        </div>
      </CardFooter>
      </Link>
    </Card>
  );
};

export default AccountCard;
