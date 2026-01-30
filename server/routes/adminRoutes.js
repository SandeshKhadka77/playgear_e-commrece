const { protect, admin } = require('../middleware/authMiddleware');

// Only logged-in Admins can add products
router.post('/', protect, admin, async (req, res) => {
   // add product logic...
});

// Only logged-in Admins can see the Dashboard Stats
router.get('/admin/stats', protect, admin, async (req, res) => {
   // stats logic...
});