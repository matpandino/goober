import { clsx, type ClassValue } from 'clsx';
import { formatDistance } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const kmFormatter = new Intl.NumberFormat("en-US", {
  style: 'unit',
  unit: 'kilometer',
  unitDisplay: 'short',
  maximumFractionDigits: 1
});

export const formatSecondsToText = (seconds: number) => formatDistance(0, seconds * 1000, { includeSeconds: true })
