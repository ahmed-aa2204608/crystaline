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
                />
            ) : (
                <img
                    src={src}
                    alt="Bento card background"
                    className="absolute left-0 top-0 w-full h-full object-cover object-center"
                    style={{ filter: 'brightness(0.8) contrast(1.1)' }}

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

const Features = () => (
    <section id="projects" className="bg-black pb-52">
        <div className="container mx-auto px-3 md:px-10">
            <div className="px-5 py-32 flex justify-center items-center">
                <h1 className="font-bold text-7xl text-blue-50">
                    My Projects
                </h1>

            </div>

            <BentoTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
                <BentoCard
                    src="img/studybuddyimg.png"
                    title={
                        <>
                            Study Assistant AI Fullstack Web App
                        </>
                    }
                    description="Engineered an AI-powered web app that converts uploaded course PDFs into flash-card decks, Timed Quizzes and Notes summarizations"
                />
            </BentoTilt>

            <div className="grid h-[135vh] w-full grid-cols-2 grid-rows-3 gap-7">
                <BentoTilt className="bento-tilt_1 row-span-1 md:col-span-1 md:row-span-2">
                    <BentoCard
                        src="img/notthatdeep.png"
                        title={
                            <>
                                YalaPay Mobile App
                            </>
                        }
                        description="Built a Flutter app with a dynamic dashboard for invoices and cheques."
                    />
                </BentoTilt>

                <BentoTilt className="bento-tilt_1 row-span-1 ms-32 md:col-span-1 md:ms-0">
                    <BentoCard
                        src="img/react-next.png"
                        title={
                            <>
                                Learning Management System
                            </>
                        }
                        description="Developed a robust full-stack web application using React & Next.js for managing student registration, course scheduling, and academic oversight."
                    />
                </BentoTilt>

                <BentoTilt className="bento-tilt_1 me-14 md:col-span-1 md:me-0">
                    <BentoCard
                        src="img/yep.png"
                        title={
                            <>
                                ResNet50 Skin Lesion Classification AI
                            </>
                        }
                        description="A deep learning model for classifying skin lesions."
                    />
                </BentoTilt>

                <BentoTilt className="bento-tilt_2">
                    <div className="flex w-full h-full flex-col justify-between bg-violet-300 p-5">
                        <h1 className="font-circular-web text-2xl md:text-4xl font-bold max-w-64 text-black">
                            M<b>o</b>re co<b>m</b>ing s<b>o</b>on.
                        </h1>

                        <TiLocationArrow className="m-5 scale-[5] self-end" />
                    </div>
                </BentoTilt>


            </div>
        </div>
    </section>
);

export default Features;