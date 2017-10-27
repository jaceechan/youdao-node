import request from 'request-promise-native';
import crypto from 'crypto';
import qs from 'querystring';
import i2bp from './imgUrl2Base64';

const TRANS_API_PATH = 'https://openapi.youdao.com/api';
const OCR_API_PATH = 'https://openapi.youdao.com/ocrapi';

const generateSign = (content, salt, appKey, appSecret) => {
	const md5 = crypto.createHash('md5');
	md5.update(appKey + content + salt + appSecret);
	const cipher = md5.digest('hex');
	return cipher.slice(0, 32).toUpperCase();
};

class Youdao {
	config ({ appKey, appSecret }) {
		this.appKey = appKey;
		this.appSecret = appSecret;
	}

	async translate ({ content, from = 'auto', to = 'auto' }) {
		const appKey = this.appKey;
		const appSecret = this.appSecret;
		const utf8 = Buffer.from(content).toString();
		const salt = Date.now();
		const sign = generateSign(utf8, salt, appKey, appSecret);
		const query = {
			q: utf8,
			appKey: appKey,
			from,
			to,
			salt,
			sign,
		};
		const queryString = qs.stringify(query);
		const url = `${TRANS_API_PATH}?${queryString}`;
		return request(url, { json: true });
	}

	async ocr ({ img, langType = 'zh-en' }) {
		let imgBase64 = img;

		if (img.indexOf('http') >=0 ) {
			const { base64 } = await i2bp(img);
			imgBase64 = base64;
		}

		const appKey = this.appKey;
		const appSecret = this.appSecret;
		const salt = Date.now();
		const sign = generateSign(imgBase64, salt, appKey, appSecret);

		const query = {
			imageType: '1',
			docType: 'json',
			detectType: '10011',
			img: imgBase64,
			appKey,
			langType,
			salt,
			sign,
		};
		return request({
			method: 'POST',
			uri: OCR_API_PATH,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: qs.stringify(query),
			json: true,
		});

	}
}

export default new Youdao()
