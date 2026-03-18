type SectionTitleProps = {
    eyebrow: string;
    title: string;
    description: string;
};

export function SectionTitle({ eyebrow, title, description }: SectionTitleProps) {
    return (
        <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-cyan-200/85">{eyebrow}</p>
            <h2 className="text-3xl font-bold text-white sm:text-4xl">{title}</h2>
            <p className="mt-4 text-slate-300">{description}</p>
        </div>
    );
}
