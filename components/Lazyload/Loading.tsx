import React, { useState, useEffect } from 'react'
import { Loading as LoadingView } from "@nextui-org/react"

const Loading = ({ duration = -1 }: { duration?: number }) => {
  const [show, setShow] = useState<boolean>(duration < 0);

  useEffect(() => {
    let timeHandler: any;
    let cancel = () => {
      //
    };
    if (duration) {
      timeHandler = setTimeout(() => setShow(true), duration)
      cancel = () => {
        clearTimeout(timeHandler);
      }
    }
    return cancel;
  }, [])

  // const { t } = useTranslation();
  return show ? <LoadingView type="points" /> : null;
};

export default Loading;
