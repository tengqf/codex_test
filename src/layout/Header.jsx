import { MENU_ITEMS } from "../constants/menuItems";

function Header({ activeMenu }) {
  return (
    <header className="h-16 border-b border-slate-800/80 flex items-center justify-between px-6 bg-slate-950/60 backdrop-blur">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">
          {MENU_ITEMS.find((m) => m.id === activeMenu)?.label}
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          覆盖订单、账单、对账与收入确认的业财一体化后台
        </p>
      </div>
      <div className="flex items-center gap-3 text-xs text-slate-400">
        <span className="inline-flex items-center rounded-full border border-emerald-500/40 px-2 py-1 text-[11px] text-emerald-300">
          ● 对账引擎在线
        </span>
        <span>v0.1</span>
      </div>
    </header>
  );
}

export default Header;

