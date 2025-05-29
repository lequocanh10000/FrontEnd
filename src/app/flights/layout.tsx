import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QAirline",
  description: "Tìm và đặt vé máy bay với giá tốt nhất",
};

export default function FlightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}
