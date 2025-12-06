import { useState, useEffect } from "react";
import { getRevenueRecords } from "../api/revenue";
import Field from "../components/Field";

/**
 * @typedef {import("../api/revenue").RevenueRecord} RevenueRecord
 */

function RevenuePage() {
  const [revenueRecords, setRevenueRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 加载收入确认记录
    getRevenueRecords()
      .then((data) => {
        setRevenueRecords(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load revenue records:", error);
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
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 flex flex-wrap gap-3 text-xs items-end">
        <Field label="确认期间">
          <div className="flex items-center gap-2">
            <input
              type="month"
              defaultValue="2025-11"
              className="h-8 w-32 rounded-lg border border-slate-700 bg-slate-950/80 px-2 text-xs"
            />
            <span className="text-slate-500">至</span>
            <input
              type="month"
              defaultValue="2025-12"
              className="h-8 w-32 rounded-lg border border-slate-700 bg-slate-950/80 px-2 text-xs"
            />
          </div>
        </Field>
        <Field label="使用区域">
          <select className="h-8 w-40 rounded-lg border border-slate-700 bg-slate-950/80 px-2 text-xs">
            <option>全部</option>
            <option>中国大陆</option>
            <option>海外</option>
          </select>
        </Field>
        <Field label="产品类型">
          <select className="h-8 w-40 rounded-lg border border-slate-700 bg-slate-950/80 px-2 text-xs">
            <option>全部</option>
            <option>按次产品</option>
            <option>订阅 · 月卡</option>
            <option>订阅 · 年卡</option>
          </select>
        </Field>
        <div className="flex-1" />
        <div className="flex gap-2">
          <button className="h-8 rounded-lg bg-sky-500/90 px-4 text-xs font-medium text-slate-950">
            刷新数据
          </button>
          <button className="h-8 rounded-lg border border-slate-600 px-4 text-xs text-slate-200">
            导出收入确认表
          </button>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 overflow-hidden">
        <div className="border-b border-slate-800 px-4 py-2 text-xs text-slate-400 flex justify-between">
          <span>收入确认与未摊销余额</span>
          <span>示例数据，用于展示 daily_amount / deferred_amount 等字段</span>
        </div>
        <div className="overflow-x-auto text-xs">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-900/80">
                {["产品名称", "确认区间", "地域", "总金额", "总天数", "每日确认金额", "已确认金额", "未摊销余额"].map(
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
              {revenueRecords.map((r, idx) => (
                <tr key={r.id} className={idx % 2 ? "bg-slate-900/40" : ""}>
                  <td className="border-b border-slate-800 px-3 py-2">{r.product}</td>
                  <td className="border-b border-slate-800 px-3 py-2">
                    {r.start_date} ~ {r.end_date}
                  </td>
                  <td className="border-b border-slate-800 px-3 py-2">{r.region}</td>
                  <td className="border-b border-slate-800 px-3 py-2">¥ {r.total_amount.toFixed(2)}</td>
                  <td className="border-b border-slate-800 px-3 py-2">{r.total_days}</td>
                  <td className="border-b border-slate-800 px-3 py-2">¥ {r.daily_amount}</td>
                  <td className="border-b border-slate-800 px-3 py-2">¥ {r.recognized_amount.toFixed(2)}</td>
                  <td className="border-b border-slate-800 px-3 py-2 text-sky-300">
                    ¥ {r.deferred_amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RevenuePage;
