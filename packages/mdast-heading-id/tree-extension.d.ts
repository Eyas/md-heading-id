import {Node} from 'unist';
import {Parent, Literal} from 'mdast';

export interface MdIdString extends Literal {
    type: 'idString'
    value: string | null
}

declare module 'mdast' {
    interface StaticPhrasingContentMap {
        idString: MdIdString
    }
}
