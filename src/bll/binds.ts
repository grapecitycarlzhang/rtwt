import { bindingCollection } from '../gc-common'
import { TYPES } from './types';
import { ToDoBll } from './todo/todo';

bindingCollection.push((container) => {
    container.bind<IToDoBll>(TYPES.IToDoBll).to(ToDoBll);
});