// import React from 'react'
import { Image, styled, useTheme } from "@nextui-org/react";
import { isMobile } from "react-device-detect";
// import Image from "next/image";

// import SmallLogo from "@/public/logo/logo.png"

const LogoBox = styled('div', {
  width: "auto",
  height: "38px"
})

function SmallLogoIcon({
  width,
  height,
  alt,
  objectFit = "contain"
}: {
  width: any
  height: any
  alt: string
  objectFit?: any
}) {
  const { isDark } = useTheme();
  if (isMobile) {
    return <Image
      width={width}
      height={height}
      maxDelay={100}
      src={"/logo/logo_color.png"}
      alt={alt}
      objectFit={objectFit}
    />
  }
  if (isDark) {
    return <Image
      width={width}
      height={height}
      maxDelay={100}
      src={"/logo/logo_white.png"}
      alt={alt}
      objectFit={objectFit}
    />
  }
  return <Image
    width={width}
    height={height}
    maxDelay={100}
    src={"/logo/logo.png"}
    alt={alt}
    objectFit={objectFit}
  />
}

export default function Logo () {
  return <LogoBox>
    <SmallLogoIcon
      width={"100%"}
      height={38}
      alt="Multichain"
      objectFit="contain"
    />
  </LogoBox>
}