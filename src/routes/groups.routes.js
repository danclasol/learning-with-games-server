import {
	createGroup,
	deleteGroup,
	getGroupById,
	getUserGroups,
	updateGroup,
} from '#Controllers/groups.controller.js';
import validateNewGroupDTO from '#Dto/group-new.dto.js';
import validateUpdateGroupDTO from '#Dto/group-update.dto.js';
import { Router } from 'express';

const groupsRouter = Router({ mergeParams: true });

groupsRouter.get('/', getUserGroups);
groupsRouter.get('/:id', getGroupById);
groupsRouter.post('/', validateNewGroupDTO, createGroup);
groupsRouter.put('/:id', validateUpdateGroupDTO, updateGroup);
groupsRouter.delete('/:id', deleteGroup);

export default groupsRouter;
