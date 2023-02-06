// import React from 'react'
import { Image, styled } from "@nextui-org/react";
// import Image from "next/image";

// import SmallLogo from "@/public/logo/logo.png"

const LogoBox = styled('div', {
  width: "auto",
  height: "38px"
})

export default function Logo () {
  return <LogoBox>
      <Image
        width={"100%"}
        height={38}
        // autoResize={true}
        maxDelay={0}
        src={"/logo/logo.png"}
        alt="Multichain"
        objectFit="contain"
      />
    </LogoBox>
}