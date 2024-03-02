import React from "react";
import Image from "next/image";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/">
      <Image
        src="/images/logo.svg"
        alt="top image"
        quality={100}
        width={120}
        height={30}
        priority
      />
    </Link>
  );
}

export default Logo;
