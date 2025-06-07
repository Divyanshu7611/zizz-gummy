// import * as React from 'react';
// import {Pagination} from '@shopify/hydrogen';

// /**
//  * <PaginatedResourceSection > is a component that encapsulate how the previous and next behaviors throughout your application.
//  */
// export function PaginatedResourceSection<NodesType>({
//   connection,
//   children,
//   resourcesClassName,
// }: {
//   connection: React.ComponentProps<typeof Pagination<NodesType>>['connection'];
//   children: React.FunctionComponent<{node: NodesType; index: number}>;
//   resourcesClassName?: string;
// }) {
//   return (
//     <Pagination connection={connection}>
//       {({nodes, isLoading, PreviousLink, NextLink}) => {
//         const resourcesMarkup = nodes.map((node, index) =>
//           children({node, index}),
//         );

//         return (
//           <div>
//             <PreviousLink>
//               {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
//             </PreviousLink>
//             {resourcesClassName ? (
//               <div className={resourcesClassName}>{resourcesMarkup}</div>
//             ) : (
//               resourcesMarkup
//             )}
//             <NextLink>
//               {isLoading ? 'Loading...' : <span>Load more ↓</span>}
//             </NextLink>
//           </div>
//         );
//       }}
//     </Pagination>
//   );
// }





import * as React from 'react';
import {Pagination} from '@shopify/hydrogen';

/**
 * <PaginatedResourceSection> is a component that encapsulates the previous and next behaviors throughout your application.
 */
export function PaginatedResourceSection<NodesType>({
  connection,
  children,
  resourcesClassName,
}: {
  connection: React.ComponentProps<typeof Pagination<NodesType>>['connection'];
  children: React.FunctionComponent<{node: NodesType; index: number}>;
  resourcesClassName?: string;
}) {
  return (
    <Pagination connection={connection}>
      {({nodes, isLoading, PreviousLink, NextLink}) => {
        const resourcesMarkup = nodes.map((node, index) =>
          children({node, index}),
        );

        return (
          <div className="flex flex-col items-center">
            {resourcesClassName ? (
              <div className={resourcesClassName}>{resourcesMarkup}</div>
            ) : (
              resourcesMarkup
            )}
            <div className="flex justify-center gap-4 mt-8">
              <PreviousLink>
                {isLoading ? 'Loading...' : <button className='bg-black text-white px-3 py-2 rounded-sm cursor-pointer hover:scale-105 transition-all duration-200'>Load previous ↑ </button>}
              </PreviousLink>
              <NextLink className="text-black px-4 py-2 hover:underline">
                {isLoading ? 'Loading...' : <button className='bg-black text-white px-3 py-2 rounded-sm cursor-pointer hover:scale-105 transition-all duration-200'>Load more ↓</button>}
              </NextLink>
            </div>
          </div>
        );
      }}
    </Pagination>
  );
}
