// user's profile card component

export default function ProfileCard() {
    return (
        <>
            <span className="avatar-left">[</span>
            <img className="avatar" src="./default.gif" />
            <span className="avatar-right">]</span>
            <h1>[userData.name]'s Profile</h1>
        </>
    );
}