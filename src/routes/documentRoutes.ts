import { Router } from "express";
import documentController from "../controllers/documentController";

const router = Router();

  router.post('/save-document', documentController.saveDocument);
  router.get('/get-all-doc', documentController.getAllDocuments);
  router.post('/get-delete-all-docs', documentController.deleteAllDocs);

  export default router;