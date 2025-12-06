import { MOCK_TASKS, MOCK_DIFFS } from "../data/mockData";

/**
 * @typedef {Object} ReconciliationTask
 * @property {string} id - 任务ID
 * @property {string} channel - 支付渠道
 * @property {string} currency - 币种
 * @property {string} date_range - 日期区间
 * @property {string} timezone - 时区
 * @property {string} created_by - 创建人
 * @property {string} created_at - 创建时间
 * @property {string} status - 任务状态
 * @property {string} diff_summary - 差异摘要
 */

/**
 * @typedef {Object} ReconciliationDiff
 * @property {number} id - 差异ID
 * @property {string} diff_type - 差异类型
 * @property {string} order_id - 订单号
 * @property {string} external_transaction_id - 渠道流水号
 * @property {string} internal_amount - 内部金额
 * @property {string} channel_amount - 渠道金额
 * @property {string} currency - 币种
 * @property {string} pay_time_internal - 内部支付时间
 * @property {string} pay_time_channel - 渠道支付时间
 * @property {string} remark - 备注
 */

/**
 * @typedef {Object} CreateReconciliationTaskParams
 * @property {string} channel - 支付渠道
 * @property {string} currency - 对账币种
 * @property {string} timezone - 对账时区
 * @property {string} start_date - 对账日期起
 * @property {string} end_date - 对账日期止
 * @property {string} exchange_rate_source - 汇率来源
 * @property {boolean} auto_create_ticket - 是否自动生成差异工单
 * @property {string} [remark] - 备注/标签
 */

/**
 * @typedef {Object} ReconciliationQueryParams
 * @property {string} [channel] - 支付渠道筛选
 * @property {string} [currency] - 币种筛选
 * @property {string} [start_date] - 开始日期
 * @property {string} [end_date] - 结束日期
 * @property {string} [status] - 任务状态筛选
 * @property {number} [page] - 页码
 * @property {number} [page_size] - 每页数量
 */

/**
 * 获取对账任务列表
 * @param {ReconciliationQueryParams} params - 查询参数
 * @returns {Promise<ReconciliationTask[]>}
 */
export function getReconciliationTasks(params = {}) {
  // TODO: 替换为真实 API 调用
  // return fetch('/api/reconciliation/tasks', { method: 'GET', body: JSON.stringify(params) })
  return Promise.resolve(MOCK_TASKS);
}

/**
 * 根据任务ID获取对账任务详情
 * @param {string} taskId - 任务ID
 * @returns {Promise<ReconciliationTask | null>}
 */
export function getReconciliationTaskById(taskId) {
  // TODO: 替换为真实 API 调用
  // return fetch(`/api/reconciliation/tasks/${taskId}`)
  const task = MOCK_TASKS.find((t) => t.id === taskId);
  return Promise.resolve(task || null);
}

/**
 * 创建对账任务
 * @param {CreateReconciliationTaskParams} params - 创建参数
 * @returns {Promise<ReconciliationTask>}
 */
export function createReconciliationTask(params) {
  // TODO: 替换为真实 API 调用
  // return fetch('/api/reconciliation/tasks', { method: 'POST', body: JSON.stringify(params) })
  return Promise.resolve(MOCK_TASKS[0]);
}

/**
 * 获取对账差异列表
 * @param {string} taskId - 任务ID
 * @param {Object} params - 查询参数
 * @returns {Promise<ReconciliationDiff[]>}
 */
export function getReconciliationDiffs(taskId, params = {}) {
  // TODO: 替换为真实 API 调用
  // return fetch(`/api/reconciliation/tasks/${taskId}/diffs`, { method: 'GET', body: JSON.stringify(params) })
  return Promise.resolve(MOCK_DIFFS);
}

/**
 * 下载对账差异明细 CSV
 * @param {string} taskId - 任务ID
 * @returns {Promise<Blob>}
 */
export function downloadReconciliationDiffsCSV(taskId) {
  // TODO: 替换为真实 API 调用
  // return fetch(`/api/reconciliation/tasks/${taskId}/diffs/export`)
  return Promise.resolve(new Blob());
}

/**
 * 一键对账（今日）
 * @param {Object} options - 对账选项
 * @returns {Promise<ReconciliationTask>}
 */
export function quickReconcileToday(options = {}) {
  // TODO: 替换为真实 API 调用
  // return fetch('/api/reconciliation/quick', { method: 'POST', body: JSON.stringify(options) })
  return Promise.resolve(MOCK_TASKS[0]);
}

