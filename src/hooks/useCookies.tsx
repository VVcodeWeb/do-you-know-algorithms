import {
  COOKIE_ALLOW_COOKIE,
  COOKIE_BEST_STREAK,
  SESSION_DISPLAYED_COOKIE,
  TRUE,
} from "const/constants";
import { GameContext } from "context/GameContext";
import { useContext, useEffect, useState } from "react";
import { getCookie, setCookie } from "utils/utils";
export const useCookies = () => {
  const [visible, setVisible] = useState(false);
  const [bestStreak, setBestStreak] = useState<number>(0);
  const { score } = useContext(GameContext);
  useEffect(() => {
    const allowCookies = getCookie(COOKIE_ALLOW_COOKIE);
    if (allowCookies) {
      const storedBestStreak = parseInt(getCookie(COOKIE_BEST_STREAK));
      if (!isNaN(storedBestStreak)) setBestStreak(storedBestStreak);
    }
    const displayedCookieNotification = window.sessionStorage.getItem(
      SESSION_DISPLAYED_COOKIE
    );
    if (displayedCookieNotification !== TRUE && allowCookies !== TRUE)
      setVisible(true);
  }, []);

  useEffect(() => {
    const allowCookies = getCookie(COOKIE_ALLOW_COOKIE);

    if (score.streak > bestStreak) {
      setBestStreak(score.streak);
      if (allowCookies) {
        setCookie(COOKIE_BEST_STREAK, String(score.streak));
      }
    }
  }, [bestStreak, score]);

  const handleAccepted = (accepted: boolean) => {
    if (accepted) setCookie(COOKIE_ALLOW_COOKIE, TRUE);
    else window.sessionStorage.setItem(SESSION_DISPLAYED_COOKIE, TRUE);
    setVisible(false);
  };
  return { bestStreak, visible, handleAccepted };
};
