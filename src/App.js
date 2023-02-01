import AppRouter from "./routing/AppRouter";
import SiteTheme from "./theme/SiteTheme";

function App() {
  return (
    <SiteTheme>
      <AppRouter />
    </SiteTheme>
  );
}

export default App;
