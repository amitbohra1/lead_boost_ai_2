"use client";

import { Header } from "@/components/global/header";
import React from "react";
import AuthGuard from "../guard/auth.guard";
import { PersistProviders } from "@/providers/presist-provider";

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <PersistProviders>
        <main className="h-screen">
          <Header />
          {children}
        </main>
      </PersistProviders>
    </AuthGuard>
  );
}
