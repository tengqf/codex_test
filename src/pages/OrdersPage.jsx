import { useState, useEffect } from "react";
import { getOrders } from "../api/orders";
import { STATUS_MAP } from "../constants/statusMap";

/**
 * @typedef {import("../api/orders").Order} Order
 */

function OrdersPage() {
  const [keyword, setKeyword] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 加载订单数据
    getOrders()
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load orders:", error);
        setLoading(false);
      });
  }, []);

  const filtered = orders.filter(
    (o) => !keyword ? true : o.order_id.includes(keyword) || o.user_id.includes(keyword)
  );

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
        <div className="flex flex-wrap items-end gap-3 text-xs">
          <div className="flex flex-col gap-1">
            <label className="text-slate-300">订单号 / 用户ID</label>
            <input
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="支持模糊搜索"
              className="h-8 w-52 rounded-lg border border-slate-700 bg-slate-950/80 px-2 text-xs outline-none focus:border-sky-500"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-slate-300">订单状态</label>
            <select className="h-8 w-40 rounded-lg border border-slate-700 bg-slate-950/80 px-2 text-xs">
              <option>全部</option>
              <option>已支付</option>
              <option>支付失败</option>
              <option>取消</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-slate-300">使用区域</label>
            <select className="h-8 w-40 rounded-lg border border-slate-700 bg-slate-950/80 px-2 text-xs">
              <option>全部</option>
              <option>中国大陆</option>
              <option>海外</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-slate-300">支付渠道</label>
            <select className="h-8 w-40 rounded-lg border border-slate-700 bg-slate-950/80 px-2 text-xs">
              <option>全部</option>
              <option>微信支付</option>
              <option>支付宝</option>
              <option>Stripe</option>
              <option>Apple Pay</option>
              <option>Airwallex</option>
            </select>
          </div>
          <div className="flex-1" />
          <div className="flex gap-2">
            <button className="h-8 rounded-lg bg-sky-500/90 px-4 text-xs font-medium text-slate-950">
              查询
            </button>
            <button className="h-8 rounded-lg border border-slate-600 px-4 text-xs text-slate-200">
              重置
            </button>
            <button className="h-8 rounded-lg border border-slate-600 px-4 text-xs text-slate-200">
              导出 CSV
            </button>
          </div>
        </div>
      </div>
      <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 overflow-hidden">
        <div className="border-b border-slate-800 px-4 py-2 text-xs text-slate-400 flex justify-between">
          <span>订单列表（T-1 全量订单表）</span>
          <span>共 {filtered.length} 条</span>
        </div>
        <div className="overflow-x-auto text-xs">
          <table className="min-w-full border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-900/80">
                {["订单号", "用户ID", "商品名称", "状态", "实付金额", "币种", "支付渠道", "使用区域", "创建时间", "更新时间"].map(
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
              {filtered.map((o, idx) => (
                <tr key={o.order_id} className={idx % 2 ? "bg-slate-900/40" : ""}>
                  <td className="border-b border-slate-800 px-3 py-2 font-mono text-[11px]">
                    {o.order_id}
                  </td>
                  <td className="border-b border-slate-800 px-3 py-2 font-mono text-[11px]">
                    {o.user_id}
                  </td>
                  <td className="border-b border-slate-800 px-3 py-2">{o.goods_title}</td>
                  <td className="border-b border-slate-800 px-3 py-2 text-slate-200">
                    {STATUS_MAP[o.status]}
                  </td>
                  <td className="border-b border-slate-800 px-3 py-2">
                    ¥ {(o.actual_price_in_cent / 100).toFixed(2)}
                  </td>
                  <td className="border-b border-slate-800 px-3 py-2">{o.actual_currency}</td>
                  <td className="border-b border-slate-800 px-3 py-2">{o.pay_channel}</td>
                  <td className="border-b border-slate-800 px-3 py-2">{o.use_region}</td>
                  <td className="border-b border-slate-800 px-3 py-2">{o.created_at}</td>
                  <td className="border-b border-slate-800 px-3 py-2">{o.updated_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
