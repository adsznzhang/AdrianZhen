import React from "react";

import { graphql } from "gatsby";

import { Feed } from "@/components/Feed";
import { Layout } from "@/components/Layout";
import { Page } from "@/components/Page";
import { Pagination } from "@/components/Pagination";
import { Sidebar } from "@/components/Sidebar";
import { useSiteMetadata } from "@/hooks";
import { AllMarkdownRemark, PageContext } from "@/types";

interface Props {
  data: {
  totalCount:number;
    allMarkdownRemark: AllMarkdownRemark;
  };
  pageContext: PageContext;
}

const IndexTemplate: React.FC<Props> = ({ data, pageContext }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();

  const { pagination } = pageContext;
  const { currentPage, hasNextPage, hasPrevPage, prevPagePath, nextPagePath } =
    pagination;

  const {edges,totalCount } = data.allMarkdownRemark;
  const pageTitle =
    currentPage > 0 ? `Posts - Page ${currentPage} - ${siteTitle}` : siteTitle;
    const total = Math.ceil(totalCount / 4)
  return (
    <Layout title={pageTitle} description={siteSubtitle}>
      <Sidebar isIndex />
      <Page>
        <Feed edges={edges} />
        <Pagination
          prevPagePath={prevPagePath}
          nextPagePath={nextPagePath}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
          currentPage={currentPage}
          numPages={total}
        />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query IndexTemplate($limit: Int!, $offset: Int!) {
    allMarkdownRemark(
      limit: $limit
      skip: $offset
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
    ) {
      totalCount
      edges {
        node {
          fields {
            categorySlug
            slug
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

export default IndexTemplate;
