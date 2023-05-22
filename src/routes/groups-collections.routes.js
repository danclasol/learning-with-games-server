import {
	createCollection,
	deleteCollection,
	updateCollection,
} from '#Controllers/groups-collections.controller.js';
import validateNewGroupCollectionDTO from '#Dto/group-collection-new.dto.js';
import validateUpdateGroupCollectionDTO from '#Dto/group-collection-update.dto.js';
import { Router } from 'express';

const groupCollectionsRouter = Router({ mergeParams: true });

groupCollectionsRouter.post(
	'/',
	validateNewGroupCollectionDTO,
	createCollection
);
groupCollectionsRouter.put(
	'/:collectionId',
	validateUpdateGroupCollectionDTO,
	updateCollection
);
groupCollectionsRouter.delete('/:collectionId', deleteCollection);

export default groupCollectionsRouter;
