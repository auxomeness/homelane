import { Router } from 'express';

const router = Router();

router.get('/health', (_request, response) => {
  response.json({ status: 'ok', service: 'homelane-api' });
});

export default router;
