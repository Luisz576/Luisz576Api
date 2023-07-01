import {createClient} from 'redis'

const redis_client = createClient()
redis_client.connect().then(() => {
    console.log('RedisClient created!')
})
redis_client.on('error', err => {
    console.error('RedisClient Error', err)
})

export default redis_client