import { useState, useEffect } from "react";
import StatCard from "../components/StatCard";
import { getOverviewStats, getReconciliationTaskSummary, getRevenueRecognitionProgress } from "../api/overview";

function OverviewPage() {
  const [stats, setStats] = useState(null);
  const [taskSummary, setTaskSummary] = useState(null);
  const [revenueProgress, setRevenueProgress] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 并行加载所有总览数据
    Promise.all([
      getOverviewStats(),
      getReconciliationTaskSummary(),
      getRevenueRecognitionProgress(),
    ])
      .then(([statsData, taskSummaryData, revenueProgressData]) => {
        setStats(statsData);
        setTaskSummary(taskSummaryData);
        setRevenueProgress(revenueProgressData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load overview data:", error);
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
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard label="昨日订单数" value={stats?.yesterday_orders?.toLocaleString() || "0"} desc="含全球全部渠道" />
        <StatCard label="昨日GMV (记账币)" value={stats?.yesterday_gmv || "¥ 0"} desc="已按汇率换算为 CNY" />
        <StatCard label="待处理差异" value={stats?.pending_diffs?.toString() || "0"} desc="Kimi-only / 渠道-only / 金额不匹配" />
        <StatCard label="未摊销收入" value={stats?.deferred_revenue || "¥ 0"} desc="递延收入余额" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
          <h2 className="text-sm font-semibold mb-3">对账任务概览</h2>
          <div className="space-y-2 text-xs text-slate-300">
            <div className="flex items-center justify-between">
              <span>今日已完成任务</span>
              <span className="text-emerald-300">{taskSummary?.completed_today || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>进行中任务</span>
              <span className="text-amber-300">{taskSummary?.in_progress || 0}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>最近一次失败</span>
              <span className="text-slate-300">{taskSummary?.last_failure || "无"}</span>
            </div>
          </div>
        </div>
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/60 p-4">
          <h2 className="text-sm font-semibold mb-3">收入确认进度</h2>
          <p className="text-xs text-slate-300 mb-2">
            {revenueProgress?.description || "会员类产品已完成当月"}{" "}
            <span className="text-sky-300">{revenueProgress?.percentage || 0}%</span> 收入确认。
          </p>
          <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-sky-500 to-emerald-400"
              style={{ width: `${revenueProgress?.percentage || 0}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverviewPage;
