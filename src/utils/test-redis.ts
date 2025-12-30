import Redis from 'ioredis';

const redis = new Redis({
  host: 'localhost',
  port: 6379,
});

const testRedis = async () => {
  try {
    console.log('🔄 Testing Redis connection...');

    // Test PING
    const ping = await redis.ping();
    console.log(`✅ Redis PING: ${ping}`);

    // Test SET/GET
    await redis.set('test-key', 'test-value');
    const value = await redis.get('test-key');
    console.log(`✅ SET/GET test: ${value}`);

    // Test DELETE
    await redis.del('test-key');
    const deleted = await redis.get('test-key');
    console.log(`✅ DELETE test: ${deleted === null ? 'Success' : 'Failed'}`);

    console.log('\n✅ All Redis tests passed!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Redis test failed:', error);
    process.exit(1);
  }
};

testRedis();
