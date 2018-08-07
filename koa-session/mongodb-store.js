const mongoose = require('mongoose')
mongoose.Promise = global.Promise

class DbStore {
    constructor(opt = {
        collection: '_session'
    }) {
        this.init()

    }
    async init() {
        const r = await new Promise((resolve, reject) => {
            const connection = mongoose.connection
            const SessionModal = mongoose.model('Session', new mongoose.Schema({
                key: String,
                session: Object
            }))
            connection.on('error', console.error.bind(console, 'connection error:'))
            connection.once('open', () => {
                console.log('db connection success')
                resolve({
                    connection,
                    SessionModal
                })
                this.connection = connection
                this.SessionModal = SessionModal
            })
            mongoose.connect('mongodb://admin:11111@localhost/movie')
        })
        return r;
    }

    async get(key, maxAge, {
        rolling
    }) {
        console.log('get')
        console.log(key, maxAge)
        const data = await this.SessionModal.findOne({
            key: key
        })
        const r = data && data.session ? data.session : null
        console.log(r)
        return r
    }
    async set(key, session, maxAge, {
        rolling,
        changed
    }) {
        console.log('set')
        console.log(...arguments)
        // const r = await new this.SessionModal({
        //     key,
        //     session
        // }).save()
        try {
            const r = await this.SessionModal.findOne({
                key
            }).then((aimSess) => {
                // 已经存在更新
                if (aimSess) {
                    aimSess.session = session
                    return aimSess.save()
                } else {
                    // 否则新建
                    return new this.SessionModal({
                        key,
                        session
                    }).save()
                }
            })
            
            console.log(r)
        } catch (error) {
            console.log(error)
        }
        return key
    }
    async destroy(key) {
        console.log('destroy')
        console.log(key)
        const r = await this.SessionModal.deleteOne({
            key
        })
        console.log(r)
        return r
    }
}

module.exports = DbStore