import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { TypeAct } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateTraceId(): string {
  // Your trace ID generation logic here
  return Date.now().toString();
}

export function getTheaterBaseUrl(theaterName: string): string {
  return `${process.env.NEXT_PUBLIC_SERVICE_BASE_URL}/actor/mock/${theaterName}`;
}

export function getActUrl(theaterName: string, endPoint: string): string {
  return `${process.env.NEXT_PUBLIC_SERVICE_BASE_URL}/actor/mock/${theaterName}${endPoint}`;
}

export function getActCurl(actDetails: TypeAct): string {
  return `curl --location --request ${actDetails.method} '${getActUrl(
    actDetails.theaterName || "",
    actDetails.endPoint
  )}'`;
}
