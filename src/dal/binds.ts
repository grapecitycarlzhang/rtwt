import { bindingCollection } from '../gc-common'
import { TYPES } from './types';
import { ToDoDal } from './todo/todo';

bindingCollection.push((container) => {
    container.bind<IToDoDal>(TYPES.IToDoDal).to(ToDoDal);
});
