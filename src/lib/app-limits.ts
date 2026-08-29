/** Domain limits and timings for Manda Jobs search / form / rate limits. */

export const FORM_PERSIST_DEBOUNCE_MS = 300

export const SCROLL_TO_RESULTS_DELAY_MS = 100

export const MIN_EXPAND_QUERY_LENGTH = 3
export const MAX_EXPAND_QUERY_LENGTH = 1500

export const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000
export const GENERATE_QUERY_MAX_PER_WINDOW = 10
export const EXPAND_SEARCH_MAX_PER_WINDOW = 20

export const SEARCH_RANKINGS_CACHE_SECONDS = 300
export const QUERIES_COUNT_CACHE_SECONDS = 60
