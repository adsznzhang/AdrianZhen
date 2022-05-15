import React from "react";

import { graphql } from "gatsby";

import { Feed } from "@/components/Feed";
import { Layout } from "@/components/Layout";
import { Page } from "@/components/Page";
import { Pagination } from "@/components/Pagination";
import { Sidebar } from "@/components/Sidebar";
import { useSiteMetadata } from "@/hooks";
import { AllMarkdownRemark, PageContext } from "@/types";
import { tagPagePath} from '@/utils/page-path';
import _ from "lodash";

interface Props {
  data: {
    allMarkdownRemark: AllMarkdownRemark;
  };
  pageContext: PageContext;
}

const TagTemplate: React.FC<Props> = ({ data, pageContext }: Props) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { group, pagination } = pageContext;
  
  const { total,currentPage, prevPagePath, nextPagePath, hasPrevPage, hasNextPage } =
    pagination;
  const { edges} = data.allMarkdownRemark;
  const pageTitle =
    currentPage > 0
      ? `${group} - Page ${currentPage} - ${siteTitle}`
      : `${group} - ${siteTitle}`;
      const tagSlug = `/tag/${_.kebabCase(group)}/`;
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
          numPages={total}
          currentPage={currentPage}
          pagePath={tagPagePath.bind(null,tagSlug)}
        />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query TagTemplate($group: String, $limit: Int!, $offset: Int!) {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
    allMarkdownRemark(     
      limit: $limit
      skip: $offset
      filter: {
        frontmatter: {
          tags: { in: [$group] }
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
            title
            date
            category
            description
          }
        }
      }
    }
  }
`;

export default TagTemplate;
