import { Layout } from "./components/layout/index.ts";
import { ProtectRoute } from "./components/protected-route/index.ts";
import { Home, Login } from "./pages/index.ts";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/auth.tsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public */}
            <Route path="login" element={<Login />} />

            {/* Protected */}
            <Route element={<ProtectRoute />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
