import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

const testAPI = async () => {
  try {
    console.log('🔄 Testing API endpoints...');

    // Test health check
    const health = await axios.get(`${BASE_URL}/health`);
    console.log(`✅ Health check: ${health.status === 200 ? 'OK' : 'Failed'}`);

    // Test start audit
    const auditResponse = await axios.post(`${BASE_URL}/api/audits`, {
      url: 'https://example.com',
    });
    console.log(`✅ Start audit: Job ID ${auditResponse.data.jobId}`);

    // Test get status
    const jobId = auditResponse.data.jobId;
    const statusResponse = await axios.get(`${BASE_URL}/api/audits/${jobId}`);
    console.log(`✅ Get status: ${statusResponse.data.state}`);

    console.log('\n✅ All API tests passed!');
    process.exit(0);
  } catch (error: any) {
    console.error('❌ API test failed:', error.message);
    process.exit(1);
  }
};

testAPI();
