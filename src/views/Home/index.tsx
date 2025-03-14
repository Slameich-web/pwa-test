import Logo from "components/Logo";
import { useTranslation } from "react-i18next";
import { useDisplayType } from "utils/display";
import { DisplayTypes } from "utils/display/types";
import styles from "./home.module.css";
import { useEffect, useState } from "react";

function Home() {
  const { t } = useTranslation();
  const display = useDisplayType();
  const [state1, setState1] = useState<any>();
  const [state2, setState2] = useState<any>();
  const [state3, setState3] = useState("");
  const [state4, setState4] = useState<any>();

  console.log("navigator", navigator);
  console.log("navigator.serviceWorker", navigator.serviceWorker);

  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.getRegistrations().then((registrations) => {
      if (registrations.length) {
        setState3("Service Worker установлен");
        setState4(registrations);
      } else {
        setState3("Service Worker не установлен");
      }
    });
  }
  const test = async () => {
    const app_cache = await caches?.open("Sample PWA");
    console.log("app_cache", app_cache);
    setState1(JSON.stringify(app_cache));
    const response = await app_cache?.match("/path/to/your/data");
    console.log("response", response);
    setState2(JSON.stringify(response));
  };
  useEffect(() => {
    test();
    console.log("test");
  }, []);
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <Logo />
        <p className={styles.welcomeText}>{t("welcome")}</p>
        {display === DisplayTypes.DESKTOP ? <p>Desktop</p> : <p>Mobile</p>}
      </header>
      <div>state1 {state1}</div>
      <div>state2 {state2}</div>
      <div>state3 {state3}</div>
      <div>
        state4
        {state4?.map((i: any) => (
          <div>{JSON.stringify(i)}</div>
        ))}
      </div>
    </div>
  );
}

export default Home;
