// user's profile card component

export default function ProfileCard() {
    return (
        <div>
            <span className="avatar-left">[</span>
            <img alt="user avatar" className="avatar" src="./default.gif" />
            <span className="avatar-right">]</span>
            <h1>[userData.name]'s Profile</h1>
            <p>
                <i className="material-icons-round" title="email verified">verified</i> (or <i className="material-icons-round" title="email not verified">cancel</i>)
            </p>
        </div>
    );
}