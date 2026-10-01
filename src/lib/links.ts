import type { Lang } from '../i18n';
import { profile } from '../data/profile';

/** Profildeki dolu sosyal/akademik bağlantılar, gösterim sırasıyla. */
export const socialLinks = (lang: Lang, withEmail = false) =>
  [
    { label: lang === 'tr' ? 'E-posta' : 'Email', href: withEmail && profile.email ? `mailto:${profile.email}` : '' },
    { label: 'GitHub', href: profile.links.github },
    { label: 'LinkedIn', href: profile.links.linkedin },
    { label: 'Google Scholar', href: profile.links.scholar },
    { label: 'ORCID', href: profile.links.orcid },
  ].filter((l) => l.href);
