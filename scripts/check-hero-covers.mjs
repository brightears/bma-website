const siteOrigin = process.env.SITE_ORIGIN ?? 'https://bmasiamusic.com';
const market = process.env.HERO_MARKET ?? 'TH';
const endpoint = new URL(`/api/hero-market/?probe=${Date.now()}`, siteOrigin);

const response = await fetch(endpoint, {
  cache: 'no-store',
  headers: {
    Accept: 'application/json',
    'X-Country-Code': market,
  },
});

if (!response.ok) {
  throw new Error(`Hero market request failed with ${response.status}`);
}

const payload = await response.json();
const covers = Object.entries(payload.covers ?? {});

if (covers.length !== 7) {
  throw new Error(`Expected 7 hero covers, received ${covers.length}`);
}

await Promise.all(covers.map(async ([slot, cover]) => {
  if (!cover?.src) throw new Error(`${slot} has no image URL`);

  const imageUrl = new URL(cover.src, siteOrigin);
  const imageResponse = await fetch(imageUrl, {
    cache: 'no-store',
    headers: { Accept: 'image/*' },
  });
  const contentType = imageResponse.headers.get('content-type') ?? '';

  if (!imageResponse.ok || !contentType.startsWith('image/')) {
    const detail = await imageResponse.text().catch(() => '');
    throw new Error(
      `${slot} failed with ${imageResponse.status} ${contentType}: ${detail.slice(0, 180)}`,
    );
  }

  console.log(`OK ${slot}: ${imageUrl.hostname}`);
}));

console.log(`Verified ${covers.length} live hero covers from ${endpoint.origin}.`);
