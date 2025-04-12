type ProjectProps = {
    title: string;
    description: string;
    tech: string[];
};

export default function ProjectCard({ title, description, tech }: ProjectProps) {
    return (
        <div className="bg-gray-900 border border-cyan-500 rounded-lg p-6 shadow-md hover:shadow-xl transition">
            <h2 className="text-xl font-bold text-cyan-400 mb-2">{title}</h2>
            <p className="text-gray-300 mb-3">{description}</p>
            <div className="text-sm text-gray-400">
                {tech.join(', ')}
            </div>
        </div>
    );
}
