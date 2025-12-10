"use client";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Link } from "@/i18n/navigation";
import { cn, formatRupiah } from "@/lib/utils";
import {
  UserCircle,
  LogOut,
  List,
  Heart,
  MessageSquare,
  HelpCircle,
  Settings,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./button";

export default function ProfilePopover({ users }) {
  const [open, setOpen] = useState(false);

  const fullname = users?.data?.fullname ?? "User";
  const avatar = users?.data?.avatar ?? "/default-avatar.png";
  const balance = users?.data?.balance ?? 0;
  const point = users?.data?.poin ?? 0;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Link
          href={"/account"}
          className="flex items-center gap-2 cursor-pointer"
          onMouseEnter={() => setOpen(true)}
        >
          <div
            className={cn(
              "w-10 h-10 rounded-full bg-primary/10 text-white",
              "flex items-center justify-center bg-primary transition px-0"
            )}
          >
            <UserCircle className="w-8 h-8" />
          </div>

          <span className="hidden md:block text-xs font-medium max-w-[90px] truncate">
            {fullname}
          </span>
        </Link>
      </PopoverTrigger>

      <PopoverContent
        className="w-[330px] p-0 shadow-none rounded-md"
        align="end"
        sideOffset={12}
        onMouseLeave={() => setOpen(false)}
      >
        {/* HEADER */}
        <div className="bg-blue-800 text-white p-3 rounded-t-md">
          <div className="flex items-center gap-3">
            <UserCircle className="w-12 h-12" />
            <div>
              <h3 className="font-semibold text-lg">{fullname}</h3>
              <Button
                size="xs"
                variant="link"
                className="text-xs flex flex-row items-center gap-1.5 p-0"
              >
                Edit Profil
              </Button>
            </div>
          </div>
        </div>

        {/* PAYMENT OPTIONS */}
        <div className="grid grid-cols-2 border-b p-3 text-center text-sm">
          <div className="flex flex-col gap-1">
            <span className="font-medium text-xs">Koin</span>
            <div className="flex flex-col justify-center items-center flex-1 ">
              <span className="text-primary font-semibold">{point}</span>
            </div>
          </div>
          <div className="flex flex-col border-l">
            <span className="font-medium text-xs">Saldo</span>
            <div className="flex flex-col justify-center items-center flex-1 ">
              <span className="text-primary font-semibold">{formatRupiah(balance)}</span>
            </div>
          </div>
        </div>

        {/* RIWAYAT PEMBELIAN */}
        <div className="p-3 border-b">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-sm">Riwayat Pembelian</span>
            <Link href="/orders" className="text-blue-600 text-tiny">
              Lihat Semua »
            </Link>
          </div>

          <div className="grid grid-cols-4 text-center text-xs gap-2">
            {/* Menunggu Pembayaran */}
            <Link
              href="/orders?status=pending"
              className="flex flex-col items-center gap-1 px-2 py-2 hover:bg-muted rounded transition"
            >
              <List size={16} />
              <span className="text-tiny text-foreground/70 text-center">
                Menunggu Pembayaran
              </span>
            </Link>

            {/* Menunggu Dikirim */}
            <Link
              href="/orders?status=shipping"
              className="flex flex-col items-center gap-1 px-2 py-2 hover:bg-muted rounded transition"
            >
              <List size={16} />
              <span className="text-tiny text-foreground/70 text-center">
                Menunggu Dikirim
              </span>
            </Link>

            {/* Sudah Terkirim */}
            <Link
              href="/orders?status=delivered"
              className="flex flex-col items-center gap-1 px-2 py-2 hover:bg-muted rounded transition"
            >
              <List size={16} />
              <span className="text-tiny text-foreground/70 text-center">
                Sudah Terkirim
              </span>
            </Link>

            {/* Selesai */}
            <Link
              href="/orders?status=done"
              className="flex flex-col items-center gap-1 px-2 py-2 hover:bg-muted rounded transition"
            >
              <List size={16} />
              <span className="text-tiny text-foreground/70 text-center">
                Selesai
              </span>
            </Link>
          </div>
        </div>

        {/* MENU LIST */}
        <div className="p-2 flex flex-col text-sm">
          <Link
            href="/favorite"
            className="flex items-center gap-2 px-2 py-2 hover:bg-muted rounded"
          >
            <Heart size={16} /> <span className="text-xs">Produk Favorit</span>
          </Link>

          <Link
            href="/inbox"
            className="flex items-center gap-2 px-2 py-2 hover:bg-muted rounded"
          >
            <MessageSquare size={16} />{" "}
            <span className="text-xs">Kotak Pesan</span>
          </Link>

          <Link
            href="/help"
            className="flex items-center gap-2 px-2 py-2 hover:bg-muted rounded"
          >
            <HelpCircle size={16} />{" "}
            <span className="text-xs">Pusat Bantuan</span>
          </Link>

          <Link
            href="/settings"
            className="flex items-center gap-2 px-2 py-2 hover:bg-muted rounded"
          >
            <Settings size={16} /> <span className="text-xs">Pengaturan</span>
          </Link>

          <button
            onClick={() => document.dispatchEvent(new CustomEvent("logout"))}
            className="flex items-center gap-2 px-2 py-2 text-red-600 hover:bg-red-50 rounded mt-1"
          >
            <LogOut size={16} /> <span className="text-xs">Logout</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
