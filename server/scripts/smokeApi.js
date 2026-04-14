const baseUrl = process.env.API_BASE_URL || 'http://127.0.0.1:5000';

const assert = (condition, message) => {
  if (!condition) {
    throw new Error(message);
  }
};

const requestJson = async (path, options = {}) => {
  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const bodyText = await response.text();
  let parsed = null;

  try {
    parsed = bodyText ? JSON.parse(bodyText) : null;
  } catch {
    parsed = bodyText;
  }

  return {
    status: response.status,
    data: parsed,
  };
};

const run = async () => {
  const health = await fetch(`${baseUrl}/`);
  const healthText = await health.text();
  assert(health.status === 200, `Health endpoint failed with ${health.status}`);
  assert(
    healthText.toLowerCase().includes('play gear api is running'),
    'Health endpoint returned unexpected response body'
  );

  const products = await requestJson('/api/products');
  assert(products.status === 200, `Products endpoint failed with ${products.status}`);
  assert(Array.isArray(products.data), 'Products endpoint did not return an array');
  assert(products.data.length > 0, 'Products endpoint returned no data after seeding');

  const login = await requestJson('/api/users/login', {
    method: 'POST',
    body: JSON.stringify({
      email: 'admin@playgear.com',
      password: 'Admin@123',
    }),
  });

  assert(login.status === 200, `Login endpoint failed with ${login.status}`);
  assert(login.data?.token, 'Login did not return a token');
  assert(login.data?.isAdmin === true, 'Admin login did not return admin user');

  const stats = await requestJson('/api/products/admin/stats');
  assert(stats.status === 200, `Admin stats endpoint failed with ${stats.status}`);
  assert(typeof stats.data?.productCount === 'number', 'Admin stats missing productCount');

  console.log('API smoke checks passed');
};

run().catch((error) => {
  console.error(`API smoke check failed: ${error.message}`);
  process.exit(1);
});
