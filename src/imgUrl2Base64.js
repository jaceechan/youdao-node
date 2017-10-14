import i2b from 'imageurl-base64';

export default (url) =>  new Promise((resolve, reject) => {
	i2b(url, (err, data) => {
		if (err) {
			reject(err);
		}
		else {
			resolve(data);
		}
	})
});
