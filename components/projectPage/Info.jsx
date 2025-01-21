import { useEffect, useRef } from "react"
import styled from "styled-components"
import gsap from "gsap"

const Wrapper = styled.div`
    min-height: 100%;
    width: 96%;
    margin-inline: auto;
    margin-top: 200px;
`

const GridWrapper = styled.div`
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 2fr 0.5fr 0.5fr 1fr;
    margin-bottom: 15px;

    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr;
        grid-template-rows: 1fr 70px 70px 130px;
    }  
`

const Translate = styled.div`
    transform: translateY(-92px);

    @media screen and (max-width: 768px) {
        transform: translateY(0px);
        margin-bottom: 20px;
    }
`

const Title = styled.p`
    font-size: var(--medium);
    font-family: "Mori-SemiBold";
    color: #fff;
`

const GridItem = styled.div`
    width: 100%;
    height: 100%;
    padding-right: 40px;
`

const SubTitle = styled.p`
    font-size: var(--small5);
    font-family: "Mori-Regular";
    color: #c5c5c5;
    margin-bottom: 5px;
`

const SubText = styled.p`
    font-size: var(--small4);
    font-family: "Mori-Regular";
    color: #ffffff;
    margin-bottom: 20px;
`



export default function Info({title,description,stack,year,platform}) {
    const ref = useRef(null);

    useEffect(() => {
        gsap.set(ref.current, {
            opacity: 0
        })
        gsap.to(ref.current, {
            opacity: 1,
            duration: 0.3,
            delay: 2.7
        })
    })

    return (
    <Wrapper ref={ref}>
        <Title>{title}</Title>
        <GridWrapper >
            <GridItem >
                <SubTitle>ABOUT</SubTitle>
                <SubText>{description}</SubText>
            </GridItem>
            <GridItem>
                <SubTitle>PLATFORM</SubTitle>
                <SubText>{platform}</SubText>
            </GridItem>
            <GridItem>
                <SubTitle>YEAR</SubTitle>
                <SubText>{year}</SubText>
            </GridItem>
            <GridItem>
                <SubTitle>STACK</SubTitle>
                {stack.map((item,index) => (
                    <SubText style={{marginBottom: "10px",display: "inline-block",paddingRight: "5px"}} key={index}>{index !== stack.length - 1 ? item + "," : item}</SubText>
                ))}
            </GridItem>
        </GridWrapper>
        </Wrapper>
    )
}