import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function debounce<Func extends (...args: unknown[]) => void>(func: Func, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;

  const debounced = (...args: Parameters<Func>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };

  debounced.cancel = () => clearTimeout(timeout);

  return debounced;
}
