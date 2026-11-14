import './BuyerProfile.css';
import { useState, type FormEvent } from 'react';

const initialProfile = {
  fullName: 'Alex Johnson',
  email: 'alex.johnson@example.com',
};

export default function BuyerProfile() {
  const [profile, setProfile] = useState(initialProfile);
  const [draft, setDraft] = useState(initialProfile);
  const [isEditing, setIsEditing] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [notice, setNotice] = useState('');

  function beginEditing() {
    setDraft(profile);
    setNotice('');
    setIsEditing(true);
  }

  function cancelEditing() {
    setDraft(profile);
    setIsEditing(false);
  }

  function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setProfile(draft);
    setIsEditing(false);
    setNotice('Your profile changes are saved in this preview.');
  }

  function confirmLogout() {
    setIsLogoutOpen(false);
    setNotice('Log out is a visual preview only; no sign-in session is connected yet.');
  }

  return (
    <section className="buyer-profile" aria-labelledby="buyer-profile-title">
      <div className="buyer-profile__heading">
        <p className="buyer-eyebrow">Buyer workspace</p>
        <h1 id="buyer-profile-title">ACCOUNT</h1>
      </div>

      <div className="buyer-profile__layout">
        <aside className="buyer-profile__summary" aria-label="Buyer account">
          <div className="buyer-profile__avatar" aria-hidden="true">KA</div>
          <div className="buyer-profile__summary-copy">
            <strong>Buyer Profile</strong>
            <span>{profile.fullName}</span>
          </div>
          <button className="buyer-profile__edit-link" type="button" onClick={beginEditing}>
            Edit Profile
          </button>
        </aside>

        <div className="buyer-profile__details">
          <div className="buyer-profile__section-heading">
            <div>
              <h2>Profile Information</h2>
              <p>Manage the details associated with your account.</p>
            </div>
          </div>

          <form className="buyer-profile__form" onSubmit={saveProfile}>
            <label className="buyer-profile__field">
              <span>Full Name</span>
              <input
                autoComplete="name"
                readOnly={!isEditing}
                value={isEditing ? draft.fullName : profile.fullName}
                onChange={(event) => setDraft({ ...draft, fullName: event.target.value })}
              />
              <small>Your legal name as it appears on your ID.</small>
            </label>

            <label className="buyer-profile__field">
              <span>Email Address</span>
              <input
                autoComplete="email"
                inputMode="email"
                readOnly={!isEditing}
                type="email"
                value={isEditing ? draft.email : profile.email}
                onChange={(event) => setDraft({ ...draft, email: event.target.value })}
              />
              <small>Used for account verification and updates.</small>
            </label>

            {isEditing && (
              <div className="buyer-profile__form-actions">
                <button className="buyer-profile__secondary-button" type="button" onClick={cancelEditing}>
                  Cancel
                </button>
                <button className="buyer-profile__primary-button" type="submit">
                  Save changes
                </button>
              </div>
            )}
          </form>

          {!isEditing && (
            <button className="buyer-profile__logout-button" type="button" onClick={() => setIsLogoutOpen(true)}>
              Log out
            </button>
          )}

          {notice && <p className="buyer-profile__notice" role="status">{notice}</p>}
        </div>
      </div>

      {isLogoutOpen && (
        <div className="buyer-profile__modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setIsLogoutOpen(false);
        }}>
          <section className="buyer-profile__modal" role="dialog" aria-modal="true" aria-labelledby="buyer-profile-logout-title" aria-describedby="buyer-profile-logout-description">
            <h2 id="buyer-profile-logout-title">Log out of HOMELANE?</h2>
            <p id="buyer-profile-logout-description">Your saved homes stay on your account.</p>
            <div className="buyer-profile__modal-actions">
              <button className="buyer-profile__secondary-button" type="button" onClick={() => setIsLogoutOpen(false)}>
                Cancel
              </button>
              <button className="buyer-profile__primary-button" type="button" onClick={confirmLogout}>
                Log out
              </button>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
