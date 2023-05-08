import {
	cloneGroup,
	createGroup,
	deleteGroup,
	getGroupById,
	getUserGroups,
	updateGroup,
} from '#Controllers/groups.controller.js';
import validateCloneGroupDTO from '#Dto/group-clone.dto.js';
import validateNewGroupDTO from '#Dto/group-new.dto.js';
import validateUpdateGroupDTO from '#Dto/group-update.dto.js';
import { Router } from 'express';

const groupsRouter = Router({ mergeParams: true });

groupsRouter.get('/', getUserGroups);
groupsRouter.get('/:id', getGroupById);
groupsRouter.post('/', validateNewGroupDTO, createGroup);
groupsRouter.post('/:id/clone', validateCloneGroupDTO, cloneGroup);
groupsRouter.put('/:id', validateUpdateGroupDTO, updateGroup);
groupsRouter.delete('/:id', deleteGroup);

export default groupsRouter;
