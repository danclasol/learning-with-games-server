import { getUserGames } from '#Controllers/games.controller.js';
import {
	createCollection,
	deleteCollection,
	updateCollection,
} from '#Controllers/groups-collections.controller.js';
import validateNewGroupCollectionDTO from '#Dto/group-collection-new.dto.js';
import validateUpdateGroupCollectionDTO from '#Dto/group-collection-update.dto.js';
import { Router } from 'express';

const groupCollectionsRouter = Router({ mergeParams: true });

groupCollectionsRouter.get('/', getUserGames);
groupCollectionsRouter.get('/:collectionId', getUserGames);
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
