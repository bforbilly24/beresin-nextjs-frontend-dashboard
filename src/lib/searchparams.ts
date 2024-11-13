// src/lib/searchparams.ts
import { createSearchParamsCache, createSerializer, parseAsInteger, parseAsString } from 'nuqs/server';

// Define additional parameters for role filter and sorting by ID
export const searchParams = {
	page: parseAsInteger.withDefault(1),
	limit: parseAsInteger.withDefault(10),
	q: parseAsString,
	role: parseAsString, // Add role as a filter
	sortById: parseAsString.withDefault('desc'), // Add sorting by ID
};

export const searchParamsCache = createSearchParamsCache(searchParams);
export const serialize = createSerializer(searchParams);
