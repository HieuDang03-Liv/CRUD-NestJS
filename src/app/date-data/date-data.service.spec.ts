import { Test, TestingModule } from '@nestjs/testing'
import { DateDataService } from './date-data.service'

describe('DateDataService', () => {
  let service: DateDataService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DateDataService]
    }).compile()

    service = module.get<DateDataService>(DateDataService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
