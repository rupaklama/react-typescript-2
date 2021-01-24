// Enums for all action types.
// Enum is an object for small fixed set of values which are closely related.
// It's like a SET of some small values.
export enum ActionType {
  SEARCH_REPOSITORIES = 'search_repositories',
  SEARCH_REPOSITORIES_SUCCESS = 'search_repositories_success',
  SEARCH_REPOSITORIES_ERROR = 'search_repositories_error',
}
// Now, we can use this enum 'ActionType' to access all these Action Types rather then writing raw strings
// which is bad as we are duplicating strings & easily can make typos.
