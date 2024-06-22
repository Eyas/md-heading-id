import {} from 'micromark-util-types'

declare module 'micromark-util-types' {
interface TokenTypeMap {
  id: 'id'
  idMarker: 'idMarker'
  idString: 'idString'
}
}