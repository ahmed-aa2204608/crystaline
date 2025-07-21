import { useState, useRef } from "react";
import { TiLocationArrow } from "react-icons/ti";

export const BentoTilt = ({ children, className = "" }) => {
    const [transformStyle, setTransformStyle] = useState("");
    const itemRef = useRef(null);

    const handleMouseMove = (event) => {
        if (!itemRef.current) return;

        const { left, top, width, height } =
            itemRef.current.getBoundingClientRect();

        const relativeX = (event.clientX - left) / width;
        const relativeY = (event.clientY - top) / height;

        const tiltX = (relativeY - 0.5) * 5;
        const tiltY = (relativeX - 0.5) * -5;

        const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
        setTransformStyle(newTransform);
    };

    const handleMouseLeave = () => {
        setTransformStyle("");
    };

    return (
        <div
            ref={itemRef}
            className={className}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ transform: transformStyle }}
        >
            {children}
        </div>
    );
};

export const BentoCard = ({ src, title, description, isComingSoon }) => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [hoverOpacity, setHoverOpacity] = useState(0);
    const hoverButtonRef = useRef(null);

    const handleMouseMove = (event) => {
        if (!hoverButtonRef.current) return;
        const rect = hoverButtonRef.current.getBoundingClientRect();

        setCursorPosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        });
    };

    const handleMouseEnter = () => setHoverOpacity(1);
    const handleMouseLeave = () => setHoverOpacity(0);

    // Check if src is a video or image
    const isVideo = src.includes('.mp4') || src.includes('.webm') || src.includes('.mov');

    return (
        <div className="relative w-full h-full">
            {isVideo ? (
                <video
                    src={src}
                    loop
                    muted
                    autoPlay
                    className="absolute left-0 top-0 w-full h-full object-cover object-center"
                    style={{ filter: 'brightness(0.6) contrast(1.1)' }}
                />
            ) : (
                <img
                    src={src}
                    alt="Bento card background"
                    className="absolute left-0 top-0 w-full h-full object-cover object-center"
                    style={{ filter: 'brightness(0.6) contrast(1.1)' }}
                />
            )}
            <div className="relative z-10 flex w-full h-full flex-col justify-between p-5 text-blue-50">
                <div>
                    <h1 className="font-circular-web text-2xl md:text-4xl font-bold">{title}</h1>
                    {description && (
                        <p className="mt-3 max-w-64 text-xs md:text-base">{description}</p>
                    )}
                </div>

                {isComingSoon && (
                    <div
                        ref={hoverButtonRef}
                        onMouseMove={handleMouseMove}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className="border-hsla relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black px-5 py-2 text-xs uppercase text-white/20"
                    >
                        <div
                            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                            style={{
                                opacity: hoverOpacity,
                                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, #656fe288, #00000026)`,
                            }}
                        />
                        <TiLocationArrow className="relative z-20" />
                        <p className="relative z-20">coming soon</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const Features2 = () => (
    <section id="experiences" className="bg-black pb-52">
        <div className="container mx-auto px-3 md:px-10">
            <div className="px-5 py-32 flex justify-center items-center">
                <h1 className="font-bold text-7xl text-blue-50">
                    My Work Experiences
                </h1>

            </div>

            {/* Horizontal Layout - Stacked rectangles with icon space */}
            <div className="flex flex-col gap-7">

                {/* Icon space + Horizontal rectangle 1 */}
                <div className="flex items-center gap-8">
                    <div className="w-16 h-16 flex-shrink-0">
                        {/* Space for icon */}
                    </div>
                    <BentoTilt className="border-hsla relative h-48 flex-1 overflow-hidden rounded-md">
                        <BentoCard
                            src="videos/QCRI_Logo.jpeg"
                            title={
                                <>
                                    Qatar Computer Research Institute
                                </>
                            }
                            description="Software Engineering Intern"
                        />
                    </BentoTilt>
                </div>

                {/* Icon space + Horizontal rectangle 2 */}
                <div className="flex items-center gap-8">
                    <div className="w-16 h-16 flex-shrink-0">
                        {/* Space for icon */}
                    </div>
                    <BentoTilt className="border-hsla relative h-48 flex-1 overflow-hidden rounded-md">
                        <BentoCard
                            src="img/Hospital.png"
                            title={
                                <>
                                    Hamad Medical Corporation
                                </>
                            }
                            description="Machine Learning Engineering Intern."
                        />
                    </BentoTilt>
                </div>

                {/* Icon space + Horizontal rectangle 3 */}
                <div className="flex items-center gap-8">
                    <div className="w-16 h-16 flex-shrink-0 scale-[1.75] ">
                    </div>
                    <BentoTilt className="border-hsla relative h-48 flex-1 overflow-hidden rounded-md">
                        <BentoCard
                            src="videos/bemysenseapp_cover.jpeg"
                            title={
                                <>
                                    Be My Sense
                                </>
                            }
                            description="Building a cross-platform app using React Native for sign language translation and voice-to-text"
                        />
                    </BentoTilt>
                </div>


                {/* Icon space + Final CTA rectangle */}
                <div className="flex items-center gap-8">
                    <div className="w-16 h-16 flex-shrink-0">
                        {/* Space for icon */}
                    </div>
                </div>

            </div>
        </div>
    </section>
);

export default Features2;