import React from "react";
import GridShape from "../../modules/auth/components/grid-shape";
import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-background relative container mx-auto flex min-h-screen w-[90%] flex-col items-center justify-center gap-10 md:w-[80%] lg:flex-row">
      <div className="flex w-full items-center justify-center lg:w-1/2">
        {children}
      </div>
      <div className="hidden h-full w-full items-center md:block lg:w-1/2">
        <div className="relative z-1 flex items-center justify-center">
          {/* <!-- ===== Common Grid Shape Start ===== --> */}
          <GridShape />
          <div className="flex flex-col items-center">
            <Image
              src={"/images/overgive-logo.svg"}
              alt="overgive-logo"
              height={400}
              width={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
