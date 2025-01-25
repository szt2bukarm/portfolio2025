import { useStore } from "@/store"
import { usePathname, useRouter } from "next/navigation"
import styled from "styled-components"
import styles from "./Name.module.css"

export default function Name () {
    const pathname = usePathname();
    const {setLowerCover,setAbout} = useStore();

    const handleClick = () => {
        if (pathname === "/about") setAbout(false);
        setLowerCover(true);
    }

    return (
        <p className={styles.text} onClick={handleClick}>
            BUKVIC ARMIN
        </p>
    )
}