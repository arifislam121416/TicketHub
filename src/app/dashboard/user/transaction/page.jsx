import React from "react";
import {
  Card,
  Chip,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Link,
} from "@heroui/react";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/app/lib/auth";

// Gravity UI Icons
import {
  Receipt,
  Ticket,
  Calendar,
  CreditCard,
  ShoppingBag,
} from "@gravity-ui/icons";

// React Icons
import {
  BiCheckCircle,
  BiXCircle,
  BiTimeFive,
  BiRefresh,
} from "react-icons/bi";
import { getTransactionsByUser } from "@/actions/getTransactionsByUser";

// স্ট্যাটাস অনুসারে কালার ও লেবেল
const statusConfig = {
  successful: { color: "success", label: "Successful", icon: BiCheckCircle },
  completed: { color: "success", label: "Completed", icon: BiCheckCircle },
  pending: { color: "warning", label: "Pending", icon: BiTimeFive },
  failed: { color: "danger", label: "Failed", icon: BiXCircle },
  refunded: { color: "default", label: "Refunded", icon: BiRefresh },
};

const UserTransactionPage = async () => {
  // ১. ইউজার সেশন চেক করা
  const headersList = await headers();
  const session = await auth.api.getSession({
    headers: headersList,
  });

  if (!session?.user) {
    redirect("/signIn?callbackUrl=/dashboard/transactions");
  }

  // ২. ডাটাবেজ থেকে ইউজারের ট্রানজেকশন ডাটা ফেচ করা
  let transactions = [];
  try {
    transactions = await getTransactionsByUser(session.user.id);
  } catch (error) {
    console.error("Failed to fetch transactions:", error);
  }

  // ৩. হিসেব-নিকাশ (Total Amount)
  const totalSpent = transactions
    .filter((t) => t.status === "successful" || t.status === "completed")
    .reduce((sum, item) => sum + (item.amount || 0), 0);

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
            <Receipt className="text-primary" size={32} />
            Transaction History
          </h1>
          <p className="text-default-500 mt-1 text-sm md:text-base">
            Track and review all your payment histories and invoices.
          </p>
        </div>

        <Button
          as={Link}
          href="/dashboard/bookings"
          color="primary"
          variant="flat"
          startContent={<Ticket size={18} />}
          className="font-semibold"
        >
          My Bookings
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="border border-default-200/60 shadow-sm">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <Receipt size={28} />
            </div>
            <div>
              <p className="text-xs font-medium text-default-500">
                Total Transactions
              </p>
              <h3 className="text-2xl font-bold text-foreground">
                {transactions.length}
              </h3>
            </div>
        </Card>

        <Card className="border border-default-200/60 shadow-sm">
            <div className="p-3 bg-success/10 rounded-xl text-success">
              <CreditCard size={28} />
            </div>
            <div>
              <p className="text-xs font-medium text-default-500">
                Total Amount Spent
              </p>
              <h3 className="text-2xl font-bold text-success">
                ${totalSpent.toFixed(2)}
              </h3>
            </div>
        </Card>
      </div>

      {/* ৪. কোনো ট্রানজেকশন না থাকলে (Empty State UI) */}
      {!transactions || transactions.length === 0 ? (
        <Card className="shadow-lg border border-default-100 bg-background/60 p-12 text-center">
            <div className="p-4 rounded-full bg-default-100 text-default-400">
              <Receipt size={48} />
            </div>
            <h3 className="text-xl font-bold">No Transactions Found</h3>
            <p className="text-default-500 max-w-md text-sm">
              You haven't made any payments yet. Once you complete a booking payment, it will show up here.
            </p>
            <Button
              as={Link}
              href="/tickets"
              color="primary"
              className="font-semibold shadow-md mt-2"
              startContent={<ShoppingBag size={18} />}
            >
              Explore Tickets
            </Button>
         
        </Card>
      ) : (
        /* ৫. ডায়নামিক ট্রানজেকশন টেবিল */
        <Card className="border border-default-200/60 shadow-sm overflow-hidden">
        
            <Table aria-label="Transaction history table" removeWrapper>
              <TableHeader>
                <TableColumn>TRANSACTION ID</TableColumn>
                <TableColumn>ITEM / TICKET</TableColumn>
                <TableColumn>METHOD</TableColumn>
                <TableColumn>DATE</TableColumn>
                <TableColumn>AMOUNT</TableColumn>
                <TableColumn align="center">STATUS</TableColumn>
              </TableHeader>
              <TableBody>
                {transactions.map((tx) => {
                  const currentStatus =
                    statusConfig[tx.status?.toLowerCase()] ||
                    statusConfig.pending;
                  const StatusIcon = currentStatus.icon;

                  return (
                    <TableRow key={tx._id || tx.id || tx.transactionId}>
                      {/* Transaction ID */}
                      <TableCell className="font-mono text-xs font-semibold text-primary">
                        #{tx.transactionId || tx._id?.substring(0, 8)}
                      </TableCell>

                      {/* Ticket Title */}
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Ticket size={16} className="text-default-400 shrink-0" />
                          <span className="font-medium text-foreground line-clamp-1">
                            {tx.ticketTitle || tx.bookingTitle || "Ticket Booking"}
                          </span>
                        </div>
                      </TableCell>

                      {/* Payment Method */}
                      <TableCell>
                        <div className="flex items-center gap-1.5 capitalize text-default-600 font-medium text-xs">
                          <CreditCard size={14} />
                          {tx.paymentMethod || "Online"}
                        </div>
                      </TableCell>

                      {/* Date */}
                      <TableCell>
                        <div className="flex items-center gap-1.5 text-default-500 text-xs">
                          <Calendar size={14} />
                          {tx.createdAt
                            ? new Date(tx.createdAt).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : tx.date || "N/A"}
                        </div>
                      </TableCell>

                      {/* Amount */}
                      <TableCell className="font-bold text-foreground">
                        ${tx.amount}
                      </TableCell>

                      {/* Status */}
                      <TableCell className="text-center">
                        <Chip
                          color={currentStatus.color}
                          variant="flat"
                          size="sm"
                          startContent={<StatusIcon size={14} className="ml-1" />}
                          className="capitalize font-semibold"
                        >
                          {currentStatus.label}
                        </Chip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
        
        </Card>
      )}
    </section>
  );
};

export default UserTransactionPage;