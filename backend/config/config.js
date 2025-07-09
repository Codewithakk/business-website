module.exports = {
    jwt: {
        accessSecret: process.env.JWT_ACCESS_SECRET,
        refreshSecret: process.env.JWT_REFRESH_SECRET,
        accessExpiration: '2m',    // 2 minutes
        refreshExpiration: '2d',   // 2 days
    },
    rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
    },
    recaptcha: {
        secretKey: process.env.RECAPTCHA_SECRET_KEY,
    },
};