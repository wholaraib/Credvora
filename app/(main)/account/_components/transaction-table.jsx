"use client";

import { useState, useEffect, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { format, formatDate } from "date-fns";
import { useRouter } from "next/navigation";
import { categoryColors } from "@/data/categories";
import { bulkDeleteTransactions } from "@/actions/accounts";
import useFetch from "@/hooks/use-fetch";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Clock,
  RefreshCw,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  ArrowUpDown,
  Search,
  Trash,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { BarLoader } from "react-spinners";

const RECURRING_INTERVALS = {
  DAILY: "Daily",
  WEEKLY: "Weekly",
  MONTHLY: "Monthly",
  YEARLY: "Yearly",
};

const ITEMS_PER_PAGE = 10;

const TransactionTable = ({ transactions }) => {
  const router = useRouter();
  const [selectedIds, setSelectedIds] = useState([]);
  const [sortConfig, setSortConfig] = useState({
    field: "",
    direction: "desc",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [recurringFilter, setRecurringFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const {
    loading: deleteLoading,
    func: deleteFunction,
    data: deletedData,
  } = useFetch(bulkDeleteTransactions);

  const filteredAndSortedTransactions = useMemo(() => {
    let result = [...transactions];

    // Search Filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter((transaction) => {
        return transaction.description?.toLowerCase().includes(searchLower);
      });
    }

    // Recurring Filter
    if (recurringFilter) {
      result = result.filter((transaction) => {
        if (recurringFilter === "recurring") return transaction.isRecurring;
        return !transaction.isRecurring;
      });
    }

    // Type Filter
    if (typeFilter) {
      result = result.filter((transaction) => transaction.type === typeFilter);
    }

    // Apply Sorting
    result.sort((a, b) => {
      let comparison = 0;

      switch (sortConfig.field) {
        case "date":
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case "amount":
          comparison = a.amount - b.amount;
          break;
        case "category":
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = 0;
      }

      return sortConfig.direction === "asc" ? comparison : -comparison;
    });

    return result;
  }, [transactions, searchTerm, typeFilter, recurringFilter, sortConfig]);

  const handleSort = (field) => {
    setSortConfig((current) => {
      const updated = {
        field,
        direction:
          current.field == field && current.direction == "asc" ? "desc" : "asc",
      };
      return updated;
    });
  };

  const handleSelect = (id) => {
    setSelectedIds((current) => {
      return current.includes(id)
        ? current.filter((item) => {
            return item != id;
          })
        : [...current, id];
    });
  };

  const handleSelectAll = () => {
    setSelectedIds((current) => {
      return current.length === filteredAndSortedTransactions.length
        ? []
        : filteredAndSortedTransactions.map((transaction) => transaction.id);
    });
  };
  const handleClearFilters = () => {
    setSearchTerm("");
    setRecurringFilter("");
    setTypeFilter("");
    setSelectedIds([]);
    setCurrentPage(1);
  };

  const handleDelete = async (ids) => {
    console.log("delete function called!");
    if (
      !window.confirm(
        `Are you sure you want to delete ${ids.length} ${
          ids.length > 1 ? "transactions" : "transaction"
        }?`
      )
    )
      return;

    try {
      await deleteFunction(ids);
      setSelectedIds([]);
    } catch {
      toast.error(
        `Failed to delete ${ids.length > 1 ? "transactions" : "transaction"}`
      );
    }
  };

  useEffect(() => {
    if (deletedData && !deleteLoading) {
      toast.info("Transactions deleted successfully!", {
        icon: <Trash className="h-4 w-4 text-blue-800" />,
      });
    }
  }, [deletedData, deleteLoading]);

  // Pagination Calculation
  const totalPages = Math.ceil(
    filteredAndSortedTransactions.length / ITEMS_PER_PAGE
  );
  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredAndSortedTransactions.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
  }, [filteredAndSortedTransactions, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSelectedIds([]);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, typeFilter, recurringFilter, sortConfig]);

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            className="pl-8"
            placeholder="Search by description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select
            value={typeFilter}
            onValueChange={(value) => setTypeFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="INCOME">Income</SelectItem>
              <SelectItem value="EXPENSE">Expense</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={recurringFilter}
            onValueChange={(value) => setRecurringFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Transactions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recurring">Recurring Only</SelectItem>
              <SelectItem value="non-recurring">Non-Recurring Only</SelectItem>
            </SelectContent>
          </Select>

          {selectedIds.length > 0 && (
            <div className="flex items-center">
              <Button
                className="bg-red-700 hover:bg-red-600"
                onClick={() => handleDelete(selectedIds)}
                disabled={deleteLoading}
              >
                {" "}
                <Trash className="h-4 w-4 mr-1" /> Delete {selectedIds.length}{" "}
                {selectedIds.length > 1 ? "transactions" : "transaction"}
              </Button>
            </div>
          )}
          {(searchTerm || recurringFilter || typeFilter) && (
            <Button
              variant="outline"
              className="hover:bg-gray-100"
              size="icon"
              onClick={handleClearFilters}
              title="Clear Filters"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      {/* Delete loading indicator */}

      {deleteLoading && (
        <BarLoader className="mt-4" width={"100%"} color="#120e40c8" />
      )}

      {/* Transactions */}
      <div className="rounded-md border">
        <div className="pl-6 pt-3 pb-3 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Recent Transactions
          </h2>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox
                  onCheckedChange={handleSelectAll}
                  checked={
                    selectedIds.length === paginatedTransactions.length &&
                    paginatedTransactions.length > 0
                  }
                />
              </TableHead>
              <TableHead
                className="w-[50px] cursor-pointer"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center text-muted-foreground">
                  Date{" "}
                  {sortConfig.field === "date" ? (
                    sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 w-4 h-4" />
                    ) : (
                      <ChevronDown className="ml-1 w-4 h-4" />
                    )
                  ) : (
                    <ArrowUpDown className="ml-1 h-4 w-4 opacity-40" />
                  )}
                </div>
              </TableHead>
              <TableHead className="w-[50px] text-muted-foreground">
                Description
              </TableHead>
              <TableHead
                className="w-[50px] cursor-pointer"
                onClick={() => handleSort("category")}
              >
                <div className="flex items-center text-muted-foreground">
                  Category
                  {sortConfig.field === "category" ? (
                    sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 w-4 h-4" />
                    ) : (
                      <ChevronDown className="ml-1 w-4 h-4" />
                    )
                  ) : (
                    <ArrowUpDown className="ml-1 h-4 w-4 opacity-40" />
                  )}
                </div>
              </TableHead>
              <TableHead
                className="w-[50px] cursor-pointer"
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center justify-end text-muted-foreground">
                  Amount
                  {sortConfig.field === "amount" ? (
                    sortConfig.direction === "asc" ? (
                      <ChevronUp className="ml-1 w-4 h-4" />
                    ) : (
                      <ChevronDown className="ml-1 w-4 h-4" />
                    )
                  ) : (
                    <ArrowUpDown className="ml-1 h-4 w-4 opacity-40" />
                  )}
                </div>
              </TableHead>
              <TableHead className="w-[50px] text-muted-foreground">
                Recurring
              </TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-muted-foreground"
                >
                  No Transactions Found
                </TableCell>
              </TableRow>
            ) : (
              paginatedTransactions.map((transaction) => {
                return (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      <Checkbox
                        onCheckedChange={() => handleSelect(transaction.id)}
                        checked={selectedIds.includes(transaction.id)}
                      />
                    </TableCell>
                    <TableCell>
                      {format(new Date(transaction.date), "PP")}
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell className="capitalize">
                      <span
                        style={{
                          background: categoryColors[transaction.category],
                        }}
                        className="px-2 py-1 rounded text-white text-sm"
                      >
                        {transaction.category}
                      </span>
                    </TableCell>
                    <TableCell
                      className="text-right font-medium"
                      style={{
                        color: transaction.type === "EXPENSE" ? "red" : "green",
                      }}
                    >
                      {transaction.type === "EXPENSE" ? "-" : "+"}$
                      {transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      {transaction.isRecurring ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge
                              variant="outline"
                              className="gap-1 bg-purple-100 text-purple-700 hover:bg-purple-200"
                            >
                              <RefreshCw className="h-3 w-3" />
                              {
                                RECURRING_INTERVALS[
                                  transaction.recurringInterval
                                ]
                              }
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <div>
                              <div className="text-sm">Next Date:</div>
                              <div>
                                {formatDate(
                                  transaction.nextRecurringDate,
                                  "PP"
                                )}
                              </div>
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <Badge variant="outline" className="gap-1">
                          <Clock className="h-3 w-3" />
                          One-time
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            className="text-sm"
                            onClick={() => {
                              router.push(
                                `/transaction/create?edit=${transaction.id}`
                              );
                            }}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-sm text-destructive"
                            onClick={() => {
                              handleDelete([transaction.id]);
                            }}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/*Pagination*/}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              handlePageChange(currentPage - 1);
            }}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              handlePageChange(currentPage + 1);
            }}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default TransactionTable;
