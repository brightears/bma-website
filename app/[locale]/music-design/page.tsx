'use client';

/**
 * Music Design page — embeds the Music Design Assistant tool
 * The tool runs on its own Render server (bmasia-music-brief-v2)
 * but is displayed within our site layout for consistent header/footer/fonts.
 *
 * TODO: Redesign the embedded app itself to match the editorial design language.
 */
export default function MusicDesignPage() {
  return (
    <section className="w-full" style={{ marginTop: '-1px' }}>
      <iframe
        src="https://bmasia-music-brief-v2.onrender.com/?embed=true"
        className="w-full border-0"
        style={{ height: 'calc(100vh - 80px)' }}
        title="BMAsia Music Design Assistant"
        allow="microphone"
        loading="lazy"
      />
    </section>
  );
}
