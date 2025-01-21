import styled from "styled-components";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Wrapper = styled.div`
    width: 100vw;
    min-height: 100%;
`;

const Image = styled.img`
    display: block;
    width: 96%;
    height: 100%;
    margin-inline: auto;
    margin-bottom: 40px;
    opacity: 0; /* Start hidden */
    transform: translateY(50px); /* Start slightly off-screen */
`;

export default function Images({ images }) {
    const wrapperRef = useRef(null);
    const imagesRef = useRef([]);



    useEffect(() => {
        setTimeout(() => {
            imagesRef.current.forEach((image, i) => {
                if (image) {
                    gsap.fromTo(
                        image,
                        {
                            opacity: 0,
                            y: 50,
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.5,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: image,
                                start: "top 75%",
                                end: "top 75%",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );
                }
            });
        }, 3200);
    }, [images]);

    return (
        <Wrapper ref={wrapperRef}>
            {images.map((img, index) => (
                <Image
                    key={index}
                    src={img}
                    ref={(el) => (imagesRef.current[index] = el)}
                />
            ))}
        </Wrapper>
    );
}
