interface AgentHeaderProps { showRole?: boolean; }

export default function AgentHeader({ showRole = false }: AgentHeaderProps) {
  return (
    <header className={`agent-header${showRole ? ' agent-header--role' : ''}`}>
      <img className="agent-header__brand" src="/assets/figma/brand-mark-header.svg" alt="" />
      <span className="agent-header__wordmark">HOMELANE</span>
      {showRole && <span className="agent-header__role">Agents</span>}
      <div className="agent-header__actions" aria-label="Account shortcuts">
        <button type="button" aria-label="Notifications"><img src="/assets/figma/notifications.svg" alt="" /></button>
        {!showRole && <button type="button" aria-label="Messages"><img src="/assets/figma/messages.svg" alt="" /></button>}
        <button type="button" aria-label="Profile"><img src="/assets/figma/profile.svg" alt="" /></button>
      </div>
    </header>
  );
}
