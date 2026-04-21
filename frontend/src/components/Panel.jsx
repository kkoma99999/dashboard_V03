import { colors, fonts } from '../tokens'

export default function Panel({ title, children, className = '' }) {
  return (
    <div
      style={{ background: colors.panel, border: `1px solid ${colors.border}` }}
      className={`rounded-lg flex flex-col overflow-hidden ${className}`}
    >
      {title && (
        <div
          style={{ borderBottom: `1px solid ${colors.border}`, fontFamily: fonts.display }}
          className="px-4 py-2 shrink-0"
        >
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: colors.textMuted }}>
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
