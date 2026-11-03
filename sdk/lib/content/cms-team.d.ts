import type { Person } from "@/lib/content/types";
/**
 * URL segment for a person's profile page.
 *
 * The CMS team-members schema has no slug column, so a member's route has to be
 * derived from their name. Diacritics are stripped before the non-alphanumeric
 * sweep so an accented name yields a readable slug rather than a run of dashes.
 */
export declare function personSlug(name: string): string;
/**
 * Team members from the CMS, falling back to `staticTeam` when the API is
 * unreachable or returns nothing usable. `staticTeam` is a parameter rather
 * than a bundled-JSON import: this module is shared across every tenant, and
 * bundled people.json is one tenant's content, supplied by its own route.
 *
 * Uses a bare `fetch` rather than the axios client in `lib/api/http.ts`, which
 * throws at module load when the API env vars are unset. That would break the
 * "renders with no .env.local" guarantee every other public page keeps.
 *
 * `GET /team-members` is the public endpoint and already filters to active
 * members, so no client-side filtering is needed.
 */
export declare function getTeam(staticTeam: Person[]): Promise<Person[]>;
/** One team member by slug, or null. Backs /about/our-leaders/[slug]. */
export declare function getPerson(slug: string, staticTeam: Person[]): Promise<Person | null>;
