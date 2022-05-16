import React from "react";

import { useSiteMetadata } from "@/hooks";

import { Menu } from "../Sidebar/Menu";

import * as styles from "./NavHeader.module.scss";



const NavHeader = () => {

  const { menu } = useSiteMetadata();
  return (
      <div className={styles.header} >
        <div className={styles.right}>
        <Menu style1={{margin:"10px", fontWeight:"bold"}} style={{display: "inline-block",padding:"0",margin:"0",textAlign:"right"}} menu={menu} />
      </div>
      </div>
  );
};

export default NavHeader;
