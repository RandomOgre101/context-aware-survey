import React from "react";
// import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Avatar } from "../components/ui/avatar";

const Landing = () => {
  return (
    <>
      <header className="px-4 lg:px-6 h-14 flex items-center">
        <div className="flex items-center justify-center" href="#">
          <span className="sr-only">Survey Inc</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <div
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Features
          </div>
          <div
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Pricing
          </div>
          <div
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            About
          </div>
          <div
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contact
          </div>
        </nav>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Contextually Aware Surveys
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  We provide smart, contextual survey solutions that help your
                  company understand and engage your customers.
                </p>
              </div>
              <div className="space-x-4">
                <div
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  Get Started
                </div>
                <div
                  className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                  href="#"
                >
                  Learn more
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="grid items-center gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <img
                alt="Image"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="310"
                src="/placeholder.svg"
                width="550"
              />
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                    Contextual Surveys
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Understand your customers better.
                  </h2>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Our platform uses advanced AI to provide contextually aware
                    surveys. This allows us to provide better, more relevant
                    data for your company.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button>Try for free</Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © Survey Inc. All rights reserved.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <div className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </div>
          <div className="text-xs hover:underline underline-offset-4" href="#">
            Privacy
          </div>
        </nav>
      </footer>
    </>
  );
};

export default Landing;
