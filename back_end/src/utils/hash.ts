import crypto from 'crypto';

/**
 * Hàm mã hóa chuỗi văn bản thuần túy sang MD5
 * @param password Mật khẩu gốc (Ví dụ: "123456")
 * @returns Chuỗi Hash MD5 đã được viết thường (Ví dụ: "e10adc3949ba59abbe56e057f20f883e")
 */
export function hashMD5(password: string): string {
  return crypto.createHash('md5').update(password).digest('hex');
}