import { useState, useEffect } from "react";
import { getBills } from "../api/bills";

/**
 * @typedef {import("../api/bills").Bill} Bill
 */

function BillsPage() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 加载账单数据
    getBills()
      .then((data) => {
        setBills(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load bills:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400 text-sm">加载中...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold mb-1">导入渠道账单</h2>
          <p className="text-xs text-slate-400">
            支持从支付平台 API 自动同步，或手动上传 .xlsx / .csv 格式账单文件。
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <button className="h-9 rounded-xl bg-sky-500/90 px-4 text-slate-950 font-medium">
            选择文件上传
          </button>
          <div className="text-slate-400 text-[11px]">
            单次上传不超过 50MB，字段需满足预设映射
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 overflow-hidden">
        <div className="border-b border-slate-800 px-4 py-2 text-xs text-slate-400 flex justify-between">
          <span>账单批次</span>
          <span>最近 30 天</span>
        </div>
        <div className="overflow-x-auto text-xs">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-900/80">
                {["批次号", "支付渠道", "账单币种", "账单区间", "渠道时区", "交易笔数", "总金额", "导入状态", "导入时间"].map(
                  (h) => (
                    <th
                      key={h}
                      className="border-b border-slate-800 px-3 py-2 text-left font-medium text-slate-300"
                    >
                      {h}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {bills.map((b, idx) => (
                <tr key={b.id} className={idx % 2 ? "bg-slate-900/40" : ""}>
                  <td className="border-b border-slate-800 px-3 py-2 font-mono text-[11px]">
                    {b.id}
                  </td>
                  <td className="border-b border-slate-800 px-3 py-2">{b.channel}</td>
                  <td className="border-b border-slate-800 px-3 py-2">{b.currency}</td>
                  <td className="border-b border-slate-800 px-3 py-2">{b.period}</td>
                  <td className="border-b border-slate-800 px-3 py-2">{b.timezone}</td>
                  <td className="border-b border-slate-800 px-3 py-2">{b.txn_count}</td>
                  <td className="border-b border-slate-800 px-3 py-2">
                    {b.currency === "CNY" ? "¥ " : "$ "}
                    {b.total_amount.toLocaleString()}
                  </td>
                  <td className="border-b border-slate-800 px-3 py-2 text-emerald-300">{b.status}</td>
                  <td className="border-b border-slate-800 px-3 py-2">{b.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BillsPage;
