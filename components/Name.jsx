import { useStore } from "@/store"
import { usePathname, useRouter } from "next/navigation"
import styled from "styled-components"

const Text = styled.p`
  font-size: var(--small5);
  letter-spacing: 3px;
  font-family: "Mori-SemiBold";
  position: fixed;
  top: 20px;
  left: 20px;
  color: #fff;
  z-index: 3;
  mix-blend-mode: difference;

  &:hover {
      cursor: pointer;
      color: #c5c5c5
  }
`

export default function Name () {
    const pathname = usePathname();
    const {setLowerCover,setAbout} = useStore();

    const handleClick = () => {
        if (pathname === "/about") setAbout(false);
        setLowerCover(true);
    }

    return (
        <Text onClick={handleClick}>
            BUKVIC ARMIN
        </Text>
    )
}