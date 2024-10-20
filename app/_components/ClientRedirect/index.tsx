"use client";
import React, { ReactNode } from "react";
import { useRouter } from "next/navigation";

interface ClientRedirectProps {
  to: string;
  children: ReactNode;
}

function ClientRedirect({ children, to }: ClientRedirectProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(to);
  };

  const clonedChildren = React.Children.map(children, (child) => {
    return React.cloneElement(child as React.ReactElement, {
      onClick: handleClick,
      style: {
        cursor: "pointer",
        ...((child as React.ReactElement).props.style || {}),
      },
    });
  });

  return <>{clonedChildren}</>;
}

export default ClientRedirect;
