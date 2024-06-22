import {} from 'mdast';

declare module 'mdast' {
   interface HeadingData {
     id?: string
   }
}
