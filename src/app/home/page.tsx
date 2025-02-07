import  {Context}  from "@/components/home/HomePageContext";
import { Header } from "@/components/shared/Header";
import React from "react";

export default function Home() {
  return (
    <main>
      <body className="bg-gray-200">
        <Header />
        <Context/>
      </body>
    </main>
  );
}
