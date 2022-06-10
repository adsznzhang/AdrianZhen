import React, { useEffect, useRef } from "react";

import type { Nullable } from "@/types";

import * as styles from "./Page.module.scss";

import {Comments} from "@/components/Comment";
import GoogleTranslate from "@/components/GoogleTranslate/GoogleTranslate"

interface Props {
  title?: string;
  children: React.ReactNode;
}

const Page: React.FC<Props> = ({ title, children }: Props) => {
  const pageRef = useRef<Nullable<HTMLDivElement>>(null);

  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.scrollIntoView();
    }
  }, []);

  return (
    <div ref={pageRef} className={styles.page}>
      <GoogleTranslate/>
      <div className={styles.inner}>
        {title && <h1 className={styles.title}>{title}</h1>}
        <div className={styles.body}>{children}</div>
        <Comments/>
      
      </div>
    </div>
  );
};

export default Page;
