import { colors, fonts } from '../tokens'

export default function Panel({ title, children, className = '', accent = colors.accent }) {
  return (
    <div
      style={{
        background: colors.panel,
        border: `1px solid ${colors.border}`,
      }}
      className={`flex flex-col overflow-hidden ${className}`}
    >
      {/* Top accent line */}
      <div style={{ height: 2, background: `linear-gradient(90deg, ${accent}BB 0%, ${accent}20 60%, transparent 100%)`, flexShrink: 0 }} />

      {title && (
        <div
          style={{ borderBottom: `1px solid ${colors.border}`, fontFamily: fonts.display }}
          className="px-4 py-2 shrink-0"
        >
          <span
            className="font-semibold uppercase"
            style={{ color: colors.textMuted, fontSize: 10, letterSpacing: '0.14em' }}
          >
            {title}
          </span>
        </div>
      )}
      <div className="flex-1 min-h-0 p-4">
        {children}
      </div>
    </div>
  )
}
