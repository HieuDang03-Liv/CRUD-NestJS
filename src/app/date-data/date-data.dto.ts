export interface DataOnDay {
  author: string
  dateTime: Date
  detailContent: DetailContent
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
