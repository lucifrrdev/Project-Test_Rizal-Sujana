import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast } from "sonner";

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export function formatRupiah(amount) {
  if (amount == null || isNaN(amount)) return "Rp0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export const showError = (msg) => {
  toast.error(msg, {
    duration: 2000,
    position: "top-center",
    className: "text-red-600 font-medium text-sm",
  });
};

export const showSuccess = (msg) => {
  toast.success(msg, {
    duration: 1800,
    position: "top-center",
    className: "text-green-600 font-semibold text-sm",
  });
};

export const scrollTo = (name) => {
  const el = document.querySelector(`[name="${name}"]`);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    el.focus();
  }
};
