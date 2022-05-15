const postPagePath = (page:any) => (page <= 1 ? '/' : `/page/${page-1}/`);
const topPostsPagePath = (page:any) => (page <= 1 ? '/top/' : `/top/page/${page}/`);

const tagPagePath = (tagSlug:any, page:any) => (page <= 1 ? tagSlug : `${tagSlug}page/${page-1}/`);
const catPagePath = (catSlug:any, page:any) => (page <= 1 ? catSlug : `${catSlug}page/${page-1}/`);
const testPagePath = (basePath: string, page: number): string =>
  [basePath === "/" ? "" : basePath, "page", page].join("/");

export{
  postPagePath,
  topPostsPagePath,
  tagPagePath,
  testPagePath,
  catPagePath
};