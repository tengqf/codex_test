import { MOCK_BILLS } from "../data/mockData";

/**
 * @typedef {Object} Bill
 * @property {string} id - 批次号
 * @property {string} channel - 支付渠道
 * @property {string} currency - 账单币种
 * @property {string} period - 账单区间
 * @property {string} timezone - 渠道时区
 * @property {number} total_amount - 总金额
 * @property {number} txn_count - 交易笔数
 * @property {string} status - 导入状态
 * @property {string} created_at - 导入时间
 */

/**
 * @typedef {Object} BillQueryParams
 * @property {string} [channel] - 支付渠道筛选
 * @property {string} [currency] - 币种筛选
 * @property {string} [start_date] - 开始日期
 * @property {string} [end_date] - 结束日期
 * @property {number} [page] - 页码
 * @property {number} [page_size] - 每页数量
 */

/**
 * 获取账单批次列表
 * @param {BillQueryParams} params - 查询参数
 * @returns {Promise<Bill[]>}
 */
export function getBills(params = {}) {
  // TODO: 替换为真实 API 调用
  // return fetch('/api/bills', { method: 'GET', body: JSON.stringify(params) })
  return Promise.resolve(MOCK_BILLS);
}

/**
 * 根据批次号获取账单详情
 * @param {string} billId - 批次号
 * @returns {Promise<Bill | null>}
 */
export function getBillById(billId) {
  // TODO: 替换为真实 API 调用
  // return fetch(`/api/bills/${billId}`)
  const bill = MOCK_BILLS.find((b) => b.id === billId);
  return Promise.resolve(bill || null);
}

/**
 * 上传账单文件
 * @param {File} file - 账单文件
 * @param {Object} options - 上传选项
 * @returns {Promise<Bill>}
 */
export function uploadBill(file, options = {}) {
  // TODO: 替换为真实 API 调用
  // const formData = new FormData();
  // formData.append('file', file);
  // return fetch('/api/bills/upload', { method: 'POST', body: formData })
  return Promise.resolve(MOCK_BILLS[0]);
}

