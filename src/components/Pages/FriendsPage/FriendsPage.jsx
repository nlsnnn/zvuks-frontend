import { Header } from "../../Header/Header";
import { Friends } from "../../Friends/Friends";
import styles from "./FriendsPage.module.css";
import { useState } from "react";
import { friendStore } from "../../../store/friendStore";

export const FriendsPage = () => {
  const [friendsType, setFriendsType] = useState("my");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return
    }
    setFriendsType("global")
    await friendStore.searchUsers(searchQuery)
  }
  
  return (
    <>
      <Header />
      <main className="container">
        <div className={styles.flexColCenter}>
          <div className={styles.flexRowSpaceBetween}>
            <div>
              <h2 className={styles.title}>Друзья</h2>
              <div
                className={`${styles.flexGap4} ${styles.flexColCenterSmRow}`}
              >
                <input
                  type="text"
                  className={styles.inputStyle}
                  placeholder="Имя..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                  value={searchQuery}
                />
                <button
                  className={`${styles.buttonStyle} ${styles.maxSmWidthHalf}`}
                  onClick={handleSearch}
                >
                  Найти
                </button>
              </div>
            </div>

            <div className="flex gap-2 font-semibold">
              <span
                className={`cursor-pointer ${styles.hover} ${friendsType == "global" ? styles.activeType : ""}`}
                onClick={() => setFriendsType("global")}
              >
                Глобальный поиск
              </span>
              <span
                className={`cursor-pointer ${styles.hover} ${friendsType == "my" ? styles.activeType : ""}`}
                onClick={() => setFriendsType("my")}
              >
                Мои друзья
              </span>
              <span
                className={`cursor-pointer ${styles.hover} ${friendsType == "sended" ? styles.activeType : ""}`}
                onClick={() => setFriendsType("sended")}
              >
                Исходящие
              </span>
              <span
                className={`cursor-pointer ${styles.hover} ${friendsType == "pending" ? styles.activeType : ""}`}
                onClick={() => setFriendsType("pending")}
              >
                Подписчики
              </span>
            </div>
          </div>
        </div>
        <Friends type={friendsType}  />
      </main>
    </>
  );
};
