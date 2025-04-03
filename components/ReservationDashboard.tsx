"use client";

import { useState } from "react";
import { Search, Calendar, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ReservationDashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col w-full min-h-screen">
      <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 border-b bg-background">
        <div className="flex items-center gap-2">
          <div className="p-2 border rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M2 8h20" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold">Reservations For SWYFTIN <span className="">(MADE BY: nishantraj2109@gmail.com)</span></h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-1">
            Actions <ChevronDown className="w-4 h-4" />
          </Button>
          <Button className="gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
            Create
          </Button>
          <Button variant="outline" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <line x1="3" x2="21" y1="9" y2="9" />
              <line x1="9" x2="9" y1="21" y2="9" />
            </svg>
          </Button>
        </div>
      </header>

      <div className="p-4">
        <div className="flex flex-col gap-4 mb-4 md:flex-row md:items-center">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="gap-1">
              Communication <ChevronDown className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="gap-1">
              Status <ChevronDown className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="gap-1">
              Source <ChevronDown className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="gap-1">
              Payment <ChevronDown className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="gap-1">
              <Calendar className="w-4 h-4 mr-1" />
              Pick date range
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reservations.map((reservation) => (
            <ReservationCard key={reservation.id} reservation={reservation} />
          ))}
        </div>
      </div>
    </div>
  );
}

interface Reservation {
  id: string;
  guest: {
    name: string;
    initial: string;
    color: string;
  };
  status: "Pending" | "Confirmed" | "Canceled";
  reservationNumber: string;
  checkIn: string;
  checkOut: string;
  email: string;
  phone: string;
  bookingDate: string;
  paymentStatus: "Received" | "Pending" | "Partial" | string;
  partialAmount?: string;
  guests: {
    adults: number;
    children: number;
  };
  total: string;
  due: string;
}

