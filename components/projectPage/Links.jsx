import styled from "styled-components";

const Wrapper = styled.div`
    width: 96%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-inline: auto;
    gap: 10px;
    margin-top: 40px;
    margin-bottom: 150px;

    @media screen and (max-width: 470px) {
        flex-direction: column;
        margin-top: 30px;
    }
`

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    border: 0;
    border: 2px solid rgba(255,255,255,.5);
    background: none;
    font-size: var(--small4);
    font-family: "Mori-SemiBold";
    color: #c5c5c5;
    cursor: pointer;
    padding: 10px 30px;
    border-radius: 50px;
    transition: all 0.3s cubic-bezier(.075,.82,.165,1);

    @media screen and (max-width: 768px) {
        font-size: var(--small5);
    }

    &:hover {
        border: 2px solid #fff;
        color: #fff;
    }

`

export default function Links({backend,frontend,demo}) {

    return (
        <Wrapper>
            <Button onClick={() => window.open(backend, "_blank")}>Backend</Button>
            <Button onClick={() => window.open(frontend, "_blank")}>Frontend</Button>
            <Button onClick={() => window.open(demo, "_blank")}>Try it out!</Button>
        </Wrapper>
    )
}