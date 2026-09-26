// Private, cookie-free visitor analytics via GoatCounter.
// Dashboard: https://rahulprajapati.goatcounter.com (owner login only).
//
// count.js is loaded from index.html with `no_onload`, because this is a
// single-page app: page views are counted here on every route change instead
// of once on first load. count.js itself skips localhost, and skips any browser
// that has visited /#toggle-goatcounter (the owner's opt-out).

const queue = [];

const ready = () => typeof window !== 'undefined' && typeof window.goatcounter?.count === 'function';

const flush = () => {
    while (queue.length && ready()) {
        const vars = queue.shift();
        try {
            window.goatcounter.count(vars);
        } catch {
            // Analytics must never break the site
        }
    }
};

// count.js loads async, so queue anything that fires before it arrives
const send = (vars) => {
    queue.push(vars);
    flush();
};

if (typeof document !== 'undefined') {
    document.querySelector('script[data-goatcounter]')?.addEventListener('load', flush);
}

export const trackPageview = (path) => send({ path });

/** An interaction worth knowing about, e.g. `track('resume-download', 'Résumé download')`. */
export const track = (name, title = name) => send({ path: name, title, event: true });

// One delegated listener covers every link on the site: résumé downloads,
// mailto clicks and outbound profile links, wherever they are rendered.
let installed = false;
export const installLinkTracking = () => {
    if (installed || typeof document === 'undefined') return;
    installed = true;
    document.addEventListener(
        'click',
        (e) => {
            const link = e.target instanceof Element ? e.target.closest('a[href]') : null;
            if (!link) return;
            const href = link.getAttribute('href');
            if (/\.pdf($|\?)/i.test(href)) track('resume-download', 'Résumé download');
            else if (href.startsWith('mailto:')) track('email-click', 'Email link clicked');
            else if (href.startsWith('tel:')) track('phone-click', 'Phone link clicked');
            else {
                try {
                    const url = new URL(href, window.location.href);
                    if (url.origin !== window.location.origin) {
                        const host = url.hostname.replace(/^www\./, '');
                        track(`outbound-${host}`, `Outbound: ${host}`);
                    }
                } catch {
                    // Not a URL we can parse; ignore
                }
            }
        },
        { capture: true },
    );
};