function ReservationCard({ reservation }: { reservation: Reservation }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Confirmed":
        return "bg-green-500 text-white";
      case "Pending":
        return "bg-yellow-500 text-white";
      case "Canceled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Received":
        return "bg-green-500 text-white";
      case "Pending":
        return "bg-red-500 text-white";
      case "Partial":
        return "bg-amber-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  const getDueColor = (amount: string) => {
    if (amount.includes("$0")) return "bg-green-500 text-white";
    return "bg-red-500 text-white";
  };

  return (
    <Card className="overflow-hidden border border-gray-200">
      <div className="flex items-center justify-between p-3 border-b">
        <div className="flex items-center gap-3">
          <Avatar className={`${reservation.guest.color} text-white flex items-center justify-center`}>
            <span className="text-lg font-semibold">
              {reservation.guest.initial}
            </span>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{reservation.guest.name}</span>
              <Badge
                className={`${getStatusColor(reservation.status)} text-xs`}
              >
                {reservation.status}
              </Badge>
            </div>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>Res. No: {reservation.reservationNumber}</span>
              <button className="ml-1 hover:cursor-pointer hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                  <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8 hover:cursor-pointer">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>View Details</DropdownMenuItem>
            <DropdownMenuItem>Edit Reservation</DropdownMenuItem>
            <DropdownMenuItem>Cancel Reservation</DropdownMenuItem>
            <DropdownMenuItem>Send Reminder</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <CardContent className="p-0">
        <div className="grid grid-cols-2 gap-1 p-3 text-sm ">
          <div>
            <div className="flex items-center mb-1 text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              Check-in / Check-out
            </div>
            <div>{`${reservation.checkIn} - ${reservation.checkOut}`}</div>
          </div>
          <div>
            <div className="flex items-center mb-1 text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Email
            </div>
            <div className="truncate">{reservation.email}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1 p-3 text-sm ">
          <div>
            <div className="flex items-center mb-1 text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Phone
            </div>
            <div className="flex items-center gap-1">
              {reservation.phone}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="p-1 rounded-full hover:bg-gray-100 hover:text-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Call</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="p-1 rounded-full hover:bg-gray-100 hover:text-black">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>WhatsApp</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div>
            <div className="flex items-center mb-1 text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                <line x1="16" x2="16" y1="2" y2="6" />
                <line x1="8" x2="8" y1="2" y2="6" />
                <line x1="3" x2="21" y1="10" y2="10" />
              </svg>
              Booking Date
            </div>
            <div className="flex items-center">
              {reservation.bookingDate}
              <Badge
                className={`ml-2 text-xs ${getPaymentStatusColor(
                  reservation.paymentStatus
                )}`}
              >
                {reservation.paymentStatus}
                {reservation.paymentStatus === "Partial" &&
                  ` ${reservation.partialAmount}`}
              </Badge>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1 p-3 text-sm ">
          <div>
            <div className="flex items-center mb-1 text-muted-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Guests
            </div>
            <div className="flex items-center gap-1">
              {Array(reservation.guests.adults)
                .fill(0)
                .map((_, i) => (
                  <svg
                    key={`adult-${i}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                ))}
              {Array(reservation.guests.children)
                .fill(0)
                .map((_, i) => (
                  <svg
                    key={`child-${i}`}
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-3">
          <div>
            <div className="text-xs text-muted-foreground">
              Total: {reservation.total}
            </div>
            <Badge className={`mt-1 ${getDueColor(reservation.due)}`}>
              Due: {reservation.due}
            </Badge>
          </div>
          <Button className="hover:cursor-pointer" variant="outline" size="sm">
            View Room
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

const reservations: Reservation[] = [
  {
    id: "1",
    guest: {
      name: "John Doe",
      initial: "B",
      color: "bg-blue-500",
    },
    status: "Pending",
    reservationNumber: "112345",
    checkIn: "01/01/2024",
    checkOut: "01/05/2024",
    email: "john.doe@example.com",
    phone: "+1 234-567-890",
    bookingDate: "12/25/2023",
    paymentStatus: "Received",
    guests: {
      adults: 2,
      children: 1,
    },
    total: "$500",
    due: "$200",
  },
  {
    id: "2",
    guest: {
      name: "Jane Smith",
      initial: "H",
      color: "bg-red-500",
    },
    status: "Canceled",
    reservationNumber: "112346",
    checkIn: "02/01/2024",
    checkOut: "02/03/2024",
    email: "jane.smith@example.com",
    phone: "+1 987-654-321",
    bookingDate: "01/15/2024",
    paymentStatus: "Pending",
    guests: {
      adults: 2,
      children: 1,
    },
    total: "$300",
    due: "$100",
  },
  {
    id: "3",
    guest: {
      name: "Manoj",
      initial: "M",
      color: "bg-orange-500",
    },
    status: "Confirmed",
    reservationNumber: "Testqweq",
    checkIn: "03/01/2024",
    checkOut: "03/03/2024",
    email: "niks@live.in",
    phone: "+1 989-654-321",
    bookingDate: "02/15/2024",
    paymentStatus: "Partial",
    partialAmount: "1/2",
    guests: {
      adults: 2,
      children: 1,
    },
    total: "$1300",
    due: "$100",
  },
  {
    id: "4",
    guest: {
      name: "Robert Chen",
      initial: "Y",
      color: "bg-red-500",
    },
    status: "Confirmed",
    reservationNumber: "112347",
    checkIn: "01/10/2024",
    checkOut: "01/15/2024",
    email: "robert.chen@example.com",
    phone: "+1 555-123-4567",
    bookingDate: "12/30/2023",
    paymentStatus: "Received",
    guests: {
      adults: 2,
      children: 1,
    },
    total: "$750",
    due: "$0",
  },
  {
    id: "5",
    guest: {
      name: "Sarah Johnson",
      initial: "C",
      color: "bg-gray-500",
    },
    status: "Pending",
    reservationNumber: "112348",
    checkIn: "02/05/2024",
    checkOut: "02/07/2024",
    email: "sarah.j@example.com",
    phone: "+1 555-987-6543",
    bookingDate: "01/20/2024",
    paymentStatus: "Pending",
    guests: {
      adults: 2,
      children: 0,
    },
    total: "$400",
    due: "$400",
  },
  {
    id: "6",
    guest: {
      name: "Michael Brown",
      initial: "A",
      color: "bg-pink-500",
    },
    status: "Confirmed",
    reservationNumber: "112349",
    checkIn: "01/20/2024",
    checkOut: "01/22/2024",
    email: "m.brown@example.com",
    phone: "+1 555-789-0123",
    bookingDate: "01/05/2024",
    paymentStatus: "Received",
    guests: {
      adults: 1,
      children: 0,
    },
    total: "$300",
    due: "$150",
  },
  {
    id: "7",
    guest: {
      name: "Emma Wilson",
      initial: "M",
      color: "bg-orange-500",
    },
    status: "Confirmed",
    reservationNumber: "112350",
    checkIn: "02/15/2024",
    checkOut: "02/20/2024",
    email: "emma.w@example.com",
    phone: "+1 555-234-5678",
    bookingDate: "01/10/2024",
    paymentStatus: "Received",
    guests: {
      adults: 2,
      children: 2,
    },
    total: "$850",
    due: "$0",
  },
  {
    id: "8",
    guest: {
      name: "David Lee",
      initial: "Z",
      color: "bg-yellow-500",
    },
    status: "Pending",
    reservationNumber: "112351",
    checkIn: "03/05/2024",
    checkOut: "03/10/2024",
    email: "david.lee@example.com",
    phone: "+1 555-345-6789",
    bookingDate: "02/01/2024",
    paymentStatus: "Pending",
    guests: {
      adults: 1,
      children: 0,
    },
    total: "$600",
    due: "$600",
  },
  {
    id: "9",
    guest: {
      name: "Lisa Anderson",
      initial: "T",
      color: "bg-cyan-500",
    },
    status: "Confirmed",
    reservationNumber: "112352",
    checkIn: "02/25/2024",
    checkOut: "03/01/2024",
    email: "l.anderson@example.com",
    phone: "+1 555-456-7890",
    bookingDate: "01/25/2024",
    paymentStatus: "Received",
    guests: {
      adults: 2,
      children: 1,
    },
    total: "$450",
    due: "$0",
  },
];
