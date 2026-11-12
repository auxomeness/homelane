import './home.css';

const announcements = [
  { date: 'October 24, 2026', title: 'Find your place at the Home & Living Expo', text: 'Meet trusted property partners and explore new homes this weekend.' },
  { date: 'October 18, 2026', title: 'Your next move starts here', text: 'Save your favorite listings and keep all your home options in one place.' },
];

export default function AnnouncementsPanel() {
  return (
    <section className="announcement-panel" aria-labelledby="announcements-heading">
      <div className="visitor-section-heading">
        <div><p className="visitor-eyebrow">The latest from Homelane</p><h2 id="announcements-heading">Announcements</h2></div>
        <a href="#announcements">View all</a>
      </div>
      <div className="announcement-list" id="announcements">
        {announcements.map((item) => <article className="announcement-card" key={item.title}>
          <span className="announcement-card__date">{item.date}</span>
          <h3>{item.title}</h3><p>{item.text}</p>
        </article>)}
      </div>
    </section>
  );
}
