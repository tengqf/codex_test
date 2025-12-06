/**
 * @typedef {Object} OverviewStats
 * @property {number} yesterday_orders - 昨日订单数
 * @property {string} yesterday_gmv - 昨日GMV (记账币)
 * @property {number} pending_diffs - 待处理差异
 * @property {string} deferred_revenue - 未摊销收入
 */

/**
 * @typedef {Object} ReconciliationTaskSummary
 * @property {number} completed_today - 今日已完成任务
 * @property {number} in_progress - 进行中任务
 * @property {string} last_failure - 最近一次失败
 */

/**
 * @typedef {Object} RevenueRecognitionProgress
 * @property {number} percentage - 收入确认百分比
 * @property {string} description - 描述信息
 */

/**
 * 获取总览统计数据
 * @returns {Promise<OverviewStats>}
 */
export function getOverviewStats() {
  // TODO: 替换为真实 API 调用
  // return fetch('/api/overview/stats')
  return Promise.resolve({
    yesterday_orders: 12493,
    yesterday_gmv: "¥ 3,456,789",
    pending_diffs: 23,
    deferred_revenue: "¥ 12,345,678",
  });
}

/**
 * 获取对账任务概览
 * @returns {Promise<ReconciliationTaskSummary>}
 */
export function getReconciliationTaskSummary() {
  // TODO: 替换为真实 API 调用
  // return fetch('/api/overview/reconciliation-summary')
  return Promise.resolve({
    completed_today: 4,
    in_progress: 2,
    last_failure: "无",
  });
}

/**
 * 获取收入确认进度
 * @returns {Promise<RevenueRecognitionProgress>}
 */
export function getRevenueRecognitionProgress() {
  // TODO: 替换为真实 API 调用
  // return fetch('/api/overview/revenue-progress')
  return Promise.resolve({
    percentage: 73.4,
    description: "会员类产品已完成当月收入确认",
  });
}

