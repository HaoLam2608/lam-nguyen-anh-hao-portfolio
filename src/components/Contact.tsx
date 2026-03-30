"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Github, Mail, MapPin, Phone, Send, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SectionTitle } from "./SectionTitle";
import { useI18n } from "@/i18n/I18nProvider";

type ContactFormValues = {
    name: string;
    email: string;
    message: string;
};

export function Contact() {
    const { t } = useI18n();
    const [status, setStatus] = useState<"idle" | "success">("idle");
    const contactSchema = useMemo(
        () =>
            z.object({
                name: z.string().min(2, t.contact.validation.minName),
                email: z.string().email(t.contact.validation.invalidEmail),
                message: z.string().min(12, t.contact.validation.minMessage),
            }),
        [t.contact.validation.invalidEmail, t.contact.validation.minMessage, t.contact.validation.minName]
    );

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (values: ContactFormValues) => {
        const mailto = `mailto:haolam2684@gmail.com?subject=Portfolio%20Message%20from%20${encodeURIComponent(values.name)}&body=${encodeURIComponent(`${values.message}\n\nFrom: ${values.email}`)}`;
        window.open(mailto, "_self");
        setStatus("success");
        reset();
    };

    return (
        <section id="contact" className="section-space px-4 pb-24 md:px-8">
            <SectionTitle
                eyebrow={t.contact.eyebrow}
                title={t.contact.title}
                description={t.contact.description}
            />

            <div className="mx-auto grid w-full max-w-6xl gap-8 rounded-3xl border border-cyan-300/35 bg-slate-950/65 p-6 backdrop-blur-xl md:grid-cols-2 md:p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <label className="form-block">
                        <span>{t.contact.name}</span>
                        <input placeholder={t.contact.namePlaceholder} {...register("name")} />
                        <small>{errors.name?.message}</small>
                    </label>

                    <label className="form-block">
                        <span>{t.contact.email}</span>
                        <input placeholder={t.contact.emailPlaceholder} {...register("email")} />
                        <small>{errors.email?.message}</small>
                    </label>

                    <label className="form-block">
                        <span>{t.contact.message}</span>
                        <textarea rows={5} placeholder={t.contact.messagePlaceholder} {...register("message")} />
                        <small>{errors.message?.message}</small>
                    </label>

                    <button type="submit" className="btn-neon-primary w-full justify-center" disabled={isSubmitting}>
                        {isSubmitting ? t.contact.sending : t.contact.send} <Send className="h-4 w-4" />
                    </button>

                    {status === "success" ? (
                        <p className="rounded-lg border border-cyan-300/35 bg-cyan-300/10 px-3 py-2 text-sm text-cyan-100">
                            {t.contact.success}
                        </p>
                    ) : null}
                </form>

                <aside className="space-y-5 rounded-2xl border border-white/10 bg-slate-900/55 p-5">
                    <p className="inline-flex items-center gap-2 rounded-full border border-orange-300/35 bg-orange-300/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-orange-100">
                        <Sparkles className="h-4 w-4" /> {t.contact.available}
                    </p>
                    <h3 className="text-2xl font-semibold text-white">{t.contact.connectWithMe}</h3>
                    <p className="text-slate-300">
                        Lam Nguyen Anh Hao<br />
                        {t.hero.location}
                    </p>

                    <div className="space-y-2 text-sm text-slate-200">
                        <p className="inline-flex items-center gap-2"><Mail className="h-4 w-4 text-cyan-200" /> haolam2684@gmail.com</p>
                        <p className="inline-flex items-center gap-2"><Phone className="h-4 w-4 text-cyan-200" /> (+84) 943 767 640</p>
                        <p className="inline-flex items-center gap-2"><MapPin className="h-4 w-4 text-cyan-200" /> Ho Chi Minh City, Vietnam</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <a href="https://github.com/HaoLam2608" target="_blank" rel="noreferrer" className="icon-btn">
                            <Github className="h-5 w-5" />
                        </a>
                    </div>
                </aside>
            </div>
        </section>
    );
}
