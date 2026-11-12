import './home.css';

export default function AnnouncementsPanel() {
  return (
    <section className="announcement-panel" aria-labelledby="announcements-heading">
      <div className="visitor-section-heading">
        <div><p className="visitor-eyebrow">Updates</p><h2 id="announcements-heading">Announcements</h2></div>
      </div>
      <p className="announcement-empty">There are no announcements available right now.</p>
    </section>
  );
}
