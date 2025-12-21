import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'BMAsia - Background Music Solutions for Asia';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)',
          position: 'relative',
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(239,166,52,0.15) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -150,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(26,26,46,0.8) 0%, transparent 70%)',
          }}
        />

        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          {/* Logo circle with icon */}
          <div
            style={{
              width: 120,
              height: 120,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #EFA634 0%, #d99530 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 30,
              boxShadow: '0 10px 40px rgba(239,166,52,0.3)',
            }}
          >
            {/* Music note icon */}
            <svg
              width="60"
              height="60"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          </div>

          {/* Brand name */}
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontSize: 72,
                fontWeight: 700,
                color: '#EFA634',
                letterSpacing: '-2px',
              }}
            >
              BM
            </span>
            <span
              style={{
                fontSize: 72,
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '-2px',
              }}
            >
              Asia
            </span>
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: 32,
              color: '#9ca3af',
              letterSpacing: '4px',
              textTransform: 'uppercase',
              marginBottom: 40,
            }}
          >
            Wherever Music Matters
          </div>

          {/* Description */}
          <div
            style={{
              fontSize: 24,
              color: '#6b7280',
              maxWidth: 800,
              textAlign: 'center',
              lineHeight: 1.4,
            }}
          >
            Background Music Solutions for Businesses Across Asia
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: 'linear-gradient(90deg, #EFA634, #d99530, #EFA634)',
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
