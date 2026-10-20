import { usePreferences } from '../context/usePreferences.js';
import { FONT_SIZES } from '../context/PreferencesProvider.jsx';

export default function PreferencesPanel() {
  const { fontSize, setFontSize } = usePreferences();
  return (
    <section className="panel" aria-labelledby="pref-h">
      <h2 id="pref-h">Font size</h2>
      <div className="lcd lcd--sm" style={{ marginBottom: 14 }}>{fontSize} PX</div>
      <div className="row" role="group" aria-label="Font size">
        {FONT_SIZES.map((size) => (
          <button
            key={size}
            className="btn btn--green"
            onClick={() => setFontSize(size)}
            aria-pressed={fontSize === size}
          >
            {size}px
          </button>
        ))}
      </div>
    </section>
  );
}
