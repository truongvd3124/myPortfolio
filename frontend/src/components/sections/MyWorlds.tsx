import React from 'react';
import ThreeDCarousel from '../ui/ThreeDCarousel';

const MyWorlds: React.FC = () => {
    const stories = [
        {
            id: 0,
            title: "Just, I really love Football",
            date: "2014 - current",
            category: "Sports",
            content: "Since childhood, I've loved football and dreamed of being selected for the HAGL football academy, but life circumstances didn't allow it.\nI started watching football in 2014 with the World Cup 2014, where Costa Rica left a deep impression on me.\nThat year I supported both the mighty German team and Argentina because of Messi - it was unfortunate for Messi but congratulations to Germany for winning.\nI'm a Manchester United fan."
        },
        {
            id: 1,
            title: "Exploring Geography & Nature",
            date: "2018 - current",
            category: "Travel & Nature",
            content: "I simply find it interesting to discuss geography. Although I still make mistakes, I can recognize 197/197 flags of countries and territories around the world. Check out these flag games: <a href='https://flagle-game.com/unlimited' target='_blank' rel='noopener noreferrer' class='text-cyan-400 hover:text-cyan-300 underline'>Flagle</a> and <a href='https://www.sporcle.com/games/g/worldflags' target='_blank' rel='noopener noreferrer' class='text-cyan-400 hover:text-cyan-300 underline'>Sporcle World Flags</a>."
        },
        {
            id: 2,
            title: "K-Drama Healing Journey",
            date: "2022 - current",
            category: "Entertainment",
            content: "I enjoy watching K-dramas because I discovered a really good healing drama called 'Our Beloved Summer' that partially healed me, so I fell in love with them.\nBefore that, there was also a popular drama 'Descendants of the Sun' with a supporting actress Kim Ji-won who I consider my angel."
        },
        {
            id: 3,
            title: "Dream (yeah, idk what to write here, just desire rest)",
            date: "Future",
            category: "Travel & Nature",
            content: "I just want to take a rest in this fast-paced and stressful life. I wish I could ski down and admire the vastest grassland scenery in Mongolia."
        }
    ];

    return (
        <section id="my-worlds" className="relative overflow-hidden py-20 bg-slate-950">
            {/* Decorative starry/glow background */}
            <div
                className="absolute inset-0 opacity-80 pointer-events-none"
                style={{
                    backgroundImage:
                        `radial-gradient(2px 2px at 20% 30%, rgba(56,189,248,0.45), transparent 60%),
                         radial-gradient(1.6px 1.6px at 40% 70%, rgba(14,165,233,0.4), transparent 60%),
                         radial-gradient(2.2px 2.2px at 80% 20%, rgba(168,85,247,0.4), transparent 60%),
                         radial-gradient(1.8px 1.8px at 70% 60%, rgba(34,211,238,0.35), transparent 60%),
                         radial-gradient(2px 2px at 30% 80%, rgba(6,182,212,0.35), transparent 60%),
                         radial-gradient(1.4px 1.4px at 55% 45%, rgba(59,130,246,0.35), transparent 60%)`,
                }}
            />
            {/* Soft glow blobs */}
            <div
                className="absolute inset-0 pointer-events-none mix-blend-screen"
                style={{
                    backgroundImage:
                        `radial-gradient(600px 300px at 10% 20%, rgba(34,211,238,0.10), transparent 60%),
                          radial-gradient(500px 400px at 80% 30%, rgba(168,85,247,0.10), transparent 60%),
                          radial-gradient(500px 500px at 50% 80%, rgba(14,165,233,0.08), transparent 60%)`,
                    filter: 'blur(30px)'
                }}
            />
            <div className="relative z-10 container mx-auto px-4 max-w-6xl">
                <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-to-br from-cyan-300 via-blue-300 to-purple-300 py-4 bg-clip-text text-transparent relative">
                    My Worlds
                </h2>
                
                {/* 3D Carousel */}
                <div className="h-96 mb-12">
                    <ThreeDCarousel />
                </div>

                {/* Timeline (simple) */}
                <div className="max-w-3xl mx-auto">
                    <ol className="relative border-l border-cyan-400/30 pl-6 space-y-8">
                        {stories.map((story) => (
                            <li key={story.id} className="relative">
                                <div className="relative z-10 flex items-center gap-3 mb-1">
                                    <span className="text-xs px-2 py-0.5 rounded-full bg-purple-900/20 text-cyan-200 border border-cyan-500/20">
                                        {story.category}
                                    </span>
                                </div>
                                <h3 className="text-slate-100 font-semibold">
                                    {story.title}
                                </h3>
                                <p 
                                    className="text-slate-400 text-sm mt-1"
                                    dangerouslySetInnerHTML={{ __html: story.content.replace(/\n/g, '<br />') }}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
};

export default MyWorlds;
