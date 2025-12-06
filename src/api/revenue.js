import { MOCK_REVENUE } from "../data/mockData";

/**
 * @typedef {Object} RevenueRecord
 * @property {number} id - 记录ID
 * @property {string} product - 产品名称
 * @property {number} total_amount - 总金额
 * @property {number} total_days - 总天数
 * @property {string} daily_amount - 每日确认金额
 * @property {number} recognized_amount - 已确认金额
 * @property {number} deferred_amount - 未摊销余额
 * @property {string} start_date - 开始日期
 * @property {string} end_date - 结束日期
 * @property {string} region - 地域
 */

/**
 * @typedef {Object} RevenueQueryParams
 * @property {string} [start_month] - 确认期间开始月份 (YYYY-MM)
 * @property {string} [end_month] - 确认期间结束月份 (YYYY-MM)
 * @property {string} [region] - 使用区域筛选
 * @property {string} [product_type] - 产品类型筛选
 * @property {number} [page] - 页码
 * @property {number} [page_size] - 每页数量
 */

/**
 * 获取收入确认记录列表
 * @param {RevenueQueryParams} params - 查询参数
 * @returns {Promise<RevenueRecord[]>}
 */
export function getRevenueRecords(params = {}) {
  // TODO: 替换为真实 API 调用
  // return fetch('/api/revenue/records', { method: 'GET', body: JSON.stringify(params) })
  return Promise.resolve(MOCK_REVENUE);
}

/**
 * 根据ID获取收入确认记录详情
 * @param {number} recordId - 记录ID
 * @returns {Promise<RevenueRecord | null>}
 */
export function getRevenueRecordById(recordId) {
  // TODO: 替换为真实 API 调用
  // return fetch(`/api/revenue/records/${recordId}`)
  const record = MOCK_REVENUE.find((r) => r.id === recordId);
  return Promise.resolve(record || null);
}

/**
 * 导出收入确认表
 * @param {RevenueQueryParams} params - 查询参数
 * @returns {Promise<Blob>}
 */
export function exportRevenueRecords(params = {}) {
  // TODO: 替换为真实 API 调用
  // return fetch('/api/revenue/records/export', { method: 'POST', body: JSON.stringify(params) })
  return Promise.resolve(new Blob());
}

