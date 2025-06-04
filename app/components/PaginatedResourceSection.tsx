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
import { Pagination } from '@shopify/hydrogen';

// Define the PaginationInfo type locally since it's not exported by @shopify/hydrogen
type PaginationInfo<NodesType> = {
  nodes: Array<NodesType>;
  NextLink: React.FC<
    Omit<React.HTMLProps<HTMLAnchorElement>, 'to'> & {
      ref?: React.Ref<HTMLAnchorElement>;
    }
  >;
  PreviousLink: React.FC<
    Omit<React.HTMLProps<HTMLAnchorElement>, 'to'> & {
      ref?: React.Ref<HTMLAnchorElement>;
    }
  >;
  previousPageUrl: string;
  nextPageUrl: string;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isLoading: boolean;
  state: {
    nodes: Array<NodesType>;
    pageInfo: {
      endCursor?: string | null;
      startCursor?: string | null;
      hasPreviousPage: boolean;
    };
  };
};

export function PaginatedResourceSection<NodesType>({
  connection,
  children,
  resourcesClassName,
}: {
  connection: React.ComponentProps<typeof Pagination<NodesType>>['connection'];
  children: React.FunctionComponent<{ node: NodesType; index: number }>;
  resourcesClassName?: string;
}) {
  // Normalize connection to always have nodes
  const normalizedNodes = 'nodes' in connection
    ? connection.nodes
    : connection.edges.map(edge => edge.node);

  // Log the connection to debug
  console.log('Connection:', connection);

  return (
    <Pagination connection={connection}>
      {({
        nodes,
        isLoading,
        PreviousLink,
        NextLink,
        hasPreviousPage,
        hasNextPage,
        state,
      }: PaginationInfo<NodesType>) => {
        const resourcesMarkup = nodes.map((node, index) =>
          children({ node, index }),
        );

        // Log state to debug
        console.log('Pagination state:', state);

        // Fallback for pageInfo
        const pageInfo = state.pageInfo || {
          startCursor: null,
          endCursor: null,
          hasPreviousPage: false,
          hasNextPage: false,
        };
        const { startCursor } = pageInfo;

        // Estimate total pages (simplified; adjust based on your API response)
        const pageSize = 6; // Matches pageBy: 6 in your loader
        const totalItems =
          'pageInfo' in connection && connection.pageInfo && 'totalCount' in connection.pageInfo
            ? (connection.pageInfo as any).totalCount
            : normalizedNodes.length; // Fallback to nodes length
        const totalPages = Math.ceil(totalItems / pageSize) || 10; // Fallback to 10 as per image

        // Estimate current page (simplified; adjust based on your routing logic)
        const currentPage =
          startCursor && nodes.length > 0
            ? Math.floor(nodes.findIndex((node) => node.id === startCursor) / pageSize) + 1
            : 1;

        // Generate page numbers
        const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

        return (
          <div>
            <PreviousLink>
              {isLoading ? 'Loading...' : <span>↑ Load previous</span>}
            </PreviousLink>
            {resourcesClassName ? (
              <div className={resourcesClassName}>{resourcesMarkup}</div>
            ) : (
              resourcesMarkup
            )}
            <NextLink>
              {isLoading ? 'Loading...' : <span>Load more ↓</span>}
            </NextLink>

            {/* Pagination Bar */}
            <div className="pagination-bar flex justify-center items-center mt-4">
              <PreviousLink
                className={`px-3 py-1 ${
                  hasPreviousPage
                    ? 'text-gray-500 hover:text-black'
                    : 'text-gray-300 cursor-not-allowed'
                }`}
              >
                Prev
              </PreviousLink>

              {pageNumbers.map((page) => (
                <a
                  key={page}
                  href={`?page=${page}`} // Adjust URL based on your routing
                  className={`px-3 py-1 ${
                    currentPage === page
                      ? 'bg-black text-white'
                      : 'text-gray-500 hover:text-black'
                  }`}
                >
                  {page}
                </a>
              ))}

              <NextLink
                className={`px-3 py-1 ${
                  hasNextPage
                    ? 'text-gray-500 hover:text-black'
                    : 'text-gray-300 cursor-not-allowed'
                }`}
              >
                Next
              </NextLink>
            </div>
          </div>
        );
      }}
    </Pagination>
  );
}
