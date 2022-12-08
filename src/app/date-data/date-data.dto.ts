export interface DataOnDayReqBody extends DataOnDay {
  userId: string
}

export interface DataOnDay {
  author: string
  dateTime: Date
  detailContent: DetailContent
  userId: string
}

export interface DetailContent {
  text?: TextContent[]
  images?: ImageContent[]
  feeling?: string
}

interface TextContent {
  content: string
  createdAt: Date
  updatedAt: Date
}

interface ImageContent {
  url: File
  createdAt: Date
  caption: string
}

export interface FindDataOnDay {
  userId: string
  dateTime: Date
}
