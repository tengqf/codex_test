import { useState, useEffect } from "react";
import { getReconciliationTasks, getReconciliationDiffs } from "../api/reconciliation";
import Field from "../components/Field";

/**
 * @typedef {import("../api/reconciliation").ReconciliationTask} ReconciliationTask
 * @typedef {import("../api/reconciliation").ReconciliationDiff} ReconciliationDiff
 */

function ReconciliationPage() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [diffs, setDiffs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 加载对账任务列表
    getReconciliationTasks()
      .then((data) => {
        setTasks(data);
        if (data.length > 0) {
          setSelectedTask(data[0]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load reconciliation tasks:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // 当选中任务变化时，加载对应的差异数据
    if (selectedTask) {
      getReconciliationDiffs(selectedTask.id)
        .then((data) => {
          setDiffs(data);
        })
        .catch((error) => {
          console.error("Failed to load reconciliation diffs:", error);
        });
    }
  }, [selectedTask]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400 text-sm">加载中...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold mb-1">新建对账任务</h2>
            <p className="text-xs text-slate-400">
              支持按支付渠道、币种、时间区间发起自动对账任务，可选是否自动生成差异工单。
            </p>
          </div>
          <button className="h-8 rounded-lg bg-sky-500/90 px-4 text-xs font-medium text-slate-950">
            一键对账（今日）
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs mt-2">
          <Field label="支付渠道">
            <select className="h-8 w-full rounded-lg border border-slate-700 bg-slate-950/80 px-2 text-xs">
              <option>Stripe</option>
              <option>Google Pay</option>
              <option>Airwallex</option>
              <option>Apple Pay</option>
              <option>微信支付</option>
              <option>支付宝</option>
            </select>
          </Field>
          <Field label="对账币种 (记账币)">
            <select className="h-8 w-full rounded-lg border border-slate-700 bg-slate-950/80 px-2 text-xs">
              <option>CNY</option>
              <option>USD</option>
            </select>
          </Field>
          <Field label="对账时区">
            <select className="h-8 w-full rounded-lg border border-slate-700 bg-slate-950/80 px-2 text-xs">
              <option>按渠道默认时区展示</option>
              <option>统一转换为 UTC+8 (账簿时区)</option>
            </select>
          </Field>
          <Field label="对账日期起">
            <input
              type="date"
              className="h-8 w-full rounded-lg border border-slate-700 bg-slate-950/80 px-2 text-xs"
              defaultValue="2025-11-01"
            />
          </Field>
          <Field label="对账日期止 / 汇率日期">
            <input
              type="date"
              className="h-8 w-full rounded-lg border border-slate-700 bg-slate-950/80 px-2 text-xs"
              defaultValue="2025-11-30"
            />
          </Field>
          <Field label="汇率来源">
            <input
              disabled
              value="系统内置 · 每日自动更新"
              className="h-8 w-full rounded-lg border border-slate-700 bg-slate-900/80 px-2 text-xs text-slate-400"
            />
          </Field>
          <Field label="是否自动生成差异工单">
            <div className="flex items-center gap-2">
              <input type="checkbox" defaultChecked className="h-4 w-4" />
              <span>是，按差异类型生成工单草稿</span>
            </div>
          </Field>
          <Field label="备注 / 标签">
            <input
              placeholder="例如：2025-11 Stripe US 月度对账"
              className="h-8 w-full rounded-lg border border-slate-700 bg-slate-950/80 px-2 text-xs"
            />
          </Field>
        </div>
        <div className="flex justify-end gap-2 text-xs mt-2">
          <button className="h-8 rounded-lg border border-slate-600 px-4 text-slate-100">
            保存草稿
          </button>
          <button className="h-8 rounded-lg bg-sky-500/90 px-4 text-slate-950 font-medium">
            创建对账任务
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-1 rounded-2xl border border-slate-800/80 bg-slate-950/60 overflow-hidden">
          <div className="border-b border-slate-800 px-4 py-2 text-xs text-slate-400 flex justify-between">
            <span>对账任务列表</span>
            <span>最近 30 天</span>
          </div>
          <div className="divide-y divide-slate-800 text-xs">
            {tasks.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTask(t)}
                className={`w-full text-left px-4 py-3 flex flex-col gap-1 transition-colors ${
                  selectedTask?.id === t.id
                    ? "bg-slate-900/80 border-l-2 border-l-sky-500"
                    : "hover:bg-slate-900/60"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-slate-200">{t.id}</span>
                  <span
                    className={`text-[11px] rounded-full px-2 py-0.5 border ${
                      t.status === "已完成"
                        ? "border-emerald-400/60 text-emerald-300"
                        : "border-amber-400/60 text-amber-300"
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-300 flex justify-between">
                  <span>
                    {t.channel} · {t.currency}
                  </span>
                  <span>{t.timezone}</span>
                </div>
                <div className="text-[11px] text-slate-400">{t.date_range}</div>
                <div className="text-[11px] text-slate-500 truncate">{t.diff_summary}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="xl:col-span-2 rounded-2xl border border-slate-800/80 bg-slate-950/60 overflow-hidden">
          <div className="border-b border-slate-800 px-4 py-2 text-xs text-slate-400 flex items-center justify-between">
            <div>
              <span className="mr-2">对账结果 · </span>
              <span className="font-mono text-[11px] text-slate-200">{selectedTask?.id || "-"}</span>
            </div>
            <div className="flex items-center gap-2">
              <button className="h-7 rounded-lg border border-slate-700 px-3 text-[11px]">
                下载差异明细 CSV
              </button>
              <span className="text-[11px] text-slate-500">展示示例差异数据</span>
            </div>
          </div>
          <div className="overflow-x-auto text-xs">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr className="bg-slate-900/80">
                  {["差异类型", "订单号", "渠道流水号", "内部金额", "渠道金额", "币种", "内部支付时间", "渠道支付时间", "备注"].map(
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
                {diffs.map((d, idx) => (
                  <tr key={d.id} className={idx % 2 ? "bg-slate-900/40" : ""}>
                    <td className="border-b border-slate-800 px-3 py-2 text-amber-300">
                      {d.diff_type}
                    </td>
                    <td className="border-b border-slate-800 px-3 py-2 font-mono text-[11px]">
                      {d.order_id}
                    </td>
                    <td className="border-b border-slate-800 px-3 py-2 font-mono text-[11px]">
                      {d.external_transaction_id}
                    </td>
                    <td className="border-b border-slate-800 px-3 py-2">{d.internal_amount}</td>
                    <td className="border-b border-slate-800 px-3 py-2">{d.channel_amount}</td>
                    <td className="border-b border-slate-800 px-3 py-2">{d.currency}</td>
                    <td className="border-b border-slate-800 px-3 py-2">{d.pay_time_internal}</td>
                    <td className="border-b border-slate-800 px-3 py-2">{d.pay_time_channel}</td>
                    <td className="border-b border-slate-800 px-3 py-2 text-slate-400 max-w-xs">
                      {d.remark}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReconciliationPage;
