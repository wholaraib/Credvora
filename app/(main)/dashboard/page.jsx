import CreateAccountDrawer from "@/components/CreateAccountDrawer/create-account-drawer";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { getUserAccounts } from "@/actions/dashboard";
import AccountsClientCard from "./_components/accounts-client";

async function Dashboard() {

  const accounts = await getUserAccounts();
  return (
    <div>
      {/* Budget Progress  */}
      
      
      {/* Overview  */}
      
      
      {/* Accounts grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CreateAccountDrawer>
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-dashed">
            <CardContent className="flex flex-col items-center justify-center text-muted-foreground h-full">
              <Plus className="h-10 w-10" />
              <p className="text-sm font-medium">Add new account</p>
            </CardContent>
          </Card>
        </CreateAccountDrawer>

        <AccountsClientCard initialAccounts={accounts} />
      </div>
    </div>
  );
}
export default Dashboard;


