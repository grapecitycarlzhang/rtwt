import * as gctypes from '../gc-common';
import * as repos from '../dal/types';
import * as domain from '../bll/types';

const TYPES = {
    ...gctypes.TYPES,
    ...repos.TYPES,
    ...domain.TYPES
};

export { TYPES };