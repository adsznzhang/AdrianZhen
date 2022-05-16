import React from "react";

import { Link } from "gatsby";

import * as styles from "./Menu.module.scss";

type Props = {
  menu: Array<{
    label: string;
    path: string;
  }>;
  style:React.CSSProperties
  style1:React.CSSProperties
};

const Menu: React.FC<Props> = ({menu,style1,style }: Props) => (
  <nav className={styles.menu}>
    <ul className={styles.list}>
      {menu.map((item) => (
        <li style={style}  className={styles.item} key={item.path}>
          <Link style={style1}
            to={item.path}
            className={styles.link}
            activeClassName={styles.active}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Menu;
