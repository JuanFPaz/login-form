import { useEffect, useState } from "react";
import User from "./pages/User/User";
import Form from "./pages/Form/Form";
import Loading from "./components/Loading";
import { getUser, postLogut } from "./service/api";
import type { stateApp, stateLoad } from "./types/typeStates";
import type { responseApi, userAuth } from "./types/typeService";

export default function App() {
  const [load, setLoad] = useState<stateLoad>({ status: "load" });
  const [app, setApp] = useState<stateApp>({ status: "none" });

  // Ocurre una sola vez, cuando toda la APP se renderice
  useEffect(() => {
    (async () => {
      const remember = localStorage.getItem("remember");

      if (!remember) {
        setApp({ status: "idle" });
        setLoad({ status: "idle" });
      } else {
        try {
          const res: userAuth = await getUser<userAuth>("/api/auth/me");
          setApp({ status: "success", data: res });
          setLoad({ status: "idle" });
        } catch (error) {
          console.error((error as Error).message);
          setApp({ status: "idle" });
          setLoad({ status: "idle" });
        }
      }
    })();
  }, []);

  function handleLoading(stl: stateLoad) {
    setLoad(stl);
  }

  function handleSubmitForm(sta: stateApp) {
    setApp(sta);
  }

  async function handleOnDisconnect() {
    setLoad({ status: "load" });
    try {
      const res: responseApi = await postLogut<responseApi>("/api/auth/logout");
      localStorage.removeItem("remember");
      alert(res.message);
    } catch (error) {
      alert((error as Error).message);
    }
    setApp({ status: "idle" });
    setLoad({ status: "idle" });
  }

  return (
    <>
      {app.status === "idle" && (
        <Form onLoad={handleLoading} onSubmit={handleSubmitForm} />
      )}
      {app.status === "success" && (
        <User data={app.data} onDisconnect={handleOnDisconnect} />
      )}
      {load.status === "load" && <Loading />}
    </>
  );
}
