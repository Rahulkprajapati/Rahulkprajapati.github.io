import React from 'react';
import { motion as Motion } from 'framer-motion';

const reveal = {
    initial: { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    viewport: { once: true, margin: '-80px' },
};

/**
 * Numbered section header in the spec-sheet style:
 *   02 ── PLATFORM LAB ─────────────────── meta
 *   Big headline                     aside copy
 */
export const SectionHeader = ({ index, label, meta, title, aside, align = 'split' }) => (
    <Motion.header {...reveal} className="mb-14">
        <div className="flex items-center gap-4">
            <span className="micro" style={{ color: 'var(--accent)' }}>{index}</span>
            <span className="micro" style={{ color: 'var(--text)' }}>{label}</span>
            <span aria-hidden className="h-px flex-1" style={{ background: 'var(--border)' }} />
            {meta && <span className="micro hidden sm:inline">{meta}</span>}
        </div>
        <div
            className={
                align === 'center'
                    ? 'mt-8 text-center'
                    : 'mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end'
            }
        >
            <h2
                className="text-3xl font-semibold leading-[1.05] tracking-tight md:text-5xl"
                style={{ color: 'var(--text)' }}
            >
                {title}
            </h2>
            {aside && (
                <p
                    className={`text-base leading-[1.75] ${align === 'center' ? 'mx-auto mt-5 max-w-2xl' : 'max-w-md lg:justify-self-end'}`}
                    style={{ color: 'var(--text-muted)' }}
                >
                    {aside}
                </p>
            )}
        </div>
    </Motion.header>
);

/**
 * Hairline panel with registration ticks and optional corner annotations.
 * Corner labels sit on the frame edge, like figure captions on a drawing.
 */
export const Panel = ({ children, tl, tr, bl, br, className = '', style, as = 'div', ...rest }) => {
    const Tag = as;
    return (
    <Tag className={`panel ${className}`} style={style} {...rest}>
        <span aria-hidden className="ticks" />
        {tl && <span className="micro pointer-events-none absolute left-5 top-4 z-10">{tl}</span>}
        {tr && <span className="micro pointer-events-none absolute right-5 top-4 z-10 text-right">{tr}</span>}
        {bl && <span className="micro pointer-events-none absolute bottom-4 left-5 z-10">{bl}</span>}
        {br && <span className="micro pointer-events-none absolute bottom-4 right-5 z-10 text-right">{br}</span>}
        {children}
    </Tag>
    );
};

/**
 * A ruled row of readouts: micro-label, big tabular numeral, small unit.
 * Rules are drawn as 1px shadows on each cell's top/left edge and the row
 * clips them, so dividers stay correct however the cells wrap.
 */
export const Readout = ({ items }) => (
    <dl
        className="flex flex-wrap overflow-hidden"
        style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}
    >
        {items.map((item) => (
            <div
                key={item.label}
                className="px-4 py-5 sm:px-5"
                style={{
                    flex: '1 1 9.5rem',
                    boxShadow: '-1px 0 0 var(--border), 0 -1px 0 var(--border)',
                }}
                title={item.source}
            >
                <dt className="micro">{item.label}</dt>
                <dd className="mt-3 flex items-baseline gap-1">
                    <span className="num text-3xl font-medium sm:text-4xl" style={{ color: 'var(--text)' }}>
                        {item.value}
                    </span>
                    <span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>
                        {item.unit}
                    </span>
                </dd>
            </div>
        ))}
    </dl>
);
