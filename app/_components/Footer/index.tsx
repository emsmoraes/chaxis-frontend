import React from "react";

function Footer() {
  return (
  <footer className="flex w-full flex-col items-center justify-center gap-1 bg-foreground py-3 text-xs">
  <span className="text-primary-text/70">
    © Chaxis | Todos os direitos reservados
  </span>

  <p className="text-primary-text/40">
    por{" "}
    <a
      href="https://sitenoar.vercel.app"
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary-text/60 underline transition-colors hover:primary-text"
    >
      SiteNoAr
    </a>
  </p>
</footer>
  );
}

export default Footer;
