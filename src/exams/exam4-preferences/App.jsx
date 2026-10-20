import PreferencesProvider from './context/PreferencesProvider.jsx';
import Dashboard from './components/Dashboard.jsx';

export default function App() {
  return (
    <main className="shell">
      <header className="plate">
        <div>
          <h1>Application Preferences</h1>
          <small>Exam 4 / useContext + useState</small>
        </div>
      </header>
      <PreferencesProvider>
        <Dashboard />
      </PreferencesProvider>
    </main>
  );
}
