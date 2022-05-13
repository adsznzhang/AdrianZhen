import Edge from "./edge";

interface AllMarkdownRemark {
  edges: Array<Edge>;
  totalCount:number;
  group: Array<{
    fieldValue: string;
    totalCount: number;
  }>;
}

export default AllMarkdownRemark;
