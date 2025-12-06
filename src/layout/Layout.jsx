import Sidebar from "./Sidebar";
import Header from "./Header";

function Layout({ activeMenu, onMenuChange, children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex">
      <Sidebar activeMenu={activeMenu} onMenuChange={onMenuChange} />
      <main className="flex-1 flex flex-col min-w-0">
        <Header activeMenu={activeMenu} />
        <section className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-slate-950 to-slate-900/90">
          {children}
        </section>
      </main>
    </div>
  );
}

export default Layout;

