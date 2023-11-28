"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("da8d9127-2125-4b36-ac5d-9fae44ac32bc");
  }, []);

  return null;
};
