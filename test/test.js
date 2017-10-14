import youdao from '../src';
import image from './image'

youdao.config({
	appKey: '<your appkey>',
	appSecret: '<your appSecret>'
});

describe('Translate Test', () => {
	it('translate auto', async () => {
		const res = await youdao.translate({
			content: '你好',
		});
		expect(res.errorCode).toBe('0');
	});

	it('translate Chinese to English', async () => {
		const res = await youdao.translate({
			content: '你好',
			from: 'zh-CHS',
			to: 'EN'
		});
		expect(res.errorCode).toBe('0');
	});

	it('translate English to Chinese ', async () => {
		const res = await youdao.translate({
			content: 'Hello',
			from: 'EN',
			to: 'zh-CHS'
		});
		expect(res.errorCode).toBe('0');
	});
});

describe('ORC Test', () => {
	it('use base64 image ', async () => {
		const res = await youdao.orc({
			img: image
		});
		expect(res.errorCode).toBe('0');
	});

	it('use image url ', async () => {
		const res = await youdao.orc({
			img: 'http://aidemo.youdao.com/images/demo/d_1.jpg'
		});
		expect(res.errorCode).toBe('0');
	});
});
