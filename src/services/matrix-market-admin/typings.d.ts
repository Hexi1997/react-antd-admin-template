declare namespace API {
  type addTagUsingPUTParams = {
    /** contractAddress */
    contractAddress: string;
    /** tag */
    tag?: 'BAN' | 'HIDDEN' | 'NOT_FOR_HOT' | 'TRAIT_FILTER_NOT_SUPPORTED' | 'UNRECOGNIZED';
  };

  type CollectionReport = {
    /** contract address */
    contractAddress: string;
    extra?: string;
    /** report id */
    id: number;
    /** handle remark */
    remark?: string;
    /** report time */
    reportTime: number;
    /** report type */
    reportType: string;
    /** report user */
    reporter?: string;
    /** report status */
    status?: string;
  };

  type CollectionReportSummary = {
    /** approval time */
    approvalTime?: number;
    /** contract address */
    contractAddress: string;
    /** collection desc */
    desc?: string;
    /** summary id */
    id?: number;
    /** latest report time */
    latestReportTime?: number;
    /** most report type */
    mostReportType?: string;
    /** most report count */
    mostReportTypeCount?: number;
    /** collection name */
    name?: string;
    /** collection report count */
    reportCount?: number;
    reportTypeCounts?: Record<string, any>;
    /** status */
    status?: string;
    tags?: string[];
  };

  type deleteTagUsingDELETEParams = {
    /** contractAddress */
    contractAddress: string;
    /** tag */
    tag?: 'BAN' | 'HIDDEN' | 'NOT_FOR_HOT' | 'TRAIT_FILTER_NOT_SUPPORTED' | 'UNRECOGNIZED';
  };

  type editUsingPOSTParams = {
    /** contractAddress */
    contractAddress: string;
  };

  type getCollectionReportSummaryUsingGETParams = {
    /** id */
    id: number;
  };

  type getGithubOauthUrlUsingPOSTParams = {
    /** clientId */
    clientId?: string;
  };

  type getItemReportSummaryUsingGETParams = {
    /** id */
    id: number;
  };

  type GithubLoginRequest = {
    clientId?: string;
    code?: string;
  };

  type HomepageRecommend = {
    contractAddress?: string;
    index: number;
    linkResourceUrl?: string;
    linkUrl?: string;
    position: 'BANNER' | 'EXPLORE' | 'HOT' | 'LATEST' | 'RECOMMENDS' | 'UNRECOGNIZED';
    tokenId?: string;
    type?: 'COLLECTION' | 'ITEM' | 'LINK' | 'UNRECOGNIZED';
  };

  type HomepageRecommendIdentity = {
    index: number;
    position: 'BANNER' | 'EXPLORE' | 'HOT' | 'LATEST' | 'RECOMMENDS' | 'UNRECOGNIZED';
  };

  type ItemReport = {
    /** contract address */
    contractAddress: string;
    extra?: string;
    /** report id */
    id: number;
    /** handle remark */
    remark?: string;
    /** report time */
    reportTime: number;
    /** report type */
    reportType: string;
    /** report user */
    reporter?: string;
    /** report status */
    status?: string;
    /** token id */
    tokenId: string;
  };

  type ItemReportSummary = {
    /** approval time */
    approvalTime?: number;
    /** contract address */
    contractAddress: string;
    /** collection desc */
    desc?: string;
    /** summary id */
    id?: number;
    /** latest report time */
    latestReportTime?: number;
    /** most report type */
    mostReportType?: string;
    /** most report count */
    mostReportTypeCount?: number;
    /** collection name */
    name?: string;
    /** collection report count */
    reportCount?: number;
    reportTypeCounts?: Record<string, any>;
    /** status */
    status?: string;
    tags?: string[];
    /** token id */
    tokenId: number;
  };

  type MatrixMarketCollection = {
    bannerUrl?: string;
    category?:
      | 'ANIME'
      | 'ART'
      | 'DOMAINS'
      | 'FASHIONS'
      | 'GAMES'
      | 'METAVERSE'
      | 'MUSIC'
      | 'OTHERS'
      | 'PFP'
      | 'PHOTOGRAPHY'
      | 'SPORTS'
      | 'UNRECOGNIZED';
    chain?: 'UNRECOGNIZED' | 'ethereum' | 'flow' | 'polygon';
    collectionName?: string;
    contractAddress?: string;
    creator?: string;
    description?: string;
    featuredUrl?: string;
    floorPrice?: number;
    itemCount?: number;
    links?: MatrixMarketCollectionSocialLink[];
    logoUrl?: string;
    metadataEndpoint?: string;
    metadataStatus?:
      | 'FAILED'
      | 'PERMANENT_FAILED'
      | 'SUCCESS'
      | 'TEMPORARY_FAILED'
      | 'UNRECOGNIZED';
    owner?: string;
    ownerCount?: number;
    publicCollectionName?: string;
    publicPath?: string;
    royalties?: MatrixMarketCollectionRoyalty[];
    serviceFeeDiscount?: number;
    storagePath?: string;
    supportMetadataView?: boolean;
    tags?: string;
    tokenName?: string;
    tokenSymbol?: string;
    volumeTraded?: number;
  };

  type MatrixMarketCollectionEditDTO = {
    banner?: string;
    category?:
      | 'ANIME'
      | 'ART'
      | 'DOMAINS'
      | 'FASHIONS'
      | 'GAMES'
      | 'METAVERSE'
      | 'MUSIC'
      | 'OTHERS'
      | 'PFP'
      | 'PHOTOGRAPHY'
      | 'SPORTS'
      | 'UNRECOGNIZED';
    description?: string;
    featured?: string;
    links?: MatrixMarketCollectionSocialLink[];
    logo?: string;
    name?: string;
    royalties?: MatrixMarketCollectionRoyalty[];
  };

  type MatrixMarketCollectionRoyalty = {
    address?: string;
    rate?: number;
  };

  type MatrixMarketCollectionSocialLink = {
    type?: string;
    url?: string;
  };

  type PageResultCollectionReport_ = {
    data?: CollectionReport[];
    pageNo?: number;
    pageSize?: number;
    totalCount?: number;
    totalPage?: number;
  };

  type PageResultCollectionReportSummary_ = {
    data?: CollectionReportSummary[];
    pageNo?: number;
    pageSize?: number;
    totalCount?: number;
    totalPage?: number;
  };

  type PageResultItemReport_ = {
    data?: ItemReport[];
    pageNo?: number;
    pageSize?: number;
    totalCount?: number;
    totalPage?: number;
  };

  type PageResultItemReportSummary_ = {
    data?: ItemReportSummary[];
    pageNo?: number;
    pageSize?: number;
    totalCount?: number;
    totalPage?: number;
  };

  type PageResultListMatrixMarketCollection_ = {
    data?: MatrixMarketCollection[];
    pageNo?: number;
    pageSize?: number;
    totalCount?: number;
    totalPage?: number;
  };

  type queryUsingGET1Params = {
    index?: number;
    owner?: string;
    pageNo?: number;
    pageSize?: number;
    searchText?: string;
    tags?: string;
  };

  type queryUsingGET2Params = {
    /** position */
    position?: 'BANNER' | 'EXPLORE' | 'HOT' | 'LATEST' | 'RECOMMENDS' | 'UNRECOGNIZED';
  };

  type queryUsingGETParams = {
    /** contractAddress */
    contractAddress: string;
  };

  type RefreshTokenRequest = {
    /** refresh token */
    refreshToken?: string;
  };

  type ReportPageQuery = {
    contractAddress?: string;
    pageNo?: number;
    pageSize?: number;
    reportTye?: string;
    status?: string;
    tokenId?: string;
  };

  type ReportSummaryPageQuery = {
    contractAddress?: string;
    name?: string;
    pageNo?: number;
    pageSize?: number;
    status?: string;
    tokenId?: number;
  };

  type TokenPairRestResponse = {
    /** access token */
    accessToken?: string;
    /** expires seconds */
    expiresIn?: number;
    /** refresh token */
    refreshToken?: string;
    /** scope */
    scope?: string;
    /** token type */
    tokenType?: string;
  };

  type UploadMediaResultDTO = {
    mediaUrl?: string;
  };
}
