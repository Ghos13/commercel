import Avatar from "../../images/Снимок экрана 2025-08-27 204513.png";
const Profile = () => {
  return (
    <>
      <section className="profiles">
        <div className="container">
          <div className="profile">
            <h1>Профиль</h1>
            <div className="profile-info">
              <img src={Avatar} alt="Аватар" width="120" />
              <h2>Имя пользователя</h2>
              <p>Email: user@example.com</p>
            </div>

            <div className="profile-actions">
              <button>Редактировать профиль</button>
              <button>Сменить пароль</button>
              <button>Выйти</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
