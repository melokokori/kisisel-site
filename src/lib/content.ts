import { getCollection } from 'astro:content';
import { splitEntryId, type Lang } from '../i18n';

const byDateDesc = (a: { data: { date: Date } }, b: { data: { date: Date } }) =>
  b.data.date.getTime() - a.data.date.getTime();

export async function getProjects(lang: Lang) {
  const all = await getCollection('projects', (e) => splitEntryId(e.id).lang === lang);
  return all.sort(byDateDesc).map((e) => ({ ...e, slug: splitEntryId(e.id).slug }));
}

export async function getPosts(lang: Lang) {
  const all = await getCollection('posts', (e) => splitEntryId(e.id).lang === lang && !e.data.draft);
  return all.sort(byDateDesc).map((e) => ({ ...e, slug: splitEntryId(e.id).slug }));
}

export const formatDate = (date: Date, lang: Lang) =>
  date.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', { year: 'numeric', month: 'long' });
