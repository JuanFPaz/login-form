import { useEffect, useState, useRef } from "react";
import User from "./pages/User/User";
import Form from "./pages/Form/Form";
import Loading from "./components/Loading";
import { getUser, postLogut, postRefresh } from "./service/api";
import type { stateApp, stateLoad } from "./types/typeStates";
import type {
  AccessResponse,
  ApiResponse,
  LoginResponse,
} from "./types/typeService";

export default function App() {
  const [load, setLoad] = useState<stateLoad>({ status: "load" });
  const [app, setApp] = useState<stateApp>({ status: "none" });
  const didRun = useRef(false); // solucion al doble useEffect
  // Ocurre una sola vez, cuando toda la APP se renderice
  useEffect(() => {
    if (didRun.current) return;
    didRun.current = true;
    (async () => {
      const remember = localStorage.getItem("remember");

      if (!remember) {
        setApp({ status: "idle" });
        setLoad({ status: "idle" });
      } else {
        try {
          const res: LoginResponse =
            await postRefresh<LoginResponse>("/api/auth/refresh");
          const user: AccessResponse = await getUser<AccessResponse>(
            "/api/auth/profile",
            res.access_token,
          );
          setApp({ status: "success", data: user.data });
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
      const res: ApiResponse = await postLogut<ApiResponse>("/api/auth/logout");
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
