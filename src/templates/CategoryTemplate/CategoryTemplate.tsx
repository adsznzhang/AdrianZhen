import React from "react";

import { graphql } from "gatsby";

import { Feed } from "@/components/Feed";
import { Layout } from "@/components/Layout";
import { Page } from "@/components/Page";
import { Pagination } from "@/components/Pagination";
import { Sidebar } from "@/components/Sidebar";
import { useSiteMetadata } from "@/hooks";
import { AllMarkdownRemark, PageContext } from "@/types";
import _ from "lodash";
import { catPagePath } from "@/utils/page-path";

interface Props {
  data: {
    allMarkdownRemark: AllMarkdownRemark;
  };
  pageContext: PageContext;
}

const CategoryTemplate: React.FC<Props> = ({ data, pageContext }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();

  const { group, pagination } = pageContext;
  const { total,currentPage, prevPagePath, nextPagePath, hasPrevPage, hasNextPage } =
    pagination;

  const { edges } = data.allMarkdownRemark;
  const pageTitle =
    currentPage > 0
      ? `${group} - Page ${currentPage} - ${siteTitle}`
      : `${group} - ${siteTitle}`;
      const catSlug = `/category/${_.kebabCase(group)}/`;
  return (
    <Layout title={pageTitle} description={siteSubtitle}>
      <Sidebar />
      <Page title={group}>
        <Feed edges={edges} />
        <Pagination
          prevPagePath={prevPagePath}
          nextPagePath={nextPagePath}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
          currentPage={currentPage}
          numPages={total}
          pagePath={catPagePath.bind(null,catSlug)}
        />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query CategoryTemplate($group: String, $limit: Int!, $offset: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $offset
      filter: {
        frontmatter: {
          category: { eq: $group }
          template: { eq: "post" }
          draft: { ne: true }
        }
      }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            description
            category
            title
            date
          }
        }
      }
    }
  }
`;

export default CategoryTemplate;
