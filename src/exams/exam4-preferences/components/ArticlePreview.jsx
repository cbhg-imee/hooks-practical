import { usePreferences } from '../context/usePreferences.js';

export default function ArticlePreview() {
  const { theme, fontSize } = usePreferences();
  return (
    <article className="panel panel--recessed" data-preview-theme={theme} style={{ fontSize }} aria-labelledby="art-h">
      <h2 id="art-h">Article preview / {theme} / {fontSize}px</h2>
      <h3 style={{ margin: '0 0 8px', fontSize: '1.25em' }}>Why shared state belongs in context</h3>
      <p style={{ margin: 0 }}>
        When several distant components need the same value, passing props through every level adds noise. Context lets
        the provider hold the value once and lets any descendant read it directly.
      </p>
    </article>
  );
}
