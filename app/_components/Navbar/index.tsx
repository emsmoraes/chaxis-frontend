import React from "react";
import Mobile from "./Mobile";
import Desktop from "./Desktop";

function Navbar() {
  return (
    <div>
      <div className="block sm:hidden">
        <Mobile />
      </div>

      <div className="hidden sm:block">
        <Desktop />
      </div>
    </div>
  );
}

export default Navbar;
