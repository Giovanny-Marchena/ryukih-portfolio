import React from 'react';

const Skills = () => {
    const skills = [
        { name: 'Artificial Intelligence', level: 'Expert' },
        { name: 'Algorithms', level: 'Advanced' },
        { name: 'Full-Stack Development', level: 'Proficient' },
        { name: 'Data Analysis', level: 'Intermediate' },
        { name: 'UI/UX Design', level: 'Beginner' },
    ];

    return (
        <section className="bg-[#023047] py-12 sm:py-16 text-center">
            <h2 className="text-[#fb6107] text-3xl sm:text-4xl md:text-5xl font-['Outfit'] font-bold mb-8 opacity-0 animate-fadeIn">
                My Skills
            </h2>
            <div className="max-w-[90%] sm:max-w-5xl mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
                    {skills.map((skill, index) => (
                        <div
                            key={skill.name}
                            className="bg-[#1b2a33] p-4 sm:p-6 rounded-lg hover:bg-[#1b2a33]/80 hover:shadow-[0_0_10px_#fb6107] transition-all duration-300 opacity-0 animate-fadeIn"
                            style={{ animationDelay: `${index * 300}ms` }}
                        >
                            <h3 className="text-[#FC6D1A] text-lg sm:text-xl md:text-2xl font-['Outfit'] font-bold mb-2">
                                {skill.name}
                            </h3>
                            <p className="text-[#f2cc8f] font-['Outfit'] text-sm sm:text-base">{skill.level}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;