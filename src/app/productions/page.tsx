import { Metadata } from "next";
import { PROJECTS_DATA } from "@/lib/data";
import ProductionsClient from "./ProductionsClient";

export const metadata: Metadata = {
  title: "Productions | Poppy Productions",
  description:
    "Explore the complete portfolio of award-winning feature films, television drama series, commercials, and digital productions by Poppy Productions.",
};

export default function ProductionsPage() {
  return <ProductionsClient projects={PROJECTS_DATA} />;
}
