import {createClient} from 'redis'

const redis = createClient()
redis.connect().then(() => {
    console.log('RedisClient created!')
})
redis.on('error', err => {
    console.error('RedisClient Error', err)
})

export default redis