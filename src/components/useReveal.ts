import { useEffect, useRef } from 'react';

/** Adds `.is-visible` to every `.animate-on-scroll` descendant once it enters the viewport. */
export function useReveal<T extends HTMLElement>() {
    const ref = useRef<T>(null);
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('is-visible'); }),
            { threshold: 0.1 }
        );
        ref.current?.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);
    return ref;
}
