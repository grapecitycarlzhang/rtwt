import { DI,DIEx } from '../inversify'
import { TYPES } from './types';
import { Request, IRequest } from '../common';
class bindingCollection {
    private isbindingToSyntax: boolean = false
    bindings: ((container: DI.Container) => void)[] = []
    get isbinded() {
        return this.isbindingToSyntax;
    }  
    push(bindingToSyntax: (container: DI.Container) => void) {
        this.bindings.push(bindingToSyntax);
    }
    bindingToSyntax() {
        this.isbindingToSyntax || (this.isbindingToSyntax = true, this.bindings.map((bindingToSyntax) => bindingToSyntax(DIEx.container)));
    }
}
const bindingCol = new bindingCollection()
bindingCol.push((container) => {
    container.bind<IRequest>(TYPES.IRequest).to(Request);
})
export { bindingCol as bindingCollection }
