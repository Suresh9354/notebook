import express from 'express';
import { createnotes, deleted, getallnotes, updateded, getnotebyid } from '../controllers/notescontrollers.js';


const router = express.Router();

router.get('/', getallnotes);
router.get('/:id', getnotebyid); 
router.post('/', createnotes);
router.put('/:id',updateded);
router.delete("/:id",deleted);


export default router;