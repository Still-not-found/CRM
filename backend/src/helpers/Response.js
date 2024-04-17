module.exports = {
	ResponseStatus: (res, code, message, results, info) => {
		return res.status(code).json({
			status: code === 200 || code === 201 ? true : false,
			status_code: code,
			message: message,
			results,
			info: info,
		});
	},
};
