import { MENU_ITEMS } from "../constants/menuItems";

function Sidebar({ activeMenu, onMenuChange }) {
  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-950/80 backdrop-blur flex flex-col">
      <div className="h-16 flex items-center px-5 border-b border-slate-800/80">
        <div className="h-9 w-9 rounded-2xl bg-sky-500/20 flex items-center justify-center mr-2">
          <span className="text-lg font-bold text-sky-400">F</span>
        </div>
        <div>
          <div className="font-semibold tracking-tight">Kimi 财务对账平台</div>
          <div className="text-xs text-slate-400">Finance Reconciliation Console</div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => onMenuChange(item.id)}
            className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-xl transition-colors
              ${
                activeMenu === item.id
                  ? "bg-sky-500/20 text-sky-100"
                  : "text-slate-300 hover:bg-slate-800/80 hover:text-slate-50"
              }`}
          >
            <span>{item.label}</span>
            {item.id === "reconciliation" && (
              <span className="inline-flex h-5 items-center rounded-full bg-sky-500/30 px-2 text-[10px] text-sky-100">
                核心模块
              </span>
            )}
          </button>
        ))}
      </nav>
      <div className="border-t border-slate-800 px-4 py-3 text-xs text-slate-500 space-y-1">
        <div className="flex items-center justify-between">
          <span>账簿时区</span>
          <span className="text-slate-200">UTC+8</span>
        </div>
        <div className="flex items-center justify-between">
          <span>记账币种</span>
          <span className="text-slate-200">CNY</span>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;

