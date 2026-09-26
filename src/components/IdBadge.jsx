import React, { useId, useMemo } from 'react';
import { motion as Motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

// Duotone endpoints per theme: shadows map to the first colour, highlights to
// the second. Dark = instrument ink to pale signal; light = ink to paper.
const DUOTONE = {
    dark: ['#06090a', '#dff3ea'],
    light: ['#1b1813', '#f1ebdd'],
};

const channel = (hex, i) => (parseInt(hex.slice(1 + i * 2, 3 + i * 2), 16) / 255).toFixed(3);

// Deterministic barcode from the badge ID so it never changes between renders
const barsFor = (text) => {
    const bars = [];
    let seed = [...text].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) >>> 0, 7);
    for (let i = 0; i < 42; i++) {
        seed = (seed * 1103515245 + 12345) >>> 0;
        bars.push({ w: 1 + (seed % 3), gap: 1 + ((seed >> 3) % 2) });
    }
    return bars;
};

const Field = ({ label, value }) => (
    <div>
        <dt className="micro" style={{ fontSize: '0.56rem' }}>{label}</dt>
        <dd className="mt-1 font-mono text-[0.7rem] font-medium" style={{ color: 'var(--text)' }}>{value}</dd>
    </div>
);

const IdBadge = ({ photo, name, role, badgeId = 'RP-2021-BLR', className = '' }) => {
    const { darkMode } = useTheme();
    const filterId = `duotone-${useId().replace(/:/g, '')}`;
    const [shadow, highlight] = DUOTONE[darkMode ? 'dark' : 'light'];
    const bars = useMemo(() => barsFor(badgeId), [badgeId]);

    // Pointer-driven 3D tilt with a holographic sheen that tracks the light
    const px = useMotionValue(0.5);
    const py = useMotionValue(0.5);
    const rotateY = useSpring(useTransform(px, [0, 1], [-9, 9]), { stiffness: 160, damping: 18 });
    const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), { stiffness: 160, damping: 18 });
    const sheenX = useTransform(px, [0, 1], [0, 100]);
    const sheenY = useTransform(py, [0, 1], [0, 100]);
    const sheen = useMotionTemplate`radial-gradient(120% 80% at ${sheenX}% ${sheenY}%, rgba(255,255,255,0.16), transparent 55%)`;

    const onMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        px.set((e.clientX - rect.left) / rect.width);
        py.set((e.clientY - rect.top) / rect.height);
    };
    const onLeave = () => {
        px.set(0.5);
        py.set(0.5);
    };

    return (
        <div className={className} style={{ perspective: 1000 }}>
            <svg width="0" height="0" className="absolute" aria-hidden="true" focusable="false">
                <filter id={filterId} colorInterpolationFilters="sRGB">
                    <feColorMatrix
                        type="matrix"
                        values="0.30 0.59 0.11 0 0  0.30 0.59 0.11 0 0  0.30 0.59 0.11 0 0  0 0 0 1 0"
                    />
                    {/* Lift midtones slightly so the face reads before the background */}
                    <feComponentTransfer>
                        <feFuncR type="gamma" amplitude="1.08" exponent="0.9" offset="-0.02" />
                        <feFuncG type="gamma" amplitude="1.08" exponent="0.9" offset="-0.02" />
                        <feFuncB type="gamma" amplitude="1.08" exponent="0.9" offset="-0.02" />
                    </feComponentTransfer>
                    <feComponentTransfer>
                        <feFuncR type="table" tableValues={`${channel(shadow, 0)} ${channel(highlight, 0)}`} />
                        <feFuncG type="table" tableValues={`${channel(shadow, 1)} ${channel(highlight, 1)}`} />
                        <feFuncB type="table" tableValues={`${channel(shadow, 2)} ${channel(highlight, 2)}`} />
                    </feComponentTransfer>
                </filter>
            </svg>

            <Motion.figure
                onPointerMove={onMove}
                onPointerLeave={onLeave}
                style={{
                    rotateX,
                    rotateY,
                    background: 'var(--surface-strong)',
                    border: '1px solid var(--border-strong)',
                    boxShadow: 'var(--shadow-lg)',
                    transformStyle: 'preserve-3d',
                }}
                className="group relative m-0 w-[16.5rem] overflow-hidden rounded-[18px] p-4 backdrop-blur-xl sm:w-[17.5rem]"
            >
                {/* Lanyard slot */}
                <div className="mx-auto mb-3 h-1.5 w-12 rounded-full" style={{ background: 'var(--border-strong)' }} />

                <div className="flex items-center justify-between">
                    <span className="micro" style={{ color: 'var(--text)' }}>Platform access</span>
                    <span className="micro flex items-center gap-1.5" style={{ color: 'var(--accent)' }}>
                        <span className="signal-dot" style={{ width: 5, height: 5 }} />
                        Prod
                    </span>
                </div>

                <div
                    className="relative mt-3 aspect-[4/5] overflow-hidden rounded-[10px]"
                    style={{ border: '1px solid var(--border)' }}
                >
                    {/* Full colour underneath, revealed on hover */}
                    <img
                        src={photo}
                        alt={`${name}, ${role}`}
                        width="683"
                        height="552"
                        fetchPriority="high"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover"
                        style={{ objectPosition: '46% 36%' }}
                    />
                    <img
                        src={photo}
                        alt=""
                        aria-hidden="true"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                        style={{ objectPosition: '46% 36%', filter: `url(#${filterId}) contrast(1.05)` }}
                    />
                    {/* Scanlines */}
                    <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 opacity-40 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-0"
                        style={{
                            backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.35) 0 1px, transparent 1px 3px)',
                        }}
                    />
                    <span
                        className="micro absolute left-2 top-2 rounded px-1.5 py-0.5"
                        style={{ background: 'var(--surface-overlay)', fontSize: '0.55rem' }}
                    >
                        IMG-01
                    </span>
                    <span
                        className="micro absolute bottom-2 right-2 rounded px-1.5 py-0.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{ background: 'var(--surface-overlay)', fontSize: '0.55rem', color: 'var(--accent)' }}
                    >
                        RGB
                    </span>
                </div>

                <figcaption className="mt-4">
                    <p className="text-lg font-semibold leading-tight tracking-tight" style={{ color: 'var(--text)' }}>
                        {name}
                    </p>
                    <p className="mt-1 font-mono text-[0.7rem]" style={{ color: 'var(--text-muted)' }}>
                        {role}
                    </p>
                </figcaption>

                <dl className="mt-4 grid grid-cols-2 gap-x-3 gap-y-2.5 pt-3" style={{ borderTop: '1px dashed var(--border-strong)' }}>
                    <Field label="Badge" value={badgeId} />
                    <Field label="Base" value="BLR · IST" />
                    <Field label="Since" value="2021" />
                    <Field label="Scope" value="GCP · AWS · AZ" />
                </dl>

                <div className="mt-4 flex h-8 items-stretch overflow-hidden" aria-hidden>
                    {bars.map((bar, i) => (
                        <span
                            key={i}
                            style={{ width: bar.w, marginRight: bar.gap, background: 'var(--text)', opacity: 0.85 }}
                        />
                    ))}
                </div>

                <Motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: sheen }} />
            </Motion.figure>
        </div>
    );
};

export default IdBadge;
