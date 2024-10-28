const jwt = require('jsonwebtoken')
const { v4: uuidv4 } = require('uuid')
const models = require('../models')

class JwtService {
    constructor() {
        this.jwtSecret = process.env.JWT_SECRET
        this.jwtOptions = {
            algorithm: 'HS256',
            expiresIn: process.env.ACCESS_TOKEN_DURATION_MINUTE + 'm'
        }
        this.refreshTokenDurationMinute = parseInt(process.env.REFRESH_TOKEN_DURATION_MINUTE, 10) || 1440
        this.newToken = !!(process.env.REFRESH_TOKEN_NEW_TOKEN === 'true')
        this.resetExp = !!(process.env.REFRESH_TOKEN_RESET_EXP === 'true')
    }

    generateAccessToken(user) {
        return new Promise((resolve, reject) => {
            const jwtPayload = { id: user.id }
            try {
                const accessToken = jwt.sign(jwtPayload, this.jwtSecret, this.jwtOptions)
                const exp = JSON.parse(Buffer.from(accessToken.split('.')[1], 'base64').toString()).exp
                const accessTokenExpiryDate = new Date(exp * 1000)
                resolve({
                    accessToken: accessToken,
                    accessTokenExpiryDate: accessTokenExpiryDate.toISOString()
                })
            } catch (err) {
                reject(err)
            }
        })
    }

    generateRefreshToken(user) {
        return new Promise((resolve, reject) => {
            models.RefreshToken.findOrCreate({
                where: { userId: user.id }
            }).then(([refreshTokenInst, created]) => {
                if (this.newToken) refreshTokenInst.set({ token: uuidv4() })
                if (this.resetExp) {
                    let refreshTokenExpiryDate = new Date()
                    refreshTokenExpiryDate.setSeconds(refreshTokenExpiryDate.getSeconds() + 60 * this.refreshTokenDurationMinute)
                    refreshTokenInst.set({ expiryDate: refreshTokenExpiryDate })
                }
                return refreshTokenInst.save()
            }).then((updatedInstance) => {
                resolve({
                    refreshToken: updatedInstance.token,
                    refreshTokenExpiryDate: updatedInstance.expiryDate
                })
            }).catch((err) => {
                reject(err)
            })
        })
    }
}

module.exports = new JwtService()
