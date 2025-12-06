import { MOCK_ORDERS } from "../data/mockData";

/**
 * @typedef {Object} Order
 * @property {string} order_id - 订单号
 * @property {string} user_id - 用户ID
 * @property {string} goods_title - 商品名称
 * @property {number} status - 订单状态 (0-8)
 * @property {number} actual_price_in_cent - 实付金额（分）
 * @property {string} actual_currency - 币种
 * @property {string} pay_channel - 支付渠道
 * @property {string} order_source - 订单来源
 * @property {string} use_region - 使用区域
 * @property {string} created_at - 创建时间
 * @property {string} updated_at - 更新时间
 */

/**
 * @typedef {Object} OrderQueryParams
 * @property {string} [keyword] - 订单号或用户ID关键词
 * @property {string} [status] - 订单状态筛选
 * @property {string} [use_region] - 使用区域筛选
 * @property {string} [pay_channel] - 支付渠道筛选
 * @property {number} [page] - 页码
 * @property {number} [page_size] - 每页数量
 */

/**
 * 获取订单列表
 * @param {OrderQueryParams} params - 查询参数
 * @returns {Promise<Order[]>}
 */
export function getOrders(params = {}) {
  // TODO: 替换为真实 API 调用
  // return fetch('/api/orders', { method: 'GET', body: JSON.stringify(params) })
  return Promise.resolve(MOCK_ORDERS);
}

/**
 * 根据订单号获取订单详情
 * @param {string} orderId - 订单号
 * @returns {Promise<Order | null>}
 */
export function getOrderById(orderId) {
  // TODO: 替换为真实 API 调用
  // return fetch(`/api/orders/${orderId}`)
  const order = MOCK_ORDERS.find((o) => o.order_id === orderId);
  return Promise.resolve(order || null);
}

/**
 * 导出订单数据为 CSV
 * @param {OrderQueryParams} params - 查询参数
 * @returns {Promise<Blob>}
 */
export function exportOrdersToCSV(params = {}) {
  // TODO: 替换为真实 API 调用
  // return fetch('/api/orders/export', { method: 'POST', body: JSON.stringify(params) })
  return Promise.resolve(new Blob());
}

